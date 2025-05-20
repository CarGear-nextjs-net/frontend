import Sidebar from "@/components/manager/sidebar";
import Header from "@/components/manager/header";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { decodeJwtToken } from "@/lib/auth";
import {ProductManagerProvider} from "@/components/contexts/ProductManagerContext";
import { Toaster } from "sonner";
export default async function ManagerLayout({ children }) {
    // const cookieStore = cookies(); // ✅ vẫn sync, nhưng dùng đúng context
    // const sessionToken = cookieStore.get('session_token')?.value;
    //
    // if (!sessionToken) {
    //     return redirect('/auth/login'); // ✅ return là bắt buộc
    // }

    try {
        // const tokenData = decodeJwtToken(sessionToken); // Có thể throw
        // console.log(tokenData);
        const user = {
            id:1,
            email: 'admin@gmail.com',
            name: 'admin',
            role: 'admin'
        }
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
