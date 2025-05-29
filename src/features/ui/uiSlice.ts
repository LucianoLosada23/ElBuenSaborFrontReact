import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isCartOpen: boolean;
  isInsumosCategoryOpen : boolean,
  isInsumosSubCategoryOpen : boolean
  isProductCategoryOpen : boolean,
  isProductSubCategoryOpen : boolean,
  isFacturacionOpen: boolean;
  isInsumosOpen : boolean
  // Agrega aquí más propiedades booleanas si quieres reutilizar la función
}

const initialState: UIState = {
  isInsumosOpen : false,
  isInsumosCategoryOpen : false,
  isInsumosSubCategoryOpen : false,
  isProductCategoryOpen : false,
  isProductSubCategoryOpen : false,
  isCartOpen: false,
  isFacturacionOpen: false,
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
  },
});

export const { toggleState } = uiSlice.actions;
export default uiSlice.reducer;
