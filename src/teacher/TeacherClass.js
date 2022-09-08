import Icon from "@mdi/react";
import Layout from "../components/Layout";
import { useGetTeacherClasslistQuery } from "./TeacherAPI";
import Cookie from "../util/Cookie";
import Skeleton from "../components/Skeleton";
import { Link, Navigate } from "react-router-dom";

export default function TeacherClass() {
  const { isSuccess, data, isLoading, isError, error } =
    useGetTeacherClasslistQuery({
      token: Cookie.getItem("token"),
    });

  if (isSuccess) {
    console.log(data.classrooms == null);
  }

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

  if (isError) {
    console.log(error.status === "FETCH_ERROR" && "Server Rusak");
  }

  return (
    <Layout role="TEACHER">
      <div className="mx-auto min-h-screen max-w-[444px] border px-5 py-3 shadow-lg ">
        <div className="flex items-center justify-between rounded-full bg-gradient-to-r from-red-700 to-[#f48282] px-5 py-2 ">
          <h1 className="text-xl text-white">Classroom</h1>
        </div>

        <div className="my-5 w-full">
          <h3 className="text-bold px-6 text-left text-sm text-gray-900"> </h3>

          <div className="mt-5 flex flex-wrap justify-between px-6">
            {isSuccess && data.classrooms == null && (
              <div className="mx-auto mt-5">
                <img src="/no-class.svg" alt="Tidak Ada Kelas" width="200px" />

                <h1 className="mt-10 text-center text-xl text-gray-400">
                  Tidak Ada Kelas
                </h1>
              </div>
            )}

            {isSuccess &&
              data.classrooms.map((classroom, idx) => (
                <div className="my-2 w-[48%]" key={idx}>
                  <Link to={`/teacher/class/${classroom.id}/presence`}>
                    <div
                      className={`cursor-pointer rounded-r-lg border-4 border-y-transparent border-r-transparent border-l-red-200 px-5 py-3 text-gray-900 hover:border-l-red-400 hover:shadow`}
                    >
                      <h4 className="font-semibold xs:text-lg">
                        {classroom.subject}
                      </h4>
                      <div className={`text-slate-700`}>
                        <p className="mt-2 text-sm font-semibold text-slate-500 xs:text-base">
                          {classroom.grade}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>

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
          </div>
        </div>
      </div>
    </Layout>
  );
}
