import { mdiChevronRight, mdiInformationOutline, mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import Layout from "../components/Layout";
import {
  useGetTeacherDashboardQuery,
  usePostTeacherDashboardMutation,
} from "./TeacherAPI";
import Cookie from "../util/Cookie";
import Skeleton from "../components/Skeleton";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getDay, getFullDate } from "../util/Date";
import { useState } from "react";
import { usePostStudentAttendanceMutation } from "../student/StudentAPI";

export default function NewStudentHome() {
  const [GeoLoc, setGeoLoc] = useState({
    longitude: "",
    latitude: "",
  });

  // basss
  const [error, setError] = useState(false);
  const [alertShow, setAlertShow] = useState(true);

  const [GPSActive, setGPSActive] = useState(false);
  const getTeacherDashboard = useGetTeacherDashboardQuery(
    {
      token: Cookie.getItem("token"),
      latitude: GeoLoc.latitude,
      longitude: GeoLoc.longitude,
    },
    { skip: !GPSActive }
  );
  const [data, setData] = useState(false);

  const [triggerPostStudentAttendance] = usePostStudentAttendanceMutation();
  const [triggerPostTeacherDashboard] = usePostTeacherDashboardMutation();

  const handleGPS = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setGeoLoc({
            longitude: parseFloat(position.coords.longitude),
            latitude: parseFloat(position.coords.latitude),
          });

          setGPSActive(true);
        },
        null,
        options
      );
    } else {
      alert("Perangkat anda tidak mendukung GPS!");
    }
  };

  if (GPSActive === false) {
    handleGPS();
  }

  if (getTeacherDashboard.isSuccess && data === false) {
    // console.log("Get Teacher", getTeacherDashboard.data);
    setData(getTeacherDashboard.data);
  }

  const handleSubmitForm = async () => {
    const data = await triggerPostStudentAttendance({
      token: Cookie.getItem("token"),
    });
    const res = await triggerPostTeacherDashboard({
      token: Cookie.getItem("token"),
      latitude: GeoLoc.latitude,
      longitude: GeoLoc.longitude,
    });
    console.log("Post Student", data);
    console.log("asfaf");
    setError({
      status: true,
      message: data.data.message,
    });
    console.log("Error State", error);
    setData(res?.data);
  };

  const navigate = useNavigate();

  // Unauthorize
  if (getTeacherDashboard.isError && getTeacherDashboard.error.status === 401) {
    Cookie.deleteItem("token");
    return <Navigate to={"/auth/login"} />;
  }

  // Role permission
  if (getTeacherDashboard.isError && getTeacherDashboard.error.status === 403) {
    Cookie.deleteItem("token");
    return <Navigate to={"/auth/login"} />;
  }

  const date = new Date();

  return (
    <Layout title="Teacher" role="TEACHER">
      {!GPSActive && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed top-[15vh] right-0 left-0  z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center">
              <div className="relative w-[380px] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white px-4 pt-5 pb-4">
                  <div className="flex items-center gap-5">
                    <div className="mx-0 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100  ">
                      <svg
                        className="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg font-medium leading-6 text-gray-900"
                        id="modal-title"
                      >
                        GPS Tidak Aktif
                      </h3>
                      <div className="mt-2">
                        <p className=" text-sm text-gray-500">
                          Pastikan anda mengkaktifkan GPS untuk melakukan{" "}
                          <span className="font-semibold text-gray-700">
                            Clock In{" "}
                          </span>
                          dan{" "}
                          <span className="font-semibold text-gray-700">
                            Clock Out
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto min-h-screen max-w-[444px] border pb-24 shadow-lg">
        <div className="bg-[#c52831]">
          <div className="mb-8 w-full  px-5 pt-7">
            {/* Message Alert */}
            {error !== false && (
              <div
                className={`${
                  alertShow ? "flex" : "hidden"
                } justify-between rounded ${
                  !error.status
                    ? "bg-yellow-600 text-yellow-200"
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

            {getTeacherDashboard.isLoading && (
              <div className="w-[110px]">
                <Skeleton />
              </div>
            )}
            {!GPSActive && (
              <div className="w-[110px]">{/* <Skeleton /> */}</div>
            )}
            <p className="text-gray-100">
              {getTeacherDashboard.isSuccess && data?.greet}
            </p>

            <div className="mt-5 flex justify-between text-white">
              <div>
                {getTeacherDashboard.isLoading && (
                  <div className="w-[200px]">
                    <Skeleton />
                  </div>
                )}
                {!GPSActive && (
                  <div className="w-[200px]">{/* <Skeleton /> */}</div>
                )}
                <h1 className="-mt-5 text-3xl font-semibold">
                  {getTeacherDashboard.isSuccess &&
                    data?.user?.first_name + " " + data?.user?.last_name}
                </h1>

                {getTeacherDashboard.isLoading && (
                  <div className="mt-3 w-[60px]">{/* <Skeleton /> */}</div>
                )}
                {!GPSActive && (
                  <div className="mt-3 w-[60px]">
                    <Skeleton />
                  </div>
                )}

                <p>{getTeacherDashboard.isSuccess && ""}</p>
              </div>
              {/* <div>
                <img
                  src="https://i.ytimg.com/vi/VeiwR4PvYwM/maxresdefault.jpg"
                  alt="Xien Lim"
                  className="h-16 w-16 transform rounded-full border-4 border-white shadow-md"
                />
              </div> */}
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
                  {getTeacherDashboard.isSuccess && data?.work_time
                    ? data?.work_time + " - " + data?.home_time + " WIB"
                    : "Tidak Ada Jadwal"}
                </h4>
                <p className="text-xl text-gray-500">Jam kerja</p>
              </div>

              <div className="my-4 flex items-center gap-5 border-y py-4">
                <Icon
                  path={mdiMapMarker}
                  size="40px"
                  className="text-green-600"
                />
                <p className="text-sm text-gray-500">
                  {!GPSActive && "Antah Berantah"}
                  {getTeacherDashboard.isLoading && "Antah Berantah . . ."}
                  {getTeacherDashboard.isSuccess && data?.user?.address}
                </p>
              </div>

              <div className="flex justify-around">
                {data?.status_button?.clockIn ? (
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

                {data?.status_button?.clockOut ? (
                  <button
                    onClick={handleSubmitForm}
                    className="rounded bg-blue-600 py-3 px-7 text-white hover:bg-blue-700"
                  >
                    Clock out
                  </button>
                ) : (
                  <button className="cursor-not-allowed rounded bg-gray-200 py-3 px-7 text-gray-500">
                    Clock out
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-t-3xl bg-white p-5">
            <div className="flex justify-between">
              <h4 className="font-semibold">Aktivitas Terkini</h4>
              <Link
                className="rounded px-2 py-0.5 text-blue-700 hover:bg-gray-100"
                to="/teacher/activity"
              >
                Log Absensi
              </Link>
            </div>

            <div className="group mt-2 border-t ">
              {getTeacherDashboard.isSuccess &&
                data?.recent_activity?.map((activity, idx) => (
                  <div className="flex justify-between border-b py-2" key={idx}>
                    <p className="text-gray-500">{activity.time}</p>
                    <p className="ml-16">{activity.type}</p>
                    <Icon path={mdiChevronRight} size="24px" />
                  </div>
                ))}

              {data?.recent_activity?.length === 0 && (
                <p className="mt-5 text-center text-gray-500">
                  Tidak Ada Aktivitas Terkini
                </p>
              )}

              {getTeacherDashboard.isLoading && (
                <>
                  <div className="my-2 py-1">
                    <Skeleton />
                  </div>
                  <div className="my-2 py-1">
                    <Skeleton />
                  </div>
                </>
              )}

              {!GPSActive && (
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
