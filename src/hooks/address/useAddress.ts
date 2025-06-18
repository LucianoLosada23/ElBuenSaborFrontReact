import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCities, addProvinces } from "../../features/address/addressSlice";
import type { Cities, Provinces } from "../../types/address/Address";

export default function useAddress() {
  const dispatch = useAppDispatch();
  const provinces = useAppSelector((state) => state.address.provinces);
  const cities = useAppSelector((state) => state.address.cities);
  return {
    provinces,
    cities,
    setProvinces: (p: Provinces) => dispatch(addProvinces(p)),
    setCities: (c: Cities) => dispatch(addCities(c)),
  };
}
