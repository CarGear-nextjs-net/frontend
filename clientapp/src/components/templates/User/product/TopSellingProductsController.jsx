"use client";

import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";
import { useUserProfileStore } from "@/stores";
import { formatPrice } from "@/utils/format";
import { Award, ChevronRight, Eye, ShoppingCart, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TopSellingProductsController(props) {
  const products = props.products || [];
  const { setOpen } = useAuth();
  const { userStore } = useUserProfileStore();
  const { setProducts, setOpen: setOpenOrder } = useOrder();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const router = useRouter();
  return (
    products.length > 0 && (
      <div className={`w-[1275px] mx-auto py-6 px-4 bg-gray-50 `}>
        <div className="container  ">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-red-600 mr-3"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                TOP sản phẩm đang được giảm giá nhiều nhất
              </h2>
            </div>
            {/* <Link
            href="#"
            className="hidden md:flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
          </Link> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 cursor-pointer ">
            <div
              className="relative overflow-hidden bg-white rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              onMouseEnter={() => setHoveredProduct(products?.[0]?.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md flex items-center">
                <Award className="h-5 w-5 mr-1" />
                <span>TOP 1</span>
              </div>
              {!!products?.[0]?.originalPrice && (
                <div className="absolute top-4 right-4 z-10 bg-red-500 text-white font-medium py-1 px-3 rounded-full text-sm">
                  -
                  {Math.round(
                    ((products?.[0]?.originalPrice - products?.[0]?.price) /
                      products?.[0]?.originalPrice) *
                      100
                  )}
                  %
                </div>
              )}
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-1/2 h-64 md:h-auto group">
                  <Image
                    src={
                      products?.[0]?.images.length > 0
                        ? `/api/images/${products?.[0]?.images[0].url}`
                        : "/placeholder.svg"
                    }
                    alt={products?.[0]?.name || "product"}
                    fill
                    className="object-cover"
                  />
                  <Link href={`/${products?.[0]?.slug}`}>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      {/* Nút xem chi tiết */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                        <button className="bg-white text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <Link href={`/${products?.[0]?.slug}`}>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {products?.[0]?.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(products?.[0]?.rate) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {products?.[0]?.rate} ({products?.[0]?.review} đánh giá)
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-sm text-gray-600">
                        Đã bán {products?.[0]?.sold} sản phẩm
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-4">
                      <span className="text-2xl font-bold text-red-600 mr-2">
                        {formatPrice(products?.[0]?.price)}
                      </span>
                      {!!products?.[0]?.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(products?.[0]?.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        if (userStore?.id) {
                          setProducts(products?.[0]);
                          setOpenOrder(true);
                        } else {
                          setOpen(true);
                        }
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Top 2-3 Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {products.slice(1, 3).map((product) => (
                <div
                  key={product.id}
                  className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="absolute top-3 left-3 z-10 bg-red-600 text-white font-bold py-1 px-3 rounded-full shadow-md flex items-center">
                    <span>TOP {product.rank}</span>
                  </div>
                  {!!product?.originalPrice && (
                    <div className="absolute top-3 right-3 z-10 bg-red-500 text-white font-medium py-1 px-2 rounded-full text-xs">
                      -
                      {Math.round(
                        ((product?.originalPrice - product?.price) / product?.originalPrice) * 100
                      )}
                      %
                    </div>
                  )}
                  <div className="relative h-48 group cursor-pointer overflow-hidden">
                    {/* Ảnh */}
                    <Image
                      src={product.images.length > 0 ? `/api/images/${product.images[0].url}` : "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Link href={`/${product.slug}`}>
                      {/* Lớp phủ nền mờ */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        {/* Nút xem chi tiết */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                          <button className="bg-white text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="p-4">
                    <Link href={`/${product.slug}`}>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rate) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">{product.rate}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-red-600">
                        {formatPrice(product.price)}
                      </span>
                      {!!product?.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        if (userStore?.id) {
                          setProducts(product);
                          setOpenOrder(true);
                        } else {
                          setOpen(true);
                        }
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          

          {/* Mobile View All Link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/san-pham-ban-chay"
              className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              Xem tất cả sản phẩm bán chạy <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
