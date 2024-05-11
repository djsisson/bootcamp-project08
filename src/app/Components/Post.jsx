import Link from "next/link";
import Avatar from "./Avatar";

export default function Post({ post }) {
  return (
    <>
      <div className="col-span-1">
        <Avatar
          icon={{ path: post.path, colour: post.colour }}
          link="/"
        ></Avatar>
      </div>
      <div className="col-span-5 mr-4">
        <Link href={`/posts/${post.id}`}>
          <div>
            <div className="flex justify-between">
              <div className="text-xs italic">@{post.username}</div>
              <div className="text-xs italic">{post.created.toUTCString()}</div>
            </div>
            <div>{post.message}</div>
          </div>
        </Link>
      </div>
    </>
  );
}
