'use client'
import { useState, useEffect, useRef } from "react"
import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus, Check, ShoppingBag, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import {formatPrice} from "@/utils/format";
import RichTextViewer from "@/utils/RichTextViewer";

export default function ProductDetail({ product }) {
    'use client'
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState(0)
    const [activeTab, setActiveTab] = useState("description")
    const [showModal, setShowModal] = useState(false)
    const thumbnailContainerRef = useRef(null)

    // Set default selected color when product loads
    useEffect(() => {
        if (product && product.colors && product.colors.length > 0) {
            setSelectedColor(product.colors[0].id)
        }
    }, [product])

    // Handle quantity change
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        if (quantity < product.quantity) {
            setQuantity(quantity + 1)
        }
    }

    // Handle color change
    const handleColorChange = (id) => {
        setSelectedColor(id)
    }

    // Handle image click to open modal
    const handleImageClick = () => {
        setShowModal(true)
    }

    // Scroll thumbnails
    const scrollThumbnails = (direction) => {
        if (thumbnailContainerRef.current) {
            const scrollAmount = 80 // Width of thumbnail + margin
            if (direction === "left") {
                thumbnailContainerRef.current.scrollLeft -= scrollAmount
            } else {
                thumbnailContainerRef.current.scrollLeft += scrollAmount
            }
        }
    }

    // Get current selected image
    const selectedImage = product.colors.find(c => c.id === selectedColor)?.imageUrl || "/placeholder.svg"

    return (
        <div className="container mx-auto ">
            <div className="  px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Product Images */}
                    <div>
                        <div className="relative flex justify-center mb-4">
                            <div
                                className="relative w-full h-[500px] rounded-lg overflow-hidden cursor-pointer"
                                onClick={handleImageClick}
                            >
                                <Image
                                    src={selectedImage || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                                {product.discount > 0 && (
                                    <div className="absolute top-0 left-0 w-full  text-white text-center py-2 text-sm font-semibold">
                                        -{product.discount}%
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail Slider */}
                        <div className="relative">
                            <button
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10  rounded-full p-1 shadow-md"
                                onClick={() => scrollThumbnails("left")}
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-950" />
                            </button>
                            <div
                                ref={thumbnailContainerRef}
                                className="flex overflow-x-auto mx-8 py-2 scrollbar-hide scroll-smooth"
                                style={{
                                    msOverflowStyle: "none",
                                    scrollbarWidth: "none"
                                }}
                            >
                                {product.colors.map(({id, imageUrl}) => (
                                    <div
                                        key={id}
                                        className={`flex-shrink-0 mx-1 cursor-pointer ${
                                            selectedColor === id
                                                ? "border-2 border-red-600"
                                                : "border border-gray-200"
                                        }`}
                                        style={{ width: "70px", height: "70px" }}
                                        onClick={() => handleColorChange(id)}
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={imageUrl || "/placeholder.svg"}
                                                alt={`Thumbnail ${id + 1}`}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md"
                                onClick={() => scrollThumbnails("right")}
                            >
                                <ChevronRight className="w-4 h-4 text-gray-950" />
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-2xl text-gray-950 font-bold mb-2">{product.name}</h1>

                        <div className="flex items-center mb-3">
                            <div className="flex mr-3">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-gray-500">{product.rating} ({product.review} đánh giá)</span>
                            <span className="mx-3 text-gray-300">|</span>
                            <span className="text-green-600 flex items-center">
                                <Check className="w-4 h-4 mr-1" /> Còn hàng
                            </span>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-red-600 mr-3">
                                    {formatPrice(product.price)}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-gray-500 line-through">
                                        {formatPrice(product.oldPrice)}
                                    </span>
                                )}
                            </div>
                            <div className="text-gray-500 text-sm">
                                Mã sản phẩm: <span className="font-medium">{product.sku}</span>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-700">
                                Màu sắc: <span className="font-medium">{product.colors.find(color => color.id === selectedColor)?.color}</span>
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {product.colors.filter(color => color.id > 0).map(({color, colorCode, id}) => (
                                    <div key={id} className="flex flex-col items-center">
                                        <button
                                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 relative ${
                                                selectedColor === id
                                                    ? "ring-2 ring-offset-2 ring-red-600"
                                                    : "ring-1 ring-gray-300"
                                            }`}
                                            style={{ backgroundColor: colorCode }}
                                            onClick={() => handleColorChange(id)}
                                        >
                                            {selectedColor === id && <Check className="w-5 h-5 text-white" />}
                                        </button>
                                        <span className="text-xs text-center">{color}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selection */}
                        <div className="mb-6 text-gray-950">
                            <h3 className="font-semibold mb-2">Số lượng:</h3>
                            <div className="flex items-center ">
                                <button
                                    className="border border-gray-300 rounded-l-md px-3 py-2 hover:bg-gray-100 h-10"
                                    onClick={decreaseQuantity}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>

                                <input
                                    type="number"
                                    min="1"
                                    readOnly={true}
                                    max={product.quantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="w-16 h-10 border-t border-b border-gray-300 text-center  focus:outline-none"
                                />

                                <button
                                    className="border border-gray-300 rounded-r-md px-3 py-2 hover:bg-gray-100 h-10"
                                    onClick={increaseQuantity}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                        </div>

                        {/* Add to Cart Button */}
                        <div className="mb-6">
                            <button className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md flex items-center justify-center transition-colors">
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        {/* Shipping & Warranty Info */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex mb-4">
                                <Truck className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold mb-1">Giao hàng miễn phí</h4>
                                    <p className="text-gray-500 text-sm">Cho đơn hàng từ 500.000đ trong nội thành</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <ShieldCheck className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold mb-1">Bảo hành 12 tháng</h4>
                                    <p className="text-gray-500 text-sm">Sản phẩm chính hãng, an toàn cho bé</p>
                                </div>
                            </div>
                            <div className="flex">
                                <RotateCcw className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold mb-1">Đổi trả trong 30 ngày</h4>
                                    <p className="text-gray-500 text-sm">Nếu sản phẩm có lỗi từ nhà sản xuất</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mb-12">
                    <div className="border-b border-gray-200">
                        <nav className="flex overflow-x-auto scrollbar-hide">
                            <button
                                className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                                    activeTab === "description"
                                        ? "border-b-2 border-red-600 text-red-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setActiveTab("description")}
                            >
                                Mô tả sản phẩm
                            </button>
                            <button
                                className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                                    activeTab === "specifications"
                                        ? "border-b-2 border-red-600 text-red-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setActiveTab("specifications")}
                            >
                                Thông số kỹ thuật
                            </button>
                            <button
                                className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                                    activeTab === "reviews"
                                        ? "border-b-2 border-red-600 text-red-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setActiveTab("reviews")}
                            >
                                Đánh giá ({product.review})
                            </button>
                        </nav>
                    </div>

                    <div className="py-6">
                        {activeTab === "description" && (
                            <RichTextViewer content={product.description} limit={true} maxHeight={200} />
                        )}

                        {activeTab === "specifications" && (
                            <div className="divide-y divide-gray-200">
                                {product.specifications && product.specifications.map((spec, index) => (
                                    <div key={index} className="flex justify-between py-3">
                                        <span className="font-medium text-gray-600">{spec.name}</span>
                                        <span className="text-gray-900">{spec.value}</span>
                                    </div>
                                ))}
                                {(!product.specifications || product.specifications.length === 0) && (
                                    <p className="text-gray-500 py-4">Không có thông số kỹ thuật cho sản phẩm này.</p>
                                )}
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                                    <div className="text-center md:border-r md:border-gray-200 p-4">
                                        <h2 className="text-5xl font-bold mb-2">{product.rating}</h2>
                                        <div className="flex justify-center my-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${
                                                        i < Math.floor(product.rating)
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-500">{product.review} đánh giá</p>
                                    </div>
                                    <div className="md:col-span-3">
                                        <h3 className="text-lg font-semibold mb-4">Đánh giá của khách hàng</h3>

                                        {product.reviews && product.reviews.length > 0 ? (
                                            <div className="space-y-6">
                                                {product.reviews.map((review, index) => (
                                                    <div key={index} className={`${index < product.reviews.length - 1 ? "border-b border-gray-200 pb-6" : ""}`}>
                                                        <div className="flex justify-between mb-2">
                                                            <h4 className="font-semibold">{review.name}</h4>
                                                            <span className="text-gray-500 text-sm">{review.date}</span>
                                                        </div>
                                                        <div className="flex mb-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${
                                                                        i < review.rating
                                                                            ? "text-yellow-400 fill-yellow-400"
                                                                            : "text-gray-300"
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="text-gray-700">{review.comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
                                        )}

                                        {product.reviews && product.reviews.length > 0 && (
                                            <button className="mt-6 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                                                Xem tất cả đánh giá
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-75" onClick={() => setShowModal(false)}>
                    <div className="relative max-w-4xl max-h-screen p-4">
                        <button
                            className="absolute top-4 right-4 bg-white text-gray-950 rounded-full p-2 shadow-md"
                            onClick={() => setShowModal(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Image
                            src={selectedImage || "/placeholder.svg"}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="object-contain max-h-[80vh]"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
