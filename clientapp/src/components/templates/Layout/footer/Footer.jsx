"use client";

import Link from "next/link";
import {
  Clock,
  Heart,
  CheckCircle,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Maps from "@/components/organisms/Maps";

export function Footer() {
  return (
    <>
      {/* Features Section */}

      {/* Main Footer */}
      <footer className="bg-gray-900 text-gray-100">
        <div className=" conaitner bg-gray-100 my-8 py-6 px-4 mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-6 max-w-7xl text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 rounded-full p-3 mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Giao hàng nhanh</h3>
              <p className="text-sm text-gray-500">Nhận hàng trong 24h</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 rounded-full p-3 mb-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Bảo hành 12 tháng</h3>
              <p className="text-sm text-gray-500">Đổi trả miễn phí</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 rounded-full p-3 mb-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Chất lượng đảm bảo</h3>
              <p className="text-sm text-gray-500">Đạt chuẩn an toàn</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-500 rounded-full p-3 mb-3">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Hỗ trợ 24/7</h3>
              <p className="text-sm text-gray-500">Luôn sẵn sàng giúp đỡ</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">CarGear</h3>
              <p className="text-gray-400">
                Chuyên cung cấp các sản phẩm ghế phụ cho trẻ em trên ô tô chất lượng cao, đảm bảo an
                toàn cho bé yêu của bạn.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Categories Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Danh mục</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Ghế phụ cho bé
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Ghế an toàn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Phụ kiện
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Khuyến mãi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Thông tin</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Chính sách
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Điều khoản
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Đăng ký nhận tin</h3>
              <p className="text-gray-400">Nhận thông tin khuyến mãi và sản phẩm mới nhất</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-4 py-2 rounded-l bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r transition-colors">
                  Đăng ký
                </button>
              </div>
              <div>
                <Maps />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CarGear. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
