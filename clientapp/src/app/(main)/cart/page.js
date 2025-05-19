import {ShoppingCart} from "@/app/(main)/cart/ShoppingCart";
export default function CartPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
            <ShoppingCart />
        </div>
    )
}