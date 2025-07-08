"use client";
import AuthModal from "@/components/organisms/AuthModal";
import CategoryMenu from "@/components/templates/User/categories/CategoryMenu";
import { Button } from "@/components/ui/button.jsx";
import { Facebook, Instagram, Mail, MapPin, Phone, Search, ShoppingCart, User2Icon, Youtube } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserProfileStore } from "@/stores";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function DesktopHeader({ categories = [], visitedUrls = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { userStore, reset } = useUserProfileStore();
  const inputRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = async () => {
    try {
      // Xóa user profile từ store (sẽ tự động xóa localStorage)
      reset();
      // Xóa accessToken nếu có
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
      // Redirect đến trang logout
      await axios.delete('/api/session');
      
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      redirect("/");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = inputRef.current.value;
    router.push(`/products?search=${searchTerm}`);
  };


  // Kiểm tra vị trí cuộn
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <header className={`w-full `}>
      <div className="flex justify-between bg-white text-black py-1 items-center px-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-1" />
            <span>support@dtctech.vn</span>
          </div>
          <div className="w-[1px] h-4 bg-gray-300"></div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-1" />
            <span>0963015160</span>
          </div>
          <div className="w-[1px] h-4 bg-gray-300"></div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Số 14, Pháo Đài Láng, Đống Đa, HN</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Facebook className="h-4 w-4 cursor-pointer" title='Theo dõi Facebook'/>
          <Instagram className="h-4 w-4 cursor-pointer" title='Theo dõi Instagram'/>
          <Youtube className="h-4 w-4 cursor-pointer" title='Theo dõi Youtube'/>
        </div>
      </div>
      {/* Main navigation  */}
      <div className="bg-red-600 text-white py-3 px-4 border-t border-red-500 sticky">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div
            className="flex items-center mb-3 md:mb-0 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-2">
              <img
                src="/logo-cargear.jpg"
                alt="Logo"
                className="object-contain text-xs rounded-3xl text-gray-600"
              />
            </div>
            <span className="text-yellow-300 text-xl font-bold">CarGear</span>
          </div>
          {isVisible && <CategoryMenu categories={categories} />}
          {visitedUrls &&
            visitedUrls.map(({ title, url }, index) => (
              <Link
                key={index}
                href={url}
                className={`px-2 py-2 whitespace-nowrap font-semibold rounded-md hover:bg-gray-100 hover:text-black ${
                  pathname === url ? "text-black border-black underline bg-gray-100" : "text-white"
                }`}
              >
                {title}
              </Link>
            ))}
          {/* Search bar */}
          <form
            className="relative flex-1 max-w-xs mx-4 w-[200px] mb-3 md:mb-0"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Bạn tìm gì..."
              className="w-full py-2 px-4 rounded-full text-black bg-white"
              ref={inputRef}
            />
            <Button
              variant={"outline-none"}
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </Button>
          </form>

          {/* Contact and account */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {userStore.id ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex gap-2 cursor-pointer">
                      <User2Icon />
                      <div>{userStore.username}</div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-[99999]">
                    <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push("/orders")}
                    >
                      Đơn hàng
                    </DropdownMenuItem>
                    {userStore.roleId === 1 && (
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/manager");
                        }}
                        className="cursor-pointer"
                      >
                        Quản lý
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="cursor-pointer">Cài đặt</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 cursor-pointer"
                    >
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <AuthModal />
              )}
            </div>
            <div className="flex items-center cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <ShoppingCart className="h-5 w-5 mr-1" />
                    <span>Giỏ hàng</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[320px] z-[99999]">
                  <CartDropdown userID={userStore?.customerId} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary navigation */}
      {/* <nav className="bg-white text-black shadow-md overflow-x-auto">
        <div className="container mx-auto flex justify-center items-center">
          {visitedUrls &&
            visitedUrls.map(({ title, url }, index) => (
              <Link
                key={index}
                href={url}
                className={`px-2 py-2 whitespace-nowrap hover:bg-gray-100 ${
                  pathname === url ? "text-red-600 border-b-2 border-red-600" : "text-gray-700"
                }`}
              >
                {title}
              </Link>
            ))}
        </div>
      </nav> */}
    </header>
  );
}

function CartDropdown({ userID }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!userID) return;

    setLoading(true);
    fetch(`/api/cart?userID=${userID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setCart(data.cart || []))
      .finally(() => setLoading(false));
  }, [userID]);

  if (!userID) return <div className="p-4 text-sm">Vui lòng đăng nhập để xem giỏ hàng.</div>;
  if (loading) return <div className="p-4 text-sm">Đang tải giỏ hàng...</div>;
  if (!cart || cart?.items?.length === 0)
    return <div className="p-4 text-sm">Giỏ hàng trống.</div>;

  return (
    <div className="p-2 max-h-80 overflow-y-auto">
      {cart?.items?.map((item) => (
        <div key={item.productId} className="flex items-center gap-2 py-2 border-b last:border-b-0">
          <Image
            src={`/api/images/${item.url}` || "/placeholder.svg"}
            alt={item.productName}
            width={40}
            height={40}
            className="w-10 h-10 rounded object-cover"
          />
          <div className="flex-1">
            <div className="font-medium text-sm">{item.productName}</div>
            <div className="text-xs text-gray-500">
              SL: {item.quantity} x {item.unitPrice.toLocaleString()}đ
            </div>
          </div>
          <div className="font-semibold text-sm">
            {item.totalPrice.toLocaleString()}đ
          </div>
        </div>
      ))}
      <div className="pt-2">
        <Link href="/cart">
          <Button className="w-full">Xem giỏ hàng</Button>
        </Link>
      </div>
    </div>
  );
}
