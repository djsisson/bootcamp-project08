import { sql } from "@vercel/postgres";
import Post from "@/app/Components/Post";
import Sort from "@/app/Components/Sort";
import { Suspense } from "react";
export const dynamic = "force-dynamic"
export default async function UserPosts({ params: { id }, searchParams }) {
  const { rows: msg } =
    await sql`SELECT m.*, u.username, i.path, t.colour from messages m JOIN users u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id WHERE u.id = ${id} ORDER BY m.created DESC;`;
  if (searchParams?.sort == "asc") msg?.reverse();
  return (
    <Suspense fallback={<p>Loading Posts</p>}>
      <div className="flex justify-end w-full pr-4">
        <Sort url={`${id}/`}></Sort>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {msg.length == 0
          ? `No messages found for user ${id}`
          : msg.map((x) => <Post key={x.id} post={x}></Post>)}
      </div>
    </Suspense>
  );
}
