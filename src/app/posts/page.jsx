import { sql } from "@vercel/postgres";
import Post from "../Components/Post";


export default async function posts() {

const {rows: msgs} = await sql`SELECT m.*, u.username from messages as m INNER JOIN users as u ON m.user_id = u.id where parent_id is null;`; 

return(<div>{msgs.map((x)=><Post key={x.id} post={x}></Post>)}</div>)
}