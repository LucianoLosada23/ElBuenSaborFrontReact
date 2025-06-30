/* --PROMOTIONS-- */

import { safeParse } from "valibot";
import { allPromotionsSchema, createPromotionsSchema, promotionsSchema, type CreatePromotions, type Promotions } from "../../../types/promotions/Promotions";
import axios from "axios";

// GET 
export const getAllPromotions = async () => {
  try { 
    const url = "http://localhost:8080/api/v1/promotions";
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    console.log(data);
    const result = safeParse(allPromotionsSchema, data);
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
export const createPromotion = async (promotion : CreatePromotions) => {
    console.log(promotion);
  try {
    const result = safeParse(createPromotionsSchema , promotion)
    
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    const url = "http://localhost:8080/api/v1/promotions/create";
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
export const updatePromotion = async (id : number , promotion: Promotions) => {
  try {
    const result = safeParse(promotionsSchema , promotion)
      if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
     const url = `http://localhost:8080/api/v1/promotions/${promotion.id}`;
      const { data } = await axios.put(url, result.output ,{
      withCredentials : true
    });
    return data
  } catch (error) {
    console.log(error);
    throw error;  
  }
}