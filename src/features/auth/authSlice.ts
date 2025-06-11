import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthType {
  isAuthenticated: boolean;
  token : string;
  userRole: string | null;
}

const initialState: AuthType = {
  isAuthenticated: false,
  token : "",
  userRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthType>) => {
      state.userRole = action.payload.userRole;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.userRole = null;
      // localStorage.removeItem("token"); // si guardás token
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
