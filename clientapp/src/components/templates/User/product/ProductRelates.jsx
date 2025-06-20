"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { formatPrice } from "@/utils/format"

export default function RelatedProducts({ title = "CÓ THỂ BẠN THÍCH...", products }) {
    const containerRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [isHovering, setIsHovering] = useState(false)
    const [itemWidth, setItemWidth] = useState(280) // default width

    const updateItemWidth = () => {
        const container = containerRef.current
        if (container) {
            const width = container.clientWidth
            let itemsPerRow = 4
            if (width < 1024) itemsPerRow = 3
            if (width < 768) itemsPerRow = 2

            const gap = 16 // 1rem gap
            const totalGap = gap * (itemsPerRow - 1)
            const calculatedWidth = Math.floor((width - totalGap) / itemsPerRow)

            setItemWidth(calculatedWidth)
        }
    }

    const checkScrollability = () => {
        const container = containerRef.current
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0)
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
        }
    }

    const scroll = (direction) => {
        const container = containerRef.current
        if (container) {
            const scrollAmount = container.clientWidth * 0.8
            if (direction === "left") {
                container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            } else {
                container.scrollBy({ left: scrollAmount, behavior: "smooth" })
            }
        }
    }

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            updateItemWidth()
            checkScrollability()
            container.addEventListener("scroll", checkScrollability)

            const resizeObserver = new ResizeObserver(() => {
                updateItemWidth()
                checkScrollability()
            })

            resizeObserver.observe(container)

            return () => {
                container.removeEventListener("scroll", checkScrollability)
                resizeObserver.disconnect()
            }
        }
    }, [])

    return (
        <div className="w-full py-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <div className="h-px bg-gray-200 w-full"></div>
            </div>

            <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-red-400 text-white flex items-center justify-center shadow-md transition-opacity duration-300 ${
                        !canScrollLeft ? "cursor-not-allowed" : "hover:bg-red-500"
                    } ${isHovering ? "opacity-100" : "opacity-0"}`}
                    disabled={!canScrollLeft}
                >
                    <ChevronLeft className={`w-6 h-6 ${!canScrollLeft ? "opacity-50" : ""}`} />
                </button>

                <div
                    ref={containerRef}
                    className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((product,index) => (
                        <div
                            key={index}
                            style={{ width: `${itemWidth}px` }}
                            className="flex-shrink-0 border border-gray-200 rounded-md overflow-hidden bg-white"
                        >
                            <Link href={`/${product.slug}`} className="block">
                                <div className="relative h-[200px] w-full bg-gray-100">
                                    <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name || product.title || "Product"}
                                        fill
                                        className="object-cover"
                                    />
                                    {product.label && (
                                        <div
                                            className={`absolute top-3 right-3 w-14 h-14 rounded-full flex items-center justify-center text-white font-medium ${
                                                product.label === "HOT" || product.label === "New" ? "bg-yellow-400" : "bg-red-500"
                                            }`}
                                        >
                                            {product.label}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-center font-medium text-sm mb-3 min-h-[40px] line-clamp-2">
                                        {product.name || product.title || "Product Name"}
                                    </h3>
                                    <div className="flex justify-center items-center gap-2 flex-wrap">
                                        {product.price && (
                                            <span className="text-gray-500 line-through text-sm">{formatPrice(product.price)}</span>
                                        )}
                                        {product.discountPrice ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-600 font-bold">{formatPrice(product.discountPrice)}</span>
                                                <span className="text-gray-700">–</span>
                                                <span className="text-red-600 font-bold">{formatPrice(product.currentPrice)}</span>
                                            </div>
                                        ) : (
                                            <span className="text-red-600 font-bold">{formatPrice(product.price)}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-red-400 text-white flex items-center justify-center shadow-md transition-opacity duration-300 ${
                        !canScrollRight ? "cursor-not-allowed" : "hover:bg-red-500"
                    } ${isHovering ? "opacity-100" : "opacity-0"}`}
                    disabled={!canScrollRight}
                >
                    <ChevronRight className={`w-6 h-6 ${!canScrollRight ? "opacity-50" : ""}`} />
                </button>
            </div>
        </div>
    )
}
