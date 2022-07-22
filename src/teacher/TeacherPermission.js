import { mdiCalendar, mdiChevronLeft, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Cookie from "../util/Cookie";
import { useGetStudentLeaveQuery } from "./../student/StudentAPI";

export default function StudentPermission() {
  const { isSuccess, data } = useGetStudentLeaveQuery({
    token: Cookie.getItem("token"),
  });

  return (
    <Layout role="STUDENT">
      <div className="relative mx-auto mb-[56px] min-h-screen max-w-[444px] border px-5 py-3 pb-24 shadow">
        <div className="-m-5 h-[50px] max-w-[150%] bg-[#c52831] pt-3 pl-3">
          <Link to="/teacher/">
            <Icon path={mdiChevronLeft} size="1.9em" color="white" />
          </Link>
        </div>

        <div className="mt-10">
          {(() => {
            let temp = [];
            if (isSuccess) {
              for (const obj in data.history) {
                temp.push(
                  <div
                    key={obj}
                    className="mb-4 w-full rounded-lg bg-gradient-to-r from-red-700 to-[#f06363] px-5 py-2 font-semibold text-white shadow-lg"
                  >
                    {obj}
                  </div>
                );

                temp.push(
                  data.history[obj].map(d => (
                    <div
                      className="mb-2 rounded-xl border px-5 py-2 shadow-lg"
                      key={d.desc}
                    >
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
                        <p className=" rounded-lg bg-gray-200 px-3 py-1 font-semibold">
                          {d.date}
                        </p>
                      </div>
                      <p>{d.reason}</p>
                      <button
                        className={`mt-2 ml-auto block cursor-default rounded-lg border-2 px-4 py-1 font-semibold  ${
                          d.status_code === 0
                            ? "border-red-500 text-red-600"
                            : d.status_code === 1
                            ? "border-green-500 text-green-600"
                            : "border-[#fdb13e] text-[#ae6a04]"
                        }`}
                      >
                        {d.status}
                      </button>
                    </div>
                  ))
                );
              }
            }

            return temp;
          })()}
        </div>

        <div className="fixed bottom-[120px] mx-auto w-[420px] ">
          <div className="mr-2 flex justify-end">
            <Link to="/teacher/permission/new">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 p-0 shadow-xl   transition duration-200 ease-in hover:bg-red-800 focus:outline-none active:shadow-2xl">
                <Icon path={mdiPlus} className="text-white" size="80%" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
