import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserMe } from "../../types/user/User";

// Leer el usuario desde el localStorage (si existe)
const storedUser = localStorage.getItem('user');
const initialState: UserAuth = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

interface UserAuth {
  user: UserMe | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserMe>) => {
      state.user = action.payload;
      // Guardar en localStorage cuando el usuario haga login
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      // Eliminar el usuario del localStorage cuando el usuario haga logout
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
