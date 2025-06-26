"use client";
import {
  getDashboardOrderRecentData,
  getDashboardOverviewData,
  getDashboardTopProductData,
} from "@/lib/apis/dashboard-api";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Dữ liệu mẫu, có thể thay bằng API thực tế
  const [stats, setStats] = useState({
    orders: 0,
    customers: 0,
    revenue: 0,
    products: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // Dữ liệu mẫu cho doanh thu từng tháng
  const [year, setYear] = useState(2024);
  const years = [2022, 2023, 2024];
  const monthlyRevenue = {
    2022: [
      12000000, 15000000, 18000000, 20000000, 17000000, 21000000, 22000000, 25000000, 23000000,
      24000000, 26000000, 27000000,
    ],
    2023: [
      14000000, 16000000, 19000000, 21000000, 18000000, 22000000, 23000000, 26000000, 24000000,
      25000000, 27000000, 28000000,
    ],
    2024: [
      15000000, 17000000, 20000000, 22000000, 19000000, 23000000, 24000000, 27000000, 25000000,
      26000000, 28000000, 29000000,
    ],
  };

  // Dữ liệu mẫu top 5 sản phẩm bán chạy

  useEffect(() => {
    async function fetchData() {
      // Gọi API lấy dữ liệu dashboard ở đây
      const res = await getDashboardOverviewData();
      if (res.status === 200) {
        setStats({
          orders: res.data.totalOrders,
          customers: res.data.totalUsers,
          revenue: res.data.totalRevenue,
          products: res.data.totalProduct,
        });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await getDashboardOrderRecentData({
        limit: 7,
      });
      if (res.status === 200) {
        setRecentOrders(res.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await getDashboardTopProductData({
        limit: 5,
      });
      if (res.status === 200) {
        setTopProducts(res.data);
      }
    }
    fetchData();
  }, []);

  const barData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: `Doanh thu năm ${year}`,
        data: monthlyRevenue[year],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const statusLabel = {
    0: "Đang xử lý",
    1: "Đã giao",
    2: "Đã hủy",
  };
  const statusColor = {
    0: "bg-yellow-500",
    1: "bg-green-500",
    2: "bg-red-500",
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Biểu đồ doanh thu theo tháng (${year})` },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString("vi-VN") + " đ";
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Quản lý</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Widget title="Đơn hàng" value={stats.orders} icon="📦" />
        <Widget title="Khách hàng" value={stats.customers} icon="👤" />
        <Widget title="Doanh thu" value={stats.revenue.toLocaleString()} icon="💰" />
        <Widget title="Sản phẩm" value={stats.products} icon="🛒" />
      </div>
      <div className="bg-white rounded shadow p-4 my-1">
        <h2 className="text-lg font-semibold mb-2">Chào mừng bạn đến trang quản lý!</h2>
        <p className="text-gray-600">
          Bạn có thể theo dõi các chỉ số tổng quan, quản lý đơn hàng, khách hàng, sản phẩm và nhiều
          hơn nữa.
        </p>
      </div>
      <div className="bg-white rounded shadow p-4 mb-8">
        <div className="flex items-center mb-4 gap-2">
          <h2 className="text-lg font-semibold flex-1">Biểu đồ doanh thu hàng tháng</h2>
          <select
            className="border rounded px-2 py-1"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <Bar data={barData} options={barOptions} height={80} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Top 5 sản phẩm bán chạy */}
        {topProducts.length > 0 && (
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Top 5 sản phẩm bán chạy</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">#</th>
                  <th className="py-2">Sản phẩm</th>
                  <th className="py-2">Số lượng bán</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, idx) => (
                  <tr key={p.productId} className="border-b last:border-0">
                    <td className="py-2">{idx + 1}</td>
                    <td className="py-2 flex items-center gap-2">
                      <Image
                        src={p.imageUrl || "/placeholder.svg"}
                        alt={p.productName}
                        className="w-8 h-8 rounded object-cover"
                        width={32}
                        height={32}
                      />
                      <span>{p.productName}</span>
                    </td>
                    <td className="py-2">{p.totalSold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Đơn hàng gần nhất */}
        {recentOrders.length > 0 && (
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Đơn hàng gần nhất</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Mã đơn</th>
                  <th className="py-2">Khách hàng</th>
                  <th className="py-2">Ngày</th>
                  <th className="py-2">Tổng tiền</th>
                  <th className="py-2">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.orderId} className="border-b last:border-0">
                    <td className="py-2 font-medium">OD-{order.orderId}</td>
                    <td className="py-2">{order.customerName}</td>
                    <td className="py-2">{order.orderDate.split("T")[0]}</td>
                    <td className="py-2">{order.totalAmount.toLocaleString()}đ</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${statusColor[order.status]}`}
                      >
                        {statusLabel[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Widget({ title, value, icon }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center justify-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </div>
  );
}
