"use client";

import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderHeader({
  search,
  statusFilter,
  setSearch,
  setStatusFilter,
  orders = [],
}) {
  const [isExporting, setIsExporting] = useState(false);

  const exportReport = async () => {
    setIsExporting(true);
    try {
      // Tạo dữ liệu báo cáo
      const reportData = orders.map((order, index) => ({
        STT: index + 1,
        "Mã đơn hàng": `#${order.orderId}`,
        "Khách hàng": order.customerName,
        "Tổng tiền": new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
          order.totalAmount
        ),
        "Ngày đặt": new Date(order.orderDate).toLocaleDateString("vi-VN"),
        "Trạng thái": getStatusText(order.status),
      }));

      // Tạo CSV content
      const headers = Object.keys(reportData[0] || {});
      const csvContent = [
        headers.join(","),
        ...reportData.map((row) => headers.map((header) => `"${row[header]}"`).join(",")),
      ].join("\n");

      // Tạo và download file
      const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `bao-cao-don-hang-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Xuất báo cáo thành công!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Xuất báo cáo thất bại!");
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusText = (status) => {
    return status
    // switch (status) {
    //   case 0:
    //     return "Chờ xác nhận";
    //   case 1:
    //     return "Đã xác nhận";
    //   case 2:
    //     return "Đang giao hàng";
    //   case 3:
    //     return "Đã giao hàng";
    //   case 4:
    //     return "Đã hủy";
    //   default:
    //     return "Không xác định";
    // }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="border px-3 py-2 rounded-md w-full md:w-64"
          onChange={debounce((e) => {
            setSearch(e.target.value);
          }, 500)}
        />
        <select
          className="border px-3 py-2 rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="0">Chờ xác nhận</option>
          <option value="1">Đã xác nhận</option>
          <option value="2">Đang giao hàng</option>
          <option value="3">Đã giao hàng</option>
          <option value="4">Đã hủy</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={exportReport}
          disabled={isExporting || orders.length === 0}
        >
          {isExporting ? "⏳ Đang xuất..." : "📊 Xuất báo cáo"}
        </Button>
      </div>
    </div>
  );
}
