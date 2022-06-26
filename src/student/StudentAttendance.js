import Layout from "../components/Layout";
import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "@mdi/react";
import L from "leaflet";
import { Link } from "react-router-dom";
import { mdiRecordCircleOutline, mdiArrowLeft } from "@mdi/js";
import "./App.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  useGetStudentAttendanceQuery,
  usePostStudentAttendanceMutation,
} from "./StudentAPI";
export default function StudentAttendance() {
  const [GPSActive, setGPSActive] = useState(false);
  const [GeoLoc, setGeoLoc] = useState({
    longitude: "",
    latitude: "",
  });
  const [clock, setClock] = useState(false);
  const [attendanceType, setAttendanceType] = useState(false);
  const [triggerPostStudentAttendance] = usePostStudentAttendanceMutation();

  const { isLoading, isSuccess, data, isError } = useGetStudentAttendanceQuery(
    GeoLoc,
    { skip: !GPSActive }
  );
  console.log(isSuccess && data);
  if (isSuccess && clock === false) {
    setClock({
      in: data.clock_in,
      out: data.clock_out,
    });
    setAttendanceType("Check-In");
  }

  const handleSubmitForm = async () => {
    const data = await triggerPostStudentAttendance();
    if (data.data.status === 200) {
      setClock({
        in: data.data.clock_in,
        out: data.data.clock_out,
      });
      setAttendanceType(data.data.attendance_type);
    }
    console.log(data);
  };

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
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
        crossorigin=""
      />
      <div className="relative mx-auto h-screen max-w-[444px] border pb-24 shadow-lg">
        <Link to="/student">
          <span className="absolute left-4 top-3 z-20 rounded-full bg-white p-[5px] shadow-lg">
            <Icon path={mdiArrowLeft} size="25px" />
          </span>
        </Link>
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

        <div className="absolute bottom-0 z-20 h-[40%] w-full rounded-t-3xl bg-white px-9 py-8 shadow-2xl">
          {isSuccess && (
            <>
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
                <div class="py-2">
                  <h2 className="text-sm font-semibold">Clock In</h2>
                  <h3 className="text-lg">{clock.in}</h3>
                </div>
                <div class="py-2">
                  <h2 className="text-sm font-semibold">Clock In</h2>
                  <h3 className="text-lg">{clock.out}</h3>
                </div>
              </div>
              <button
                onClick={handleSubmitForm}
                type="button"
                className="ease focus:shadow-outline w-full select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 font-semibold text-slate-100 shadow-xl transition duration-500 hover:bg-indigo-600 focus:outline-none"
              >
                {attendanceType}
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
