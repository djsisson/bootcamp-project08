import { sql } from "@vercel/postgres";
import Post from "@/app/Components/Post";
import Sort from "@/app/Components/Sort";
import { cookies } from "next/headers";
export const revalidate = 0
export default async function UserPosts({ searchParams }) {
  const isLoggedIn = cookies().get("userid")?.value;
  const { rows: msg } =
    await sql`SELECT m.*, u.username, i.path, t.colour from messages m JOIN users u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id WHERE u.id = ${isLoggedIn} ORDER BY m.created DESC;`;
  if (searchParams?.sort == "asc") msg?.reverse();
  return (
    <div className="flex h-full items-start flex-col">
      <div className="flex justify-end w-full pr-4">
        <Sort url={`/user/${isLoggedIn}/profile/posts`}></Sort>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {msg.length == 0
          ? null
          : msg.map((x) => (
              <Post key={x.id} post={x} curUser={isLoggedIn}></Post>
            ))}
      </div>
    </div>
  );
}
