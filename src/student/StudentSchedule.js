import React, { useState } from "react";
import Layout from "../components/Layout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Icon from "@mdi/react";
import { mdiCalendar } from "@mdi/js";
import { useEffect } from "react";
import { getDay, getFullDate } from "../util/Date";

export default function StudentSchedule() {
  const [dateCalendar, setDateCalendar] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const time = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000);
    return () => clearInterval(time);
  }, []);

  return (
    <Layout role="STUDENT" title="Student Scheduled">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg ">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Schedule</h1>
          {showCalendar ? (
            <div className="absolute mt-[280px] ml-[50px]">
              <Calendar
                onChange={setDateCalendar}
                value={dateCalendar}
                className="p-3"
              />
            </div>
          ) : (
            <button onClick={() => setShowCalendar(true)}>
              <Icon path={mdiCalendar} size="24px" className="text-slate-500" />
            </button>
          )}
        </div>

        <div onClick={() => setShowCalendar(false)} className="mt-7 h-screen">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {getDay(currentDate.getDay())}, {getFullDate(currentDate)}
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

          <div className="mt-2 flex gap-10">
            <p>07:00</p>
            <div className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-[#63c2f0] px-5 py-3 text-white">
              <h4 className="text-lg font-semibold ">Engineering physics</h4>
              <div className="flex items-center gap-3">
                <p>07:00 - 08:30</p>
              </div>
              <p>Agung Setiawan S.Kom</p>
            </div>
          </div>

          <div className="mt-5 flex gap-10">
            <p>08:30</p>
            <div className="w-full rounded-lg bg-slate-200 px-5 py-3 text-slate-700">
              <h4 className="text-lg font-semibold">Physics and Reality</h4>
              <div className="flex items-center gap-3">
                <p>08:30 - 10:00</p>
              </div>
              <p>Azriel Pamungkas</p>
            </div>
          </div>

          <div className="mt-5 flex gap-10">
            <p>10:00</p>
            <div className="w-full rounded-lg bg-slate-200 px-5 py-3 text-slate-700">
              <h4 className="text-lg font-semibold">
                Advanced General Reality and Gravitational Wave
              </h4>
              <div className="flex items-center gap-3">
                <p>10:00 - 11:00</p>
              </div>
              <p>Ridhwan Siddiq MSc.</p>
            </div>
          </div>

          <div className="mt-5 flex gap-10">
            <p>11:00</p>
            <div className="w-full rounded-lg bg-slate-200 px-5 py-3 text-slate-700">
              <h4 className="text-lg font-semibold ">Saxophone</h4>
              <div className="flex items-center gap-3">
                <p>11:00 - 12:30</p>
              </div>
              <p>Daliman</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
