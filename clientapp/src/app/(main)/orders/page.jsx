"use client";
import { useUserProfileStore } from "@/stores";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fetchOrdersByCustomerStatus, updateOrderStatusUser } from "@/lib/apis/orders-api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ORDER_STATUSES = [
  { id: 0, label: "Chờ xác nhận" },
  { id: 1, label: "Đã thanh toán" },
  { id: 2, label: "Đang giao hàng" },
  { id: 3, label: "Đã nhận hàng" },
  { id: 4, label: "Đã hủy" },
];

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
}

function OrderList({ orders, onStatusUpdated }) {
  const router = useRouter();
  const handleReceived = async (orderId) => {
    try {
      await updateOrderStatusUser(orderId, 3);
      toast.success("Cập nhật trạng thái thành công!");
      onStatusUpdated && onStatusUpdated();
    } catch {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };
  if (!orders || orders.length === 0) {
    return <div className="p-4 text-center text-gray-500">Không có đơn hàng nào.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="p-3">Mã đơn hàng</th>
            <th className="p-3">Ngày đặt</th>
            <th className="p-3">Tổng tiền</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium cursor-pointer" onClick={() => router.push(`/orders/${order.orderId}`)}>Order-{order.orderId}</td>
              <td className="p-3">{new Date(order.orderDate).toLocaleDateString("vi-VN")}</td>
              <td className="p-3 font-medium">{formatPrice(
                (order.orderItems || []).reduce((sum, item) => sum + (item.total || (item.productPrice * item.quantity) || 0), 0)
              )}</td>
              <td className="p-3">{ORDER_STATUSES.find(s => s.id === order.status)?.label || "Không xác định"}</td>
              <td className="p-3">
                {order.status === 2 ? (
                  <button
                    className="px-3 cursor-pointer py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                    onClick={() => handleReceived(order.orderId)}
                  >
                    Đã nhận hàng
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function OrdersPage() {
  const { userStore } = useUserProfileStore();
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState({}); // { statusId: [orders] }
  const [loading, setLoading] = useState(false);

  const refetch = () => {
    if (!userStore?.customerId) return;
    setLoading(true);
    fetchOrdersByCustomerStatus(userStore.customerId, tab)
      .then((res) => setOrders((prev) => ({ ...prev, [tab]: res.data || [] })))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [tab, userStore?.customerId]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>
      <Tabs value={tab.toString()} onValueChange={(v) => setTab(Number(v))}>
        <TabsList className="mb-4">
          {ORDER_STATUSES.map((status) => (
            <TabsTrigger className="cursor-pointer" key={status.id} value={status.id.toString()}>{status.label}</TabsTrigger>
          ))}
        </TabsList>
        {ORDER_STATUSES.map((status) => (
          <TabsContent key={status.id} value={status.id.toString()}>
            <Card>
              <CardContent className="p-0">
                {loading && tab === status.id ? (
                  <div className="p-4 text-center">Đang tải...</div>
                ) : (
                  <OrderList orders={orders[status.id] || []} onStatusUpdated={refetch} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
