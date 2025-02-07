"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store/use-user-store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const userStore = useUserStore();
  const router = useRouter();

  return (
    <div className="relative flex flex-col h-full items-center justify-center gap-4 mt-4">
      <div className="absolute left-4 -top-4 -rotate-45">
        <img src="/categories/burger.png" alt="health" className="w-10 h-10" />
      </div>
      <div className="absolute right-4 -top-4 rotate-45">
        <img src="/categories/dessert.png" alt="health" className="w-10 h-10" />
      </div>
      <div className="absolute left-4 -bottom-4 rotate-45">
        <img src="/categories/drink.png" alt="health" className="w-10 h-10" />
      </div>
      <div className="absolute right-4 -bottom-4 -rotate-45  ">
        <img src="/categories/fries.png" alt="health" className="w-10 h-10" />
      </div>
      <h1 className="font-bold text-2xl">Welcome to HealthDonald</h1>
      <p>Please login to continue</p>
      <form
        className="flex gap-2"
        action={(formData) => {
          const userName = formData.get("userName");
          userStore.login(userName);
          router.push("/");
          console.log(userName);
        }}
      >
        <Input type="text" placeholder="Username" name="userName" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
