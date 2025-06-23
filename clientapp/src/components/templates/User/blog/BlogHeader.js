import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BlogHeader(props) {
    const categories = props.categories ||[]
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Bài Viết Của Chúng Tôi</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Khám phá những bài viết mới nhất và hữu ích nhất về các chủ đề công nghệ, kinh doanh, và cuộc sống.
                </p>
            </div>

            <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input type="text" placeholder="Tìm kiếm bài viết..." className="pl-10 pr-4 py-2 w-full" />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                <Button  variant="outline" className="rounded-full">
                    Tất cả
                </Button>
                {categories.length >0 && categories.map((category, index) => (
                    <div key={index}>
                        <Button  variant="outline" className="rounded-full">
                            {category.name}
                        </Button>
                    </div>
                ))}

            </div>
        </div>
    )
}
