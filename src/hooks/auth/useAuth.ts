import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { login, logout } from "../../features/auth/authSlice";
import type { UserMe } from "../../types/user/User";

export function useAuth() {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return {
    user,
    logoutUser : () => dispatch(logout()),
    loginUser: (userData: UserMe) => dispatch(login(userData)),
  };
}
