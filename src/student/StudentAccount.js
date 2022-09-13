import { mdiClose, mdiCheckBold, mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import Cookie from "../util/Cookie";
import { useGetStudentAccountQuery } from "./StudentAPI";

export default function StudentAccount() {
  const { isLoading, isSuccess, data, isError, error } =
    useGetStudentAccountQuery({
      token: Cookie.getItem("token").slice(0, -1),
    });

  const navigate = useNavigate();

  const handleLogout = () => {
    const yes = window.confirm("Apakah anda ingin keluar ?");
    if (yes) {
      Cookie.deleteItem("token");
      navigate("/auth/login");
    }
  };

  // Unauthorize
  if (isError && error.status === 401) {
    Cookie.deleteItem("token");
    return <Navigate to={"/auth/login"} />;
  }

  // Role permission
  if (isError && error.status === 403) {
    Cookie.deleteItem("token");
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Layout title="Student Account" role="STUDENT">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        <div className="flex items-center justify-between rounded-full bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 text-xl text-white">
          <p>Account</p>
          <button onClick={handleLogout}>
            <Icon path={mdiLogout} size="24px" />
          </button>
        </div>
        &nbsp;
        <div className="relative mx-auto mt-20 rounded-lg bg-white shadow-xl ">
          <div className="flex justify-center">
            <img
              src="/person_placeholder.jpg"
              alt="Logo"
              className="absolute -top-20 mx-auto h-32 w-32 transform rounded-full border-4 border-white shadow-md transition duration-200 hover:animate-pulse"
            />
          </div>

          <div className="mt-16">
            {isLoading && (
              <>
                <div className="mx-auto w-[50%]">
                  <Skeleton
                    margin="mx-auto"
                    width="80%"
                    rounded="lg"
                    color="bg-gradient-to-r from-[#63c2f0] to-indigo-100"
                    height="2em"
                  />
                </div>

                <div className="mx-auto mt-3 w-[20%]">
                  <Skeleton
                    margin="mx-auto"
                    width="80%"
                    rounded="lg"
                    color="bg-gradient-to-r from-[#63c2f0] to-indigo-100"
                    height="2em"
                  />
                </div>
              </>
            )}

            {isSuccess && (
              <>
                <h1 className="text-center text-2xl">
                  {data.user.first_name} {data.user.last_name}
                </h1>
                <p className="text-center text-sm text-gray-900">
                  @{data.user.username}
                </p>
              </>
            )}

            <div className="my-5 w-full">
              <h3 className="text-bold px-6 text-left text-sm text-gray-900">
                Recent Activites
              </h3>
              <div className="mt-5 flex w-full flex-col items-center overflow-hidden text-sm">
                {isLoading && (
                  <>
                    <div className="flex w-full items-center border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100 ">
                      <div className="mx-auto w-[90%]">
                        <Skeleton
                          height="100px"
                          color="bg-gradient-to-r from-[#63c2f0] to-indigo-100"
                          rounded="lg"
                        />
                      </div>
                    </div>
                    <div className="flex w-full items-center border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100 ">
                      <div className="mx-auto w-[90%]">
                        <Skeleton
                          height="100px"
                          color="bg-gradient-to-r from-[#63c2f0] to-indigo-100"
                          rounded="lg"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* {isSuccess &&
                  Object.entries(data)[1][1]
                    .slice(0, 5)
                    ?.map((presence, idx) => (
                      <div
                        className="flex w-full items-center border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100 "
                        key={idx}
                      >
                        {presence.status === "HADIR" ? (
                          <Icon
                            size="19px"
                            className={`mx-1 text-green-600`}
                            path={mdiCheckBold}
                          />
                        ) : presence.status === "ALPHA" ? (
                          <Icon
                            size="19px"
                            className={`mx-1 text-red-600`}
                            path={mdiClose}
                          />
                        ) : (
                          ""
                        )}
                        <p>{presence.name}</p>
                        &nbsp;
                        <p className="text-xs text-gray-500">{presence.date}</p>
                      </div>
                    ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
