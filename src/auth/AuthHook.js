import { useSelector } from "react-redux";
import { useValidatorTokenMutation } from "./AuthAPI";

export const useAuth = async () => {
  const [triggerValidator] = useValidatorTokenMutation();
  let authSlice = useSelector(state => state.authSlice);

  const res = await triggerValidator(authSlice.value.accessToken);
  console.log("Response", res);

  // return [authSlice, setAuth];
  return authSlice;
};
