"use client"
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Dữ liệu mẫu, có thể thay bằng API thực tế
  const [stats, setStats] = useState({
    orders: 120,
    customers: 45,
    revenue: 15000000,
    products: 80,
  });

  // Dữ liệu mẫu cho doanh thu từng tháng
  const [year, setYear] = useState(2024);
  const years = [2022, 2023, 2024];
  const monthlyRevenue = {
    2022: [12000000, 15000000, 18000000, 20000000, 17000000, 21000000, 22000000, 25000000, 23000000, 24000000, 26000000, 27000000],
    2023: [14000000, 16000000, 19000000, 21000000, 18000000, 22000000, 23000000, 26000000, 24000000, 25000000, 27000000, 28000000],
    2024: [15000000, 17000000, 20000000, 22000000, 19000000, 23000000, 24000000, 27000000, 25000000, 26000000, 28000000, 29000000],
  };

  // Dữ liệu mẫu top 5 sản phẩm bán chạy
  const topProducts = [
    { id: 1, name: "Áo thun trắng", sold: 320, image: "/placeholder.svg" },
    { id: 2, name: "Quần jean xanh", sold: 280, image: "/placeholder.svg" },
    { id: 3, name: "Giày thể thao", sold: 250, image: "/placeholder.svg" },
    { id: 4, name: "Áo khoác bomber", sold: 210, image: "/placeholder.svg" },
    { id: 5, name: "Balo thời trang", sold: 180, image: "/placeholder.svg" },
  ];

  // Dữ liệu mẫu đơn hàng gần nhất
  const recentOrders = [
    { id: "DH001", customer: "Nguyễn Văn A", date: "2024-06-01", total: 2500000, status: "Đã giao" },
    { id: "DH002", customer: "Trần Thị B", date: "2024-06-02", total: 1800000, status: "Đang xử lý" },
    { id: "DH003", customer: "Lê Văn C", date: "2024-06-03", total: 3200000, status: "Đã hủy" },
    { id: "DH004", customer: "Phạm Thị D", date: "2024-06-04", total: 1500000, status: "Đã giao" },
    { id: "DH005", customer: "Vũ Văn E", date: "2024-06-05", total: 2100000, status: "Đang xử lý" },
  ];

  // useEffect(() => {
  //   // Gọi API lấy dữ liệu dashboard ở đây
  // }, []);

  const barData = {
    labels: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    datasets: [
      {
        label: `Doanh thu năm ${year}`,
        data: monthlyRevenue[year],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Biểu đồ doanh thu theo tháng (${year})` },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString('vi-VN') + ' đ';
          }
        }
      }
    }
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
        <p className="text-gray-600">Bạn có thể theo dõi các chỉ số tổng quan, quản lý đơn hàng, khách hàng, sản phẩm và nhiều hơn nữa.</p>
      </div>
      <div className="bg-white rounded shadow p-4 mb-8">
        <div className="flex items-center mb-4 gap-2">
          <h2 className="text-lg font-semibold flex-1">Biểu đồ doanh thu hàng tháng</h2>
          <select
            className="border rounded px-2 py-1"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <Bar data={barData} options={barOptions} height={80} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Top 5 sản phẩm bán chạy */}
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
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2">{idx + 1}</td>
                  <td className="py-2 flex items-center gap-2">
                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover" />
                    <span>{p.name}</span>
                  </td>
                  <td className="py-2">{p.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Đơn hàng gần nhất */}
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
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-2 font-medium">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.date}</td>
                  <td className="py-2">{order.total.toLocaleString()}đ</td>
                  <td className="py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
