"use client"

import { useState } from "react"
import { CartItem } from './CartItem'
import { CartSummary } from "./CartSummary"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from 'lucide-react'
import Link from "next/link"

// Dữ liệu mẫu cho giỏ hàng
const initialItems = [
    {
        id: 1,
        name: "Áo thun trắng",
        price: 250000,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
    },
    {
        id: 2,
        name: "Quần jean xanh",
        price: 450000,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
    },
    {
        id: 3,
        name: "Giày thể thao",
        price: 850000,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
    },
]

export function ShoppingCart() {
    const [cartItems, setCartItems] = useState(initialItems)

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    if (cartItems.length === 0) {
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
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
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
