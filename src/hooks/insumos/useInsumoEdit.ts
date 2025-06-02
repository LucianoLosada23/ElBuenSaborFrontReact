import { useSelector, useDispatch } from 'react-redux';

import type { IngredientCreate } from '../../types/Insumos/Ingredient';
import { useCallback } from 'react';
import type { AppDispatch, RootState } from '../../app/store';
import { clearInsumoEdit, setInsumoEdit } from '../../features/insumos/insumosSlice';

export const useInsumoEdit = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selecciona el insumo actual para editar del store
  const insumoEdit = useSelector((state: RootState) => state.insumos.insumoEdit);

  // Función para setear el insumo en edición
  const setEdit = useCallback((insumo: IngredientCreate | null) => {
    dispatch(setInsumoEdit(insumo));
  }, [dispatch]);

  // Función para limpiar el insumo en edición
  const clearEdit = useCallback(() => {
    dispatch(clearInsumoEdit());
  }, [dispatch]);

  return {
    insumoEdit,
    setEdit,
    clearEdit,
  };
};
