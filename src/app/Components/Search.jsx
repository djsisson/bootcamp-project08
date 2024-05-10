"use client";

import { useState, useEffect } from "react";
import { searchTags } from "../lib/actions";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SearchTags() {
  const [tags, setTags] = useState("");
  const [tagsDisplay, setTagsDisplay] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const search = async () => {
      const newInt = await searchTags(tags);
      setTagsDisplay(newInt);
    };
    search();
  }, [tags]);

  const onChange = (e) => {
    setTags(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={onChange}></input>
      {
        <div>
          {tagsDisplay
            ? tagsDisplay.map((x) => (
                <div key={x.tag}>
                  <Link
                    className={`link${
                      pathname === `/posts/tags/${x.tag.slice(1)}`
                        ? " active"
                        : ""
                    }`}
                    href={`/posts/tags/${x.tag.slice(1)}`}
                  >
                    {x.tag}
                  </Link>
                </div>
              ))
            : null}
        </div>
      }
    </div>
  );
}
