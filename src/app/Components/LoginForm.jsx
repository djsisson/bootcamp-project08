"use client";

import SubmitButton from "./Submit";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginForm({ loginFunction }) {
  const params = useSearchParams();
  const router = useRouter();
  return (
    <form
      action={loginFunction}
      className="flex flex-col gap-4 justify-center items-center h-full"
    >
      {params.get("x") ? "Invalid Username" : null}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        required
        pattern="^[a-zA-Z0-9_\-]+$"
        minLength="2"
        maxLength="20"
      />
      <div className="flex gap-4">
        <SubmitButton displayText="Login"></SubmitButton>
        <button onClick={() => router.push("/user/new")} type="button">
          New User
        </button>
      </div>
    </form>
  );
}
