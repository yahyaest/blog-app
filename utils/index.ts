import { compareDesc, parseISO } from "date-fns";

export const cx = (...classNames : string[] | any[]) => classNames.filter(Boolean).join(" ");

export const sortBlogsByDate = (blogs: any[]) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};
