import Layout from "../components/Layout";
import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "@mdi/react";
import L from "leaflet";
import { Link } from "react-router-dom";
import { mdiArrowLeft } from "@mdi/js";
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
  const [clock, setClock] = useState({
  in: null,
  out: null
  });
  const [triggerPostStudentAttendance] = usePostStudentAttendanceMutation();

  const { isLoading, isSuccess, data, isError } = useGetStudentAttendanceQuery(
    GeoLoc,
    { skip: !GPSActive }
  );

 // if (isSuccess && clock.in === null && clock.out === null) {
 //   setClock({
 //     in: data.clock_in,
 //     out: data.clock_out,
 //   });
 // }

  const handleSubmitForm = async () => {
    const data = await triggerPostStudentAttendance();
    if (data.status === 200) {
      setClock({
        in: data.clock_in,
        out: data.clock_out,
      });
    }
        console.log(data, clock);
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

        <div className="absolute bottom-0 z-20 h-[40%] w-full rounded-t-3xl bg-white px-5 py-3 shadow-2xl">
        
                        <div>
                  <h2 className="text-[14px]">Clock aan</h2>
                  <h3 className="text-[20px]">{clock.in}</h3>
                </div>
          {isSuccess && (
            <>
              <h1 className="text-[20px] font-medium">Lokasi</h1>
              <h1 className="text-[14px]">{data.user.address}</h1>
              <div className="grid grid-cols-2 gap-2 py-3 text-center">
                <div>
                  <h2 className="text-[14px]">Clock In</h2>
                  <h3 className="text-[20px]">{clock.in}</h3>
                </div>
                <div>
                  <h2 className="text-[14px]">Clock In</h2>
                  <h3 className="text-[20px]">{clock.out}</h3>
                </div>
              </div>
            </>
          )}
          <button
            onClick={handleSubmitForm}
            type="button"
            className="ease focus:shadow-outline w-full select-none rounded-md border border-indigo-500 bg-indigo-500 py-3 text-white transition duration-500 hover:bg-indigo-600 focus:outline-none"
          >
            Clock In
          </button>
        </div>
      </div>
    </Layout>
  );
}
