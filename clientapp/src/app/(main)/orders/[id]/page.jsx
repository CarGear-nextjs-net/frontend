"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchOrderDetail } from "@/lib/apis/orders-api";
import { Card, CardContent } from "@/components/ui/card";

const ORDER_STATUSES = [
  { id: 0, label: "Chờ xác nhận" },
  { id: 1, label: "Đã xác nhận" },
  { id: 2, label: "Đang giao hàng" },
  { id: 3, label: "Đã giao hàng" },
  { id: 4, label: "Đã hủy" },
];

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    fetchOrderDetail(orderId)
      .then((res) => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <div className="p-8 text-center">Đang tải...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Không tìm thấy đơn hàng.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <button
        className="mb-4 cursor-pointer px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
        onClick={() => router.push("/orders")}
      >
        ← Quay lại danh sách đơn hàng
      </button>
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng Order-{order.orderId}</h1>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="mb-2">Ngày đặt: <b>{new Date(order.orderDate).toLocaleString("vi-VN")}</b></div>
          <div className="mb-2">Tổng tiền: <b>{formatPrice((order.products || []).reduce((sum, p) => sum + (p.total || 0), 0))}</b></div>
          <div className="mb-2">Trạng thái: <b>{ORDER_STATUSES.find(s => s.id === order.status)?.label || "Không xác định"}</b></div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Khách hàng</h2>
          <div>Tên: <b>{order.customer?.customerName}</b></div>
          <div>Email: <b>{order.customer?.email}</b></div>
          <div>Điện thoại: <b>{order.customer?.phone}</b></div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Sản phẩm</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 shadow-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="p-3">Ảnh</th>
                  <th className="p-3">Tên sản phẩm</th>
                  <th className="p-3">Số lượng</th>
                  <th className="p-3">Đơn giá</th>
                  <th className="p-3">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.products?.map((p) => (
                  <tr key={p.productId} className="border-t hover:bg-gray-50">
                    <td className="p-3"><img src={p.url} alt={p.productName} className="w-16 h-16 object-cover rounded" /></td>
                    <td className="p-3">{p.productName}</td>
                    <td className="p-3">{p.quantity}</td>
                    <td className="p-3">{formatPrice(p.productPrice)}</td>
                    <td className="p-3">{formatPrice(p.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
