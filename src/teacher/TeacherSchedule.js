import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Icon from "@mdi/react";
import {
  mdiCalendar,
  mdiChevronRight,
  mdiClockAlertOutline,
  mdiClockOutline,
} from "@mdi/js";
import { getDay, getFullDate } from "../util/Date";
import Cookie from "../util/Cookie";
import Skeleton from "../components/Skeleton";
import { useNavigate } from "react-router-dom";
import { useGetTeacherScheduleClassQuery } from "./TeacherAPI";

export default function StudentSchedule() {
  const [dateCalendar, setDateCalendar] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isSuccess, isLoading, data, isError, error } =
    useGetTeacherScheduleClassQuery(
      { token: Cookie.getItem("token") },
      { refetchOnReconnect: true }
    );

  // console.log(data);

  const navigate = useNavigate();

  useEffect(() => {
    const time = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000);
    return () => clearInterval(time);
  }, []);

  // Unauthorize
  if (isError && error.status === 401) {
    Cookie.deleteItem("token");
    window.location = "/auth/login";
    return;
  }

  // Role permission
  if (isError && error.status === 403) {
    navigate("/teacher/");
    return;
  }

  return (
    <Layout role="TEACHER" title="Student Scheduled">
      <div className="mx-auto mb-[56px] max-w-[444px] border  px-5 py-3 shadow-lg">
        <div className="flex items-center justify-between rounded-full bg-gradient-to-r from-red-700 to-[#f48282] px-5 py-2 ">
          <h1 className="text-xl font-bold text-white">Schedule</h1>
          {showCalendar && (
            <div className="fixed top-4 z-20 w-[280px] sm:w-[500px] xs:w-[490px]">
              <Calendar
                onChange={setDateCalendar}
                value={dateCalendar}
                className="p-3"
                maxDate={new Date()}
                minDate={new Date("2022-06-01")}
              />
            </div>
          )}

          <button onClick={() => setShowCalendar(true)}>
            <Icon path={mdiCalendar} size="24px" className="text-white" />
          </button>
        </div>

        <div className="h-screen pt-7" onClick={() => setShowCalendar(false)}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {getDay(dateCalendar.getDay())}, {getFullDate(dateCalendar)}
            </h3>

            <p className="text-slate-500">{`${currentDate.getHours()}:${
              currentDate.getUTCMinutes() < 10
                ? "0" + currentDate.getUTCMinutes()
                : currentDate.getUTCMinutes()
            }`}</p>
          </div>

          <div className="mb-4 mt-2 h-[0.9px] w-full bg-slate-200"></div>

          <div className="mt-3 flex gap-24 text-slate-500">
            <p>Waktu</p>
            <p>Mapel</p>
          </div>

          {isLoading && (
            <div className="mt-2 flex items-center gap-10 ">
              <p>00:00</p>

              <div className="ml-auto mt-3 w-[75%]">
                <Skeleton height="50px" rounded="lg" />
              </div>
            </div>
          )}

          {(() => {
            if (isSuccess) {
              const lesson =
                data[dateCalendar.toLocaleDateString()] || data["7/7/2022"];

              // console.log(data);

              if (lesson) {
                const l = [...lesson];

                return l
                  .sort((a, b) => {
                    const _a =
                      a.start_time.split(":")[0] * 60 +
                      a.start_time.split(":")[1];

                    const _b =
                      b.start_time.split(":")[0] * 60 +
                      b.start_time.split(":")[1];

                    return _a - _b;
                  })
                  .map(lsn => (
                    <div key={lsn.id} className="group relative">
                      <div className="mt-5 flex gap-10">
                        <p>{lsn.start_time}</p>
                        <div
                          className={` ml-auto rounded-r-lg ${
                            lsn.on_going
                              ? "w-full cursor-pointer border-4 border-y-transparent border-r-transparent border-l-red-500 text-gray-900 shadow-lg"
                              : "w-[65%] border-[3px] border-y-transparent border-l-gray-500 border-r-transparent text-slate-400 shadow"
                          } px-5 py-3`}
                          onClick={() =>
                            lsn.on_going && navigate("/student/presence")
                          }
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-[19px] font-semibold ">
                              {lsn.classroom}
                            </h4>
                            {lsn.on_going && (
                              <Icon
                                path={mdiChevronRight}
                                size="24px"
                                className="text-gray-400"
                              />
                            )}
                          </div>
                          <div
                            className={`${lsn.on_going && "text-slate-700"} `}
                          >
                            <div className="flex items-center gap-1">
                              <Icon
                                path={
                                  lsn.on_going
                                    ? mdiClockAlertOutline
                                    : mdiClockOutline
                                }
                                size="16px"
                              />
                              <p>
                                {lsn.start_time} - {lsn.end_time}
                              </p>
                            </div>
                            <p className="mt-2 font-semibold text-slate-500">
                              {lsn.subject}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-[92%] top-6  h-[75%] w-0.5 bg-indigo-200 group-last:h-[0%]"></div>
                    </div>
                  ));
              }

              return (
                <div className="mx-auto mt-5 text-center text-xl font-semibold text-red-600">
                  <p>Tidak Ada Kelas</p>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </Layout>
  );
}
