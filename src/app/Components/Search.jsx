"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SearchTags({ search: searchFunction, initialValue }) {
  const [tags, setTags] = useState("");
  const [tagsDisplay, setTagsDisplay] = useState(initialValue);
  const pathname = usePathname();
  const timeout = useRef(null);

  useEffect(() => {
    return clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    const search = async () => {
      const newTags = await searchFunction(tags);
      setTagsDisplay(newTags);
    };
    search();
  }, [tags, searchFunction]);

  const onChange = (e) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setTags(e.target.value), 300);
  };

  return (
    <div>
      <div className="relative">
        <input
          className="searchText relative pl-8 bg-search-icon bg-no-repeat bg-[length:2rem_2rem] bg-[centre_1rem] w-48"
          type="search"
          onChange={onChange}
          placeholder="Search..."
        ></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 absolute top-2 left-1"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {
        <ul className="pt-4 flex flex-col gap-2">
          {tagsDisplay
            ? tagsDisplay.map((x) => (
                <Link
                  key={x.tag}
                  href={`/posts/tags/${x.tag.slice(1)}`}
                  className={`text-lg px-4 py-2 rounded-lg link${
                    pathname === `/posts/tags/${x.tag.slice(1)}`
                      ? " bg-blue-600"
                      : " hover:bg-blue-400"
                  }`}
                >
                  <li>{x.tag}</li>
                </Link>
              ))
            : null}
        </ul>
      }
    </div>
  );
}
