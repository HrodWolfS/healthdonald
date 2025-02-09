"use client";
import { CartBar } from "@/components/features/cart/CartBar";
import { CategoriesList } from "@/components/features/categories/CategoriesList";
import { useUserStore } from "@/lib/store/use-user-store";
import { ItemsList } from "../src/components/features/items/ItemsList";
import LoginPage from "./login/page";
export default function Home() {
  const userName = useUserStore((s) => s.userName);

  if (!userName) {
    return <LoginPage />;
  }

  return (
    <div className="flex max-h-full flex-col">
      <div className="flex flex-1 gap-4 overflow-hidden">
        <CategoriesList />
        <ItemsList />
      </div>

      <CartBar />
    </div>
  );
}
