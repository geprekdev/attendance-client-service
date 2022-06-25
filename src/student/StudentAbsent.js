import React, { useEffect, useState } from "react";
import {
  mdiChevronLeft,
  mdiAlert,
  mdiRefresh,
  mdiCrosshairsGps,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import {
  useGetStudentSubmitGeoQuery,
  usePostStudentAbsentMutation,
} from "./StudentAPI";
import Layout from "../components/Layout";
import isEmpty from "../util/EmptyObj";

export default function StudentAbsent() {
  const [GPSActive, setGPSActive] = useState(false);
  const [GeoLoc, setGeoLoc] = useState({
    longitude: "",
    latitude: "",
  });

  const [tokenForm, setTokenForm] = useState("");
  const [detailForm, setDetailForm] = useState("");
  const [subRes, setSubRes] = useState({});

  const { isLoading, isSuccess, data, isError } = useGetStudentSubmitGeoQuery(
    GeoLoc,
    { skip: !GPSActive }
  );

  const [triggerPostStudentAbsent] = usePostStudentAbsentMutation();

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setGeoLoc({
          longitude: parseFloat(position.coords.longitude),
          latitude: parseFloat(position.coords.latitude),
        });

        setGPSActive(true);
      });
    } else {
      alert("Perangkat anda tidak mendukung GPS!");
    }
  };

  const handleSubmitForm = async () => {
    const data = await triggerPostStudentAbsent({
      token: tokenForm,
      lat: GeoLoc.latitude,
      lng: GeoLoc.longitude,
    });

    setSubRes(data.data);

    console.log(data.data);
  };

  return (
    <Layout title="Absen" role="STUDENT">
      <div className="mx-auto min-h-screen max-w-[444px] border px-5 py-3 shadow-lg ">
        <div className="-m-5 h-[50px] max-w-[150%] bg-[#6A64F1] pt-3 pl-3">
          <Link to="/student/">
            <Icon path={mdiChevronLeft} size="1.9em" color="white" />
          </Link>
        </div>

        <div className="m-5">
          {isLoading && (
            <>
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
            </>
          )}

          {isSuccess ? (
            data.status_code === 16 ? (
              // "no class"
              ""
            ) : (
              <>
                <h1 className="text-2xl">{data.data.name}</h1>
                <p>{data.data.teacher}</p>
                <p>{data.data.time}</p>
              </>
            )
          ) : (
            ""
          )}
        </div>

        <div className="mx-auto mt-[50px] mb-[50px] w-2/3">
          <img src="/touristmap.svg" alt="Maps" />
        </div>

        {!isEmpty(subRes) && (
          <div class="alert mx-5 flex flex-row items-center rounded border-b-2 border-yellow-300 bg-yellow-200 p-3">
            <div class="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-yellow-500 bg-yellow-100">
              <span class="text-yellow-500">
                <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="alert-content ml-4">
              <div class="alert-title text-lg font-semibold text-yellow-800">
                Token Salah
              </div>
              <div class="alert-description text-sm text-yellow-600">
                {subRes.message}
              </div>
            </div>
          </div>
        )}

        {!GPSActive && (
          <div class="alert mx-5 flex flex-row items-center rounded border-b-2 border-yellow-300 bg-yellow-200 p-3">
            <div class="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-yellow-500 bg-yellow-100">
              <span class="text-yellow-500">
                <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="alert-content ml-4">
              <div class="alert-title text-lg font-semibold text-yellow-800">
                Warning
              </div>
              <div class="alert-description text-sm text-yellow-600">
                Tidak dapat mengakses Lokasi ..!
              </div>
            </div>
          </div>
        )}

        <div className="mx-5 mt-10 rounded-lg border bg-white px-5 py-2 ">
          <h4 className="text-[15px] tracking-wide  text-gray-500">
            Kamu berada di:
          </h4>
          <div className="text-medium mt-2 flex items-center gap-3">
            <Icon
              className="my-2  text-indigo-600"
              path={mdiCrosshairsGps}
              size="2em"
            />
            <span className="text-md text-slate-600">
              {isSuccess
                ? data.address?.split(",")?.slice(0, 5).join("")
                : "Antah Berantah"}
            </span>

            <button
              className={`ml-auto block ${isLoading && "animate-spin"}`}
              onClick={handleGPS}
            >
              <Icon path={mdiRefresh} size="24px" className="text-indigo-500" />
            </button>
          </div>
        </div>

        <div>
          {isSuccess ? (
            data.status_code === 14 ? (
              <div className="mx-auto mt-[20px]  w-[90%] rounded-lg bg-white p-5 text-center">
                <svg
                  viewBox="0 0 24 24"
                  className="mx-auto h-16 w-16 text-green-600"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>

                <h3 className="mt-3 text-2xl font-semibold">{data.message}!</h3>

                <p className=" mt-3 text-slate-500">Have a Nice Day!</p>

                <button className="mt-5 rounded-sm bg-indigo-600 px-7 py-3 font-semibold text-white hover:animate-pulse ">
                  <a href="/student/">Go Back </a>
                </button>
              </div>
            ) : data.status_code === 11 ? (
              <div className="mx-5 mt-8 mb-[80px] flex flex-col items-center justify-center gap-5 rounded px-3 py-5 ">
                <input
                  type="text"
                  placeholder="Token"
                  className="w-full rounded-md border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  value={tokenForm}
                  onChange={e => setTokenForm(e.target.value.toUpperCase())}
                />
                <textarea
                  type="text"
                  placeholder="Details"
                  className="w-full rounded-md border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  value={detailForm}
                  onChange={e => setDetailForm(e.target.value)}
                />
                <button
                  className="ease focus:shadow-outline w-full select-none rounded-md border border-indigo-500 bg-indigo-500 py-3 text-white transition duration-500 hover:bg-indigo-600 focus:outline-none"
                  onClick={handleSubmitForm}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div class="alert mx-5 mt-4 flex flex-row items-center rounded border-b-2 border-blue-300 bg-blue-200 p-6">
                <div class="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-100">
                  <span class="text-blue-500">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      class="h-6 w-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div class="alert-content ml-4">
                  <div class="alert-title text-lg font-semibold text-blue-800">
                    Tidak Ada Kelas
                  </div>
                  <div class="alert-description text-sm text-blue-600">
                    Untuk hari ini belum ada pelajaran yang akan dimulai
                  </div>
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
}