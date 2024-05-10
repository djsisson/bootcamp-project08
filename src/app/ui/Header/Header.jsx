import LoginButton from "@/app/Components/LoginButton";
import LogoutButton from "@/app/Components/LogoutButton";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Header() {
  const isLoggedIn = cookies().get("userid")?.value
  return (
    <div className="">
      Header
      <Link href={"/"}>Home</Link>
      {isLoggedIn ? (
        <LogoutButton username={isLoggedIn}></LogoutButton>
      ) : (
        <LoginButton></LoginButton>
      )}
    </div>
  );
}
