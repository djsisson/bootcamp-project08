import { sql } from "@vercel/postgres";
import LogoutButton from "@/app/Components/LogoutButton";

export default async function Posts({ params: { id } }) {
  //   const { rows: msg } =
  //     await sql`SELECT m.*, u.username from messages as m INNER JOIN users as u ON m.user_id = u.id where m.id = ${id} or parent_id=${id};`;

  return (
    <div>
      this is user profile<LogoutButton></LogoutButton>
    </div>
  );
}
