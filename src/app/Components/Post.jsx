import Link from "next/link"

export default function Post({post}){

    return(<div><Link href={`/posts/${post.id}`}><div>@{post.username}</div><div>{post.message}</div></Link></div>)
}