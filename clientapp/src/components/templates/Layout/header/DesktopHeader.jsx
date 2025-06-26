"use client";
import AuthModal from "@/components/organisms/AuthModal";
import CategoryMenu from "@/components/templates/User/categories/CategoryMenu";
import { Button } from "@/components/ui/button.jsx";
import { Phone, Search, ShoppingCart, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserProfileStore } from "@/stores";
import { useEffect, useState } from "react";

export default function DesktopHeader({ categories = [], visitedUrls = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const { userStore, reset } = useUserProfileStore();

  const handleLogout = async () => {
    try {
      // Xóa user profile từ store (sẽ tự động xóa localStorage)
      reset();
      // Xóa accessToken nếu có
      if (typeof window !== 'undefined') {
        localStorage.removeItem("accessToken");
      }
      // Redirect đến trang logout
      router.push("/auth/logout");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className={`w-full `}>
      {/* Main navigation  */}
      <div className="bg-red-600 text-white py-3 px-4 border-t border-red-500 sticky">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div
            className="flex items-center mb-3 md:mb-0  cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center mr-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="object-contain text-xs rounded-3xl text-gray-600"
              />
            </div>
            <span className="text-yellow-300 text-xl font-bold">CarGear</span>
          </div>
          <CategoryMenu categories={categories} />
          {/* Search bar */}
          <div className="relative flex-1 max-w-xl mx-4 w-full mb-3 md:mb-0">
            <input
              type="text"
              placeholder="Bạn tìm gì..."
              className="w-full py-2 px-4 rounded-full text-black bg-white"
            />
            <Button
              variant={"outline-none"}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          {/* Contact and account */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-1" />
              <span>0974841508</span>
            </div>
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
                    <DropdownMenuItem className="cursor-pointer">Hồ sơ</DropdownMenuItem>
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
      <nav className="bg-white text-black shadow-md overflow-x-auto">
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
      </nav>
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
        return res.json()
      })
      .then((data) => setCart(data.cart || []))
      .finally(() => setLoading(false));
  }, [userID]);

  if (!userID) return <div className="p-4 text-sm">Vui lòng đăng nhập để xem giỏ hàng.</div>;
  if (loading) return <div className="p-4 text-sm">Đang tải giỏ hàng...</div>;
  if (!cart|| cart?.[0]?.orderItems?.length === 0 || !cart?.[0]?.orderItems) return <div className="p-4 text-sm">Giỏ hàng trống.</div>;

  return (
    <div className="p-2 max-h-80 overflow-y-auto">
      {cart?.[0]?.orderItems.map((item) => (
        <div key={item.productId} className="flex items-center gap-2 py-2 border-b last:border-b-0">
          <img src={item.imageUrl || "/placeholder.svg"} alt={item.productName} className="w-10 h-10 rounded object-cover" />
          <div className="flex-1">
            <div className="font-medium text-sm">{item.productName}</div>
            <div className="text-xs text-gray-500">SL: {item.quantity} x {item.price.toLocaleString()}đ</div>
          </div>
          <div className="font-semibold text-sm">{(item.price * item.quantity).toLocaleString()}đ</div>
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
