import {
  object,
  number,
  string,
  array,
  null_,
  union,
  type InferOutput,
} from 'valibot';

// Company Schema
export const CompanySchema = object({
  id: number(),
});

// Ingredient Schema
export const IngredientSchema = object({
  id: number(),
});

// ProductIngredient Schema
export const ProductIngredientSchema = object({
  id: number(),
  ingredient: IngredientSchema,
  quantity: number(),
});

// ParentCategorySchema mínimo (solo con los campos necesarios)
const ParentCategorySchema = object({
  id: number(),
  name: string(),
});

// Category Schema
export const CategorySchema = object({
  id: number(),
  name: string(),
  company: CompanySchema,
  parent: union([ParentCategorySchema, null_()]), // puede ser objeto o null
});

// Product Schema
export const ProductSchema = object({
  id: number(),
  company: CompanySchema,
  category: CategorySchema,
  title: string(),
  description: string(),
  estimatedTime: number(),
  price: number(),
  image: string(), // URL o base64
  productIngredients: array(ProductIngredientSchema),
});

// Tipado para TypeScript
export type Product = InferOutput<typeof ProductSchema>;
