import {
  mdiChevronRight,
  mdiInformationOutline,
  mdiMapMarker,
  mdiNoteEditOutline,
  mdiNoteTextOutline,
  mdiCheckCircleOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Layout from "../components/Layout";
import Cookie from "../util/Cookie";
import Skeleton from "../components/Skeleton";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getDay, getFullDate } from "../util/Date";
import { useState } from "react";

import { useGetAttendanceQuery, usePostAttendanceMutation } from "../core/API";

export default function StudentHome() {
  const date = new Date();
  // const [submitPost, setSubmitPost] = useState(false);
  const { isSuccess, isError, isLoading, data } = useGetAttendanceQuery({
    token: Cookie.getItem("token"),
    latitude: 0,
    longitude: 0,
  });
  const navigate = useNavigate();
  const [statusButton, setStatusButton] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [error, setError] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [triggerPostAttendance] = usePostAttendanceMutation();

  if (isSuccess && statusButton === false) {
    setStatusButton(data.status_button);
    setRecentActivity(data.recent_activity);
  }
  const handleSubmitForm = async () => {
    const res = await triggerPostAttendance({
      token: Cookie.getItem("token").slice(0, -1),
    });
    setStatusButton(res.data.status_button);
    setRecentActivity(recentActivity => [res.data.activity, ...recentActivity]);
    setAlertShow(true);
    if (res.data?.error) {
      setError({
        error: true,
        message: res.data?.error.message,
      });
    } else {
      setError({
        error: false,
        message: res.data?.success?.message,
      });
    }
  };

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

  return (
    <Layout title="Student" role="STUDENT">
      <div className="mx-auto min-h-screen max-w-[444px] border pb-24 shadow-lg">
        <div className="bg-gradient-to-r from-blue-700 to-[#63c2f0]">
          <div className="mb-8 w-full  px-5 pt-7">
            {/* Message Alert */}
            {alertShow !== false && (
              <div
                className={`${
                  alertShow ? "flex" : "hidden"
                } justify-between rounded ${
                  error.error
                    ? "bg-yellow-500 text-yellow-100"
                    : "bg-green-600 text-green-200"
                } p-3  shadow-inner`}
                onClick={() => setAlertShow(false)}
              >
                <p className="flex items-center self-center">
                  <strong>
                    <Icon
                      className="mr-2"
                      path={mdiInformationOutline}
                      size="20px"
                    />
                  </strong>
                  {error.message}
                </p>
                <strong className="align-center alert-del cursor-pointer text-xl">
                  &times;
                </strong>
              </div>
            )}
            {/* End Message Allert */}

            {isLoading && (
              <div className="w-[110px]">
                <Skeleton />
              </div>
            )}

            <p className="text-gray-100">{isSuccess && data?.greet}</p>

            <div className="mt-5 flex justify-between text-white">
              <div>
                {isLoading && (
                  <div className="w-[200px]">
                    <Skeleton />
                  </div>
                )}
                <h1 className="-mt-5 text-3xl font-semibold">
                  {isSuccess &&
                    data?.user?.first_name + " " + data?.user?.last_name}
                </h1>

                {isLoading && (
                  <div className="mt-3 w-[60px]">{/* <Skeleton /> */}</div>
                )}
              </div>
            </div>

            <div className="mt-5 w-full rounded-lg bg-white p-4">
              <div className="flex justify-between">
                <p className="font-semibold"> Jadwal kerja</p>
                <p className="text-gray-500">
                  {`${getDay(date.getDay())}, ${getFullDate(date)}`}
                </p>
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-3xl font-bold">
                  {isSuccess && data?.work_time
                    ? data?.work_time + " - " + data?.home_time + " WIB"
                    : "Tidak Ada Jadwal"}
                </h4>
                <p className="text-xl text-gray-500">Jam kerja</p>
              </div>

              <div className="my-4 flex items-center gap-5 border-t py-4">
                {/* <Icon
                  path={mdiMapMarker}
                  size="40px"
                  className="text-green-600"
                />
                <p className="text-sm text-gray-500">
                  {isSuccess && data?.user?.address}
                </p> */}
              </div>

              <div className="flex justify-around">
                {statusButton?.clockIn ? (
                  <button
                    onClick={handleSubmitForm}
                    className="rounded bg-blue-600 py-3 px-7 text-white hover:bg-blue-700"
                  >
                    Clock in
                  </button>
                ) : (
                  <button className="cursor-not-allowed rounded bg-gray-200 py-3 px-7 text-gray-500">
                    Clock In
                  </button>
                )}
                {statusButton?.clockOut === true ? (
                  <button
                    onClick={handleSubmitForm}
                    className="rounded bg-blue-600 py-3 px-7 text-white hover:bg-blue-700"
                  >
                    Clock Out
                  </button>
                ) : (
                  <button className="cursor-not-allowed rounded bg-gray-200 py-3 px-7 text-gray-500">
                    Clock Out
                  </button>
                )}
              </div>
            </div>

            {/* button */}
            <div className="mt-5 w-full rounded-lg bg-white p-4">
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    navigate("/student/permission/new");
                  }}
                  className="inline-flex w-[49%] items-center rounded py-2 pr-3 text-gray-700 hover:bg-gray-200"
                >
                  <span>
                    <Icon
                      className="mx-2"
                      path={mdiNoteEditOutline}
                      size="24px"
                    />
                  </span>
                  <span>Pengajuan Ijin</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/student/permission");
                  }}
                  className="inline-flex w-[49%] items-center rounded py-2 pr-3 text-gray-700 hover:bg-gray-200"
                >
                  <span>
                    <Icon
                      className="mx-2"
                      path={mdiNoteTextOutline}
                      size="24px"
                    />
                  </span>
                  <span>Riwayat Ijin</span>
                </button>

                {/* <button className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"> */}
                {/* w-4 h-4 mr-2 */}
                {/* <Icon className="w-4 h-4 mr-2" path={mdiNoteEditOutline} size="24px" />
                    <span>Download</span>
                  </button> */}
                {/* 
                  <button
                    className="rounded text-gray-700 py-1 w-[49%] hover:bg-gray-200"
                  >
                  <Icon path={mdiNoteTextOutline} size="24px" />
                    Riwayat Ijin
                  </button> */}
              </div>
            </div>
            {/* end button */}
          </div>

          <div className="rounded-t-3xl bg-white p-5">
            <div className="flex justify-between">
              <h4 className="font-semibold">Aktivitas Terkini</h4>
              <Link
                className="rounded px-3 py-0.5 text-blue-500 hover:bg-gray-100"
                to="/student/activity"
              >
                Log Absensi
              </Link>
            </div>

            <div className="group mt-2 border-t ">
              <Link to="/student/activity" className="cursor-default">
                {isSuccess &&
                  recentActivity.map((activity, idx) => (
                    <div
                      className="flex justify-between border-b py-2"
                      key={idx}
                    >
                      <p className="text-gray-500">{activity.time}</p>
                      <p className="ml-16">{activity.type}</p>
                      <Icon path={mdiChevronRight} size="24px" />
                    </div>
                  ))}
              </Link>

              {recentActivity.length === 0 && (
                <p className="mt-5 text-center text-gray-500">
                  Tidak Ada Aktivitas Terkini
                </p>
              )}

              {isLoading && (
                <>
                  <div className="my-2 py-1">
                    <Skeleton />
                  </div>
                  <div className="my-2 py-1">
                    <Skeleton />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// import {
//   mdiAlarm,
//   mdiBookVariant,
//   mdiCalendarRange,
//   mdiLocationEnter,
//   mdiLocationExit,
//   mdiNoteCheck,
//   mdiNoteText,
//   mdiSendCircle,
//   mdiTimer,
// } from "@mdi/js";
// import Icon from "@mdi/react";
// import { Link, useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";
// import { useGetStudentClassesQuery } from "./StudentAPI";
// // import { useGetStudentAttendanceQuery } from "./StudentAPI";
// import Skeleton from "../components/Skeleton";
// import { getFullDate } from "../util/Date";
// import Cookie from "../util/Cookie";
// import { useEffect } from "react";

// export default function StudentHome() {
//   const { isSuccess, isLoading, data, isError, error } =
//     useGetStudentClassesQuery({
//     token: Cookie.getItem("token").slice(0, -1),
//     });
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Unauthorize
//     if (isError && error.status === 401) {
//       Cookie.deleteItem("token");
//       window.location = "/auth/login";
//       return;
//     }

//     // Role permission
//     if (isError && error.status === 403) {
//       navigate("/student/");
//       return;
//     }

//     // Server Error
//     if (isError && error.status === 502) {
//       navigate("/rusakk");
//     }
//   }, [isError]);

//   const menus = [
//     { pathIcon: mdiTimer, text: "Statistic", link: "/student/statistic" },
//     { pathIcon: mdiNoteText, text: "Presence", link: "/student/presence" },
//     { pathIcon: mdiNoteCheck, text: "Activity", link: "/student/activity" },
//     {
//       pathIcon: mdiSendCircle,
//       text: "Permission",
//       link: "/student/permission",
//     },
//   ];

//   return (
//     <Layout title="Student" role="STUDENT">
//       <div className="mx-auto mb-10 h-full min-h-screen  max-w-[444px] border px-5 py-3 pb-24 shadow-lg">
//         {isLoading && (
//           <div className="w-[90px]">
//             <Skeleton />
//           </div>
//         )}

//         {isSuccess && (
//           <p className="text-sm font-light text-slate-800 ">{data.greet},</p>
//         )}

//         {isLoading && (
//           <div className="w-[250px]">
//             <Skeleton rounded="lg" margin="mt-2" />
//           </div>
//         )}

//         {isSuccess && (
//           <p className="text-xl">
//             {`${data.user.first_name} ${data.user.last_name}`}
//           </p>
//         )}

//         <div className="mt-5 w-full rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] text-white shadow-lg">
//           <div className="mx-auto flex w-3/4 justify-center gap-5 py-3">
//             {menus.map(menu => (
//               <Link
//                 to={menu.link}
//                 key={menu.text}
//                 className="flex flex-col items-center"
//               >
//                 <Icon
//                   path={menu.pathIcon}
//                   size="35px"
//                   className="rounded-full bg-white p-1.5 text-blue-600"
//                 />
//                 <p className="pt-2 text-sm">{menu.text}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//         <div className="mt-7 flex items-center gap-3">
//           <Icon path={mdiCalendarRange} size="16px" className="text-blue-500" />
//           <p className="text-sm uppercase">Today - {getFullDate(new Date())}</p>
//         </div>
//         <div className="mt-7 flex flex-col rounded-md bg-white py-5 px-7 shadow-[0_12px_50px_-6px_rgb(0,0,0,0.15)]">
//           <Link to="/student/attendance">
//             <div className="mb-3 flex items-center gap-7">
//               <Icon
//                 path={mdiLocationEnter}
//                 size="40px"
//                 className="rounded-full bg-blue-500 p-2 text-white shadow-lg"
//               />
//               <div>
//                 <p>CHECK-IN</p>
//                 <div className="mt-1.5 text-sm text-slate-400">
//                   <div className="flex items-center gap-1">
//                     Scheduled:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <Icon path={mdiAlarm} size="15px" className="inline" />{" "}
//                     <span className="font-semibold">
//                       {(isSuccess && data.currentAttendance.work_time) ||
//                         "--:--"}
//                     </span>
//                   </div>
//                   <p>
//                     Checked in at:&nbsp;&nbsp;
//                     {(isSuccess && data.currentAttendance.clock_in) || "--:--"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <hr />

//             {/* <div className="fixed bottom-[70px] left-0 right-0 z-50 mx-auto max-w-[440px]">
//             <div className="flex justify-center">
//               <Link to="/student/attendance">
//                 <Icon
//                   path={mdiLocationEnter}
//                   size="65px"
//                   className="cursor-pointer rounded-full border-4 border-white bg-blue-500 p-3 text-white shadow-xl"
//                 />
//               </Link>
//             </div>
//           </div> */}

//             <div className="mt-3 flex items-center gap-7">
//               <Icon
//                 path={mdiLocationExit}
//                 size="40px"
//                 className="rounded-full bg-[#ffd94e] p-2 text-white shadow-lg"
//               />
//               <div>
//                 <p>CHECK-OUT</p>
//                 <div className="mt-1.5 text-sm text-slate-400">
//                   <div className="flex items-center gap-1">
//                     Scheduled: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <Icon path={mdiAlarm} size="15px" className="inline" />{" "}
//                     <span className="font-semibold">
//                       {" "}
//                       {(isSuccess && data.currentAttendance.home_time) ||
//                         "--:--"}
//                     </span>
//                   </div>
//                   <p>
//                     Checked out at: &nbsp;
//                     {(isSuccess && data.currentAttendance.clock_out) || "--:--"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </div>
//         <div className="mt-7 flex items-center gap-1">
//           <Icon path={mdiBookVariant} size="16px" className=" text-blue-400" />
//           <p className="text-sm uppercase">Current lecture</p>
//         </div>

//         {isLoading && (
//           <div className="h-[20%] w-[100%]">
//             <Skeleton rounded="lg" height="100%" margin="mt-3" />
//           </div>
//         )}

//         {isSuccess &&
//           (data.currentLecture.subject === null ? (
//             <div className="mt-3 rounded-xl bg-gradient-to-r from-blue-700 to-[#63c2f0] py-2 px-5 font-semibold text-white">
//               Tidak Ada Kelas
//             </div>
//           ) : (
//             <Link to="/student/presence">
//               <div className="mt-2 rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-7 py-4 text-white">
//                 <h3 className="mb-2 font-bold">
//                   {isSuccess && data?.currentLecture.subject}
//                 </h3>
//                 <p>
//                   {isSuccess &&
//                     `${data?.currentLecture.time.start_time} - ${data?.currentLecture.time.end_time}`}{" "}
//                   {""}
//                   WIB
//                 </p>
//                 <p className="mt-5 text-right text-sm">
//                   {isSuccess &&
//                     `${data?.currentLecture.student.first_name} ${data?.currentLecture.student.last_name}`}
//                 </p>
//               </div>
//             </Link>
//           ))}
//       </div>
//     </Layout>
//   );
// }
