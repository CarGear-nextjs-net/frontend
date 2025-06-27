"use client";

import DialogConfirmDelete from "@/components/templates/Common/DialogConfirmDelete";
import { PaginationComponent } from "@/components/templates/Common/Pagination";
import { deleteOrderApi, updateOrderStatus } from "@/lib/apis/orders-api";
import { Eye, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderList({ orders = [], page, setPage, totalPages }) {
  const [idSelected, setIdSelected] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const router = useRouter();

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.status === 200) {
        toast.success("Cập nhật trạng thái đơn hàng thành công");
        setPage(1); // Refresh the list
      }
    } catch (e) {
      toast.error("Cập nhật trạng thái đơn hàng thất bại");
    }
  };

  const handleDelete = async () => {
    if (!idSelected) {
      toast.error("Vui lòng chọn đơn hàng để xóa");
      return;
    }
    try {
      const res = await deleteOrderApi(idSelected);
      if (res.status === 200) {
        toast.success("Xóa đơn hàng thành công");
        setIdSelected(null);
        setOpenModalDelete(false);
        setPage(1);
      }
    } catch (e) {
      toast.error("Xóa đơn hàng thất bại");
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Mã đơn hàng</th>
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Tổng tiền</th>
              <th className="p-3">Ngày đặt</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {orders.map((order, index) => (
              <tr key={order.orderId} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">#{order.orderId}</td>
                <td className="p-3">
                  <div>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-gray-500 text-xs">{order.email}</div>
                  </div>
                </td>
                <td className="p-3 font-medium">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    order.totalAmount
                  )}
                </td>
                <td className="p-3">{new Date(order.orderDate).toLocaleDateString("vi-VN")}</td>
                <td className="p-3">
                {order.status}
                </td>
                {order.status != 'Chờ xử lý' && <td className="p-3 flex items-center gap-2">
                  <Eye
                    className="w-4 h-4 cursor-pointer text-blue-600"
                    onClick={() => router.push(`/manager/orders/${order.orderId}`)}
                  />
                  {order.status == 'Đã thanh toán' &&<Settings
                    className="w-4 h-4 cursor-pointer text-green-600"
                    onClick={() => router.push(`/manager/orders/${order.orderId}/edit`)}
                  />}
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">Không có dữ liệu</p>
          </div>
        )}
      </div>
      <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
      <DialogConfirmDelete
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        onConfirm={handleDelete}
        onCancel={() => {
          setIdSelected(null);
          setOpenModalDelete(false);
        }}
      />
    </>
  );
}
