import { Blog } from "@/.contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";

interface ExtendedBlog extends Blog {
  views?: number;
}

export const cx = (...classNames: string[] | any[]) =>
  classNames.filter(Boolean).join(" ");

export const sortBlogsByDate = (blogs: Blog[]) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};

export const sortBlogsByViews = async (blogs: ExtendedBlog[]) => {
  try {
    const blogsWithViews = [...blogs];
    // Fetch the blogsViews from the server
    const response = await fetch("/api/blogsViews", {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    }
    const blogsViews: { [name: string]: number } = await response.json();

    for (const blog of blogsWithViews) {
      for (const key of Object.keys(blogsViews)) {
        if (blog._raw.flattenedPath === key) {
          blog.views = blogsViews[key];
          continue;
        }
      }
    }

    return blogsWithViews
      .filter((blog) => blog.isPublished)
      .slice()
      .sort((a, b) => (b.views as number) - (a.views as number));
  } catch (e) {
    console.error("Failed to sort blogs by views:", e);
    return blogs;
  }
};

// Function to encode JSON object to Base64
export const encodeToBase64 = (jsonObject: Object) => {
  try {
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObject);
    // Convert string to Base64
    const base64String = btoa(jsonString);
    return base64String;
  } catch (e) {
    console.error("Failed to encode Base64:", e);
    return null;
  }
};

// Function to decode Base64 string back to JSON object
export const decodeFromBase64 = (base64String: string) => {
  try {
    // Convert Base64 string to JSON string
    const jsonString = atob(base64String);
    // Parse JSON string to object
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (e) {
    console.error("Failed to decode Base64:", e);
    return null;
  }
};

// Function to compare two objects deeply
export const objectDeepEqual = (obj1: Object | any, obj2: Object | any) => {
  try {
    // Check if both values are the same (including NaN)
    if (obj1 === obj2) return true;

    // Check if either value is null or not an object
    if (
      obj1 == null ||
      typeof obj1 !== "object" ||
      obj2 == null ||
      typeof obj2 !== "object"
    ) {
      return false;
    }

    // Get keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if both objects have the same number of keys
    if (keys1.length !== keys2.length) return false;

    // Recursively check each key-value pair
    for (const key of keys1) {
      if (!keys2.includes(key) || !objectDeepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  } catch (e) {
    console.error("Failed to compare objects:", e);
    return false;
  }
};
