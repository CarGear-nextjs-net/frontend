import { fetchProductBySlug } from "@/lib/api";
import NotFound from "@/app/not-found";
import ProductDetailController from "@/components/templates/User/product/ProductDetailController";

export async function generateMetadata({ params }) {
    const { slug } = params;
    try {
        const data = await fetchProductBySlug(slug);
        const product = data.product;

        if (!product) return {};

        return {
            title: product.seoTitle || product.name ,
            description: product.seoDescription || product.description ,
            openGraph: {
                title: product.seoTitle,
                description: product.seoDescription,
                images: product.image,
                type: "website",
            }
        };
    } catch {
        return {
            title: "Không tìm thấy sản phẩm",
        };
    }
}

// ✅ Component chính
export default async function ProductPage({ params }) {
    const { slug } = params;
    try {
        const data = await fetchProductBySlug(slug);
        if (!data.product) {
            return <NotFound />;
        }

        return (
            <div className="bg-white">
                <ProductDetailController data={data} />

            </div>
        );
    } catch (err) {
        return <NotFound />;
    }
}
