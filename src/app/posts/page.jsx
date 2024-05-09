import { sql } from "@vercel/postgres";
import Link from "next/link";


export default async function posts() {

const {rows: msgs} = await sql`SELECT * from messages;`; 

return(<div>{msgs.map((x)=><div key={x.id}><Link href={`/posts/${x.id}`}>{x.message}</Link></div>)}</div>)
}