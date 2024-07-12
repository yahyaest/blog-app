import Link from "next/link";
import React from "react";
import { sortBlogsByDate } from "@/utils";
import BlogCard from "../blog/blogCard";
import { Blog } from "@/.contentlayer/generated";

const RecentBlogs = ({ blogs }: { blogs: Blog[] }) => {
  const sortedBlogs = sortBlogsByDate(blogs);
  return (
    <section className="w-full  mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
      <div className="w-full flex  justify-between">
        <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
          Recent Posts
        </h2>
        <Link
          href="/categories/all"
          className="inline-block font-medium text-accent dark:text-accentDark underline underline-offset-2      text-base md:text-lg"
        >
          view all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16">
        {sortedBlogs.filter((blog : Blog) => blog.isPublished).slice(0, 6).map((blog, index) => {
          return (
            <article key={index} className="col-span-1 row-span-1 relative">
              <BlogCard blog={blog} />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentBlogs;
