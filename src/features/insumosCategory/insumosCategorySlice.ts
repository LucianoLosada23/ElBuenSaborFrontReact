import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface InsumosCategoryState {
  selectedParentId: number | null;
}

const initialState: InsumosCategoryState = {
  selectedParentId: null,
};

export const insumosCategorySlice = createSlice({
  name: 'insumosCategory',
  initialState,
  reducers: {
    setSelectedParentId: (state, action: PayloadAction<number | null>) => {
      state.selectedParentId = action.payload;
    },
  },
});

export const { setSelectedParentId } = insumosCategorySlice.actions;

export default insumosCategorySlice.reducer;
