"use client"

import { useEffect, useMemo, useState } from "react"
import { CartItem } from './CartItem'
import { CartSummary } from "./CartSummary"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from 'lucide-react'
import Link from "next/link"
import { useUserProfileStore } from "@/stores"


export function ShoppingCart() {
    const [cartItems, setCartItems] = useState(null)
    const [loading, setLoading] = useState(false);
    const { userStore } = useUserProfileStore();
    const [listItems, setListItems] = useState([])

useEffect(() => {
    setListItems(cartItems?.[0]?.orderItems || [])
}, [cartItems])
    // const listItems = useMemo(() => cartItems?.[0]?.orderItems || [], [cartItems])
    useEffect(() => {
        if (!userStore?.customerId) return;
    
        setLoading(true);
        fetch(`/api/cart?userID=${userStore?.customerId}`)
          .then((res) => {
            return res.json()
          })
          .then((data) => setCartItems(data.cart || []))
          .finally(() => setLoading(false));
      }, [userStore?.customerId]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        setListItems((prev) => 
            prev.map((item) =>
                item.productId === id ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const removeItem = (id) => {
        setListItems((prev) => prev.filter((item) => item.productId !== id))
    }

    const totalItems = listItems?.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = listItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    if (listItems?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
                <p className="text-muted-foreground mb-6">
                    Bạn chưa có sản phẩm nào trong giỏ hàng
                </p>
                <Link href="/products">
                    <Button>Tiếp tục mua sắm</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
                <div className="rounded-lg border shadow-sm">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Sản phẩm ({totalItems})
                        </h2>
                        <div className="divide-y">
                            {listItems.map((item) => (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <CartSummary subtotal={subtotal} />
            </div>
        </div>
    )
}
