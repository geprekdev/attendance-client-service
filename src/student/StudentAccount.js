import { mdiAlphaACircle } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import { useGetStudentAccountQuery } from "./StudentAPI";

export default function StudentAccount() {
  const { isLoading, isSuccess, data, isError } = useGetStudentAccountQuery();

  return (
    <Layout title="Student Account" role="STUDENT">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        <div className="relative mx-auto mt-20 rounded-lg bg-white shadow-2xl shadow-blue-100">
          <div className="flex justify-center">
            <img
              src="https://i1.sndcdn.com/artworks-000069280530-9e6rnp-t500x500.jpg"
              alt="Logo"
              className="absolute -top-20 mx-auto h-32 w-32 transform rounded-full border-4 border-white shadow-md transition duration-200 hover:scale-110"
            />
          </div>

          <div className="mt-16">
            {isLoading && (
              <Skeleton
                margin="mx-auto"
                width="80%"
                rounded="lg"
                color="bg-indigo-200"
                height="2em"
              />
            )}
            {isSuccess && (
              <>
                <h1 className="text-center text-2xl">Emira Lia</h1>
                <p className="text-center text-sm text-gray-900">
                  @{data.data[1].name}
                </p>
              </>
            )}

            <div className="my-5 w-full">
              <h3 className="text-bold px-6 text-left text-sm text-gray-900">
                Recent Activites
              </h3>
              <div className="mt-5 flex w-full flex-col items-center overflow-hidden text-sm">
                {isLoading && (
                  <Skeleton
                    width="80%"
                    height="2em"
                    color="bg-indigo-200"
                    rounded="lg"
                    margin="my-4"
                  />
                )}
                {isSuccess && (
                  <span className="flex w-full items-center  border-t border-gray-100 py-4 pl-6 pr-3 text-gray-600 transition duration-150 hover:bg-gray-100">
                    <Icon
                      path={mdiAlphaACircle}
                      size="19px"
                      className="mx-1 text-red-500"
                    ></Icon>
                    {isSuccess && data.data[1].subject}

                    <span className="text-xs text-gray-500">
                      {isSuccess && data.data[1].date}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
