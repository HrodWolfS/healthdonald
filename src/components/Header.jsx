import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center gap-2 px-4 py-2 border-b shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/healthdonals.png"
          alt="HealthDonald"
          width={32}
          height={32}
        />
        <h1 className="text-sm font-bold">HealthDonald</h1>
      </Link>
      <div className="ml-auto"></div>
      <Button
        variant="outline"
        size="sm"
        className="inline-flex gap-2 items-center"
      >
        <span className="font-bold">0</span>
        <ShoppingBasket size={12} />
      </Button>
    </header>
  );
};
