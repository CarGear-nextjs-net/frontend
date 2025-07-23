"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./product-card";

export default function ProductByCategoryController({ title = "Category", products=[] }) {
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
        <div className="w-[1275px] mx-auto py-6 px-4 bg-white shadow-md rounded-md mt-6">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center justify-between">
                    <div className="w-1 h-8 bg-red-600 mr-3"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
                </div>
                <Link
                    href="#"
                    className="hidden md:flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                    Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
            </div>
            <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 w-10 h-10 rounded-full bg-red-400 text-white flex items-center justify-center shadow-md transition-opacity duration-300 ${
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
                        <ProductCard key={index} width={itemWidth} product={product} className={'flex-shrink-0 '} />
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer z-10 w-10 h-10 rounded-full bg-red-400 text-white flex items-center justify-center shadow-md transition-opacity duration-300 ${
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
