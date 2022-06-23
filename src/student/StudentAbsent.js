import React, { useEffect, useState } from "react";
import { mdiChevronLeft, mdiMapMarkerRadius, mdiRefresh } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import {
  useGetStudentSubmitGeoQuery,
  usePostStudentAbsentMutation,
} from "./StudentAPI";
import Layout from "../components/Layout";

export default function StudentAbsent() {
  // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  //   useGeolocated({
  //     positionOptions: {
  //       enableHighAccuracy: false,
  //     },
  //     userDecisionTimeout: 1,
  //   });

  // function getLocation(callback) {
  //   if (navigator.geolocation) {
  //     navigato r.geolocation.getCurrentPosition(callback);
  //     setGPSActive(true);
  //   }
  // }

  // useEffect(() => {
  //   getLocation(geo => {
  //     console.log(geo);
  //   });
  // }, []);

  // const myRef = useRef();
  const [GPSActive, setGPSActive] = useState(false);
  const [GeoLoc, setGeoLoc] = useState({
    longitude: "",
    latitude: "",
  });

  const [tokenForm, setTokenForm] = useState("");
  const [detailForm, setDetailForm] = useState("");

  const { isLoading, isSuccess, data, isError } = useGetStudentSubmitGeoQuery(
    GeoLoc,
    {
      skip: !GPSActive,
    }
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
    console.log(tokenForm === "TEST");

    const data = await triggerPostStudentAbsent({
      token: tokenForm,
      lat: GeoLoc.latitude,
      lng: GeoLoc.longitude,
    });

    console.log(data);
  };

  return (
    <Layout title="Absen" role="STUDENT">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        <div className="-m-5 h-10 max-w-[150%] bg-[#6A64F1]">
          <div className="ml-1 w-10 pt-1">
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
                "TIDAK ADA KELAS"
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

          {!GPSActive && (
            <div className="mx-5 mt-[40px] mb-5 space-x-3 rounded-lg  bg-white p-2 shadow">
              <button className="rounded-full bg-red-600 px-3 text-white">
                GPS
              </button>
              <span className="text-red-500">Tidak Dapat mengakses GPS</span>
            </div>
          )}

          <div className="mx-5 rounded-lg border bg-white px-5 py-2 ">
            <h4 className="text-[15px] tracking-wide  text-gray-500">
              Kamu berada di:
            </h4>
            <div className="flex items-center gap-3">
              <Icon
                className="my-2  text-red-600"
                path={mdiMapMarkerRadius}
                size="2em"
              />
              <span className="text-sm text-slate-500">
                {isSuccess
                  ? data.address?.split(",")?.slice(0, 5).join("")
                  : "Antah Berantah"}
              </span>

              <button
                className={`ml-auto block ${isLoading && "animate-spin"}`}
                onClick={handleGPS}
              >
                <Icon
                  path={mdiRefresh}
                  size="24px"
                  className="text-indigo-500"
                />
              </button>
            </div>
          </div>

          <div>
            {isSuccess ? (
              data.status_code === 14 ? (
                <div className="mx-auto mt-[20px] w-[90%] rounded-lg bg-white p-5 text-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="mx-auto h-16 w-16 text-green-600"
                  >
                    <path
                      fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                  </svg>

                  <h3 className="mt-3 text-2xl font-semibold">
                    {data.message}!
                  </h3>

                  <p className=" mt-3 text-slate-500">Have a Nice Day!</p>

                  <button className="mt-5 rounded-sm bg-indigo-600 px-7 py-3 font-semibold text-white hover:animate-pulse ">
                    <a href="/student/">Go Back </a>
                  </button>
                </div>
              ) : data.status_code === 11 ? (
                <div className="mx-5 mt-8 flex flex-col items-center justify-center gap-5 rounded bg-blue-200 px-3 py-5">
                  <input
                    type="text"
                    placeholder="Token"
                    className="w-[90%] rounded-lg px-2 py-1"
                    value={tokenForm}
                    onChange={e => setTokenForm(e.target.value.toUpperCase())}
                  />
                  <textarea
                    type="text"
                    placeholder="Details"
                    className="w-[90%] rounded-lg px-2 py-1"
                    value={detailForm}
                    onChange={e => setDetailForm(e.target.value)}
                  />
                  <button
                    className="rounded-full border bg-indigo-600 px-5 py-1 text-white"
                    onClick={handleSubmitForm}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                "Selain 14 dan 11"
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
