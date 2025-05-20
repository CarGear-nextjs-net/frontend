import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function BlogSidebar({ categories, popularPosts, tags }) {
    return (
        <div className="space-y-8">
            {/* Tìm kiếm */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">Tìm Kiếm</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Bài viết phổ biến */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">Bài Viết Phổ Biến</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {popularPosts.map((post) => (
                        <div key={post.id} className="flex space-x-3">
                            <div className="relative h-16 w-16 flex-shrink-0">
                                <Image
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1">
                                <Link href={`/bai-viet/${post.slug}`}>
                                    <h3 className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                </Link>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Danh mục */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">Danh Mục</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.id} className="flex justify-between items-center">
                                <Link href={`/danh-muc/${category.id}`} className="text-gray-700 hover:text-red-600 transition-colors">
                                    {category.name}
                                </Link>
                                <span className="text-sm text-gray-500">({category.count})</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Tags */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">Thẻ</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Link key={tag.id} href={`/tag/${tag.id}`}>
                                <Badge
                                    variant="outline"
                                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors"
                                >
                                    {tag.name}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
