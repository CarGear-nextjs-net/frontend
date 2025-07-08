"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { fetchContentsManager } from "@/lib/api";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PaginationComponent } from "../../Common/Pagination";

export default function BlogList(props) {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const dataFake = [
    {
      articleId: 1,
      title: "Vì Sao Nên Chọn Ghế Ngồi Ô Tô Cho Bé Của Combi?",
      description:
        "Ghế ngồi ô tô cho bé Combi – Sự Lựa Chọn Hàng Đầu Cho An Toàn Và Tiện Nghi Của Trẻ Nhỏ Việc lựa chọn ghế ngồi ô tô cho bé là điều cần thiết để bảo vệ an toàn cho trẻ trong mọi hành trình. Trong số các thương hiệu nổi tiếng trên thị Việc lựa chọn ghế ngồi ô tô cho bé là điều cần thiết để bảo vệ an toàn cho trẻ trong mọi hành trình. Trong số các thương hiệu nổi tiếng trên thị trường, Combi – thương hiệu Nhật Bản với hơn 60 năm kinh nghiệm trong ngành chăm sóc trẻ em – luôn được các bậc phụ huynh đánh giá cao về chất lượng, thiết kế và sự tiện lợi. Vậy tại sao ghế ngồi ô tô trẻ em Combi lại đáng để đầu tư?",
      image: "",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      isActive: true,
      isFeatured: true,
    },
    {
      articleId: 2,
      title: "Tin tức 1",
      description: "Mô tả tin tức 1",
      image: "",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      isActive: true,
      isFeatured: true,
    },
    {
      articleId: 3,
      title: "Tin tức 1",
      description: "Mô tả tin tức 1",
      image: "",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      isActive: true,
      isFeatured: true,
    },
    {
      articleId: 4,
      title: "Tin tức 1",
      description: "Mô tả tin tức 1",
      image: "",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      isActive: true,
      isFeatured: true,
    },
    {
      articleId: 5,
      title: "Tin tức 1",
      description: "Mô tả tin tức 1",
      image: "",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      isActive: true,
      isFeatured: true,
    },
  ];
  const categoriesFake = [
    {
      id: 1,
      title: "Chương trình khuyến mãi",
    },
    {
      id: 2,
      title: "Hỗ trợ khách hàng",
    },
    {
      id: 3,
      title: "Tin tức mới nhất",
    },
    {
      id: 4,
      title: "Tin tức sản phẩm",
    },
    {
      id: 5,
      title: "Video",
    },
  ];
  // const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const featuredBlog = useMemo(() => blogs[0], [blogs]);
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
    <div className="w-[1275px] mx-auto px-4 py-8 flex justify-center gap-5 bg-gray-50">
      <div className="w-full">
        {dataFake.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mb-4">
            {dataFake.map((blog, index) => (
              <div
                key={blog.articleId}
                className={`transform transition-all duration-500 `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="h-full py-2 overflow-hidden border border-gray-200">
                  <div className="px-5 py-3">
                    <div className="text-sm text-gray-500 mb-2">
                      Hỗ trợ khách hàng, Tin tức sản phẩm
                    </div>
                    <h3
                      className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-2 cursor-pointer"
                      onClick={() => {
                        router.push(`/news/${blog.slug}`);
                      }}
                    >
                      {blog?.title}
                    </h3>
                  </div>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center text-xs text-gray-500 gap-3 mb-3">
                        <Image
                          src={blog.image ? `/api/images/${blog.image}` : "/placeholder.svg"}
                          alt={blog?.title || "Bài viết"}
                          width={0}
                          height={0}
                          className="object-cover w-full shadow-md rounded-md min-h-[200px] h-full transition-transform duration-500 cursor-pointer"
                          onClick={() => {
                            router.push(`/news/${blog.slug}`);
                          }}
                        />
                      </div>
                      <div>
                        <div className="line-clamp-5 text-sm h-fit text-gray-500">
                          {blog?.description}
                        </div>
                        <Button
                          onClick={() => {
                            router.push(`/news/${blog.slug}`);
                          }}
                          variant="link"
                          className="w-[100px] mt-2 rounded-2xl text-red-600 border-red-600 hover:text-red-700 group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                        >
                          Đọc tiếp
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
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
        {dataFake.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </div>
        )}
      </div>

      <div className="mb-12 text-center w-[30rem]">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Bài Viết Của Chúng Tôi</h1>

        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>

        {dataFake.length > 0 && (
          <div className="text-start mb-8">
            <h2 className="font-semibold border-l-4 border-red-600 pl-2 mb-2">Bài viết mới</h2>
            <div className="flex flex-col gap-2 pl-2">
              {dataFake.map((blog) => (
                <Link key={blog.articleId} href={`/news/${blog.slug}`}>
                  <h4 className="hover:text-red-600 text-blue-400 transition-colors">
                    {blog.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {categoriesFake.length > 0 && (
          <div className="text-start mb-8">
            <h2 className="font-semibold border-l-4 border-red-600 pl-2 mb-2">Danh mục bài viết</h2>
            <div className="flex flex-col gap-2 pl-2">
              {categoriesFake.map((category) => (
                <Link key={category.id} href={`/news/${category.slug}`}>
                  <h4 className="hover:text-red-600 text-blue-400 transition-colors">
                    {category.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedCategory === 0 ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setSelectedCategory(0)}
          >
            Tất cả
          </Button>
          {categories.map(({ id, name }) => (
            <Button
              key={id}
              variant={selectedCategory === id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory(id)}
            >
              {name}
            </Button>
          ))}
        </div> */}
      </div>
    </div>
  );
}
