import { sql } from "@vercel/postgres";
import Post from "../Components/Post";
import { cookies } from "next/headers";
import Sort from "../Components/Sort";
import NewPost from "../Components/NewPost";
import { revalidatePath } from "next/cache";
import { upsertTags } from "../lib/helper_functions";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function posts({ searchParams }) {
  const isLoggedIn = cookies().get("userid")?.value;

  async function NewPostFunction(formData) {
    "use server";
    try {
      const msg = formData.get("message");
      const { rows: msgId } =
        await sql`INSERT INTO messages (user_id, message) VALUES (${isLoggedIn}, ${msg}) RETURNING id`;
      await upsertTags(msgId[0]?.id, msg, false);
      revalidatePath("/");
      revalidatePath("/posts");
      revalidatePath("/tags");
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const { rows: msgs } =
      await sql`SELECT m.*, u.username, i.path, t.colour, m.created from messages as m INNER JOIN users as u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id where parent_id is null ORDER BY m.created DESC;`;
    if (searchParams?.sort == "asc") msgs?.reverse();
    return (
      <Suspense fallback={<p>Loading Posts...</p>}>
        {isLoggedIn ? (
          <NewPost newPostHandler={NewPostFunction}></NewPost>
        ) : null}
        <div className="flex justify-end w-full pr-4 pt-2 pb-2">
          <Sort url={"posts"}></Sort>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {msgs.map((x) => (
            <Post key={x.id} post={x} curUser={isLoggedIn}></Post>
          ))}
        </div>
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}
