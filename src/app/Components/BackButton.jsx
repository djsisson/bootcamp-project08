"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ displayText = "Back" }) {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.back()}>
      {displayText}
    </button>
  );
}
