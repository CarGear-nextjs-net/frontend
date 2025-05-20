import BlogHeader from "@/components/blog/BlogHeader"
import BlogList from "@/components/blog/BlogList"
import BlogSidebar from "@/components/blog/BlogSidebar"
import {fetchBlogCategories, fetchBlogs} from "@/lib/api";

export const metadata = {
    title: "Danh Sách Bài Viết | Blog",
    description: "Khám phá các bài viết mới nhất và hữu ích nhất của chúng tôi",
}

export default async function BlogPage() {
    const posts = await fetchBlogs()
    const categories = await fetchBlogCategories()
    return (
        <div className="w-full">
            <BlogList blogs={posts} categories ={categories} />
        </div>
    )
}
