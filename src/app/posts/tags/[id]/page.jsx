import { sql } from "@vercel/postgres";
import Post from "@/app/Components/Post";

export default async function Tags({params : {id}}){

    const {rows: msg} = await sql`select m.* FROM messages as m INNER JOIN message_tags as t ON m.id = t.msg_id INNER JOIN hashtag as h ON h.id = t.tag_id where h.tag = ${`#${id}`};`;

    return(<div>{msg.length==0 ? `No messages found for tag ${id}` : msg.map((x) => <Post key={x.id} post={x}></Post>)}</div>)
}