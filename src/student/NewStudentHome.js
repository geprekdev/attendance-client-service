import {
  mdiAlarm,
  mdiBookVariant,
  mdiCalendarRange,
  mdiLocationEnter,
  mdiLocationExit,
  mdiNoteCheck,
  mdiNoteText,
  mdiSendCircle,
  mdiTimer,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useGetStudentClassesQuery } from "./StudentAPI";

export default function NewStudentHome() {
  const { isSuccess, isLoading, isError, data } = useGetStudentClassesQuery();

  const menus = [
    { pathIcon: mdiTimer, text: "Statistic", link: "/student/statistic" },
    { pathIcon: mdiNoteText, text: "Presence", link: "/student/presence" },
    { pathIcon: mdiNoteCheck, text: "Activity", link: "/student/activity" },
    { pathIcon: mdiSendCircle, text: "Izin", link: "/student/izin" },
  ];

  return (
    <Layout title="Student" role="STUDENT">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        <p className="text-sm font-light text-slate-800">
          {isSuccess && data.data.greet}
        </p>
        <p className="text-xl">{isSuccess && data.data.name}</p>

        <div className="mt-5 w-full rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] text-white shadow-lg">
          <div className="mx-auto flex w-3/4 justify-center gap-5 py-3">
            {menus.map(menu => (
              <Link
                to={menu.link}
                key={menu.text}
                className="flex flex-col items-center"
              >
                <Icon
                  path={menu.pathIcon}
                  size="35px"
                  className="rounded-full bg-white p-1.5 text-blue-600"
                />
                <p className="pt-2 text-sm">{menu.text}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <Icon path={mdiCalendarRange} size="16px" className="text-blue-500" />
          <p className="text-sm uppercase">
            Today - {isSuccess && data.data.current_lecture.date}
          </p>
        </div>

        <div className="mt-7 flex flex-col rounded-md bg-white py-5 px-7 shadow-[0_12px_50px_-6px_rgb(0,0,0,0.15)]">
          <div className="mb-3 flex items-center gap-7">
            <Icon
              path={mdiLocationEnter}
              size="40px"
              className="rounded-full bg-blue-500 p-2 text-white shadow-lg"
            />
            <div>
              <p>CHECK-IN</p>
              <div className="mt-1.5 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  Scheduled:{" "}
                  <Icon path={mdiAlarm} size="15px" className="inline" />{" "}
                  <span className="font-semibold">09:00 WIB</span>
                </div>
                <p>Checked in at: --:--</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="mt-3 flex items-center gap-7">
            <Icon
              path={mdiLocationExit}
              size="40px"
              className="rounded-full bg-[#ffd94e] p-2 text-white shadow-lg"
            />
            <div>
              <p>CHECK-IN</p>
              <div className="mt-1.5 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  Scheduled:{" "}
                  <Icon path={mdiAlarm} size="15px" className="inline" />{" "}
                  <span className="font-semibold">09:00 WIB</span>
                </div>
                <p>Checked in at: --:--</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center gap-1">
          <Icon path={mdiBookVariant} size="16px" className=" text-blue-400" />
          <p className="text-sm uppercase">Current lecture</p>
        </div>

        <div className="mt-2 rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-7 py-4 text-white">
          <h3 className="mb-2 font-bold">
            {isSuccess && data.data.current_lecture.subject}
          </h3>
          <p>{isSuccess && data.data.current_lecture.time}</p>
          <p className="mt-5 text-right text-sm">
            {isSuccess && data.data.current_lecture.teacher}
          </p>
        </div>
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 mx-auto max-w-[440px] ">
        <div className="flex  justify-center">
          <Icon
            path={mdiLocationEnter}
            size="65px"
            className="cursor-pointer rounded-full border-4 border-white bg-blue-500 p-3 text-white shadow-xl"
          />
        </div>
      </div>
    </Layout>
  );
}
