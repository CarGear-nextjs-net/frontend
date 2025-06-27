"use client";
import { fetchOrderDetail, updateOrderStatus, updateOrderStatusUser } from "@/lib/apis/orders-api";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OrderEditController({ orderId }) {
  console.log("🚀 ~ OrderEditController ~ orderId:", orderId)
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const loadOrderDetail = async () => {
      try {
        setLoading(true);
        const res = await fetchOrderDetail(orderId);
        if (res.data) {
          setOrder(res.data);
          setStatus(res.data.status);
        }
      } catch (error) {
        toast.error("Không thể tải thông tin đơn hàng");
        console.error("Error loading order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      loadOrderDetail();
    }
  }, [orderId]);

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đã xác nhận";
      case 2:
        return "Đang giao hàng";
      case 3:
        return "Đã giao hàng";
      case 4:
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "bg-yellow-100 text-yellow-800";
      case 1:
        return "bg-blue-100 text-blue-800";
      case 2:
        return "bg-orange-100 text-orange-800";
      case 3:
        return "bg-green-100 text-green-800";
      case 4:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelOrder = async () => {
    try {
      setSaving(true);
      const res = await updateOrderStatusUser(orderId, 4);
      if (res.status === 200) {
        toast.success("Hủy đơn hàng thành công");
        setOrder({ ...order, status: 4 });
      }
    } catch (error) {
      toast.error("Hủy đơn hàng thất bại");
      console.error("Error updating order status:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      setSaving(true);
      const res = await updateOrderStatusUser(orderId, 2);
      if (res.status === 200) {
        toast.success("Đã chuyển cho người giao hàng");
        setOrder({ ...order, status: 2 });
      }
    } catch (error) {
      toast.error("Đã chuyển cho người giao hàng thất bại");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Không tìm thấy đơn hàng</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Chỉnh sửa đơn hàng #{order.orderId}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã đơn hàng
              </label>
              <p className="text-gray-900 font-medium">#{order.orderId}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày đặt hàng
              </label>
              <p className="text-gray-900">
                {new Date(order.orderDate).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tổng tiền
              </label>
              <p className="text-gray-900 font-medium">
                {new Intl.NumberFormat("vi-VN", { 
                  style: "currency", 
                  currency: "VND" 
                }).format(order.totalAmount)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái hiện tại
              </label>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Thông tin khách hàng</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên khách hàng
              </label>
              <p className="text-gray-900">{order.customerName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{order.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <p className="text-gray-900">{order.phone || "Không có"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <p className="text-gray-900">{order.address || "Không có"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      {order.orderItems && order.orderItems.length > 0 && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Chi tiết sản phẩm</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sản phẩm</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Giá</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Số lượng</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tổng</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">SKU: {item.productId}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {new Intl.NumberFormat("vi-VN", { 
                        style: "currency", 
                        currency: "VND" 
                      }).format(item.price)}
                    </td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2 font-medium">
                      {new Intl.NumberFormat("vi-VN", { 
                        style: "currency", 
                        currency: "VND" 
                      }).format(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Status Update */}
       {order.status == 1 && <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Cập nhật trạng thái</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancelOrder}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? "Đang lưu..." : "Hủy đơn hàng"}
            </button>
            <button
              onClick={handleUpdateOrder}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? "Đang lưu..." : "Đã chuyển cho người giao hàng"}
            </button>
          </div>

         
          
        </div>
      </div>}
    </div>
  );
} 