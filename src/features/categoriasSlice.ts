import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Category {
  id?: number;
  name: string;
  company: {
    id: number;
  };
}

interface CategoriasState {
  selectedCategory: Category | null;
}

const initialState: CategoriasState = {
  selectedCategory: null,
};

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setSelectedCategory, clearSelectedCategory } = categoriasSlice.actions;

export default categoriasSlice.reducer;
