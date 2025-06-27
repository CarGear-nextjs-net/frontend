"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Bookmark, Calendar, ChevronRight, Clock, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PaginationComponent } from "../../Common/Pagination";
import { fetchContentsManager } from "@/lib/api";
import { debounce } from "lodash";

export default function BlogList(props) {
  const [blogs, setBlogs] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const featuredBlog =useMemo(() => blogs[0], [blogs]);
  // Get unique categories
  useEffect(() => {
    async function fetchData() {
    const res = await fetchContentsManager({
      page: currentPage,
      pageSize: 6,
      title: searchTerm,
    });
      setBlogs(res?.data || []);
      setTotalPages(res?.totalPages || 0);
    }
    fetchData();
  }, [currentPage, searchTerm]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Bài Viết Của Chúng Tôi
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Khám phá những bài viết mới nhất và hữu ích nhất về các chủ đề công nghệ, kinh doanh, và
          cuộc sống.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value)}}
            />
          </div>
          <div className="flex gap-2"></div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedCategory === 0 ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setSelectedCategory(0)}
          >
            Tất cả
          </Button>
          {/* {categories.map(({ id, name }) => (
            <Button
              key={id}
              variant={selectedCategory === id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory(id)}
            >
              {name}
            </Button>
          ))} */}
        </div>
      </div>

      {/* Featured Blog */}
      {currentPage === 1 && selectedCategory === 0 && !searchTerm && (
        <div className="mb-12">
          <div
            className={`relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-500`}
          >
            <div className="relative h-[400px] w-full">
              <Image
                src={featuredBlog?.image || "/placeholder.svg?height=400&width=1200"}
                alt={featuredBlog?.title || "Bài viết"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-red-600 hover:bg-red-700">Nổi bật</Badge>
                <Badge className="bg-gray-800/80 hover:bg-gray-700">{featuredBlog?.category}</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{featuredBlog?.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredBlog?.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{featuredBlog?.author || "Admin"}</span>
                  </div>
                </div>
                <Link href={`/news/${featuredBlog?.slug}`}>
                  <h2 className="text-2xl md:text-3xl font-bold hover:text-red-400 transition-colors mb-3">
                    {featuredBlog?.title}
                  </h2>
                </Link>
                <p className="text-gray-200 mb-4 line-clamp-2 md:line-clamp-3">
                  {featuredBlog?.excerpt}
                </p>
                <Link href={`/news/${featuredBlog?.slug}`}>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Đọc bài viết <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`transform transition-all duration-500 `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="h-full overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={blog?.image || "/placeholder.svg?height=192&width=384"}
                    alt={blog?.title || "Bài viết"  }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-3 left-3 bg-red-600 hover:bg-red-700">
                    {blog?.category}
                  </Badge>
                  <button className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center text-xs text-gray-500 gap-3 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{blog?.displayStartDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{blog?.readTime}</span>
                    </div>
                  </div>
                  <Link href={`/news/${blog.slug}`}>
                    <h2 className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-2 mb-2 h-14">
                      {blog?.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 line-clamp-3 mb-4 text-sm">{blog?.excerpt}</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {blog?.author || "Admin"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0 mt-auto">
                  <Link href={`/news/${blog?.slug}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                    >
                      Đọc tiếp
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <Search className="h-12 w-12 text-gray-300 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Không tìm thấy bài viết</h3>
          <p className="text-gray-500 mb-4">
            Không có bài viết nào phù hợp với tiêu chí tìm kiếm của bạn.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSortBy("newest");
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Pagination */}
      {blogs.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        </div>
      )}
    </div>
  );
}
