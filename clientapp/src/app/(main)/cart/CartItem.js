"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {formatPrice} from "@/utils/format";


export function CartItem({ item, updateQuantity, removeItem }) {
    return (
        <div className="py-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
                <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.productName}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                />
            </div>
            <div className="flex-grow">
                <h3 className="font-medium">{item.productName}</h3>
                <p className="text-muted-foreground text-sm mb-2">Đơn giá: {formatPrice(item.unitPrice)}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Giảm số lượng</span>
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Tăng số lượng</span>
                        </Button>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Xóa sản phẩm</span>
                    </Button>
                </div>
            </div>
            <div className="text-right font-medium">{formatPrice(item.totalPrice)}</div>
        </div>
    )
}
