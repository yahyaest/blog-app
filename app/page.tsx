import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import { allBlogs } from "@/.contentlayer/generated";
import RecentPosts from "@/components/home/recentBlogs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-dark dark:text-light">
      <About />
      <RecentPosts blogs={allBlogs} />
      <Contact />
    </main>
  );
}
