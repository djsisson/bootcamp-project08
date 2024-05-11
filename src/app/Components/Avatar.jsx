import Image from "next/image";
import Link from "next/link";

export default function Avatar({ icon, clickHandler, link }) {
  if (!icon) return <div></div>;

  return (
    <div className="flex justify-center">
      <Link href={link}>
        <div className="icon-container " style={{ "--bgcolour": icon?.colour }}>
          <Image
            className="icon-select"
            src={`${icon?.path}`}
            alt="test"
            width={120}
            height={120}
            style={{ "--bgcolour": icon?.colour }}
          ></Image>
        </div>
      </Link>
    </div>
  );
}
