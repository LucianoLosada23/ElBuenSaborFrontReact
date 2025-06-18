import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import cartReducers from "../features/cartSlice"
import productReducers from "../features/product/productSlice"
import insumosCategoryReducer from '../features/insumosCategory/insumosCategorySlice';
import categoriasReducer from '../features/categoriasSlice';
import insumosReducer from  '../features/insumos/insumosSlice';
import authReducer from '../features/auth/authSlice'
import addressReducer from '../features/address/addressSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    categorias: categoriasReducer,
    cart: cartReducers,
    product : productReducers,
    insumosCategory: insumosCategoryReducer,
    insumos: insumosReducer,
    auth : authReducer,
    address : addressReducer
  },
});

// Tipos para usar con useSelector y useDispatch (si usás TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;