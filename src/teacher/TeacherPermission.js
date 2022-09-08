import { mdiCalendar, mdiChevronLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import Cookie from "../util/Cookie";
import isEmpty from "../util/EmptyObj";
import { useGetStudentLeaveQuery } from "./../student/StudentAPI";

export default function TeacherPermission() {
  const { isSuccess, data, isLoading } = useGetStudentLeaveQuery({
    token: Cookie.getItem("token"),
  });

  const location = useLocation();

  if (isSuccess) {
    console.log(data);
  }

  if (location) {
    console.log(location.state);
  }

  return (
    <Layout role="TEACHER" title="Permission History">
      <div className="relative mx-auto mb-[56px] min-h-screen max-w-[444px] border px-5 py-3 pb-24 shadow">
        <div className="-m-5 h-[50px] max-w-[150%] bg-[#c52831] pt-3 pl-3">
          <Link to="/teacher/">
            <Icon path={mdiChevronLeft} size="1.9em" color="white" />
          </Link>
        </div>

        <div className="mt-10">
          {isLoading && (
            <>
              <div className="mb-5">
                <Skeleton />
              </div>
              <div className="mb-5">
                <Skeleton />
              </div>
              <div className="mb-5">
                <Skeleton />
              </div>
            </>
          )}

          {(() => {
            let temp = [];
            let i = 100;
            if (isSuccess) {
              // No Data
              if (isEmpty(data.history)) {
                return (
                  <div>
                    <img
                      src="/no-permission-teacher.svg"
                      width="200px"
                      alt="Tidak Ada Riwayat"
                      className="mx-auto"
                    />
                    <h1 className="mt-20 text-center text-xl text-gray-400">
                      Tidak Ada Riwayat
                    </h1>
                  </div>
                );
              }

              for (const obj in data.history) {
                i++;
                temp.push(
                  <div key={i}>
                    <div className="mb-4 mt-12 w-full rounded-lg bg-gradient-to-r from-red-700 to-[#f06363] px-5 py-2 font-semibold text-white shadow-lg">
                      {obj}
                    </div>

                    <div>
                      {data.history[obj].map((d, idx) => (
                        <div
                          className={`mb-5 rounded-xl border px-5 py-3 shadow ${
                            location.state?.isSuccess &&
                            idx === 0 &&
                            "border-2 shadow-xl"
                          }`}
                          key={idx}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-semibold">
                                {d.type} ({d.mode})
                              </h4>
                              <p className="text-gray-600">{d.desc}</p>
                              <div className="mt-4 mb-2 flex items-center gap-2">
                                <Icon
                                  path={mdiCalendar}
                                  size="24px"
                                  className="text-red-500"
                                />
                                <p className=" rounded-lg bg-gray-50 px-3 py-1 font-semibold text-gray-500">
                                  {d.date}
                                </p>
                              </div>
                              <p className="text-gray-500">{d.reason}</p>
                            </div>
                            <div>
                              <img
                                src="/logo_sekolah.jpg"
                                alt="surat izin"
                                width="60px"
                              />
                            </div>
                          </div>

                          <button
                            className={`mt-2 ml-auto block cursor-default rounded-lg border-2 px-4 py-1 font-semibold  ${
                              d.status_code === 0
                                ? "border-red-500 text-red-500"
                                : d.status_code === 1
                                ? "border-green-500 text-green-500"
                                : "border-[#fdb13e] text-[#ffa724]"
                            }`}
                          >
                            {d.status}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            }

            return temp;
          })()}
        </div>
      </div>
    </Layout>
  );
}
