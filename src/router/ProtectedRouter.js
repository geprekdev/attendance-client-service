import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { useValidatorTokenMutation } from "../auth/AuthAPI";
import Login from "../auth/Login";
import { userLogin } from "../auth/AuthSlice";
import Cookie from "../util/Cookie";

export default function ProtectedRouter() {
  const [triggerValidator] = useValidatorTokenMutation();
  const authSlice = useSelector(state => state.authSlice);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function rememberMe() {
      try {
        // const s8acctkn = Cookie.getItem("s8acctkn") || location.state.cookie;
        if (!Cookie.getItem("s8refresh")) {
          return false      ;
        }

        const s8refresh = Cookie.getItem("s8refresh");
        await triggerValidator(s8refresh).unwrap();
        // dispatch(userLogin({ isLogin: true }));
        return true;
      } catch (err) {
        // console.clear();
        console.log("err => ", err);

        if (err.status === "FETCH_ERROR") {
          console.log("Network err");
          // Tampilkan halaman gangguan
        }
        // di sini error, mungkin karna network err
        // Sehingga tampilkan halaman seperti tokped
        return false;
      }
    }

    const result = rememberMe();
    setIsLogin(result);
  }, []);

  return <>{isLogin ? <Outlet /> : <Login />}</>;
}
