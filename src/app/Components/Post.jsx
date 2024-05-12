import Link from "next/link";
import Avatar from "./Avatar";
import DeletePost from "./DeletePost";

export default function Post({ post, curUser, parent_id }) {
  if (!post) return <div></div>;
  const splitMessageTags = () => {
    const re = new RegExp(/(#[\p{L}0-9-_]+)/giu);
    const newMessage = post.message.split(re);

    return newMessage.map((msg, i) => {
      if (msg.charAt(0) == "#") {
        return (
          <Link
            key={`tag-${i}`}
            href={`/posts/tags/${msg.slice(1)}`}
            className="text-blue-300 hover:text-blue-700"
          >
            {msg}
          </Link>
        );
      } else {
        return msg;
      }
    });
  };

  return (
    <>
      <div className="col-span-1">
        <Avatar
          icon={{ path: post.path, colour: post.colour }}
          link={`/posts/user/${post.user_id}`}
        ></Avatar>
      </div>
      <div className="col-span-5 mr-4">
        <div>
          <div className="flex justify-between items-center">
            <div className="text-xs italic">@{post.username}</div>
            <div className="text-xs italic">{post.created?.toUTCString()}</div>
          </div>
          <div>{splitMessageTags()}</div>
          <div className="flex justify-between">
            <div>
              {post.parent_id ? (
                post.parent_id == parent_id ? null : (
                  <Link
                    className="text-xs italic"
                    href={`/posts/${post.parent_id}`}
                  >
                    Parent Thread
                  </Link>
                )
              ) : post.id == parent_id ? null : (
                <Link className="text-xs italic" href={`/posts/${post.id}`}>
                  Replies
                </Link>
              )}
            </div>
            {post.user_id == curUser ? (
              <div className="flex text-xs italic gap-4 items-center">
                <Link href={`/posts/${post.id}/Edit`}>Edit</Link>
                <DeletePost msgid={post.id}></DeletePost>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
