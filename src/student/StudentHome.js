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
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useGetStudentClassesQuery } from "./StudentAPI";
// import { useGetStudentAttendanceQuery } from "./StudentAPI";
import Skeleton from "../components/Skeleton";
import { getFullDate } from "../util/Date";
import Cookie from "../util/Cookie";
import { useEffect } from "react";

export default function StudentHome() {
  const { isSuccess, isLoading, data, isError, error } =
    useGetStudentClassesQuery({
      token: Cookie.getItem("token"),
    });
  // const attendanceQuery = useGetStudentAttendanceQuery({
  //   token: Cookie.getItem("token").split(".")[0],
  // });

  const navigate = useNavigate();

  useEffect(() => {
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

    // Server Error
    if (isError && error.status === 502) {
      navigate("/rusakk");
    }
  }, [isError]);

  const menus = [
    { pathIcon: mdiTimer, text: "Statistic", link: "/student/statistic" },
    { pathIcon: mdiNoteText, text: "Presence", link: "/student/presence" },
    { pathIcon: mdiNoteCheck, text: "Activity", link: "/student/activity" },
    { pathIcon: mdiSendCircle, text: "Izin", link: "/student/permission" },
  ];

  return (
    <Layout title="Student" role="STUDENT">
      <div className="mx-auto  h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        {isLoading && (
          <div className="w-[90px]">
            <Skeleton />
          </div>
        )}

        {isSuccess && (
          <p className="text-sm font-light text-slate-800 ">{data.greet}</p>
        )}

        {isLoading && (
          <div className="w-[250px]">
            <Skeleton rounded="lg" margin="mt-2" />
          </div>
        )}

        {isSuccess && (
          <p className="text-xl">
            {`${data.user.first_name} ${data.user.last_name}`}
          </p>
        )}

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
          <p className="text-sm uppercase">Today - {getFullDate(new Date())}</p>
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
                  Scheduled:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Icon path={mdiAlarm} size="15px" className="inline" />{" "}
                  <span className="font-semibold">
                    {(isSuccess && data.work_time) || "--:--"}
                  </span>
                </div>
                <p>
                  Checked in at:&nbsp;&nbsp;
                  {(isSuccess && data.clock_in) || "--:--"}
                </p>
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
              <p>CHECK-OUT</p>
              <div className="mt-1.5 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  Scheduled: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Icon path={mdiAlarm} size="15px" className="inline" />{" "}
                  <span className="font-semibold">
                    {" "}
                    {(isSuccess && data.home_time) || "--:--"}
                  </span>
                </div>
                <p>
                  Checked in at: &nbsp;
                  {(isSuccess && data.clock_out) || "--:--"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 flex items-center gap-1">
          <Icon path={mdiBookVariant} size="16px" className=" text-blue-400" />
          <p className="text-sm uppercase">Current lecture</p>
        </div>

        {isLoading && (
          <div className="h-[20%] w-[100%]">
            <Skeleton rounded="lg" height="100%" margin="mt-3" />
          </div>
        )}

        {isSuccess &&
          (data.currentLecture.subject === null ? (
            <div className="mt-3 rounded-xl bg-gradient-to-r from-blue-700 to-[#63c2f0] py-2 px-5 font-semibold text-white">
              Tidak Ada Kelas
            </div>
          ) : (
            <Link to="/student/presence">
              <div className="mt-2 rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-7 py-4 text-white">
                <h3 className="mb-2 font-bold">
                  {isSuccess && data?.currentLecture.subject}
                </h3>
                <p>
                  {isSuccess &&
                    `${data?.currentLecture.time.start_time} - ${data?.currentLecture.time.end_time}`}{" "}
                  {""}
                  WIB
                </p>
                <p className="mt-5 text-right text-sm">
                  {isSuccess &&
                    `${data?.currentLecture.teacher.first_name} ${data?.currentLecture.teacher.last_name}`}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </Layout>
  );
}
