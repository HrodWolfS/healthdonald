"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { ShoppingBasket, User } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const { items } = useCartStore();
  return (
    <header className="flex items-center gap-2 border-b px-4 py-2 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/healthdonals.png"
          alt="HealthDonald"
          width={32}
          height={32}
        />
        <h1 className="text-sm font-bold">HealthDonald</h1>
      </Link>
      <div className="ml-auto">
        <UserNameHeader />
      </div>
      <Button
        variant="outline"
        size="sm"
        className="inline-flex items-center gap-2"
      >
        <span className="font-bold">
          {Object.values(items).reduce(
            (total, item) => total + item.quantity,
            0
          )}
        </span>
        <ShoppingBasket size={12} />
      </Button>
    </header>
  );
};

const UserNameHeader = () => {
  const userStore = useUserStore((s) => s.userName);
  const logout = useUserStore((s) => s.logout);

  if (!userStore) return null;
  return (
    <button
      className="flex items-center gap-2 font-bold"
      onClick={() => logout()}
    >
      <User size={12} />
      <span>{userStore}</span>
    </button>
  );
};
