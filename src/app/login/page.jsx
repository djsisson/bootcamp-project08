import LoginForm from "../Components/LoginForm";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export default function Login() {
  async function login(formData) {
    "use server";
    const { rows: userId } =
      await sql`SELECT id FROM users where username = ${formData.get(
        "username"
      )}`;

    if (userId.length != 0) {
      cookies().set("userid", userId[0].id);
      return redirect("/");
    } else {
      return redirect("/login?x=invalid");
    }
  }

  return <LoginForm loginFunction={login}></LoginForm>;
}
