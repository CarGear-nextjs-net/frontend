'use client'
import Image from "next/image"
import Link from "next/link"
import { Calendar } from 'lucide-react'

export default function RelatedArticles({ articles }) {
    return (
        <div className="space-y-4">
            {articles.map((article) => (
                <div key={article.id} className="flex gap-3 pb-4 border-b">
                    <div className="flex-shrink-0 w-20 h-20 relative rounded overflow-hidden">
                        <Image
                            src={article.featuredImage.url || "/placeholder.svg"}
                            alt={article.featuredImage.alt}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-2 mb-1">
                            <Link href={`/news/${article.slug}`} className="hover:text-red-600">
                                {article.title}
                            </Link>
                        </h3>
                        <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <time dateTime={article.publishedAt}>
                                {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
                            </time>
                            <span className="mx-1">•</span>
                            <Link href={`/category/${article.category.slug}`} className="hover:text-red-600">
                                {article.category.name}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
