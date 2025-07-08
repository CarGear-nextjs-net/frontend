"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format";
import { Car, Hammer, RotateCcw, ShieldCheck, Users } from "lucide-react";

export function CartSummary({ subtotal }) {
  const router = useRouter();
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  return (
    <>
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
            <Button className="w-full" onClick={() => router.push("/checkout")}>
              Tiến hành thanh toán
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border shadow-sm p-4 mt-4 rounded-lg">
        <h3 className="text-lg font-semibold">CarGear Cam kết</h3>
        <div className="flex items-center gap-2 text-sm">
          <Car className="w-4 h-4" />
          <div>Miễn phí giao hàng toàn quốc cho hóa đơn trên 200.000VND</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RotateCcw className="w-4 h-4" />
          <div>Đổi trả miễn phí trong vòng 30 ngày</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4" />
          <div>Bảo hành 12 tháng</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Hammer className="w-4 h-4" />
          <div>Miễn phí lắp đặt</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4" />
          <div>Hỗ trợ 24/7. Giải đáp mọi thắc mắc</div>
        </div>
      </div>
    </>
  );
}
