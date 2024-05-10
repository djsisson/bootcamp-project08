import { sql } from "@vercel/postgres";
import Post from "@/app/Components/Post";

export default async function Posts({params : {id}}){
    
    const {rows: msg} = await sql`SELECT m.*, u.username from messages as m INNER JOIN users as u ON m.user_id = u.id where m.id = ${id} or parent_id=${id};`;

    return(<div>{msg.map((x) => <Post key={x.id} post={x}></Post>)}</div>)
}