// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Outlet, useLocation } from "react-router";
// import { useValidatorTokenMutation } from "../auth/AuthAPI";
// import Login from "../auth/Login";
// import { userLogin } from "../auth/AuthSlice";
// import Cookie from "../util/Cookie";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import CheckRole from "../util/CheckRole";
import Cookie from "../util/Cookie";

// export default function ProtectedRouter() {
//   const [triggerValidator] = useValidatorTokenMutation();
//   const authSlice = useSelector(state => state.authSlice);
//   const [isLogin, setIsLogin] = useState(false);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   useEffect(() => {
//     async function rememberMe() {
//       try {
//         // const s8acctkn = Cookie.getItem("s8acctkn") || location.state.cookie;
//         if (!Cookie.getItem("s8refresh")) {
//           return false      ;
//         }

//         const s8refresh = Cookie.getItem("s8refresh");
//         await triggerValidator(s8refresh).unwrap();
//         // dispatch(userLogin({ isLogin: true }));
//         return true;
//       } catch (err) {
//         // console.clear();
//         console.log("err => ", err);

//         if (err.status === "FETCH_ERROR") {
//           console.log("Network err");
//           // Tampilkan halaman gangguan
//         }
//         // di sini error, mungkin karna network err
//         // Sehingga tampilkan halaman seperti tokped
//         return false;
//       }
//     }

//     const result = rememberMe();
//     setIsLogin(result);
//   }, []);

//   return <>{isLogin ? <Outlet /> : <Login />}</>;
// }

// navigate sambil mengirimkan data
export default function ProtectedRoute({ role }) {
  const token = Cookie.getItem("token");
  // const role = token.substring(token.length - 1);

  ///////////
  // setiap kali ke halaman login clear cookie

  // kalo ke halaman yang bukan role ;langsung ke login
  // teacher ke student. protected routernya student dicocokin sama role di cookie
  // kalo beda ke login
  // kalo sama alhamdulillah

  // let _role = token.substring(token.length - 1);

  // const r =
  //   _role === "0"
  //     ? "STUDENT"
  //     : _role === "1"
  //     ? "TEACHER"
  //     : _role === "2" && "STAFF";

  // console.log("ROLE ->", role);
  // console.log("_role ->", r);

  // if (role === r) {
  //   return <Outlet />;
  // }

  if (token) {
    return <Outlet />;
  }

  Cookie.deleteItem("token");
  return <Navigate to="/auth/login" />;

  // switch (role) {
  //   case role === "0":
  //     console.log("Student");
  //     return <Navigate to="/student/" state={true} />;
  //   case role === "1":
  //     console.log("Teacher");
  //     return <Navigate to="/teacher/" state={true} />;
  //   case role === "2":
  //     console.log("Staff");
  //     return <Navigate to="/staff/" state={true} />;
  //   default:
  //     console.log(role);
  //     return <Navigate to="/auth/login" />;
  // }

  // const location = useLocation();

  // if (!token) {
  //   return <Navigate to="/auth/login" />;
  // }

  // always add state and return <Outlet /> or infinity loop
  // We can't access directly without <Outlet /> or it will be <ProtectedRoute />

  // ketika redirect langsung ke url akan selalu masuk ke <ProtectedRoute />
  // di <ProtectedRoute /> akan ngecek role lalu redirect lagi ke url

  // if (location.state) {
  //   console.log("Location ->", location.state);
  //   return <Outlet />;
  // }

  /**
   * @description role code of token
   * 0 -> Student
   * 1 -> Teacher
   * 2 -> Staff
   */

  // console.log("Role ->", role);

  // return CheckRole(role);
}

// Manual
