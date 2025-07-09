"use client";
import OrderModal from "@/components/organisms/OrderModal";
import ScrollToTop from "@/components/organisms/ScrollToTop";
import AuthDialog from "@/components/templates/Auth/AuthDialog";
import { Footer } from "@/components/templates/Layout/footer/Footer";
import Header from "@/components/templates/Layout/header/Header";
import FloatingContactWidget from "@/components/templates/User/contact/FloatingContactWidget";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { fetchCategories } from "@/lib/api";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function MainLayout({ children }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setData({ categories });
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    getCategories();
  }, []);

  return (
    <AuthProvider>
      <OrderProvider>
        <div>
          <ScrollToTop />
          <Header data={data} />
          <main className="mt-[76px]">{children}</main>
          <Footer />
          <FloatingContactWidget />
          <AuthDialog />
          <OrderModal />
          <Toaster richColors position="top-right" />
        </div>
      </OrderProvider>
    </AuthProvider>
  );
}
