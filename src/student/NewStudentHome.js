import Layout from "../components/Layout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getDay, getFullDate } from "../util/Date";
import { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiChevronRight,
  mdiInformationOutline,
  mdiMapMarker,
  mdiNoteEditOutline,
  mdiNoteTextOutline,
} from "@mdi/js";
import {
  useGetNewStudentClassesQuery,
  usePostNewStudentClassesMutation,
  usePostStudentAttendanceMutation,
} from "./StudentAPI";
import Cookie from "../util/Cookie";

export default function NewStudentHome() {
  const date = new Date();
  const navigate = useNavigate();
  const [alertShow, setAlertShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    type: "red",
    message: "error",
  });
  const dataStudent = useGetNewStudentClassesQuery({
    token: Cookie.getItem("token"),
  });
  const [triggerPostNewStudentClasses] = usePostNewStudentClassesMutation();
  const [triggerPostStudentAttendance] = usePostStudentAttendanceMutation();

  const [data, setData] = useState(false);
  if (dataStudent.isSuccess && data === false) {
    setData(dataStudent.data);
  }
  const handleSubmitForm = async () => {
    const sendData = await triggerPostStudentAttendance({
      token: Cookie.getItem("token"),
      latitude: 0,
      longitude: 1,
    });
    const data = await triggerPostNewStudentClasses({
      token: Cookie.getItem("token"),
      latitude: 0,
      longitude: 1,
    });

    console.log(sendData);
    setAlertShow(true);
    if (sendData.data?.error) {
      setErrorMessage({
        type: "red",
        message: sendData.data?.error?.message,
      });
    } else {
      setErrorMessage({
        error: "green",
        message: sendData.data?.success?.message,
      });
    }

    setData(data?.data);
  };

  return (
    <Layout title="Student" role="STUDENT">
      <div className="mx-auto min-h-screen max-w-[444px] border pb-24 shadow-lg">
        <div className="bg-gradient-to-r from-blue-700 to-[#63c2f0]">
          <div className="mb-8 w-full  px-5 pt-7">
            {alertShow !== false && (
              <div
                className={`${
                  alertShow ? "flex" : "hidden"
                } justify-between rounded ${
                  errorMessage.type === "red"
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
                  {errorMessage.message}
                </p>
                <strong className="align-center alert-del cursor-pointer text-xl">
                  &times;
                </strong>
              </div>
            )}
            {/* End Message Allert */}

            <p className="text-xl font-semibold text-gray-100">
              {dataStudent.isSuccess && data.greet}
            </p>

            <div className="mt-5 flex justify-between text-white">
              <div>
                <h1 className="-mt-5 text-3xl font-semibold">
                  {dataStudent.isSuccess && data?.user?.first_name}{" "}
                </h1>
                <p className="text-gray-100">student</p>
              </div>
            </div>

            <div className="mt-5 w-full rounded-lg bg-white p-4">
              <div className="flex justify-between">
                <p className="font-semibold"> Jadwal Sekolah</p>
                <p className="text-gray-500">
                  {`${getDay(date.getDay())}, ${getFullDate(date)}`}
                </p>
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-3xl font-bold">
                  {dataStudent.isSuccess && data.work_time
                    ? data.work_time + " - " + data.home_time + " WIB"
                    : "Tidak Ada Jadwal"}
                </h4>
                <p className="text-xl text-gray-500">Jam Sekolah</p>
              </div>

              <div className="my-4 flex items-center gap-5 border-t py-4"></div>

              <div className="flex justify-around">
                {dataStudent.isSuccess && data.status_button?.clockIn ? (
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

                {dataStudent.isSuccess && data?.status_button?.clockOut ? (
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
                className="rounded px-2 py-0.5 text-blue-700 hover:bg-gray-100"
                to="/student/activity"
              >
                Log Absensi
              </Link>
            </div>

            <div className="group mt-2 border-t ">
              {dataStudent.isSuccess &&
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
