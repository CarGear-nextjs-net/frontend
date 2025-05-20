import { withIronSession } from "next-iron-session";

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default withIronSession(MyApp, {
    password: process.env.SESSION_SECRET, // Đặt một mật khẩu mạnh cho session
    cookieName: "user_session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production", // Chỉ dùng cookie bảo mật khi sản phẩm
    },
});
