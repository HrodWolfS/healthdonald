"use client";

import { Button } from "@/components/ui/button";
import { useCartStore, useCartTotalPrice } from "@/lib/store/use-cart-store";
import { AddDessert } from "../../src/components/features/cart/AddDessert";
import { CartBarItem } from "../../src/components/features/cart/CartBarItem";
import Link from "next/link";
export default function Checkout() {
  const { items } = useCartStore();
  const totalPrice = useCartTotalPrice();

  const isDessertPresent = () => {
    // On vérifie dans les items actifs (quantité > 0) si l'un d'eux est un dessert.
    return Object.values(items)
      .filter(({ quantity }) => quantity > 0)
      .some(({ item }) => item.category.toLowerCase() === "dessert");
  };

  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">Checkout</h1>
      <div className="p-1">
        <div className="mb-4 flex justify-between border-b border-gray-200 pb-2">
          <p className="text-lg font-bold">Cart</p>
          <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
        </div>
        <ul>
          {Object.values(items)
            .filter(({ quantity }) => quantity > 0)
            .map(({ item, quantity }) => (
              <li key={item.id} className="py-2">
                <CartBarItem item={item} quantity={quantity} />
              </li>
            ))}
        </ul>
      </div>
      {isDessertPresent() ? null : <AddDessert />}
      <Link href="/checkout/success">
      <Button className="mt-4 w-full bg-green-500 font-bold text-white hover:bg-green-600"
      
      >
        Confirm Order
      </Button>
      </Link>
    </div>
  );
}
