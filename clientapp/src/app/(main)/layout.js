"use client";
import { fetchCategories } from "@/lib/api";
import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContactWidget from "@/components/contact/FloatingContactWidget";
import { AuthProvider } from "@/context/AuthContext";
import AuthDialog from "@/components/auth/AuthDialog";
import { useEffect, useState } from "react";

export default function MainLayout({ children }) {
  const [data, setData] = useState({});

  useEffect(async () => {
    const categories = await fetchCategories();
    setData({
      categories: categories,
    });
  }, []);

  return (
    <AuthProvider>
      <div>
        <ScrollToTop />
        <Header data={data} />
        <main>{children}</main>
        <Footer />
        <FloatingContactWidget />
        <AuthDialog />
      </div>
    </AuthProvider>
  );
}
