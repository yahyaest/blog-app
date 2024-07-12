import About from "@/components/home/about";
import Contact from "@/components/home/contact";
import { allBlogs } from "@/.contentlayer/generated";
import RecentBlogs from "@/components/home/recentBlogs";
import FeaturedBlogs from "@/components/home/featuredBlogs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-dark dark:text-light">
      <About />
      <FeaturedBlogs blogs={allBlogs} />
      <RecentBlogs blogs={allBlogs} />
      <Contact />
    </main>
  );
}
