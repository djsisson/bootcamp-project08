"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function handleLogin() {
  cookies().set("userid", "darren");
  revalidatePath("/");
  revalidatePath("/posts");
  redirect("/");
}

export async function handleLogout() {
  cookies().delete("userid");
  revalidatePath("/");
  revalidatePath("/posts");
  redirect("/");
}

export async function deleteMessage(id) {
  try {
    await sql`DELETE FROM messages where id=${id}`;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/");
  revalidatePath("/posts");
  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
}
