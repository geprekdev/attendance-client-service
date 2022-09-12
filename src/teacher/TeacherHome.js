import {
  mdiChevronRight,
  mdiInformationOutline,
  mdiMapMarker,
  mdiNoteEditOutline,
  mdiNoteTextOutline,
  mdiCheckCircleOutline
} from "@mdi/js";
import Icon from "@mdi/react";
import Layout from "../components/Layout";
import Cookie from "../util/Cookie";
import Skeleton from "../components/Skeleton";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getDay, getFullDate } from "../util/Date";
import { useState } from "react";
import { useGetAttendanceQuery,usePostAttendanceMutation} from "../core/API";

export default function TeacherHome() {
  const date = new Date();
  const [submitPost, setSubmitPost] = useState(false);
  const {isSuccess, isError, isLoading ,data, refecth} = useGetAttendanceQuery(
    {
      token: Cookie.getItem("token"),
      latitude: 0,
      longitude: 0,
    }
  );
  const navigate = useNavigate();
  const [statusButton, setStatusButton] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [error, setError] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [triggerPostAttendance] = usePostAttendanceMutation();

  if (isSuccess && statusButton === false){
    setStatusButton(data.status_button);
    setRecentActivity(data.recent_activity);
  }
  const handleSubmitForm = async () => {
    const res = await triggerPostAttendance({
      token: Cookie.getItem("token"),
    });    
    if (res.data?.success){
        setStatusButton(res.data.status_button);
        setRecentActivity(recentActivity=> [res.data.activity,...recentActivity]);
    }
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


  return (
    <Layout title="Teacher" role="TEACHER">
      <div className="mx-auto min-h-screen max-w-[444px] border pb-24 shadow-lg">
        <div className="bg-[#c52831]">
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

            <p className="text-gray-100">
              {isSuccess && data?.greet}
            </p>

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
                    navigate("/teacher/permission/new");
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
                    navigate("/teacher/permission");
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
                to="/teacher/activity"
              >
                Log Absensi
              </Link>
            </div>

            <div className="group mt-2 border-t ">
              <Link to="/teacher/activity" className="cursor-default">
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
