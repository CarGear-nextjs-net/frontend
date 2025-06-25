"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {formatPrice} from "@/utils/format";

export function CartSummary({ subtotal }) {
    const router = useRouter()
    const shipping = subtotal > 0 ? 30000 : 0
    const total = subtotal + shipping

    return (
        <div className="rounded-lg border shadow-sm">
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Tổng đơn hàng</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Phí vận chuyển</span>
                        <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-medium">
                        <span>Tổng cộng</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    <Button className="w-full">Tiến hành thanh toán</Button>
                    <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </div>
        </div>
    )
}
