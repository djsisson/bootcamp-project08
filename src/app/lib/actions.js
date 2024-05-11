"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
