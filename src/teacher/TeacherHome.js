import { mdiChevronRight, mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import Layout from "../components/Layout";
import {
  useGetTeacherDashboardQuery,
  usePostTeacherDashboardMutation,
} from "./TeacherAPI";
import Cookie from "../util/Cookie";
import Skeleton from "../components/Skeleton";
import { useNavigate } from "react-router-dom";
import { getDay, getFullDate } from "../util/Date";
import { useState } from "react";
import { usePostStudentAttendanceMutation } from "../student/StudentAPI";

export default function NewStudentHome() {
  const [GeoLoc, setGeoLoc] = useState({
    longitude: "",
    latitude: "",
  });

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
    setData(getTeacherDashboard.data);
    console.log("asfasfas", data);
  }

  const handleSubmitForm = async () => {
    const data = await triggerPostStudentAttendance({
      token: Cookie.getItem("token"),
    });
    const res = await triggerPostTeacherDashboard({
      token: Cookie.getItem("token"),
    });
    console.log(data.data);
    setData(res?.data);
  };

  const navigate = useNavigate();

  if (getTeacherDashboard.isError && getTeacherDashboard.error.status === 403) {
    Cookie.deleteItem("token");
    navigate("/auth/login");
  }

  const date = new Date();
  console.log(getTeacherDashboard.isSuccess && data);

  return (
    <Layout title="Teacher" role="TEACHER">
      <div className="mx-auto min-h-screen max-w-[444px] border pb-24 shadow-lg">
        <div className="h-[70vh] w-full bg-[#c52831] px-5 pt-7">
          {getTeacherDashboard.isLoading && (
            <div className="w-[110px]">
              <Skeleton />
            </div>
          )}
          {!GPSActive && (
            <div className="w-[110px]">
              <Skeleton />
            </div>
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
                <div className="w-[200px]">
                  <Skeleton />
                </div>
              )}
              <h1 className="text-3xl font-semibold">
                {getTeacherDashboard.isSuccess && data?.user?.first_name}
              </h1>

              {getTeacherDashboard.isLoading && (
                <div className="mt-3 w-[60px]">
                  <Skeleton />
                </div>
              )}
              {!GPSActive && (
                <div className="mt-3 w-[60px]">
                  <Skeleton />
                </div>
              )}

              <p>{getTeacherDashboard.isSuccess && "Staff"}</p>
            </div>
            <div>
              <img
                src="https://i.ytimg.com/vi/VeiwR4PvYwM/maxresdefault.jpg"
                alt="Xien Lim"
                className="h-16 w-16 transform rounded-full border-4 border-white shadow-md"
              />
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
                {getTeacherDashboard.isSuccess && data?.work_time
                  ? data?.work_time + " WIB"
                  : "Off"}
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

        <div className="-mt-7 rounded-t-3xl bg-white p-5">
          <div className="flex justify-between">
            <h4 className="font-semibold">Aktivitas Terkini</h4>
            <p className="text-blue-700">Log Absensi</p>
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
    </Layout>
  );
}
