import { optional, object, number, string, array, null_, union, type InferOutput } from "valibot";
import { companySchema } from "../Company/Company";

// Ingredient
export const IngredientSchema = object({ id: number() });

// Base de ingrediente para reuso
const BaseProductIngredientSchema = {
  ingredient: IngredientSchema,
  quantity: number(),
};

// ✅ Ingredient con ID
export const ProductIngredientSchema = object({
  id: number(),
  ...BaseProductIngredientSchema,
});

// ✅ Ingredient sin ID (para post)
export const PostProductIngredientSchema = object(BaseProductIngredientSchema);

// Categoría
const ParentCategorySchema = object({
  id: number(),
  name: string(),
});

export const CategorySchema = object({
  id: number(),
  name: string(),
  company: companySchema,
  parent: union([ParentCategorySchema, null_()]),
});

const SimpleCategorySchema = object({ id: number() });

// Base product sin ID
const BaseProductSchema = {
  company: companySchema,
  category: CategorySchema,
  title: string(),
  description: string(),
  estimatedTime: number(),
  price: number(),
  profit_percentage: number(),
  image: optional(union([string(), null_()])),
  promotionalPrice: optional(union([number(), null_()])),
};

// Producto completo con IDs
export const ProductSchema = object({
  id: number(),
  ...BaseProductSchema,
  productIngredients: array(ProductIngredientSchema),

  promotionType: optional(union([string(), null_()])),
  promotionalPrice: optional(union([number(), null_()])),
  promotionalExtraValue: optional(union([number(), null_()])),
  promotionDescription: optional(union([string(), null_()])),
});

// Producto para POST sin IDs
export const PostProductSchema = object({
  ...BaseProductSchema,
  category: SimpleCategorySchema, // sobrescribe solo category
  productIngredients: array(PostProductIngredientSchema),
});

// Tipos
export type Product = InferOutput<typeof ProductSchema>;
export type PostProduct = InferOutput<typeof PostProductSchema>;
