"use client";
import ScrollToTop from "@/components/organisms/ScrollToTop";
import AuthDialog from "@/components/templates/Auth/AuthDialog";
import { Footer } from "@/components/templates/Layout/footer/Footer";
import Header from "@/components/templates/Layout/header/Header";
import FloatingContactWidget from "@/components/templates/User/contact/FloatingContactWidget";
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
