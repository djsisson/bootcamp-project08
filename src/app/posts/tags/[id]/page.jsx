import { sql } from "@vercel/postgres";
import Post from "@/app/Components/Post";
import Sort from "@/app/Components/Sort";
import { Suspense } from "react";
import BackButton from "@/app/Components/BackButton";
export const dynamic = "force-dynamic";
export default async function Tags({ params: { id }, searchParams }) {
  const { rows: msg } =
    await sql`SELECT m.*, u.username, i.path, t.colour from messages m JOIN users u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id join message_tags g on m.id = g.msg_id join hashtag h on h.id = g.tag_id where h.tag=${`#${id}`} ORDER BY m.created DESC;`;
  if (searchParams?.sort == "asc") msg?.reverse();
  return (
    <Suspense fallback={<p>Loading Posts...</p>}>
      <div className="flex justify-between w-full pr-4 pb-4">
        <BackButton></BackButton>
        <Sort url={`${id}/`}></Sort>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {msg.length == 0
          ? `No messages found for tag ${id}`
          : msg.map((x) => <Post key={x.id} post={x}></Post>)}
      </div>
    </Suspense>
  );
}
