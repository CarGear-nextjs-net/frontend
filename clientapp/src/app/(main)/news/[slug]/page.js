import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Calendar, MessageSquare, ThumbsUp, Eye, ChevronLeft, ChevronRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import RelatedArticles from "@/components/news/related-articles"
import RecommendedArticles from "@/components/news/recommended-articles"
import ReadingProgressBar from "@/components/news/reading-progress-bar"

async function getArticle(slug) {
    return {
        id: "1",
        title: "Việt Nam đạt thỏa thuận hợp tác công nghệ với các đối tác quốc tế",
        subtitle: "Mở ra cơ hội phát triển mới cho ngành công nghệ trong nước",
        slug: "viet-nam-dat-thoa-thuan-hop-tac-cong-nghe",
        content: `
      <p class="lead">Trong khuôn khổ Diễn đàn Công nghệ Quốc tế 2023 diễn ra tại Hà Nội, Việt Nam đã đạt được nhiều thỏa thuận hợp tác quan trọng với các đối tác công nghệ hàng đầu thế giới.</p>
      
      <h2 id="section-1">Những thỏa thuận quan trọng</h2>
      <p>Theo thông tin từ Bộ Khoa học và Công nghệ, trong hai ngày diễn ra sự kiện, đã có tổng cộng 15 biên bản ghi nhớ (MOU) được ký kết giữa các doanh nghiệp công nghệ Việt Nam và đối tác quốc tế đến từ Mỹ, Nhật Bản, Hàn Quốc và Singapore.</p>
      <p>Các thỏa thuận tập trung vào các lĩnh vực then chốt như trí tuệ nhân tạo (AI), điện toán đám mây, an ninh mạng và công nghệ xanh - những lĩnh vực được xem là động lực tăng trưởng cho nền kinh tế số của Việt Nam trong thập kỷ tới.</p>
     
      <h2 id="section-2">Tác động đến ngành công nghệ trong nước</h2>
      <p>Các chuyên gia nhận định, những thỏa thuận này sẽ mang lại nhiều lợi ích thiết thực cho ngành công nghệ Việt Nam, bao gồm:</p>
      <ul>
        <li>Tiếp cận công nghệ tiên tiến và kinh nghiệm quản lý từ các đối tác quốc tế</li>
        <li>Cơ hội đào tạo và phát triển nguồn nhân lực chất lượng cao</li>
        <li>Mở rộng thị trường và cơ hội xuất khẩu sản phẩm, dịch vụ công nghệ</li>
        <li>Thu hút đầu tư nước ngoài vào lĩnh vực công nghệ cao</li>
      </ul>
      
      <blockquote>
        <p>"Đây là bước tiến quan trọng trong chiến lược phát triển kinh tế số của Việt Nam. Chúng tôi kỳ vọng những hợp tác này sẽ tạo ra làn sóng đổi mới sáng tạo mới trong cộng đồng công nghệ trong nước."</p>
        <cite>- Ông Nguyễn Văn A, Thứ trưởng Bộ Khoa học và Công nghệ</cite>
      </blockquote>
      
      <h2 id="section-3">Kế hoạch triển khai</h2>
      <p>Theo kế hoạch, các dự án hợp tác sẽ bắt đầu được triển khai từ quý III năm 2023, với tổng giá trị đầu tư ước tính lên đến hơn 500 triệu USD trong 5 năm tới.</p>
      <p>Bộ Khoa học và Công nghệ cũng cho biết sẽ thành lập một tổ công tác liên ngành để hỗ trợ và theo dõi quá trình thực hiện các thỏa thuận, đảm bảo các dự án được triển khai đúng tiến độ và đạt hiệu quả cao.</p>
      
      <h2 id="section-4">Triển vọng tương lai</h2>
      <p>Với những thỏa thuận hợp tác này, ngành công nghệ Việt Nam được kỳ vọng sẽ có những bước phát triển đột phá trong những năm tới, đóng góp tích cực vào mục tiêu chuyển đổi số quốc gia và phát triển kinh tế bền vững.</p>
      <p>Các doanh nghiệp công nghệ trong nước cũng sẽ có cơ hội tham gia sâu hơn vào chuỗi giá trị toàn cầu, nâng cao năng lực cạnh tranh và vị thế trên thị trường quốc tế.</p>
    `,
        publishedAt: "2023-06-15T08:30:00Z",
        updatedAt: "2023-06-15T10:15:00Z",
        readingTime: 5,
        viewCount: 1250,
        commentCount: 28,
        likeCount: 156,
        shareCount: 42,
        category: {
            id: "cat-1",
            name: "Công nghệ",
            slug: "cong-nghe",
        },
        tags: [
            { id: "tag-1", name: "Công nghệ", slug: "cong-nghe" },
            { id: "tag-2", name: "Hợp tác quốc tế", slug: "hop-tac-quoc-te" },
            { id: "tag-3", name: "Đổi mới sáng tạo", slug: "doi-moi-sang-tao" },
        ],
        featuredImage: {
            url: "/placeholder.svg?height=600&width=1200",
            alt: "Lễ ký kết thỏa thuận hợp tác công nghệ",
            caption: "Đại diện các doanh nghiệp tại lễ ký kết thỏa thuận hợp tác",
        },
        tableOfContents: [
            { id: "section-1", title: "Những thỏa thuận quan trọng", level: 1 },
            { id: "section-2", title: "Tác động đến ngành công nghệ trong nước", level: 1 },
            { id: "section-3", title: "Kế hoạch triển khai", level: 1 },
            { id: "section-4", title: "Triển vọng tương lai", level: 1 },
        ],
    }
}

