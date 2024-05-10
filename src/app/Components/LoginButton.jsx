"use client";
import { handleLogin } from "../lib/actions";

export default function LoginButton() {
  return <button onClick={async () => await handleLogin()}>Login</button>
}
