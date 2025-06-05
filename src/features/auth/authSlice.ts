import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthType {
  isAuthenticated: boolean;
  userRole: string | null;
}

const initialState: AuthType = {
  isAuthenticated: false,
  userRole: null,
};

interface LoginPayload {
  role: string;
  token: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.userRole = action.payload.role;
      state.isAuthenticated = true;
      // localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      // localStorage.removeItem("token"); // si guardás token
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
