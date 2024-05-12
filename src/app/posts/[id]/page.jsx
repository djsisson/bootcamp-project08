import { sql } from "@vercel/postgres";
import Post from "@/app/Components/Post";
import Sort from "@/app/Components/Sort";
import BackButton from "@/app/Components/BackButton";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import NewPost from "@/app/Components/NewPost";
import { Suspense } from "react";
import { upsertTags } from "@/app/lib/helper_functions";

export const dynamic = "force-dynamic";
export default async function Posts({ params: { id }, searchParams }) {
  const { rows: mainMsg } =
    await sql`SELECT m.*, u.username, i.path, t.colour from messages as m INNER JOIN users as u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id where m.id = ${id};`;
  const { rows: msg } =
    await sql`SELECT m.*, u.username, i.path, t.colour from messages as m INNER JOIN users as u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id where parent_id=${id} ORDER BY m.created DESC;`;
  if (searchParams?.sort == "asc") msg?.reverse();

  const isLoggedIn = cookies().get("userid")?.value;

  async function NewCommentFunction(formData) {
    "use server";
    try {
      const msg = formData.get("message");
      const { rows: msgId } =
        await sql`INSERT INTO messages (user_id, message, parent_id) VALUES (${isLoggedIn}, ${msg}, ${id}) RETURNING id`;
      await upsertTags(msgId[0]?.id, msg, false);
      revalidatePath("/");
      revalidatePath("/posts");
      revalidatePath(`/posts/${id}`);
      revalidatePath("/tags");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Suspense fallback={<p>Loading Posts...</p>}>
      <div className="flex justify-between w-full pr-4 pb-4">
        <BackButton></BackButton>
        <Sort url={`${id}/`}></Sort>
      </div>
      <div className="grid grid-cols-6 gap-4 pb-4">
        <Post
          key={mainMsg[0].id}
          post={mainMsg[0]}
          curUser={isLoggedIn}
          parent_id={id}
        ></Post>
      </div>
      {isLoggedIn ? (
        <NewPost newPostHandler={NewCommentFunction}></NewPost>
      ) : null}
      <div className="grid grid-cols-6 gap-4 pt-4">
        {msg.map((x) => (
          <Post key={x.id} post={x} curUser={isLoggedIn} parent_id={id}></Post>
        ))}
      </div>
    </Suspense>
  );
}
