import { CheckCircle, Clock, Heart, Mail } from "lucide-react";

export default function Policies() {
  const policies = [
    {
      icon: Clock,
      title: "Giao hàng nhanh",
      description: "Nhận hàng trong 24h",
    },
    {
      icon: Heart,
      title: "Bảo hành 12 tháng",
      description: "Đổi trả miễn phí",
    },
    {
      icon: CheckCircle,
      title: "Chất lượng đảm bảo",
      description: "Đạt chuẩn an toàn",
    },
    {
      icon: Mail,
      title: "Hỗ trợ 24/7",
      description: "Luôn sẵn sàng giúp đỡ",
    },
  ];
  return (
    <div className="w-[1275px] mx-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl text-center">
      {policies.map((policy) => (
      <div key={policy.title} className="flex flex items-center gap-4 border-2 border-gray-200 rounded-lg py-2 px-4 shadow-md bg-red-500 cursor-pointer">
        <div className="bg-yellow-500 rounded-full p-2">
          <policy.icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-white text-lg">{policy.title}</h3>
          <p className="text-sm text-white">{policy.description}</p>
        </div>
      </div>
      ))}
    </div>
  );
}