// Giả lập dữ liệu bài viết liên quan
async function getRelatedArticles() {
    return [
        {
            id: "2",
            title: "Việt Nam đứng thứ 3 Đông Nam Á về đầu tư vào startup công nghệ",
            slug: "viet-nam-dung-thu-3-dong-nam-a",
            excerpt: "Theo báo cáo mới nhất, Việt Nam đã vươn lên vị trí thứ 3 trong khu vực về thu hút đầu tư cho các startup công nghệ...",
            publishedAt: "2023-06-10T09:15:00Z",
            featuredImage: {
                url: "/placeholder.svg?height=200&width=300",
                alt: "Startup Việt Nam",
            },
            category: {
                name: "Công nghệ",
                slug: "cong-nghe",
            },
        },
        {
            id: "3",
            title: "Các tập đoàn công nghệ lớn mở rộng hoạt động tại Việt Nam",
            slug: "cac-tap-doan-cong-nghe-lon-mo-rong",
            excerpt: "Nhiều tập đoàn công nghệ hàng đầu thế giới đang có kế hoạch mở rộng hoạt động và tăng cường đầu tư vào thị trường Việt Nam...",
            publishedAt: "2023-06-08T14:30:00Z",
            featuredImage: {
                url: "/placeholder.svg?height=200&width=300",
                alt: "Tập đoàn công nghệ tại Việt Nam",
            },
            category: {
                name: "Kinh doanh",
                slug: "kinh-doanh",
            },
        },
        {
            id: "4",
            title: "Chính phủ ban hành chính sách mới hỗ trợ doanh nghiệp công nghệ",
            slug: "chinh-phu-ban-hanh-chinh-sach-moi",
            excerpt: "Chính phủ vừa ban hành nghị định mới với nhiều chính sách ưu đãi nhằm thúc đẩy sự phát triển của các doanh nghiệp công nghệ trong nước...",
            publishedAt: "2023-06-05T10:45:00Z",
            featuredImage: {
                url: "/placeholder.svg?height=200&width=300",
                alt: "Chính sách hỗ trợ doanh nghiệp",
            },
            category: {
                name: "Chính sách",
                slug: "chinh-sach",
            },
        },
    ]
}

