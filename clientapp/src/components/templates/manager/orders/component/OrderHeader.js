"use client";

import { Button } from "@/components/ui/button";
import { debounce } from "lodash";

export default function OrderHeader({ search, statusFilter, setSearch, setStatusFilter }) {
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
        <Button className="bg-blue-600 text-white hover:bg-blue-700">📊 Xuất báo cáo</Button>
      </div>
    </div>
  );
}
