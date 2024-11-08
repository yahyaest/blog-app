import { makeSource, defineDocumentType } from "@contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "date",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    image: { type: "image" },
    isPublished: {
      type: "boolean",
      default: true,
    },
    author: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    toc: {
      type: "json",
      resolve: async (doc) => {
        // const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const regulrExp = /\n(#{1,6})\s+(.+)/g;

        const slugger = new GithubSlugger();
        // const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(
        //   ({ groups }: any) => {
        //     const flag = groups?.flag;
        //     const content = groups?.content;

        //     return {
        //       level:
        //         flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : flag?.length == 3 ? "three" : "four",
        //       text: content,
        //       slug: content ? slugger.slug(content) : undefined,
        //     };
        //   }
        // );

        const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(
          (match) => {
            const flag = match[1]; // The first capture group: hash marks
            const content = match[2]; // The second capture group: heading content

            return {
              level:
                flag.length === 1
                  ? "one"
                  : flag.length === 2
                  ? "two"
                  : flag.length === 3
                  ? "three"
                  : "four",
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          }
        );

        return headings;
      },
    },
  },
}));

const codeOptions = {
  theme: "github-dark",
  grid: false,
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [rehypePrettyCode as any, codeOptions],
    ],
  },
});
