"use client";
import { fetchOrdersManager } from "@/lib/apis/orders-api";
import { PAGES, PAGESIZE } from "@/utils/constants";
import { useEffect, useState } from "react";
import OrderHeader from "./component/OrderHeader";
import OrderList from "./component/OrderList";

export default function OrderController() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(PAGES);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const params = {
        page,
        pageSize: PAGESIZE,
        search: search,
        status: statusFilter,
      };
      const res = await fetchOrdersManager(params);
      if (res.data) {
        setOrders(res.data);
        setTotalPages(res.totalPages);
      }
    };
    loadData();
  }, [page, statusFilter, search]);

  return (
    <div className="p-4">
      <OrderHeader
        setSearch={setSearch}
        search={search}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
      />
      <OrderList orders={orders} page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
