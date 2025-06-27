import OrderViewController from "@/components/templates/manager/orders/OrderViewController";

export default function OrderViewPage({ params }) {
  return (
    <div className="w-full bg-white min-h-screen">
      <OrderViewController orderId={params.id} />
    </div>
  );
} 