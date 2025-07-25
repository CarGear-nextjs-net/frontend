import { ProductManagerProvider } from "@/components/templates/User/contexts/ProductManagerContext";
import Header from "@/components/templates/manager/header";
import Sidebar from "@/components/templates/manager/sidebar";
import { Toaster } from "sonner";
export default async function ManagerLayout({ children }) {
  try {
    const user = {
      id: 1,
      email: "admin@gmail.com",
      name: "admin",
      role: "admin",
    };
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar user={user} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header user={user} />
          <ProductManagerProvider>
            <main className="flex-1 overflow-y-auto">{children}</main>
            <Toaster richColors position="top-right" />
          </ProductManagerProvider>
        </div>
      </div>
    );
  } catch (e) {
    console.error("JWT Decode error:", e);
    // return redirect('/auth/login');
  }
}
