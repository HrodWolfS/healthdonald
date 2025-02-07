import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/use-cart-store";
import { Minus, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const CartBarItem = ({ item, quantity: qtyProp }) => {
  const { items, removeItem } = useCartStore();
  const quantity = qtyProp || items[item.id]?.quantity || 0;
  const [isHovered, setIsHovered] = useState(false);

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center gap-2 rounded-md border">
          <Image
            src={item.image}
            alt={item.name}
            className="size-10"
            width={44}
            height={44}
          />
          <Badge className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-slate-500/40 px-2 text-sm text-gray-500">
            {quantity}
          </Badge>
        </div>
        <p className="font-bold">{item.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">${totalPrice}</p>
        <Button
          onClick={() => removeItem(item)}
          variant="outline"
          size="icon"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? <Minus /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};
