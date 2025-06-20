import BlogList from "@/components/templates/User/blog/BlogList";
import { fetchBlogCategories, fetchBlogs } from "@/lib/api";

export const metadata = {
  title: "Danh Sách Bài Viết | Blog",
  description: "Khám phá các bài viết mới nhất và hữu ích nhất của chúng tôi",
};

export default async function BlogPage() {
  const posts = await fetchBlogs();
  const categories = await fetchBlogCategories();
  return (
    <div className="w-full">
      <BlogList blogs={posts} categories={categories} />
    </div>
  );
}
