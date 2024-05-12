"use client";

import { useRouter } from "next/navigation";

export default function Sort({ url }) {
  const router = useRouter();
  const onChange = (e) => {
    router.push(`${url}?sort=${e.target.value}`);
  };
  return (
    <div>
      <select
        className="cursor-pointer"
        defaultValue={"desc"}
        onChange={onChange}
      >
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
    </div>
  );
}
