import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store"; // Ajusta esta ruta según tu estructura
import { setState, toggleState } from "../../features/ui/uiSlice"; // Ajusta esta ruta también
import type { UIState } from "../../features/ui/uiSlice"; // Asegúrate de exportar la interfaz

type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

export const useUIState = () => {
  const dispatch = useDispatch();

  // Seleccionamos todo el estado UI
  const uiState = useSelector((state: RootState) => state.ui);

  // Función para alternar cualquier booleano
  const toggle = <K extends BooleanKeys<UIState>>(key: K) => {
    dispatch(toggleState(key));
  };

  const set = <K extends BooleanKeys<UIState>>(key: K, value: boolean) => {
    dispatch(setState({ key, value }));
  };
  return {
    ...uiState,
    set,
    toggle,
  };
};
