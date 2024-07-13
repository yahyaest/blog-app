import { Blog } from "@/.contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MagicButton from "../ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";

const BlogLayoutThree = ({ blog }: { blog: Blog }) => {
  return (
    <div className="block lg:flex text-dark dark:text-light">
      <Link
        href={blog.url}
        className="col-span-12 lg:col-span-4 h-full rounded-xl overflow-hidden self-center"
      >
        <Image
          src={blog.image?.filePath?.replace("../public", "") ?? ""}
          placeholder="blur"
          blurDataURL={blog.image?.blurhashDataUrl}
          alt={blog.title}
          width={blog.image?.width}
          height={blog.image?.height}
          className="aspect-square w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="mt-5 lg:ml-10 lg:mt-10 col-span-12 lg:col-span-8 w-full md:text-center lg:self-center">
        <Link href={blog.url} className="inline-block">
          <h2 className="my-1 font-bold capitalize text-base text-lg sm:text-2xl text-accent dark:text-accentDark ">
            <span
              className="bg-gradient-to-r from-accent/50 dark:from-accentDark/50 to-accent/50 dark:to-accentDark/50 bg-[length:0px_6px]
                group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
          </h2>
        </Link>
        {blog.tags && (
          <span className="inline-block w-full uppercase text-left text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
            {blog.tags[0]}
          </span>
        )}
        <span className="inline-block w-full capitalize text-left text-gray dark:text-light/50 font-semibold  text-xs sm:text-base">
          {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
        </span>
        <div className="text-left text-ellipsis overflow-hidden">
          {blog.description.split("\n").map((line, index) => (
            <p
              key={index}
              className={`my-1 ${index > 1 ? "hidden lg:block" : "block"}`}
            >
              {line}
            </p>
          ))}
        </div>
        <Link href={blog.url} className="md:absolute right-0">
        <div className="my-2 lg:my-5">
          <MagicButton
            title="Read More"
            position="right"
          />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogLayoutThree;
