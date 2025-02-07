import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/lib/store/use-cart-store";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export const Items = ({ item }) => {
  const { items, addItem, removeItem } = useCartStore();

  const quantity = items[item.id]?.quantity || 0;

  return (
    <Card key={item.id} className="relative">
      <CardContent>
        <Image
          src={item.image}
          alt={item.name}
          className="rounded-md object-cover"
          width={160}
          height={160}
        />
        <p className="absolute right-2 top-2 text-xl font-bold">
          ${item.price}
        </p>
        <CardTitle className="text-center text-lg font-bold">
          {item.name}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex justify-end">
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeItem(item)}
            >
              <Minus />
            </Button>
            <span>{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => addItem(item)}>
              <Plus />
            </Button>
          </div>
        ) : (
          <Button onClick={() => addItem(item)}>Add</Button>
        )}
      </CardFooter>
    </Card>
  );
};
