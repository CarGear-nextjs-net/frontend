"use client";
import FloatingContactWidget from "@/components/contact/FloatingContactWidget";
import Header from "@/components/header/Header";
import ScrollToTop from "@/components/organisms/ScrollToTop";
import AuthDialog from "@/components/templates/Auth/AuthDialog";
import { Footer } from "@/components/templates/Layout/footer/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { fetchCategories } from "@/lib/api";
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
