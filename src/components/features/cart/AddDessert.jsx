import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import useSWR from "swr";
import { getItems } from "../../../lib/items/get-items";
import { Items } from "../items/Items";
export const AddDessert = () => {
  const { data, isLoading } = useSWR(`/categories/dessert`, async () => {
    const items = await getItems("Dessert");
    return items;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 border-t border-gray-200 pt-4">
      <h1 className="text-2xl font-bold">Would you like a dessert ?</h1>
      <Carousel className="w-full max-w-[280px]">
        <CarouselContent className="-ml-6">
          {data?.map((item) => (
            <CarouselItem key={item.id} className="basis-1/2 pl-1">
              <div className="p-1">
                <Items item={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
