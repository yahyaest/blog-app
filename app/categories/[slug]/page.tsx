import { Blog, allBlogs } from "@/.contentlayer/generated";
import BlogLayoutThree from "@/components/blog/BlogLayoutThree";
import BlogCard from "@/components/blog/blogCard";
import Categories from "@/components/blog/categories";
import GithubSlugger, { slug } from "github-slugger";

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories: string[] = [];
  const paths = [{ slug: "all" }];

  allBlogs.map((blog: any) => {
    if (blog.isPublished) {
      blog.tags.map((tag: string) => {
        let slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }: any) {
  return {
    title: `${params.slug.replaceAll("-", " ")} Blogs`,
    description: `Learn more about ${
      params.slug === "all" ? "web development" : params.slug
    } through our collection of expert blogs and tutorials`,
  };
}

const CategoryPage = ({ params }: any) => {
  // Separating logic to create list of categories from all blogs
  const allCategories = ["all"]; // Initialize with 'all' category
  allBlogs.forEach((blog: any) => {
    blog.tags.forEach((tag: string) => {
      const slugified = slug(tag);
      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }
    });
  });

  // Sort allCategories to ensure they are in alphabetical order
  allCategories.sort();

  // Step 2: Filter blogs based on the current category (params.slug)
  const blogs = allBlogs
    .filter((blog: Blog) => blog.isPublished)
    .filter((blog: Blog) => {
      if (params.slug === "all") {
        return true; // Include all blogs if 'all' category is selected
      }
      return blog.tags?.some((tag: string) => slug(tag) === params.slug);
    });

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className=" px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          #{params.slug}
        </h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={allCategories} currentSlug={params.slug} />

      <div className="mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs.map((blog, index) => (
          <article key={index} className="my-10 md:my-20 col-span-1 row-span-1 relative">
            {/* <BlogCard blog={blog} /> */}
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </article>
  );
};

export default CategoryPage;
