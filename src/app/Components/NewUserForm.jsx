"use client";

import SubmitButton from "./Submit";
import { useSearchParams, useRouter } from "next/navigation";
import IconPicker from "./IconPicker";
import { useState, useEffect } from "react";

export default function UserForm({ newUserFunction, randomUser, icons }) {
  const params = useSearchParams();
  const router = useRouter();
  const [currentIcon, setCurrentIcon] = useState(0);
  useEffect(() => {
    setCurrentIcon(icons[0].icons[0].id);
  }, [icons]);

  return (
    <form
      action={newUserFunction}
      className="flex flex-col gap-4 justify-center h-full"
    >
      {params.get("x") ? "Failed to create New User Please Try Again" : null}
      <div className="flex flex-col gap-4">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          pattern="^[a-zA-Z0-9_\-]+$"
          minLength="2"
          maxLength="30"
          defaultValue={randomUser.username}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="firstname"
            name="first_name"
            required
            pattern="^[a-zA-Z0-9_\-]+$"
            minLength="2"
            maxLength="20"
            defaultValue={randomUser.first_name}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="last_name"
            required
            pattern="^[a-zA-Z0-9_\-]+$"
            minLength="2"
            maxLength="20"
            defaultValue={randomUser.last_name}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          className="w-full"
          type="email"
          id="email"
          name="email"
          required
          minLength="2"
          maxLength="50"
          defaultValue={randomUser.email}
        />
      </div>
      <div>
        <input
          type="hidden"
          id="icon_id"
          name="icon_id"
          value={currentIcon}
        ></input>
      </div>
      <IconPicker icons={icons} setIcon={setCurrentIcon} curIcon={currentIcon}></IconPicker>
      <div className="flex gap-4">
        <SubmitButton displayText="Create"></SubmitButton>
        <button type="button" onClick={() => router.push("/")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
