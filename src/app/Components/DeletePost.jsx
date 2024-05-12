"use client";
import { deleteMessage } from "../lib/actions";

export default function DeletePost({ msgid }) {
  return (
    <div className="cursor-pointer" onClick={() => deleteMessage(msgid)}>
      Delete
    </div>
  );
}
