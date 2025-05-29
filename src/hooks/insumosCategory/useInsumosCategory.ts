import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { setSelectedParentId } from '../../features/insumosCategory/insumosCategorySlice';

export const useInsumosCategory = () => {
  const dispatch = useDispatch();
  const selectedParentId = useSelector(
    (state: RootState) => state.insumosCategory.selectedParentId
  );

  const selectParentCategory = (id: number | null) => {
    dispatch(setSelectedParentId(id));
  };

  return {
    selectedParentId,
    selectParentCategory,
  };
};
