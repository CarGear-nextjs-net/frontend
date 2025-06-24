"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useOrder } from "@/context/OrderContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import Image from "next/image";
export default function OrderModal() {
  const { products, open, setOpen } = useOrder();
  console.log("🚀 ~ OrderModal ~ products:", products)

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
              <Image src={"/placeholder.png"} alt={products?.name || ""} width={100} height={100} />
            </div>
            <div className="w-3/4">
              <div className="text-2xl font-bold">{products?.name}</div>
              <div className="text-sm text-gray-500">{products?.description}</div>
              <div className="text-sm text-gray-500">{products?.price}</div>
              <div className="text-sm text-gray-500">{products?.stock}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              onClick={() => {
                setOpen(false);
                redirect("/login");
              }}
            >
              Thêm sản phẩm
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
