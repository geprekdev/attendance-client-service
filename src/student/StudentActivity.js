import { mdiAlphaACircle, mdiCheckBold } from "@mdi/js";
import Icon from "@mdi/react";
import { Fragment } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import Cookie from "../util/Cookie";
import { useGetStudentActivityQuery } from "./StudentAPI";

export default function StudentActivity() {
  const { data, isSuccess, isLoading, error, isError } =
    useGetStudentActivityQuery({
      token: Cookie.getItem("token"),
    });

  const navigate = useNavigate();

  // Unauthorize
  if (isError && error.status === 401) {
    Cookie.deleteItem("token");
    return <Navigate to="/auth/login" />;
  }

  // Role permission
  if (isError && error.status === 403) {
    return <Navigate to="/teacher/" />;
  }

  // Server Error
  if (isError && error.status === 502) {
    return <Navigate to="/rusakk" />;
  }

  return (
    <Layout title="Activity" role="STUDENT">
      <div
        className={`mx-auto mb-[60px] min-h-screen max-w-[444px] border px-5 py-3 pb-20 shadow-lg `}
      >
        <div className="flex items-center justify-between rounded-full bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 text-xl text-white">
          <p>Activity</p>
        </div>
        <div className="mt-3">
          <h1 className="text-xl text-gray-600">Riwayat Aktivitas</h1>
          {isLoading && (
            <>
              <div className="mb-2 w-full rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 font-semibold text-white shadow-lg">
                &nbsp;
              </div>
              <div className="rounded-lg py-5 px-5 shadow-lg">
                <div className="mb-3 w-[80%]">
                  <Skeleton />
                </div>
                <div className="mb-3 w-[50%]">
                  <Skeleton />
                </div>
                <div className="mb-3 w-[65%]">
                  <Skeleton />
                </div>
              </div>
            </>
          )}
          <div className="mt-5">
            {(() => {
              if (isSuccess) {
                let temp = [];
                let i = 0;
                for (const obj in data) {
                  i++;

                  if (obj === "user") {
                    continue;
                  }

                  temp.push(
                    <div key={i.toString()} className="my-10 first:-mt-1">
                      <div className="mb-2 mt-5 w-full rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 font-semibold text-white shadow-lg">
                        {obj}
                      </div>
                      <div className="rounded-lg pb-4 shadow-lg">
                        {data[obj]?.map((presence, idx) => (
                          <div
                            className=" flex w-full items-center border-t border-gray-100 py-2  pl-6 text-gray-600 transition duration-150 hover:bg-gray-100"
                            key={idx.toString()}
                          >
                            <div className="flex gap-1">
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
                                  path={mdiAlphaACircle}
                                />
                              ) : (
                                ""
                              )}
                              <h4 className="text-gray-700">{presence.name}</h4>{" "}
                              <p className="text-sm text-gray-500">
                                {presence.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return temp;
              }
            })()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

//
