import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isEmployeeModalOpen: boolean,
  isLoginModal : boolean,
  isProductModal : boolean,
  isProductOpen : boolean;
  isCartOpen: boolean;
  isInsumosCategoryOpen : boolean,
  isInsumosSubCategoryOpen : boolean
  isProductCategoryOpen : boolean,
  isProductSubCategoryOpen : boolean,
  isFacturacionOpen: boolean;
  isInsumosOpen : boolean;
  isPromotionsOpen : boolean;
  isPromotionsTypesOpen : boolean
  // Agrega aquí más propiedades booleanas si quieres reutilizar la función
}

const initialState: UIState = {
  isEmployeeModalOpen : false,
  isLoginModal : false,
  isProductModal : false,
  isProductOpen : false,
  isInsumosOpen : false,
  isInsumosCategoryOpen : false,
  isInsumosSubCategoryOpen : false,
  isProductCategoryOpen : false,
  isProductSubCategoryOpen : false,
  isCartOpen: false,
  isFacturacionOpen: false,
  isPromotionsOpen : false,
  isPromotionsTypesOpen : false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleState: (
      state,
      action: PayloadAction<keyof UIState>
    ) => {
      const key = action.payload;
      state[key] = !state[key];
    },
     setState: (
      state,
      action: PayloadAction<{ key: keyof UIState; value: boolean }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { toggleState , setState} = uiSlice.actions;
export default uiSlice.reducer;
