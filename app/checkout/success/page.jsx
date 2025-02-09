"use client";

import { useCartStore } from "@/lib/store/use-cart-store";
import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    useCartStore.setState({ items: {} });
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Order confirmed</h1>
      <p className="text-lg">Thank you for your order</p>
    </div>
  );
};

export default Success;
