import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";
import type { RootState } from "../app/store";
import { clearSelectedCategory, setSelectedCategory } from "../features/categoriasSlice";

export const useCategorias = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.categorias.selectedCategory
  );

  const seleccionarCategoria = useCallback(
    (categoria: { id?: number; name: string; company: { id: number } }) => {
      dispatch(setSelectedCategory(categoria));
    },
    [dispatch]
  );

  const limpiarCategoria = useCallback(() => {
    dispatch(clearSelectedCategory());
  }, [dispatch]);

  return {
    selectedCategory,
    seleccionarCategoria,
    limpiarCategoria,
  };
};
