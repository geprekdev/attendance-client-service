// Untuk Clock-in dan Clock-Out siswa
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "@mdi/react";
import L from "leaflet";
import { Link, useNavigate } from "react-router-dom";
import {
  mdiArrowLeft,
  mdiInformationOutline,
  mdiRecordCircleOutline,
} from "@mdi/js";
import "./App.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  useGetStudentAttendanceQuery,
  usePostStudentAttendanceMutation,
} from "./StudentAPI";
import Cookie from "../util/Cookie";
export default function StudentAttendance() {
  const [GPSActive, setGPSActive] = useState(false);
  const [GeoLoc, setGeoLoc] = useState({
    longitude: "",
    latitude: "",
  });
  const [attendance_status, setAttendanceStatus] = useState(false);
  const [clock, setClock] = useState(false);
  const [statusPost, setStatusPost] = useState({
    error: null, message: ""
  });
  const [triggerPostStudentAttendance] = usePostStudentAttendanceMutation();

  const { isSuccess, data, isError, error } = useGetStudentAttendanceQuery(
    {
      token: Cookie.getItem("token"),
      latitude: GeoLoc.latitude,
      longitude: GeoLoc.longitude,
    },
    { skip: !GPSActive }
  );

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

  if (isSuccess && clock === false) {
    setClock({
      in: data.clock_in,
      out: data.clock_out,
    });
    setAttendanceStatus(data.attendance_status);
  }

  const handleSubmitForm = async () => {
    const data = await triggerPostStudentAttendance({
      token: Cookie.getItem("token"),
    });
    if (data.data.clock_in) {
      setClock({
        in: data.data.clock_in,
      });
    } else if (data.data.clock_out) {
      setClock({
        in: clock.in,
        out: data.data.clock_out,
      });
    }

    console.log(data);
    if (data.data?.error){
      setStatusPost({error: true, message: data.data?.error?.message})
    }else{
      setStatusPost({error: false, message: data.data?.success?.message})
    }
    setAttendanceStatus(data.data.next_attendance_status);
  };

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

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  if (!GPSActive) {
    handleGPS();
  }

  return (
    <Layout title="Student Attendance" role="STUDENT">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        crossOrigin=""
      />
      <div className="relative mx-auto h-screen max-w-[444px] border pb-24 shadow-lg">
        <Link to="/student">
          <span className="absolute left-4 top-3 z-20 rounded-full bg-white p-[5px] shadow-lg">
            <Icon path={mdiArrowLeft} size="25px" />
          </span>
        </Link>

        {/* Alert */}
        {statusPost.error && (
          <div
            className="absolute right-4 top-3 z-20 mb-4 flex items-center rounded-md bg-red-100 py-3 px-5 text-sm text-red-500 shadow-2xl"
            role="alert"
          >
            <div className="mr-2 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLiceCap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                />
              </svg>
            </div>
            <span>{statusPost.message}</span>
          </div>
        )}

        {statusPost.error === false && (
          <div
            className="absolute right-4 top-3 z-20 mb-4 flex items-center rounded-md bg-green-100 py-3 px-5 text-sm text-green-500 shadow-2xl"
            role="alert"
          >
            <div className="mr-2 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokelicecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </div>
            <span>{statusPost.message}</span>
          </div>
        )}
        {/* End Alert */}

        <div className="z-1 absolute h-[70%] w-full">
          {GPSActive && (
            <MapContainer
              center={[GeoLoc.latitude, GeoLoc.longitude]}
              zoom={13}
              zoomControl={false}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[GeoLoc.latitude, GeoLoc.longitude]}></Marker>
            </MapContainer>
          )}
        </div>

        <div className="absolute bottom-14 z-20 h-[40%] w-full rounded-t-3xl bg-white px-9 py-8 shadow-2xl">
          {isSuccess && data?.message ? (
            <div className="mt-10 flex items-center justify-center gap-2 rounded-xl text-2xl font-semibold text-indigo-500">
              <Icon path={mdiInformationOutline} size="50px" />
              <p>Tidak Ada Jawal</p>
            </div>
          ) : (
            isSuccess && (
              <div className="">
                <div className="grid grid-cols-2">
                  <div>
                    <Icon
                      className="text-yellow-500"
                      path={mdiRecordCircleOutline}
                      size="30px"
                    />
                  </div>

                  <div className="-ml-[75%] text-sm">
                    <h1 className="text-[14px]">
                      {data.user.address.split(",")[0]} -{" "}
                      {data.user.address.split(",")[1]}
                    </h1>
                    <span className="text-[13px] text-slate-700">
                      {data.user.address}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 py-3 text-center">
                  <div className="py-2">
                    <h2 className="text-sm font-semibold">Clock In</h2>
                    <h3 className="text-lg">{clock.in || "--:--"}</h3>
                  </div>
                  <div className="py-2">
                    <h2 className="text-sm font-semibold">Clock Out</h2>
                    <h3 className="text-lg">{clock.out || "--:--"}</h3>
                  </div>
                </div>
                {attendance_status === "Done!" ? (
                  <button
                    type="button"
                    className="ease focus:shadow-outline w-full cursor-not-allowed select-none rounded-md border border-green-500 bg-green-500 py-2 font-semibold text-slate-100 shadow-xl transition duration-500  focus:outline-none"
                  >
                    {attendance_status}
                  </button>
                ) : (
                  attendance_status && (
                    <button
                      onClick={handleSubmitForm}
                      type="button"
                      className="ease focus:shadow-outline w-full select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 font-semibold text-slate-100 shadow-xl transition duration-500 hover:bg-indigo-600 focus:outline-none"
                    >
                      {attendance_status}
                    </button>
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
