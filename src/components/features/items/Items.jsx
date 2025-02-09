import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { deleteItem } from "@/lib/items/delete-item";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useModifyStore } from "@/lib/store/use-modify-store";
import { Minus, Pencil, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Items = ({ item }) => {
  const { items, addItem, removeItem } = useCartStore();
  const { toggleModify } = useModifyStore();
  const quantity = items[item.id]?.quantity || 0;
  const router = useRouter();

  return (
    <Card key={item.id} className="relative min-w-36">
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
        <CardTitle className="text-center text-sm font-bold">
          {item.name}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex flex-col justify-end">
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
        {toggleModify && (
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-2 pt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Trash />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        console.log("Suppression de l'item avec id :", item.id);
                        deleteItem(item.id);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/items/${item.id}/edit`)}
              >
                <Pencil />
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
