"use client";

import { useEffect, useState } from "react";
import { getItems } from "../../../lib/items/get-items";
import { Items } from "./Items";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, []);
  return (
    <div className="mb-8 grid w-full grid-cols-2 gap-4">
      {items.map((item) => (
        <Items key={item.id} item={item} />
      ))}
    </div>
  );
};
