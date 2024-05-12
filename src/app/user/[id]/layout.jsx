import Link from "next/link";

export default function UserPage({ children }) {
  return (
    <div className="h-full w-full">
      <div className="flex justify-around">
        <Link href={"profile"}>
          <h2 className="flex rounded-lg justify-center text-xl my-2 py-2 px-4 hover:bg-blue-400">
            Profile
          </h2>
        </Link>
        <Link href={`posts`}>
          <h2 className="flex rounded-lg justify-center text-xl my-2 py-2 px-4 hover:bg-blue-400">
            Posts
          </h2>
        </Link>
      </div>
      <div className="flex items-center h-full w-full">{children}</div>
    </div>
  );
}
