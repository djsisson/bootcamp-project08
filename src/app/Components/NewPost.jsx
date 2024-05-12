"use client";

import SubmitButton from "./Submit";

export default function NewPost({ newPostHandler }) {
  const onSubmit = async (e) => {
    await e.target.requestSubmit();
    e.target.reset();
  };

  return (
    <div className="px-4">
      <form onSubmit={onSubmit} action={newPostHandler} className="flex gap-4">
        <div className="flex flex-col gap-4 w-full">
          <input
            className="w-full"
            type="textArea"
            id="message"
            name="message"
            required
            minLength="2"
            maxLength="200"
            placeholder="Message ..."
          />
        </div>
        <SubmitButton displayText={"Post"}></SubmitButton>
      </form>
    </div>
  );
}
