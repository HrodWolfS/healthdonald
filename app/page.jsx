"use client";
import { CartBar } from "@/components/features/cart/CartBar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/use-user-store";
import { useRouter } from "next/navigation";
import { ItemsList } from "../src/components/features/items/ItemsList";
import LoginPage from "./login/page";

export default function Home() {
  const userName = useUserStore((s) => s.userName);
  const router = useRouter();

  if (!userName) {
    return <LoginPage />;
  }

  return (
    <div className="p-4">
      <ItemsList />
      {userName === "admin" && (
        <Button
          className="fixed bottom-14 left-4 font-bold shadow-lg"
          onClick={() => router.push("/items/new")}
        >
          New
        </Button>
      )}
      <CartBar />
    </div>
  );
}
