import { cx } from "@/utils";
import Link from "next/link";
import React from "react";

const Category = ({ link = "#", name, active, ...props }) => {
  return (
    // <Link
    //   href={link}
    //   className={cx(
    //     "inline-block py-1.5  md:py-2 px-6  md:px-10   rounded-full border-2 border-solid border-dark dark:border-light hover:scale-105 transition-all ease duration-200 m-2",
    //     props.className,
    //     active ? "bg-dark text-light dark:bg-light dark:text-dark" : "bg-light text-dark dark:bg-dark dark:text-light"
    //   )}
    // >
    //   #{name}
    // </Link>
    <Link
    href={link}
    className={cx(
      "inline-block py-1.5 md:py-2 px-6  md:px-10 rounded-full border-2 border-solid  hover:scale-105 transition-all ease duration-200 m-2",
      props.className,
      active ? "bg-dark text-light dark:bg-light dark:text-dark" : "bg-accent/20 hover:bg-accent/40 text-dark border-accent dark:bg-accentDark/20 hover:dark:bg-accentDark/40 dark:text-light dark:border-accentDark"
    )}
  >
    #{name}
  </Link>
  );
};

export default Category;