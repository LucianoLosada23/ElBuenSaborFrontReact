import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import cartReducers from "../features/cartSlice"
import productReducers from "../features/productSlice"
import insumosCategoryReducer from '../features/insumosCategory/insumosCategorySlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducers,
    product : productReducers,
    insumosCategory: insumosCategoryReducer,
  },
});

// Tipos para usar con useSelector y useDispatch (si usás TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;