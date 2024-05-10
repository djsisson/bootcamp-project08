"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

export async function handleLogin() {
  cookies().set("userid", "darren");
  redirect("/");
}

export async function handleLogout() {
  cookies().delete("userid");
  redirect("/");
}

export async function searchTags(search = "") {
  const { rows: msgs } =
    await sql`select t.tag as tag, COUNT(m.tag_id) as count FROM message_tags as m INNER JOIN hashtag as t ON m.tag_id = t.id WHERE tag LIKE ${`%${search}%`} GROUP BY m.tag_id, t.tag ORDER BY count DESC LIMIT 10;`;
  return msgs;
}
