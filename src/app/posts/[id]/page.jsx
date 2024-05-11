import { sql } from "@vercel/postgres";
import Post from "@/app/Components/Post";

export default async function Posts({ params: { id } }) {
  const { rows: msg } =
    await sql`SELECT m.*, u.username, i.path, t.colour from messages as m INNER JOIN users as u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id where m.id = ${id} or parent_id=${id};`;

  return (
    <div className="grid grid-cols-6 gap-4">
      {msg.map((x) => (
        <Post key={x.id} post={x}></Post>
      ))}
    </div>
  );
}
