"use client";

import { useEffect, useMemo, useState } from "react";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useUserProfileStore } from "@/stores";
import { toast } from "sonner";
import { deleteProductFromCart, getCart, updateCartAPI } from "@/lib/apis/cart-api";

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userStore } = useUserProfileStore();
  const [listItems, setListItems] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const updateCart = async ({ productId, quantity }) => {
    const data = {
      productId,
      quantity,
      customerId: userStore?.customerId,
    };
    const res = await updateCartAPI(data);
    if (res.status === 200) {
      setRefetch(!refetch);
    }
  };

  useEffect(() => {
    setListItems(cartItems?.items || []);
  }, [cartItems]);
  // const listItems = useMemo(() => cartItems?.[0]?.orderItems || [], [cartItems])
  useEffect(() => {
    const fetchCart = async () => {
      if (!userStore?.customerId) return;
      setLoading(true);
      const res = await getCart(userStore?.customerId);
      if (res.status === 200) {
        await fetch(`/api/cart/sync?userID=${userStore?.customerId}`);
        setCartItems(res.data || []);
      }
      setLoading(false);
    };
    fetchCart();
  }, [userStore?.customerId, refetch]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCart({ productId: id, quantity: newQuantity });
  };

  const removeItem = async (id) => {
    const res = await deleteProductFromCart(cartItems?.orderId, id);
    if (res.status === 200) {
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
      await fetch(`/api/cart/sync?userID=${userStore?.customerId}`);
      setRefetch(!refetch);
    } else {
      toast.error("Xóa sản phẩm khỏi giỏ hàng thất bại");
    }
  };

  const totalItems = listItems?.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = listItems?.reduce((sum, item) => sum + item.totalPrice, 0);

  if (listItems?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
        <p className="text-muted-foreground mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
        <Link href="/products">
          <Button>Tiếp tục mua sắm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="rounded-lg border shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sản phẩm ({totalItems})</h2>
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
  );
}
