import { useEffect, useState } from "react";
import { mdiChevronLeft, mdiRefresh, mdiCrosshairsGps } from "@mdi/js";
import Icon from "@mdi/react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import {
  useGetStudentSubmitGeoQuery,
  usePostPresenceClassMutation,
} from "./StudentAPI";
import Layout from "../components/Layout";
import Cookie from "../util/Cookie";

export default function StudentAbsent() {
  const [GPSActive, setGPSActive] = useState(false);
  const [GeoLoc, setGeoLoc] = useState({
    longitude: 0,
    latitude: 1,
  });

  const [timetableForm, setTimetableForm] = useState("");
  const [tokenForm, setTokenForm] = useState("");
  const [detailForm, setDetailForm] = useState("");
  const [subRes, setSubRes] = useState({});

  const { isLoading, isSuccess, data, isError, error } =
    useGetStudentSubmitGeoQuery({
      token: Cookie.getItem("token"),
      latitude: GeoLoc.latitude,
      longitude: GeoLoc.longitude,
    });

  // console.log("get", data);

  const [triggerPresenceClass] = usePostPresenceClassMutation();

  // const handleGPS = () => {
  //   var options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   };

  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(
  //       position => {
  //         setGeoLoc({
  //           longitude: parseFloat(position.coords.longitude),
  //           latitude: parseFloat(position.coords.latitude),
  //         });

  //         setGPSActive(true);
  //       },
  //       null,
  //       options
  //     );
  //   } else {
  //     alert("Perangkat anda tidak mendukung GPS!");
  //   }
  // };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await triggerPresenceClass({
      token: Cookie.getItem("token"),
      lat: GeoLoc.latitude,
      lng: GeoLoc.longitude,
      bakso: tokenForm,
      timetable: timetableForm
    });
    console.log(res);
    if (res?.error) {
      setSubRes({error: {message: "Token Anda Salah"} });
    } else {
      setSubRes({success: {message: 'Anda Berhasil Melakukan Presensi!'}});
    }
    e.target.reset()
    // setTokenForm('');
    // setDetailForm('');

  };



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
  }, [isError]);
 
  console.log(timetableForm);
  return (
    <Layout title="Absen" role="STUDENT">
      <div className="mx-auto mb-20 min-h-screen max-w-[444px] border px-5 py-3 shadow-lg ">
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 text-xl text-white">
          <p className="font-semibold ">Presence</p>
          {/* <button>
            <Icon path={mdiChevronLeft} size="24px" />
          </button> */}
        </div>
  

        <div className="m-5">
          {isLoading && (
            <div className="mt-10">
              <Skeleton
                width="80%"
                height="1.5em"
                color="bg-indigo-200"
                rounded="lg"
              />
              <Skeleton
                height="1.5em"
                color="bg-indigo-200"
                rounded="lg"
                width="50%"
                margin="mt-3"
              />

              <Skeleton
                height="1.5em"
                color="bg-indigo-200"
                rounded="lg"
                width="25%"
                margin="mt-3"
              />
            </div>
          )}

          {isSuccess && !data?.error && (
            <div className="mt-10">
              <h1 className="text-2xl">{data.name}</h1>
              <p>{data.teacher}</p>
              <p>{data.time}</p>
            </div>
          )}
        </div>

        <div className="mx-auto mt-[50px] mb-[50px] w-2/3">
          <img src="/touristmap.svg" alt="Maps" />
        </div>

        {subRes?.error ? (
          <div className="alert mx-5 flex flex-row items-center rounded border-b-2 border-yellow-300 bg-yellow-200 p-3">
            <div className="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-yellow-500 bg-yellow-100">
              <span className="text-yellow-500">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="alert-content ml-4">
              <div className="alert-title text-lg font-semibold text-yellow-800">
                {subRes.error.message}
              </div>
            </div>
          </div>
        ) : subRes?.success && (
          <div className="alert mx-5 flex flex-row items-center rounded border-b-2 border-blue-300 bg-blue-200 p-3">
            <div className="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-100">
              <span className="text-blue-500">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="alert-content ml-4">
              <div className="alert-title text-lg font-semibold text-blue-800">
                {subRes?.success?.message}
              </div>
            </div>
          </div>
        )}

        <div>
          <hr className="mt-5" />
          {isSuccess && data?.is_attended ? (
            <div className="alert mx-5 flex flex-row items-center rounded border-b-2 border-indigo-300 bg-indigo-200 p-3">
              <div className="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-500 bg-indigo-100">
                <span className="text-indigo-500">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
              <div className="alert-content ml-4">
                <div className="alert-title text-lg font-semibold text-indigo-800">
                  Sudah Absen
                </div>
                <div className="alert-description text-sm text-indigo-600">
                  {subRes.message}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mx-5 mt-8 mb-[80px] flex flex-col items-center justify-center gap-5 rounded px-3 py-5 ">
            <form id="presence-form" onSubmit={handleSubmitForm}>
              <select
                className="w-full rounded-md border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                name="status"
              >
                <option>Pilih Jam Pelajaran</option>

                {isSuccess &&
                  data.timetable.map((timetable, idx) => (
                    <option
                      key={idx}
        
                      value={timetable.id}
                      onClick={(e) => setTimetableForm(parseInt(e.target.value))}
                    >
                      {timetable.name}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                placeholder="Token"
                required
                maxLength="6"
                className="mt-5 w-full rounded-md border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                value={tokenForm}
                onChange={(e) => setTokenForm(e.target.value.toUpperCase())}
              />
              <textarea
                type="text"
                placeholder="Details"
                required
                className="mt-5 w-full rounded-md border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                value={detailForm}
                onChange={(e) => setDetailForm(e.target.value)}
              />
              <button className="ease focus:shadow-outline mt-3 w-full select-none rounded-md border border-indigo-500 bg-indigo-500 py-3 text-white transition duration-500 hover:bg-indigo-600 focus:outline-none">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
