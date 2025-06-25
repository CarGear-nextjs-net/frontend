"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useOrder } from "@/context/OrderContext";
import { useUserProfileStore } from "@/stores";
import { formatPrice } from "@/utils/format";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { addToCartApi } from "@/lib/apis/cart-api";
export default function OrderModal() {
  const { products, open, setOpen } = useOrder();
  const [quantity, setQuantity] = useState(1);
  const { userStore } = useUserProfileStore();
  async function addToCart() {
    const res = await addToCartApi(
      [
        {
          productId: products?.id,
          quantity: quantity,
          price: products?.price,
          productName: products?.name,
          productPrice: products?.price * quantity,
        },
      ],
      userStore?.customerId
    );
    if (res.status === 200) {
      await fetch(`/api/cart/sync?userID=${userStore?.customerId}`);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    } else {
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại");
    }
  }
  const handleAddToCart = () => {
    if (userStore?.id) {
      addToCart();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" p-0 border-none bg-transparent z-[1000]">
        <DialogTitle className="hidden">Order Modal</DialogTitle>
        <Card className="w-full mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Thêm sản phẩm vào giỏ hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-1/4">
              <Image
                src={products?.image || "/placeholder.png"}
                alt={products?.name || ""}
                width={100}
                height={100}
              />
            </div>
            <div className="w-3/4 flex flex-col gap-2">
              <div className="text-2xl font-bold">{products?.name}</div>
              <div className="text-sm text-gray-500">{products?.description}</div>
              <div className="flex items-center">
                <p className="text-sm mr-2">Đánh giá: </p>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(products?.rate) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <div className="flex items-center">
                <p className="text-sm mr-2">Số lượng: </p>
                <Input
                  type="number"
                  className="w-1/4"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" className="mr-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              // onClick={() => {
              //   setOpen(false);
              //   redirect("/login");
              // }}
            >
              <div className="flex items-center ">
                <span className="text-xl font-bold text-red-600 mr-2">
                  {formatPrice(products?.price * quantity)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(products?.originalPrice)}
                </span>
              </div>
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
