// hooks/useCategoryFilter.ts
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { setSelectedCategoryId as setCategoryFilterAction } from "../features/product/categoryFilterSlice";

export function useCategoryFilter() {
  const dispatch = useDispatch();
  const selectedCategoryId = useSelector((state: RootState) => state.categoryFilter.selectedCategoryId);

  const setCategoryFilter = (categoryId: number | null) => {
    dispatch(setCategoryFilterAction(categoryId));
  };

  return { selectedCategoryId, setCategoryFilter };
}
