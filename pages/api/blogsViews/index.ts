import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const blogsViewsFilePath = path.resolve(
  process.cwd(),
  "public/data/blogsViews.json"
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const blogsViews = JSON.parse(
        fs.readFileSync(blogsViewsFilePath, "utf-8")
      );
      res.status(200).json(blogsViews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog views", error });
    }
  } else if (req.method === "POST") {
    try {
      fs.writeFileSync(blogsViewsFilePath, JSON.stringify(req.body, null, 2));
      res.status(200).json({
        message: "Blog views updated successfully",
        blogsViews: req.body,
      });
    } catch (error) {
      console.error("Error updating blog views:", error);
      res.status(500).json({ message: "Error updating blog views", error });
    }
  }
}
