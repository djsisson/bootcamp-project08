"use client";

import SubmitButton from "./Submit";
import BackButton from "./BackButton";
import { useSearchParams } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function EditUserForm({ editUserFunction, currentUser, icons }) {
  const params = useSearchParams();

  return (
    <form
      action={editUserFunction}
      className="flex flex-col gap-4 justify-center h-full"
    >
      {params.get("x") ? "Failed to Edit User Please Try Again" : null}
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
          defaultValue={currentUser.username}
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
            defaultValue={currentUser.first_name}
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
            defaultValue={currentUser.last_name}
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
          defaultValue={currentUser.email}
        />
      </div>
      <div>
        <input
          type="hidden"
          id="icon_id"
          name="icon_id"
          defaultValue={currentUser.icon_id}
        ></input>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <SubmitButton displayText="Edit"></SubmitButton>
          <BackButton displayText="Cancel"></BackButton>
        </div>
        <LogoutButton></LogoutButton>
      </div>
    </form>
  );
}
