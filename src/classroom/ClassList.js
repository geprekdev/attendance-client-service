import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useLogoutMutation, useValidatorTokenMutation } from "../auth/AuthAPI";
import { userLogin } from "../auth/AuthSlice";
import Layout from "../components/Layout";
import { useGetClassListsQuery } from "./ClassListAPI";
import Cookie from "../util/Cookie";
import ClassCard from "./ClassListCard";
import Logout from "../auth/Logout";

export default function ClassList() {
  console.log("RAN");

  const refreshToken = Cookie.getItem("s8refresh");
  const navigate = useNavigate();
  const [triggerLogout] = useLogoutMutation();
  const [triggerValidator] = useValidatorTokenMutation();

  const handleLogout = async () => {
    await triggerLogout({ refreshToken });
    Cookie.setItem("s8acctkn", null);
    Cookie.setItem("s8refresh", null);
    navigate("/auth/login/");
  };

  const { isLoading, isError, isSuccess, data } = useGetClassListsQuery("", {
    skip: true,
  });

  const verifyToken = async () => {
    const refreshToken = Cookie.getItem("s8refresh");
    const {
      data: { access },
    } = await triggerValidator(refreshToken);
  };

  useEffect(() => {
    if (!refreshToken) {
      navigate("/auth/login/");
      return;
    }

    // verifyToken();
  });

  return (
    <>
      <button className="btn-primary" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="text-center text-5xl">{isLoading && "LOADING..."}</h1>
      <h1 className="text-center text-7xl text-red-500">{isError && "Rsk"}</h1>

      {isSuccess
        ? data.map(c => (
            <div key={c.id}>
              <h1>{c.grade}</h1>
            </div>
          ))
        : ""}
    </>
  );
  // if (!accessToken && !refreshToken) {
  //   // delete cookie
  //   console.log("gagal");
  // } else {
  //   console.log("berhasil");

  // return (
  //   <>
  //     <button className="btn-primary" onClick={handleLogout}>
  //       Logout
  //     </button>
  //     <h1 className="text-center text-5xl">{isLoading && "LOADING..."}</h1>
  //     <h1 className="text-center text-7xl text-red-500">
  //       {isError && "Error"}
  //     </h1>

  //     {isSuccess
  //       ? data.map(c => (
  //           <div key={c.id}>
  //             <h1>{c.grade}</h1>
  //           </div>
  //         ))
  //       : ""}
  //   </>
  //   );
  // }
}

// ++++ token salah ++++
// langsung redirect ke login
// token salah otomatis bukan dari API
// ditambah sendiri

// Ketika di refresh semua state menjadi initial state

//

// PHP di halamann login cek, ada ga cookie ?
// cek variabel nama di cookie
//  fetch data dari database nama di cookie ada di database ?
//  kalo tidak tetep di login
// kalo ya redirect
