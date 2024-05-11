import { sql } from "@vercel/postgres";
import Post from "../Components/Post";

export default async function posts() {
  try {
    const { rows: msgs } =
      await sql`SELECT m.*, u.username, i.path, t.colour from messages as m INNER JOIN users as u ON m.user_id = u.id join icons i on i.id = u.icon_id join themes t on t.id = i.theme_id where parent_id is null;`;
    return (
      <div className="grid grid-cols-6 gap-4">
        {msgs.map((x) => (
          <Post key={x.id} post={x}></Post>
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}
