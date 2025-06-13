import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserMe } from "../../types/user/User";

interface UserAuth {
  user: UserMe | null;
}

const initialState: UserAuth = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserMe>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;