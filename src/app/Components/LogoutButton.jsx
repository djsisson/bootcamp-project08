"use client";
import {  handleLogout } from "../lib/actions";

export default function LogoutButton() {
  return <button onClick={async () => await handleLogout()}>Logout</button>
}
