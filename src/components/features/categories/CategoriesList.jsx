import { CATEGORIES } from "@/lib/categories-data";
import { useCategoryStore } from "@/lib/store/use-category-store";
import Image from "next/image";

export const CategoriesList = () => {
  const { currentCategory, setCurrentCategory } = useCategoryStore();

  return (
    <div className=" flex h-full flex-col gap-4">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          className={`flex cursor-pointer flex-col items-center rounded-lg border border-gray-300 p-1 ${
            currentCategory === category.id ? "bg-gray-200" : "bg-transparent"
          }`}
          onClick={() => setCurrentCategory(category.id)}
        >
          <Image
            src={category.logo}
            alt={category.title}
            width={32}
            height={32}
          />
          <p className="text-sm">{category.title}</p>
        </button>
      ))}
    </div>
  );
};
