"use client";

import SubmitButton from "./Submit";
import BackButton from "./BackButton";

export default function EditPost({ newPostHandler, originalMessage }) {
  const onSubmit = async (e) => {
    await e.target.requestSubmit();
    if (!originalMessage) e.target.reset();
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
            defaultValue={originalMessage}
          />
        </div>
        <SubmitButton displayText={"Edit"}></SubmitButton>
        <BackButton displayText="Cancel"></BackButton>
      </form>
    </div>
  );
}
