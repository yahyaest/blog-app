import Link from "next/link";
import React from "react";

const Tag = ({
  link = "#",
  name,
}: {
  link: string;
  name: string;
}) => {
  return (
    <Link
      href={link}
      className="bg-accent/20 hover:bg-accent/40 text-accent text-md font-semibold m-2 me-2 px-2.5 py-1 rounded dark:bg-accentDark/20 hover:dark:bg-accentDark/40 dark:text-accentDark border border-accent dark:border-accentDark inline-flex items-center justify-center no-underline"
    >
      {name}
    </Link>
  );
};

export default Tag;
