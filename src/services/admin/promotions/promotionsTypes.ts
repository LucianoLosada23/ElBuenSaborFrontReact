import axios from "axios";
import { safeParse } from "valibot";
import { allTypePromotionSchema, createtypePromotionSchema, typePromotionSchema, type CreatetypePromotion, type TypePromotion } from "../../../types/promotions/Promotions";

/* --PROMOTIONS TYPES-- */

// GET 
export const getAllPromotionsTypes = async () => {
  try { 
    const url = "http://localhost:8080/api/v1/promotion-types/bycompany";
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    const result = safeParse(allTypePromotionSchema, data);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;  
  }
}

// POST 
export const createPromotionTypes = async (promotionType : CreatetypePromotion) => {
  try {
    const result = safeParse(createtypePromotionSchema , promotionType)
    
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    const url = "http://localhost:8080/api/v1/promotion-types/create";
      const { data } = await axios.post(url, result.output ,{
      withCredentials : true
    });
    return data
  } catch (error) {
    console.log(error);
    throw error;  
  }
}

//PUT 
export const updatePromotionTypes = async (id : number , promotionType : TypePromotion) => {
  try {
    const result = safeParse(typePromotionSchema , promotionType)
      if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
     const url = `http://localhost:8080/api/v1/promotion-types/${promotionType.id}`;
      const { data } = await axios.put(url, result.output ,{
      withCredentials : true
    });
    return data
  } catch (error) {
    console.log(error);
    throw error;  
  }
}

//Delete 
export const deletePromotionType = async (id : number) => {
  try {
    const url = `http://localhost:8080/api/v1/promotion-types/${id}`;
    const {data} = await axios.delete(url ,{
      withCredentials : true
    })
    return data
  } catch (error) {
    console.log(error);
    throw error;  
  }
}
