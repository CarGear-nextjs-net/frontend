import { NextResponse } from "next/server";

export function middleware(request) {
  // Lấy token và role từ cookie
  const token = request.cookies.get("session_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  
  // Lấy đường dẫn hiện tại
  const { pathname } = request.nextUrl;

  // Nếu đã đăng nhập (có token) và đang ở trang login, chuyển về trang chủ
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Chỉ kiểm tra token và role cho các URL trong /manager/*
  if (pathname.startsWith("/manager")) {
    // Nếu không có token hoặc không phải admin, chuyển về trang login
    if (!token || userRole !== "1") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Cấu hình middleware chỉ chạy cho các đường dẫn /manager/* và /login
export const config = {
  matcher: ["/manager/:path*", "/login"],
};
