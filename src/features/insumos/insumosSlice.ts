import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Ingredient} from '../../types/Insumos/Ingredient';

interface InsumosState {
  insumoEdit: Ingredient | null;
}

const initialState: InsumosState = {
  insumoEdit: null,
};

export const insumosSlice = createSlice({
  name: 'insumos',
  initialState,
  reducers: {
    setInsumoEdit: (state, action: PayloadAction<Ingredient | null>) => {
      state.insumoEdit = action.payload;
    },
    clearInsumoEdit: (state) => {
      state.insumoEdit = null;
    },
  },
});

export const { setInsumoEdit, clearInsumoEdit } = insumosSlice.actions;

export default insumosSlice.reducer;
