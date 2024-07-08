"use client";
import React, { useEffect, useState } from "react";
import { objectDeepEqual } from "@/utils";
import { getCookiesSession, setCookiesSession } from "@/utils/actions";

async function setVisitorViewedBlog(
  blogSlug: string,
  isFlagged: boolean = false
) {
  try {
    // Fetch the blogsViews from the server
    const response = await fetch("/data/blogsViews.json");
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    }
    const blogsViews: { [name: string]: number } = await response.json();

    // Set cookies session
    const sessionCookie = await getCookiesSession();

    if (sessionCookie && sessionCookie[blogSlug] === true) return;
    if (!sessionCookie) {
      const keys = Object.keys(blogsViews);
      const newSessionCookie: any = {};
      keys.forEach((key) => {
        // newSessionCookie[key] = key === blogSlug ? true : false;
        newSessionCookie[key] = false;
      });
      await setCookiesSession(newSessionCookie);
    }

    if (!sessionCookie[blogSlug] && isFlagged) {
      sessionCookie[blogSlug] = true;
      await setCookiesSession(sessionCookie);
    }
  } catch (error) {
    console.error("Failed to set visitor viewed blog:", error);
  }
}

async function fetchBlogsViews(blogSlug: string) {
  try {
    // Fetch the blogsViews from the server
    const response = await fetch("/data/blogsViews.json");
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    }
    const blogsViews: { [name: string]: number } = await response.json();
    const blogsViewsCopy = { ...blogsViews };

    // Set the blog view count
    const isBlogListed = Object.keys(blogsViews).includes(blogSlug);

    const sessionCookie = await getCookiesSession();
    const isBlogViewed = sessionCookie[blogSlug] === true;
    if (!isBlogListed) {
      blogsViews[blogSlug] = isBlogViewed ? 0 : 1;
    } else {
      blogsViews[blogSlug] = isBlogViewed
        ? blogsViews[blogSlug]
        : blogsViews[blogSlug] + 1;
    }
    // Save the updated blogsViews to the server
    if (objectDeepEqual(blogsViews, blogsViewsCopy)) return blogsViews;
    await fetch("/api/blogsViews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogsViews),
    });

    // set session cookie
    const isFlagged = true;
    setVisitorViewedBlog(blogSlug, isFlagged);

    return blogsViews;
  } catch (error) {
    console.error("Failed to fetch blogsViews:", error);
  }
}

export default function BlogCookies({ blogSlug }: { blogSlug: string }) {
  const [blogsViews, setBlogsViews] = useState<any>({});
  useEffect(() => {
    async function initializeSession() {
      await setVisitorViewedBlog(blogSlug);
      const response = await fetchBlogsViews(blogSlug);
      setBlogsViews(response);
    }
    initializeSession();
  }, []);

  return <React.Fragment></React.Fragment>;
}
