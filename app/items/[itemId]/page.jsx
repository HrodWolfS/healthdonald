"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/categories-data";
import { getId } from "@/lib/get-id";
import { setItem } from "@/lib/items/set-items";
import { useUserStore } from "@/lib/store/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  id: z
    .string()
    .min(2, "L'ID doit contenir au moins 2 caractères")
    .max(50, "L'ID est trop long"),
  name: z
    .string()
    .min(2, "Le nom est trop court")
    .max(50, "Le nom est trop long"),
  category: z
    .string()
    .min(2, "Catégorie invalide")
    .max(50, "Catégorie invalide"),
  price: z.coerce
    .number()
    .min(0, "Le prix ne peut pas être négatif")
    .max(1000, "Prix trop élevé"),
  image: z.any(),
});

export default function ItemForm() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  // Crée tes méthodes de formulaire
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
      category: "",
      price: "",
      image: null,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  // Surveille le champ "name" et met à jour "id" automatiquement en remplaçant les espaces par '-'
  const nameValue = watch("name");
  useEffect(() => {
    if (nameValue) {
      setValue("id", getId(nameValue));
    }
  }, [nameValue, setValue]);

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event, field) => {
    const file = event.target.files[0];
    field.onChange(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submitForm = async (data) => {
    setIsLoading(true);
    await setItem(data, getId(data.name), {
      price: data.price * 100,
      name: data.name,
      category: data.category,
      image: data.image,
    });
    toast.success("Item ajouté avec succès !");
    router.push("/");
    setIsLoading(false);
  };

  const userName = useUserStore((s) => s.userName);
  if (userName !== "admin") {
    return (
      <div className="mt-10 p-4 text-center text-2xl font-bold text-red-500">
        Vous n'avez pas les permissions pour ajouter un item
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitForm)}
        className="mx-4 space-y-4"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label className="text-sm font-bold">Nom</Label>
              <FormControl>
                <Input {...field} placeholder="Nom de l'item" />
              </FormControl>
              <FormMessage>{errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <Label className="text-sm font-bold">ID</Label>
              <FormControl>
                <Input {...field} placeholder="ID de l'item" />
              </FormControl>
              <FormMessage>{errors.id?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <Label className="text-sm font-bold">Category</Label>
              <FormControl>
                <Select
                  value={selectedCategory.title}
                  onValueChange={(value) => {
                    const category = CATEGORIES.find((c) => c.title === value);
                    setSelectedCategory(category);
                    field.onChange(category.title);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select a Category"
                      value={selectedCategory.title}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.title}>
                        <div className="flex items-center gap-2">
                          <Image
                            src={category.logo}
                            alt={category.title}
                            width={24}
                            height={24}
                          />
                          <span>{category.title}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.category?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <Label className="text-sm font-bold">Prix (€)</Label>
              <FormControl>
                <Input type="number" {...field} placeholder="Prix de l'item" />
              </FormControl>
              <FormMessage>{errors.price?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <Label className="text-sm font-bold">Image</Label>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, field)}
                  />
                </FormControl>
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={56}
                    height={56}
                    className="mt-2 rounded object-cover"
                  />
                )}
              </div>
              <FormMessage>{errors.image?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="ml-2 size-4 animate-spin" />
              Ajout en cours...
            </>
          ) : (
            "Ajouter l'item"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
