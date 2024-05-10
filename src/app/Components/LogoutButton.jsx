"use client";
import {  handleLogout } from "../lib/actions";

export default function LogoutButton({username}) {
  return <button onClick={async () => await handleLogout()}>Logout {username}</button>
}
