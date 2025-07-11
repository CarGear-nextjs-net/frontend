'use client'

import Image from "next/image"
import { ShoppingCart, Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatPrice } from "@/utils/format"
import { useUserProfileStore } from "@/stores"
import { useState } from "react"
import { useOrder } from "@/context/OrderContext"
import { useAuth } from "@/context/AuthContext"

export default function ProductCard({ product ,className="",width=300}) {
    const { userStore } = useUserProfileStore();
    const { setOpen } = useAuth();
    const { setProducts, setOpen: setOpenOrder } = useOrder();

    return (
        <Card
            style={{width:`${width}px`}}
            className={`relative w-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all ${className}`}>
            {/* Product image */}
            <div className="relative h-36 cursor-pointer">
                <Link href={`/product/${product.slug}`}>
                    <Image
                        src={product.images.length > 0 ? `/api/images/${product.images[0].url}` : "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                    />
                </Link>
            </div>

            {/* Product info */}
            <CardContent className="p-3">
                <span className="text-xs text-gray-500">{product.category}</span>

                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-1 hover:text-red-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center mb-1">
                    <div className="flex items-center mr-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3 w-3 ${
                                    i < Math.floor(product.review || 0)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-600">{product.review || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-red-600">{formatPrice(product.price)}</span>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 h-8 px-2" onClick={() => {
                        if (userStore?.id) {
                            setProducts(product);
                            setOpenOrder(true);
                        } else {
                            setOpen(true);
                        }
                    }}>
                        <ShoppingCart className="h-3 w-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}