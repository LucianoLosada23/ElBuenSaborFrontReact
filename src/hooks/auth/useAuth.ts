import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { login, logout } from "../../features/auth/authSlice";

export function useAuth() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const dispatch = useDispatch();

  return {
    isAuthenticated,
    userRole,
    loginUser: (payload: { role: string; token: string }) => dispatch(login(payload)),
    logout: () => dispatch(logout()),
  };
}