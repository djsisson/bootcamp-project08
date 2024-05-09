import { sql } from "@vercel/postgres";

export default async function Post({params : {id}}){
    
    const {rows: msg} = await sql`SELECT * from messages where id = ${id};`;

    return(<div>{msg[0].message}gggggg</div>)
}