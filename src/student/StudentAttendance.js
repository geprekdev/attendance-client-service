import Layout from "../components/Layout";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "@mdi/react";
import L from 'leaflet';
import { Link } from "react-router-dom";
import { mdiArrowLeft } from "@mdi/js";
import "./App.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export default function StudentAttendance() {
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
  L.Marker.prototype.options.icon = DefaultIcon
  const currentLocation = [6.1, -5.2];
  return (
    // ----
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
          <MapContainer
            center={currentLocation}
            zoom={13}
	    zoomControl={false}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentLocation}></Marker>
          </MapContainer>
        </div>

        <div className="absolute bottom-0 z-20 h-[40%] w-full rounded-t-3xl bg-white px-5 py-3 shadow-2xl">
          <h1 className="text-[20px] font-medium">Lokasi</h1>
          <h1 className="text-[14px]">Jl. Pandanaran SMK 8 Semarang</h1>
          <div className="grid grid-cols-2 gap-2 py-3 text-center">
            <div>
              <h2 className="text-[14px]">Clock In</h2>
              <h3 className="text-[30px]">--:--</h3>
            </div>
            <div>
              <h2 className="text-[14px]">Clock In</h2>
              <h3 className="text-[30px]">--:--</h3>
            </div>
          </div>
          <button
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