// Giả lập dữ liệu bài viết gợi ý
async function getRecommendedArticles() {
    return [
        {
            id: "5",
            title: "10 xu hướng công nghệ hàng đầu năm 2023",
            slug: "10-xu-huong-cong-nghe-hang-dau-2023",
            excerpt: "Trí tuệ nhân tạo, metaverse và blockchain tiếp tục dẫn đầu danh sách các xu hướng công nghệ được quan tâm nhất trong năm 2023...",
            publishedAt: "2023-06-12T08:00:00Z",
            featuredImage: {
                url: "/placeholder.svg?height=200&width=300",
                alt: "Xu hướng công nghệ 2023",
            },
            viewCount: 3200,
        },
        {
            id: "6",
            title: "Làm thế nào để bảo vệ dữ liệu cá nhân trong thời đại số?",
            slug: "lam-the-nao-de-bao-ve-du-lieu-ca-nhan",
            excerpt: "Với sự gia tăng của các vụ rò rỉ dữ liệu, việc bảo vệ thông tin cá nhân trở nên quan trọng hơn bao giờ hết...",
            publishedAt: "2023-06-11T11:20:00Z",
            featuredImage: {
                url: "/placeholder.svg?height=200&width=300",
                alt: "Bảo vệ dữ liệu cá nhân",
            },
            viewCount: 2800,
        },
        {
            id: "7",
            title: "Các kỹ năng công nghệ được săn đón nhất trên thị trường việc làm",
            slug: "cac-ky-nang-cong-nghe-duoc-san-don-nhat",
            excerpt: "Kỹ năng về AI, phân tích dữ liệu và phát triển cloud đang là những kỹ năng được các nhà tuyển dụng tìm kiếm nhiều nhất...",
            publishedAt: "2023-06-09T09:45:00Z",
            featuredImage: {
                url: "/placeholder.svg?height=200&width=300",
                alt: "Kỹ năng công nghệ",
            },
            viewCount: 2500,
        },
    ]
}

