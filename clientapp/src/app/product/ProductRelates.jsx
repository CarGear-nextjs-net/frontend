'use client'
import {useState} from "react";
import Link from "next/link";
import {ChevronRight, Eye, Star ,ShoppingCart} from "lucide-react";
import Image from "next/image";
import {formatPrice} from "@/utils/format";

export default function ProductRelate({ products = [] }) {
    const scrollbarHiddenStyles = `
    .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`
    const [hoveredProduct, setHoveredProduct] = useState(null)
    const [wishlist, setWishlist] = useState([])

    const toggleWishlist = (productId) => {
        if (wishlist.includes(productId)) {
            setWishlist(wishlist.filter(id => id !== productId))
        } else {
            setWishlist([...wishlist, productId])
        }
    }
    if(products.length === 0){
        return null
    }
    return (
        <div className="py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-50">
            <style jsx>{scrollbarHiddenStyles}</style>
            <div className="container mx-auto">
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="w-1 h-8 bg-red-600 mr-3"></div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Sản phẩm liên quan</h2>
                            </div>
                        </div>
                        <Link
                            href={`/danh-muc`}
                            className="hidden md:flex items-center text-red-600 hover:text-red-700 font-medium"
                        >
                            Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>

                    {/* Products - Horizontal scroll on mobile */}
                    <div className="overflow-x-auto pb-4 hide-scrollbar">
                        <div className="flex space-x-4 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 md:space-x-0">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl min-w-[240px] md:min-w-0"
                                    onMouseEnter={() => setHoveredProduct(product.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                >

                                    {/* Product image with hover effect */}
                                    <div className="relative h-48 group">
                                        <Image
                                            src={product.image || "/placeholder.svg?height=192&width=320"}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Link href={`/product/${product.slug}`}>
                                                    <button className="bg-white text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product info */}
                                    <div className="p-4">
                                        <div className="flex items-center mb-1">
                                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                        {product.brand}
                                                    </span>
                                            <span className="text-xs text-gray-500 ml-2">{product.category}</span>
                                        </div>
                                        <Link href={`/san-pham/${product.slug}`}>
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14 hover:text-red-600 transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center mb-2">
                                            <div className="flex items-center mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${i < Math.floor(product.review || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-600">
                                                        {product.review || 0}
                                                    </span>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-lg font-bold text-red-600">{formatPrice(product.price)}</span>
                                        </div>
                                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center">
                                            <ShoppingCart className="h-4 w-4 mr-1" />
                                            Thêm vào giỏ
                                        </button>
                                    </div>

                                    {/* Color options */}
                                    {product.colors && product.colors.length > 1 && (
                                        <div className="absolute bottom-[72px] right-3 flex flex-col items-end space-y-1">
                                            {product.colors.slice(1, 4).map((color) => (
                                                <div
                                                    key={color.id}
                                                    className="w-4 h-4 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: color.colorCode || '#ffffff' }}
                                                    title={color.color}
                                                ></div>
                                            ))}
                                            {product.colors.length > 4 && (
                                                <div className="text-xs text-gray-500">+{product.colors.length - 4}</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
