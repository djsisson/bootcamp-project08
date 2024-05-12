"use server";

import SearchTags from "@/app/Components/Search";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { cookies } from "next/headers";
import Avatar from "@/app/Components/Avatar";

export default async function Sidebar() {
  const isLoggedIn = cookies().get("userid")?.value;
  async function searchTags(search = "") {
    "use server";
    try {
      const { rows: msgs } =
        await sql`select t.tag as tag, COUNT(m.tag_id) as count FROM message_tags as m INNER JOIN hashtag as t ON m.tag_id = t.id WHERE tag LIKE ${`%${search}%`} GROUP BY m.tag_id, t.tag ORDER BY count DESC LIMIT 10;`;
      return msgs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const initialValue = await searchTags();
  let userIcon = null;
  try {
    userIcon = isLoggedIn
      ? await sql`select u.username, i.path, t.colour from users u join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id where u.id = ${isLoggedIn}`
      : null;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="max-h-svh border border-solid sticky top-0 p-4 rounded-r-lg">
      {isLoggedIn ? (
        <>
          <Avatar
            icon={userIcon?.rows[0]}
            link={`/user/${isLoggedIn}/profile`}
          ></Avatar>
          <h2 className="flex justify-center text-xs italic py-1 ">
            @{userIcon?.rows[0].username}
          </h2>
        </>
      ) : (
        <Link href={"/login"}>
          <h2 className="flex rounded-lg justify-center text-xl my-2 py-1 hover:bg-blue-400">
            Login
          </h2>
        </Link>
      )}
      <Link href={"/"}>
        <h2 className="flex rounded-lg justify-center text-xl my-2 py-1 hover:bg-blue-400">
          Home
        </h2>
      </Link>
      <h2 className="flex justify-center text-xl py-2 ">Search</h2>
      <SearchTags search={searchTags} initialValue={initialValue}></SearchTags>
    </div>
  );
}
