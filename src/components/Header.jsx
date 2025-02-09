"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useModifyStore } from "@/lib/store/use-modify-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { toggleModify, setToggleModify } = useModifyStore();

  if (!userStore) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild variant="outline">
        <button className="flex items-center gap-2 font-bold">
          <User size={12} />
          <span>{userStore}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {userStore === "admin" && (
          <>
            <DropdownMenuItem onClick={() => router.push("/items/new")}>
              Add item
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setToggleModify(!toggleModify)}
              className={
                toggleModify ? "bg-green-500/10 font-bold text-green-500" : ""
              }
            >
              Modify
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem className="text-red-500" onClick={() => logout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
