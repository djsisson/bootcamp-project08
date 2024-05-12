"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function IconPicker({ icons, curIcon, curTheme, setIcon }) {
  const [currentElement, setCurrentElement] = useState(0);

  const elementOnClick = (e) => {
    setCurrentElement(e.target.dataset.element);
  };

  useEffect(() => {
    if (curTheme) setCurrentElement(curTheme);
  }, [curTheme]);

  return (
    <div>
      <div className="flex gap-4 justify-center">
        {icons.map((theme, i) => {
          return (
            <div
              className="w-12 aspect-square cursor-pointer element-selector"
              data-element={i}
              onClick={elementOnClick}
              key={theme.id}
              active={i == currentElement ? "true" : "false"}
              style={{
                "--bgcolour": theme.colour,
                backgroundImage: `url('${theme.path}')`,
              }}
            ></div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 grid-rows-3 pt-4 gap-4 auto-cols-min">
        {icons[currentElement].icons.map((icon) => {
          return (
            <div data-element={icon.id} key={icon.id}>
              <div
                active={icon.id == curIcon ? "true" : "false"}
                onClick={() => setIcon(icon.id)}
                className="icon-container "
                style={{ "--bgcolour": icons[currentElement].colour }}
              >
                <Image
                  className="icon-select"
                  src={`${icon?.path}`}
                  alt="test"
                  width={120}
                  height={120}
                  style={{ "--bgcolour": icons[currentElement].colour }}
                ></Image>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