export default async function ArticlePage({ params }) {
    const article = await getArticle(params.slug)

    if (!article) {
        notFound()
    }

    const relatedArticles = await getRelatedArticles()
    const recommendedArticles = await getRecommendedArticles()

    // Format date
    const publishDate = new Date(article.publishedAt)
    const formattedDate = new Intl.DateTimeFormat("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(publishDate)

    return (
        <>
            <ReadingProgressBar />
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6 text-gray-500">
                    <ol className="flex items-center space-x-1">
                        <li><Link href="/" className="hover:text-red-600">Trang chủ</Link></li>
                        <li><span className="mx-1">/</span></li>
                        <li><Link href={`/category/${article.category.slug}`} className="hover:text-red-600">{article.category.name}</Link></li>
                        <li><span className="mx-1">/</span></li>
                        <li className="text-gray-700 font-medium truncate">{article.title}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <main className="lg:col-span-8">
                        {/* Article Header */}
                        <header className="mb-8">
                            <Badge variant="outline" className="mb-4 bg-red-50 text-red-600 hover:bg-red-100">
                                {article.category.name}
                            </Badge>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
                            {article.subtitle && (
                                <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
                            )}
                            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                                {/* Article Stats */}
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Eye className="h-4 w-4 mr-1" />
                                        <span>{article.viewCount}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        <span>{article.commentCount}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <ThumbsUp className="h-4 w-4 mr-1" />
                                        <span>{article.likeCount}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/*/!* Featured Image *!/*/}
                        <figure className="mb-8 relative rounded-lg overflow-hidden">
                            <Image
                                src={article.featuredImage.url || "/placeholder.svg"}
                                alt={article.featuredImage.alt}
                                width={200}
                                height={200}
                                className="w-full h-auto object-cover"
                            />
                            {article.featuredImage.caption && (
                                <figcaption className="text-sm text-gray-500 mt-2 italic">
                                    {article.featuredImage.caption}
                                </figcaption>
                            )}
                        </figure>

                        {/* Article Content */}
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* Article Body */}
                            <div className="flex-1">
                                <article className="prose prose-lg max-w-none mb-10">
                                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                                </article>

                                {/*/!* Tags *!/*/}
                                {/*<div className="flex flex-wrap gap-2 mb-8">*/}
                                {/*    {article.tags.map(tag => (*/}
                                {/*        <Link key={tag.id} href={`/tag/${tag.slug}`}>*/}
                                {/*            <Badge variant="secondary" className="hover:bg-gray-200">*/}
                                {/*                #{tag.name}*/}
                                {/*            </Badge>*/}
                                {/*        </Link>*/}
                                {/*    ))}*/}
                                {/*</div>*/}

                                {/* Article Reactions */}
                                {/*<ArticleReactions articleId={article.id} />*/}

                                {/*/!* Author Bio *!/*/}
                                {/*<div className="bg-gray-50 rounded-lg p-6 my-8">*/}
                                {/*    <div className="flex items-start sm:items-center flex-col sm:flex-row">*/}
                                {/*        <Avatar className="h-16 w-16 mr-4 mb-4 sm:mb-0">*/}
                                {/*            <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />*/}
                                {/*            <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>*/}
                                {/*        </Avatar>*/}
                                {/*        <div>*/}
                                {/*            <h3 className="font-bold text-lg">*/}
                                {/*                <Link href={`/author/${article.author.id}`} className="hover:text-red-600">*/}
                                {/*                    {article.author.name}*/}
                                {/*                </Link>*/}
                                {/*            </h3>*/}
                                {/*            <p className="text-sm text-gray-500 mb-2">{article.author.role}</p>*/}
                                {/*            <p className="text-gray-700">{article.author.bio}</p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*/!* Comments Section *!/*/}
                                {/*<section className="mt-10">*/}
                                {/*    <h2 className="text-2xl font-bold mb-6">Bình luận ({article.commentCount})</h2>*/}
                                {/*    <Suspense fallback={<div>Đang tải bình luận...</div>}>*/}
                                {/*        <ArticleComments articleId={article.id} />*/}
                                {/*    </Suspense>*/}
                                {/*</section>*/}
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 sticky top-8">
                        {/* Related & Recommended Articles */}
                        <Tabs defaultValue="related" className="w-full">
                            <TabsList className="w-full grid grid-cols-2">
                                <TabsTrigger value="related">Bài viết liên quan</TabsTrigger>
                                <TabsTrigger value="recommended">Có thể bạn quan tâm</TabsTrigger>
                            </TabsList>
                            <TabsContent value="related" className="mt-4">
                                <RelatedArticles articles={relatedArticles} />
                            </TabsContent>
                            <TabsContent value="recommended" className="mt-4">
                                <RecommendedArticles articles={recommendedArticles} />
                            </TabsContent>
                        </Tabs>
                    </aside>
                </div>

                {/* More Articles Navigation */}
                <div className="mt-12 border-t pt-8">
                    <h2 className="text-2xl font-bold mb-6">Tin tức mới nhất</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedArticles.map(article => (
                            <Card key={article.id} className="overflow-hidden">
                                <div className="relative h-48">
                                    <Image
                                        src={article.featuredImage.url || "/placeholder.svg"}
                                        alt={article.featuredImage.alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-bold mb-2 line-clamp-2">
                                        <Link href={`/news/${article.slug}`} className="hover:text-red-600">
                                            {article.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <time className="text-gray-500">
                                            {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
                                        </time>
                                        <div className="flex items-center text-gray-500">
                                            <Eye className="h-4 w-4 mr-1" />
                                            <span>{article.viewCount}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-10 flex justify-between">
                    <Button variant="outline" className="flex items-center">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Bài trước
                    </Button>
                    <Button variant="outline" className="flex items-center">
                        Bài tiếp theo
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}
