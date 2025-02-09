"use client";
import { getItems } from "../../../lib/items/get-items";
import { Items } from "./Items";
import { useCategoryStore } from "@/lib/store/use-category-store";
import useSWR from "swr";

export const ItemsList = () => {
  const categoryId = useCategoryStore((s) => s.currentCategory);

  const { data, isLoading, mutate } = useSWR(
    `/categories/${categoryId}`,
    async () => await getItems(categoryId)
  );

  console.log(data);

  return (
    <div className="grid max-h-full grid-cols-2 gap-4 overflow-x-auto pb-12">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.map((item) => <Items key={item.id} item={item} mutate={mutate} />)
      )}
    </div>
  );
};
