"use client";
import React, { useEffect, useState } from "react";
import BlogLayoutOne from "../blog/BlogLayoutOne";
import BlogLayoutTwo from "../blog/BlogLayoutTwo";
import { sortBlogsByViews } from "@/utils";
import { Blog } from "@/.contentlayer/generated";

// const FeaturedBlogs = async({ blogs }: { blogs: Blog[] }) => {
const FeaturedBlogs = ({ blogs }: { blogs: Blog[] }) => {
  // const sortedBlogs = await sortBlogsByViews(blogs);

  const [sortedBlogs, setSortedBlogs] = useState<Blog[]>(blogs);

  useEffect(() => {
    const fetchAndSortBlogs = async () => {
      const sortedBlogs = await sortBlogsByViews(blogs);
      setSortedBlogs(sortedBlogs);
    };

    fetchAndSortBlogs();
  }, [blogs]);

  return (
    <section className="w-full mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
        Featured Posts
      </h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-6  mt-10 sm:mt-16">
        <article className=" col-span-2  sxl:col-span-1 row-span-2 relative">
          <BlogLayoutOne blog={sortedBlogs[0]} />
        </article>
        <article className=" col-span-2 sm:col-span-1 row-span-1 relative">
          <BlogLayoutTwo blog={sortedBlogs[1]} />
        </article>
        <article className="col-span-2 sm:col-span-1 row-span-1 relative">
          <BlogLayoutTwo blog={sortedBlogs[2]} />
        </article>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
