import OrderEditController from "@/components/templates/manager/orders/OrderEditController";

export default function OrderEditPage({ params }) {
  return (
    <div className="w-full bg-white min-h-screen">
      <OrderEditController orderId={params.id} />
    </div>
  );
} 