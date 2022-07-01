import React, { useState } from "react";
import Layout from "../components/Layout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Icon from "@mdi/react";
import { mdiCalendar } from "@mdi/js";
import { useEffect } from "react";
import { getDay, getFullDate } from "../util/Date";
import { useGetScheduleClassQuery } from "./StudentAPI";
import Cookie from "../util/Cookie";
import Skeleton from "../components/Skeleton";

export default function StudentSchedule() {
  const [dateCalendar, setDateCalendar] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isSuccess, isLoading, data } = useGetScheduleClassQuery({
    token: Cookie.getItem("token").split(".")[0],
  });

  useEffect(() => {
    const time = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000);
    return () => clearInterval(time);
  }, []);

  return (
    <Layout role="STUDENT" title="Student Scheduled">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border  px-5 py-3 pb-24 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Schedule</h1>
          {showCalendar && (
            <div className="fixed top-4 left-[220px]">
              <Calendar
                onChange={setDateCalendar}
                value={dateCalendar}
                className="p-3"
              />
            </div>
          )}

          <button onClick={() => setShowCalendar(true)}>
            <Icon path={mdiCalendar} size="24px" className="text-slate-500" />
          </button>
        </div>

        <div className="mt-7 h-screen " onClick={() => setShowCalendar(false)}>
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
          <div className="mt-3 flex gap-10 text-slate-500">
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
              const lesson = data[dateCalendar.toLocaleDateString()];

              if (lesson) {
                return lesson.map(lsn => (
                  <div className="mt-5 flex gap-10 " key={lsn.id}>
                    <p>{lsn.start_time}</p>
                    <div
                      className={`w-full rounded-lg ${
                        lsn.on_going
                          ? "bg-gradient-to-r from-blue-600 to-[#63c2f0] text-white"
                          : "bg-gray-200  text-gray-500"
                      } px-5 py-3`}
                    >
                      <h4 className="text-lg font-semibold ">{lsn.subject}</h4>
                      <div className="flex items-center gap-3">
                        <p>
                          {lsn.start_time} - {lsn.end_time}
                        </p>
                      </div>
                      <p>
                        {lsn.teacher.first_name} {lsn.teacher.last_name}
                      </p>
                    </div>
                  </div>
                ));
              }

              return (
                <div className="mx-auto mt-5 text-center text-xl font-semibold text-blue-500">
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
