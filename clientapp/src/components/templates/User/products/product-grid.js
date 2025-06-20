'use client'
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice} from "@/utils/format";

export default function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                    <div className="relative">
                        <Link href={`/products/${product.slug}`} className="block">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={product.image || "/placeholder.svg?height=192&width=256"}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </Link>

                        {product.discount > 0 && <Badge className="absolute top-2 right-2 bg-red-600">-{product.discount}%</Badge>}

                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 left-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="p-4">
                        <Link href={`/products/${product.slug}`} className="block">
                            <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10 group-hover:text-red-600 transition-colors">
                                {product.name}
                            </h3>
                        </Link>

                        <div className="flex items-baseline mb-2">
                            <span className="text-red-600 font-bold mr-2">{formatPrice(product.price)}</span>
                            {product.oldPrice && (
                                <span className="text-gray-400 text-xs line-through">{formatPrice(product.oldPrice)}</span>
                            )}
                        </div>

                        {product.brand && (
                            <div className="text-xs text-gray-500 mb-3">
                                Thương hiệu: <span className="font-medium">{product.brand.name}</span>
                            </div>
                        )}

                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Thêm vào giỏ
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
