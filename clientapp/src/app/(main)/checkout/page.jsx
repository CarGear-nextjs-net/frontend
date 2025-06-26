"use client";
import { useEffect, useMemo, useState } from "react";
import { useUserProfileStore } from "@/stores";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateOrderStatusUser } from "@/lib/apis/orders-api";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
}

export default function CheckoutPage() {
  const { userStore } = useUserProfileStore();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: userStore?.username || "",
    email: userStore?.email || "",
    phone: "",
    address: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!userStore?.customerId) return;
    setLoading(true);
    fetch(`/api/cart?userID=${userStore.customerId}`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart?.[0]?.orderItems || [])
        setOrderId(data.cart?.[0]?.orderId || null)
      })
      .finally(() => setLoading(false));
  }, [userStore?.customerId]);

  const totalMoney = cart.reduce((sum, item) => sum + (item.total || (item.productPrice * item.quantity) || 0), 0);
  const total = useMemo(() => totalMoney > 0? totalMoney + 30000 : 0, [totalMoney]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateOrderStatusUser(orderId, 1);
        setOrderId(null);
        toast.success("Cập nhật trạng thái thành công!");
        setSuccess(true);
      } catch {
        toast.error("Cập nhật trạng thái thất bại!");
      }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] bg-green-50 rounded-xl shadow-md p-8">
        <CheckCircle className="text-green-500 mb-4" size={72} />
        <div className="text-2xl font-bold text-green-700 mb-2">Đặt hàng thành công!</div>
        <div className="text-base text-green-600 mb-6">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</div>
        <button
          className="mt-2 cursor-pointer px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-semibold shadow"
          onClick={() => router.push("/")}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Sản phẩm trong giỏ hàng</h2>
          {loading ? (
            <div>Đang tải...</div>
          ) : cart.length === 0 ? (
            <div>Không có sản phẩm nào trong giỏ hàng.</div>
          ) : (
            <table className="min-w-full border border-gray-200 shadow-md overflow-hidden mb-4">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="p-3">Tên sản phẩm</th>
                  <th className="p-3">Số lượng</th>
                  <th className="p-3">Đơn giá</th>
                  <th className="p-3">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.productName}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{formatPrice(item.productPrice)}</td>
                    <td className="p-3">{formatPrice(item.total || (item.productPrice * item.quantity))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="text-right font-bold text-lg">Tổng tiền: {formatPrice(total)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Họ tên" required />
            <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" required type="email" />
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" required />
            <Input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ nhận hàng" required />
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading || !orderId || cart.length == 0}>Xác nhận đặt hàng</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 