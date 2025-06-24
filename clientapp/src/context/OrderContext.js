"use client";
import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <OrderContext.Provider value={{ products, setProducts, open, setOpen }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
} 