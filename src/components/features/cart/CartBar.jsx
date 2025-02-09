import { Button } from "@/components/ui/button";
import {
  useCartQuantity,
  useCartStore,
  useCartTotalPrice,
} from "@/lib/store/use-cart-store";
import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CartBarItem } from "./CartBarItem";
export const CartBar = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const items = useCartStore((state) => state.items);
  const cartQuantity = useCartQuantity();
  const totalPrice = useCartTotalPrice();

  // Si le panier est vide, n'affiche rien.
  if (cartQuantity === 0) return null;

  const toggleMenu = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-lg border-t border-gray-200 bg-white shadow-lg">
      {/* Bouton pour déplier/replier le menu */}
      <div className="flex justify-center">
        <Button variant="ghost" onClick={toggleMenu}>
          <ChevronUp
            className={`transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {/* Menu déroulant listant les items */}
      {isExpanded && (
        <div className="max-h-60 overflow-y-auto p-3">
          <div className="mb-4 flex justify-between border-b border-gray-200 pb-2">
            <p className="text-lg font-bold">Cart</p>
            <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
          <ul>
            {Object.values(items)
              .filter(({ quantity }) => quantity > 0)
              .map(({ item, quantity }) => (
                <li key={item.id} className="py-1">
                  <CartBarItem item={item} quantity={quantity} />
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Bouton de checkout */}
      <div className="border-t border-gray-200 p-3">
        <Button className="w-full" onClick={() => router.push("/checkout")}>
          Checkout
        </Button>
      </div>
    </div>
  );
};
