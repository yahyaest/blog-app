// "use server";
// import React from "react";

// const fetchBlogsViews = async () => {
//   try {
//     //TODO set BASE_URL when implementing docker
//     // Adding { cache: 'no-store' } to avoid caching since fetch by default caches the response
//     const response = await fetch(`${process.env.BASE_URL}/api/blogsViews`, { cache: 'no-store' });
//     if (!response.ok) {
//       console.error(`HTTP error! Status: ${response.status}`);
//     }
//     const blogsViews: { [name: string]: number } = await response.json();
//     return blogsViews;
//   } catch (error) {
//     console.error("Failed to fetch blogs views:", error);
//     return {};
//   }
// };

// export default async function BlogViewCounter({
//   slug,
//   noCount = false,
//   showCount = true,
// }: {
//   slug: string;
//   noCount?: boolean;
//   showCount?: boolean;
// }) {
//   const blogsViews: { [name: string]: number } = await fetchBlogsViews();
//   const views = blogsViews[slug] || 0;

//   if (showCount) {
//     return <div>{views} {views > 1 ? "views" : "view"}</div>;
//   } else {
//     return null;
//   }
// }

////

"use client";
import React, { useEffect, useState } from "react";

const fetchBlogsViews = async () => {
  try {
    // Adding { cache: 'no-store' } to avoid caching since fetch by default caches the response
    const response = await fetch(`/api/blogsViews`, { cache: "no-store" });
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    }
    const blogsViews: { [name: string]: number } = await response.json();
    return blogsViews;
  } catch (error) {
    console.error("Failed to fetch blogs views:", error);
    return {};
  }
};

export default function BlogViewCounter({
  slug,
  noCount = false,
}: // showCount = true,
{
  slug: string;
  noCount?: boolean;
  // showCount?: boolean;
}) {
  const [views, setViews] = useState<number>(0);
  const [showCount, setShowCount] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndSortBlogs = async () => {
      const blogsViews: { [name: string]: number } = await fetchBlogsViews();
      setViews(blogsViews[slug] || 0);
      setShowCount(true);
    };

    fetchAndSortBlogs();
  }, [views]);

  // const blogsViews: { [name: string]: number } = await fetchBlogsViews();
  // const views = blogsViews[slug] || 0;

  if (showCount) {
    return (
      <div>
        {views} {views > 1 ? "views" : "view"}
      </div>
    );
  } else {
    return <></>;
  }
}
