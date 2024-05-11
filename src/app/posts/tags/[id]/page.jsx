import { sql } from "@vercel/postgres";
import Post from "@/app/Components/Post";

export default async function Tags({ params: { id } }) {
  const { rows: msg } =
    await sql`SELECT m.*, u.username, i.path, t.colour from messages m JOIN users u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id join message_tags g on m.id = g.msg_id join hashtag h on h.id = g.tag_id where h.tag=${`#${id}`};`;
  return (
    <div className="grid grid-cols-6 gap-4">
      {msg.length == 0
        ? `No messages found for tag ${id}`
        : msg.map((x) => <Post key={x.id} post={x}></Post>)}
    </div>
  );
}
