import { mdiCalendar, mdiChevronLeft, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function StudentPermission() {
  const data = [
    {
      type: "Sakit",
      desc: "Kanker Ginjal Stadium IV",
      date: "6 Juni 2022 - 8 Juni 2022",
      status: "Menunggu Persetujuan",
    },
    {
      type: "Izin",
      desc: "Serangan Jantung Ekstrim",
      date: "5 Juni 2022",
      status: "Disetujui",
    },
  ];

  return (
    <Layout role="STUDENT">
      <div className="relative mx-auto mb-[56px] h-screen max-w-[444px] border px-5 py-3 pb-24 shadow">
        <div className="-m-5 h-[50px] max-w-[150%] bg-[#6A64F1] pt-3 pl-3">
          <Link to="/student/">
            <Icon path={mdiChevronLeft} size="1.9em" color="white" />
          </Link>
        </div>

        <div className="mt-10">
          <div className="mb-4 w-full rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 font-semibold text-white shadow-lg">
            Juni 2022
          </div>
          {data.map(permission => (
            <div
              className="mb-2 rounded-xl border px-5 py-2 shadow-lg"
              key={permission.desc}
            >
              <h4 className="font-semibold">{permission.type}</h4>
              <p className="text-gray-600">{permission.desc}</p>
              <div className="mt-4 mb-2 flex items-center gap-2">
                <Icon
                  path={mdiCalendar}
                  size="24px"
                  className="text-blue-500"
                />
                <p className=" rounded-lg bg-gray-200 px-3 py-1 font-semibold">
                  {permission.date}
                </p>
              </div>
              <p>1 Attachment(s)</p>
              <button
                className={`mt-2 ml-auto block cursor-default rounded-lg px-4 py-1 font-semibold ${
                  permission.status === "Ditolak"
                    ? "bg-red-500 text-white"
                    : permission.status === "Disetujui"
                    ? "bg-green-500 text-white"
                    : "bg-[#fdb13e] text-white"
                }`}
              >
                {permission.status}
              </button>
            </div>
          ))}

          <div className="mb-4 mt-5 w-full rounded-lg bg-gradient-to-r from-blue-700 to-[#63c2f0] px-5 py-2 font-semibold text-white shadow-lg">
            Mei 2022
          </div>

          <div className="mb-2 rounded-xl border px-5 py-2 shadow-lg">
            <h4 className="font-semibold">Sakit</h4>
            <p className="text-gray-600">Tersandung tali sepatu</p>
            <div className="mt-4 mb-2 flex items-center gap-2">
              <Icon path={mdiCalendar} size="24px" className="text-blue-500" />
              <p className="rounded-lg bg-gray-200 px-3 py-1 font-semibold">
                25 Mei 2022
              </p>
            </div>
            <p>1 Attachment(s)</p>
            <button
              className={`mt-2 ml-auto block cursor-default rounded-lg bg-red-500 px-4 py-1 font-semibold text-white`}
            >
              Ditolak
            </button>
          </div>
        </div>

        <div className="fixed bottom-[120px] mx-auto w-[420px] ">
          <div className="mr-2 flex justify-end">
            <Link to="/student/permission/new">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 p-0 shadow-xl   transition duration-200 ease-in hover:bg-blue-800 focus:outline-none active:shadow-2xl">
                <Icon path={mdiPlus} className="text-white" size="80%" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
