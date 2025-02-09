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
import { getItem } from "@/lib/items/get-item";
import { updateItem } from "@/lib/items/set-items";
import { useUserStore } from "@/lib/store/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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

export default function EditItem() {
  const router = useRouter();
  const params = useParams();
  const itemId = params.itemId; // On récupère l'id dynamique depuis l'URL

  // State pour gérer la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  // Pour gérer le chargement de l'item
  const [loadingItem, setLoadingItem] = useState(true);

  // Initialisation du form avec des valeurs vides
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

  const {
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = methods;

  // Surveille le champ "name" pour générer l'ID automatiquement (si besoin)
  const nameValue = watch("name");
  useEffect(() => {
    if (nameValue) {
      setValue("id", getId(nameValue));
    }
  }, [nameValue, setValue]);

  // Charger l'item et remplir le formulaire avec ses valeurs actuelles
  useEffect(() => {
    async function fetchItem() {
      if (!itemId) return;
      try {
        const itemData = await getItem(itemId);
        if (itemData) {
          reset({
            name: itemData.name,
            id: itemData.id,
            category: itemData.category,
            price: itemData.price,
            image: itemData.image || null,
          });
          setSelectedCategory(itemData.category);
        } else {
          toast.error("❌ Item non trouvé dans Firestore !");
          router.push("/");
        }
      } catch (error) {
        console.error("❌ Erreur lors du chargement de l'item:", error);
        toast.error("Erreur lors du chargement de l'item");
      } finally {
        setLoadingItem(false);
      }
    }
    fetchItem();
  }, [itemId, reset, router]);

  const submitForm = async (data) => {
    try {
      await updateItem(
        {
          price: data.price,
          name: data.name,
          category: data.category,
          image: data.image,
        },
        itemId
      );

      toast.success("✅ Item modifié avec succès !");
      router.push("/");
    } catch (error) {
      console.error("❌ Erreur lors de la modification de l'item:", error);
      toast.error("Erreur lors de la modification de l'item");
    }
  };

  const userName = useUserStore((s) => s.userName);
  if (userName !== "admin") {
    return (
      <div className="mt-10 p-4 text-center text-2xl font-bold text-red-500">
        Vous n'avez pas les permissions pour modifier un item
      </div>
    );
  }

  if (loadingItem) {
    return <div>Chargement des données de l'item...</div>;
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
                <Input {...field} placeholder="ID de l'item" readOnly />
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
              <Label className="text-sm font-bold">Catégorie</Label>
              <FormControl>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
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
                    onChange={(event) => {
                      const file = event.target.files[0];
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                {field.value && typeof field.value === "string" && (
                  <Image
                    src={field.value}
                    alt="Image actuelle"
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
        <div className="mt-4 flex gap-4">
          <Button type="submit">Modifier l'item</Button>
          <Button onClick={() => router.push("/")}>Annuler</Button>
        </div>
      </form>
    </FormProvider>
  );
}
