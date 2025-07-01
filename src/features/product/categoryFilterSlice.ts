import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CategoryFilterState {
  selectedCategoryId: number | null; // ← Acepta null
}

const initialState: CategoryFilterState = {
  selectedCategoryId: null,
};

const categoryFilterSlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    setSelectedCategoryId: (state, action: PayloadAction<number | null>) => {
      state.selectedCategoryId = action.payload;
    },
  },
});

export const { setSelectedCategoryId } = categoryFilterSlice.actions;
export default categoryFilterSlice.reducer;
