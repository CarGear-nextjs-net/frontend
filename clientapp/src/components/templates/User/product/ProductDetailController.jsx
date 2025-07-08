"use client";

import DropdownCategory from "@/components/templates/User/categories/DropdownCategory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCategories } from "@/lib/api";
import { formatPrice } from "@/utils/format";
import RichTextViewer from "@/utils/RichTextViewer";
import {
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Mail,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import RelatedProducts from "./ProductRelates";
import { addToCartApi } from "@/lib/apis/cart-api";
import { useUserProfileStore } from "@/stores";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useOrder } from "@/context/OrderContext";

/**
 * ProductDetail Component
 *
 * Displays a comprehensive product detail page with:
 * - Image gallery with thumbnails
 * - Product information (name, price, ratings)
 * - Quantity selector
 * - Add to cart functionality
 * - Tabbed content (description, specifications, reviews)
 *
 * @param {Object} data - The data object containing product and related information
 */
export default function ProductDetailController({ data }) {
  // ==========================================
  // State Management
  // ==========================================
  const product = data.product;
  const productRelates = data.productRelates;
  const recommendedProducts = data.recommendedProducts;
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product.images.find((i) => i.isMain));
  const [showModal, setShowModal] = useState(false);
  const thumbnailContainerRef = useRef(null);
  const isCategoryRed = useRef(null);
  const { setOpen } = useAuth();
  const { setProducts, setOpen: setOpenOrder } = useOrder();
  const { userStore } = useUserProfileStore();
  const router = useRouter();
  // ==========================================
  // Event Handlers
  // ==========================================

  /**
   * Decreases the product quantity (minimum: 1)
   */
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  /**
   * Increases the product quantity (maximum: product.quantity)
   */
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  /**
   * Changes the selected image when a thumbnail is clicked
   * @param {number} index - The index of the selected image
   */
  const handleImageChange = (index) => {
    const img = product.images[index];
    setSelectedImage(img);
  };

  /**
   * Opens the image modal when the main image is clicked
   */
  const handleImageClick = () => {
    setShowModal(true);
  };

  /**
   * Scrolls the thumbnail container left or right
   * @param {string} direction - The scroll direction ("left" or "right")
   */
  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 80; // Width of thumbnail + margin
      if (direction === "left") {
        thumbnailContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        thumbnailContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  /**
   * Load categories
   */
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchCategories();
      setCategories(res);
    };
    if (!isCategoryRed.current) {
      fetchData();
      isCategoryRed.current = true;
    }
  });

  const policies = [
    {
      icon: Clock,
      title: "Giao hàng nhanh",
      description: "Nhận hàng trong 24h",
    },
    {
      icon: Heart,
      title: "Bảo hành 12 tháng",
      description: "Đổi trả miễn phí",
    },
    {
      icon: CheckCircle,
      title: "Chất lượng đảm bảo",
      description: "Đạt chuẩn an toàn",
    },
    {
      icon: Mail,
      title: "Hỗ trợ 24/7",
      description: "Luôn sẵn sàng giúp đỡ",
    },
  ];

  async function handleAddToCart() {
    const res = await addToCartApi(
      [
        {
          productId: product?.id,
          quantity: quantity,
          price: product?.price,
          productName: product?.name,
          productPrice: product?.price * quantity,
        },
      ],
      userStore?.customerId
    );
    if (res.status === 200) {
      await fetch(`/api/cart/sync?userID=${userStore?.customerId}`);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    } else {
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại");
    }
  }

  return (
    <div className="container-fluid px-4 mx-auto ">
      {/* Main content grid - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-5">
        {/* Main product content - Takes full width on mobile, 3/4 on desktop */}
        <div className="col-span-1 lg:col-span-3">
          {/* Product images and info - Stack on mobile, side by side on tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="relative flex justify-center mb-4">
                <div
                  className="relative w-full h-[300px] border-1 md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Image
                    src={`/api/images/${selectedImage.url}` || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Thumbnail Slider */}
              <div className="relative">
                {/* Left Scroll Button */}
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-1 shadow-md bg-white"
                  onClick={() => scrollThumbnails("left")}
                  aria-label="Scroll thumbnails left"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-950" />
                </button>

                {/* Thumbnails Container */}
                <div
                  ref={thumbnailContainerRef}
                  className="flex overflow-x-auto mx-8 py-2 scrollbar-hide scroll-smooth"
                  style={{
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                  }}
                >
                  {product.images.map(({ id, url, isMain }, index) => (
                    <div
                      key={id}
                      className={`flex-shrink-0 mx-1 cursor-pointer border-2 ${
                        id === selectedImage.id ? "border-red-300" : "border-transparent"
                      }`}
                      onClick={() => handleImageChange(index)}
                      style={{ width: "60px", height: "60px" }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={`/api/images/${url}` || "/placeholder.svg?height=70&width=70"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Scroll Button */}
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md"
                  onClick={() => scrollThumbnails("right")}
                  aria-label="Scroll thumbnails right"
                >
                  <ChevronRight className="w-4 h-4 text-gray-950" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Product Title */}
              <h1 className="text-xl md:text-2xl text-gray-950 font-bold mb-2">{product.name}</h1>

              {/* Ratings and Availability */}
              <div className="flex flex-wrap items-center mb-3 gap-2">
                <div className="flex mr-2">
                  {/* Star Ratings */}
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rate)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  {product.rate} ({product.review} đánh giá){" "}
                </span>
                <span className="hidden md:inline mx-2 text-gray-300">|</span>
                <span className="text-green-600 flex items-center">
                  <Check className="w-4 h-4 mr-1" /> Còn hàng{" "}
                </span>
              </div>

              {/* Price Information */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center">
                  <span className="text-xl md:text-2xl font-bold text-red-600 mr-3">
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

              {/* Quantity Selection */}
              <div className="mb-4 md:mb-6 text-gray-950">
                <h3 className="font-semibold mb-2">Số lượng:</h3>
                <div className="flex items-center">
                  <button
                    className="border cursor-pointer border-gray-300 rounded-l-md px-3 py-2 hover:bg-gray-100 h-10"
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <input
                    type="number"
                    min="1"
                    // readOnly={true}
                    // max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                    className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
                    aria-label="Product quantity"
                  />

                  <button
                    className="border cursor-pointer border-gray-300 rounded-r-md px-3 py-2 hover:bg-gray-100 h-10"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mb-4 md:mb-6">
                <button
                  className="w-full cursor-pointer px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md flex items-center justify-center transition-colors"
                  aria-label="Add to cart"
                  onClick={() => handleAddToCart()}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Thêm vào giỏ hàng
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policies.map((policy) => (
                  <div
                    key={policy.title}
                    className="flex flex items-center gap-4 border-2 border-gray-200 rounded-lg py-2 px-4 shadow-md cursor-pointer"
                  >
                    <div className="bg-red-600 rounded-full p-2">
                      <policy.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="font-semibold text-red-600 text-lg">{policy.title}</h3>
                      <p className="text-sm text-red-600">{policy.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="description" className="mt-6 flex-grow">
              <TabsList className="w-full h-auto border-b rounded-none bg-transparent border-gray-200 p-0 justify-start overflow-x-auto">
              <TabsTrigger
                  value="attributes"
                  className="py-2 md:py-3 px-3 md:px-4 font-medium text-xs md:text-sm whitespace-nowrap rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:text-red-600 data-[state=active]:shadow-none text-gray-500 hover:text-gray-700"
                >
                  Thông số kỹ thuật
                </TabsTrigger>
                <TabsTrigger
                  value="description"
                  className="py-2 md:py-3 px-3 md:px-4 font-medium text-xs md:text-sm whitespace-nowrap rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:text-red-600 data-[state=active]:shadow-none text-gray-500 hover:text-gray-700"
                >
                  Mô tả sản phẩm
                </TabsTrigger>
               
                <TabsTrigger
                  value="reviews"
                  className="py-2 md:py-3 px-3 md:px-4 font-medium text-xs md:text-sm whitespace-nowrap rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:text-red-600 data-[state=active]:shadow-none text-gray-500 hover:text-gray-700"
                >
                  Đánh giá ({product.review})
                </TabsTrigger>
              </TabsList>

              <div className="py-4 max-h-[400px] md:max-h-none overflow-y-auto">
                <TabsContent value="description" className="m-0 p-0">
                  <RichTextViewer content={product.description} limit={false} />
                </TabsContent>

                <TabsContent value="attributes" className="m-0 p-0">
                  <div className="p-2">
                    <ul className="divide-y divide-gray-200">
                      {product.attributes.map(({ name, value }, index) => (
                        <li key={index} className="flex justify-between items-center py-3">
                          <span className="font-medium text-gray-500">{name}</span>
                          <span className="text-gray-900">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="m-0 p-0">
                  <div className="p-2">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      {/* Review Summary */}
                      <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                        <div className="text-center">
                          <h2 className="text-3xl font-bold">{product.rating}</h2>
                          <div className="flex my-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-500 text-sm">{product.review} đánh giá</p>
                        </div>
                      </div>

                      {/* Review List */}
                      <div>
                        <h3 className="text-base font-semibold mb-3">Đánh giá của khách hàng</h3>

                        {product.reviews && product.reviews.length > 0 ? (
                          <div className="space-y-4">
                            {product.reviews.map((review, index) => (
                              <div
                                key={index}
                                className={`${
                                  index < product.reviews.length - 1
                                    ? "border-b border-gray-200 pb-4"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between mb-1">
                                  <h4 className="font-semibold text-sm">{review.name}</h4>
                                  <span className="text-gray-500 text-xs">{review.date}</span>
                                </div>
                                <div className="flex mb-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-gray-700 text-sm">{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            Chưa có đánh giá nào cho sản phẩm này.
                          </p>
                        )}

                        {product.reviews && product.reviews.length > 0 && (
                          <button className="mt-4 px-3 py-1 text-sm border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                            Xem tất cả đánh giá
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Related Products - Full width on mobile */}

          <div className="mb-8">
            {recommendedProducts.length > 0 && (
              <RelatedProducts products={recommendedProducts} title={"CÓ THỂ BẠN THÍCH..."} />
            )}
          </div>

          {/* Mobile Recommended Products - Only visible on mobile */}
          <div className="lg:hidden mb-8">
            <div className="border-2 border-red-200 p-2 rounded-md">
              <h3 className="text-lg bg-red-500 font-semibold text-center items-center mb-4 text-white">
                Gợi ý từ cửa hàng
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedProducts.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-gray-100">
                    <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <h4
                        className="font-medium text-sm line-clamp-2 cursor-pointer hover:text-red-600"
                        onClick={() => router.push(`/${item.slug}`)}
                      >
                        {item.name}
                      </h4>
                      <div>
                        <div className="flex items-center">
                          <span className="text-red-600 font-semibold text-sm">
                            {formatPrice(item.price)}
                          </span>
                          {item.oldPrice && (
                            <span className="text-gray-500 text-xs line-through ml-2">
                              {formatPrice(item.oldPrice)}
                            </span>
                          )}
                        </div>
                        <button className="text-xs text-red-600 hover:text-red-700 flex items-center mt-1">
                          <ShoppingBag className="w-3 h-3 mr-1" />
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Categories - Only visible on mobile */}
          <div className="lg:hidden mb-8">
            <div className="border-2 border-red-200 p-2 rounded-md">
              <h3 className="text-lg bg-red-500 font-semibold text-center items-center mb-4 text-white">
                Danh mục sản phẩm
              </h3>
              <div className="space-y-2">
                {categories.map((cate, index) => (
                  <DropdownCategory key={index} category={cate} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden col-span-1">
          <div className="border-2 border-red-200 p-2 rounded-md sticky top-4">
            {/* Recommended Products */}
            <div className="space-y-4 mb-6">
              {/* <h3 className="text-lg bg-red-500 font-semibold text-center items-center mb-4 text-white">
                Gợi ý từ cửa hàng
              </h3>
              <div className="space-y-4">
                {recommendedProducts.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-4 pb-4 border-b border-gray-100 items-start"
                  >
                    <div className="relative h-24 w-24 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=96&width=96"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <h4 className="font-medium text-sm line-clamp-2 cursor-pointer hover:text-red-600" onClick={() => router.push(`/${item.slug}`)}>{item.name}</h4>
                      <div className="flex items-center">
                        <span className="text-red-600 font-semibold">
                          {formatPrice(item.price)}
                        </span>
                        {item.oldPrice && (
                          <span className="text-gray-500 text-xs line-through ml-2">
                            {formatPrice(item.oldPrice)}
                          </span>
                        )}
                      </div>
                      <button className="text-sm cursor-pointer text-red-600 hover:text-red-700 flex items-center mt-2" onClick={() => {
                      if (userStore?.id) {
                        setProducts(item);
                        setOpenOrder(true);
                      } else {
                        setOpen(true);
                      }
                    }}>
                        <ShoppingBag className="w-3 h-3 mr-1" />
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                ))} */}

              {/* {recommendedProducts.length === 0 && (
                  <div className="text-gray-500 text-sm">Không có sản phẩm gợi ý.</div>
                )} */}
              {/* </div> */}
            </div>

            {/* Categories */}
            {/* <div className="space-y-4">
              <h3 className="text-lg bg-red-500 font-semibold text-center items-center mb-4 text-white">
                Danh mục sản phẩm
              </h3>
              <div className="space-y-4">
                {categories.map((cate, index) => (
                  <DropdownCategory key={index} category={cate} />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Image Modal (Lightbox) */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Product image lightbox"
        >
          <div className="relative max-w-4xl max-h-screen">
            <button
              className="absolute top-2 right-2 bg-white text-gray-950 rounded-full p-2 shadow-md z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="bg-white p-2 rounded">
              <Image
                src={`/api/images/${selectedImage.url}` || "/placeholder.svg"}
                alt={product.name}
                width={800}
                height={800}
                className="object-contain max-h-[80vh] max-w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
