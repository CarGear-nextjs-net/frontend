
import {fetchCategories} from "@/lib/api";
import Header from "@/components/header/Header";
import {Footer} from "@/components/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContactWidget from "@/components/contact/FloatingContactWidget";

export default async function MainLayout({ children }) {
    const categories = await fetchCategories();
    const data = {
        categories: categories,
    }
    return (
        <div>
            <ScrollToTop />
            <Header data={data} />
            <main>{children}</main>
            <Footer />
            <FloatingContactWidget />
        </div>
    );
}