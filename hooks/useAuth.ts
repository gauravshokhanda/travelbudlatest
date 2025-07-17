// hooks/useAuth.ts
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  return {
    isLoggedIn: !!token,
    user,
    token,
  };
};
