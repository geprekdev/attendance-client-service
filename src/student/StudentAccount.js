import { mdiAlphaACircle, mdiCheckBold } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import Cookie from "../util/Cookie";
import { useGetStudentAccountQuery } from "./StudentAPI";

export default function StudentAccount() {
  const { isLoading, isSuccess, data, isError, error } =
    useGetStudentAccountQuery({
      token: Cookie.getItem("token").split(".")[0],
    });

  if (isError && error.status === 401) {
    Cookie.deleteItem("token");
    window.location = "/auth/login";
    return;
  }

  return (
    <Layout title="Student Account" role="STUDENT">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        <div className="relative mx-auto mt-20 rounded-lg bg-white shadow-2xl shadow-blue-100">
          <div className="flex justify-center">
            <img
              src="https://i.pinimg.com/originals/6d/31/a8/6d31a83bbabc72d7c74491654546fbd0.jpg"
              alt="Logo"
              className="absolute -top-20 mx-auto h-32 w-32 transform rounded-full border-4 border-white shadow-md transition duration-200 hover:scale-110"
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
                <h1 className="text-center text-2xl"> {data.data[1].name}</h1>
                <p className="text-center text-sm text-gray-900">
                  @{data.data[1].username}
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

                {isSuccess &&
                  (() => {
                    let temp = [];
                    for (const iterator in data.data) {
                      const presence = data.data[iterator];

                      temp.push(
                        <div
                          className="flex w-full items-center border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100 "
                          key={iterator}
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
                              path={mdiAlphaACircle}
                            />
                          ) : (
                            ""
                          )}
                          <p>{presence.subject}</p>
                          &nbsp;
                          <p className="text-xs text-gray-500">
                            {presence.date}
                          </p>
                        </div>
                      );
                    }

                    return temp;
                  })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
