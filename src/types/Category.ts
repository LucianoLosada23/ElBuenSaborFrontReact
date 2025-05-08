import { array, number, object, string, type InferOutput } from "valibot";


export const CategorySchema = object({
  id: number(),
  name: string(),
  description: string(),
  image: string(),
});


export const CategoriesSchema = array(CategorySchema);


export type Category = InferOutput<typeof CategorySchema>;


export type Categories = InferOutput<typeof CategoriesSchema>;
