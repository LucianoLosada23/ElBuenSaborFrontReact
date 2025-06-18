import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { Cities, Provinces } from "../../types/address/Address";

interface AddressState {
  provinces: Provinces;
  cities: Cities;
}

const initialState: AddressState = {
  provinces: [],
  cities: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    //añadir todas las provincias
    addProvinces: (state, action: PayloadAction<Provinces>) => {
      state.provinces = action.payload;
    },
    
    //añadir todas las ciudades
    addCities: (state, action: PayloadAction<Cities>) => {
      state.cities = action.payload;
    },
  },
});

export const { addCities, addProvinces } = addressSlice.actions;
export default addressSlice.reducer;
