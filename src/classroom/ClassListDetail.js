import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassListTable from "./ClassListTable";
import Layout from "../components/Layout";
import { useGetDetailClassListQuery } from "./ClassListAPI";

export default function ClassListDetail() {
  const { grade, subject } = useParams();
  const navigate = useNavigate();
  const [detailActive, setDetailActive] = useState("Info");

  const slug = grade.split(" ").join("-");
  const params = { slug, subject };

  const { isLoading, isSuccess, data } = useGetDetailClassListQuery(params);
  const detailNav = ["Info", "Jadwal", "Kehadiran", "Catatan Siswa"];

  const students = [
    {
      name: "ALYA SEPTIANI PUTRI FATONI",
      status: "BELUM ABSEN",
      absen: 1,
      key: 1,
    },
    { name: "ARIYA KAFI MAHARDIKA", status: "BELUM ABSEN", absen: 2, key: 2 },
    {
      name: "ARRASHINDY HAYYU NAFIAR",
      status: "BELUM ABSEN",
      absen: 3,
      key: 3,
    },
    { name: "ARYA RACHMA PUTRA", status: "BELUM ABSEN", absen: 4, key: 4 },
  ];

  const classData = isSuccess && [
    { name: "Jumlah Siswa", value: data.total },
    { name: "Token", value: data.schedules[0].token },
    { name: "Catatan Siswa", value: 0 },
  ];

  return (
    <Layout title={`${grade} ${subject}`}>
      <div
        className="group flex w-36 cursor-pointer items-center space-x-2 "
        onClick={() => navigate("/instructor/classlists")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="50"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
        <h3 className="text-2xl text-gray-700 group-hover:underline">
          Kembali
        </h3>
      </div>

      <div className="mt-5 flex justify-between">
        <h1 className="text-4xl text-gray-600">
          {subject} ~ {grade}
        </h1>

        <div className="flex space-x-3">
          <input
            type="date"
            className="cursor-pointer rounded-md  border-2 px-5 text-gray-600"
            name=""
            id=""
          />
          <button className="btn-primary">Rekap Absensi</button>
        </div>
      </div>

      <h1 className="text-center text-7xl">{isLoading && "Loading..."}</h1>

      <div className="mt-20 flex space-x-6 border-b-2 pb-5 text-gray-500">
        {detailNav.map(currentNav => (
          <button
            key={currentNav}
            onClick={() => setDetailActive(currentNav)}
            className={`${
              detailActive === currentNav
                ? "text-blue-500 underline decoration-[1.5px]"
                : ""
            } font-semibold`}
          >
            {currentNav}
          </button>
        ))}
      </div>

      {detailActive === "Info" ? (
        <div className="mt-7 rounded border-2 p-5">
          <h3 className="text-lg font-semibold text-gray-600">Data Kelas</h3>

          <div className="-mt-1 flex space-x-4" id="#info">
            {isSuccess &&
              classData.map(data => (
                <div className="w-full" key={data.name}>
                  <h4 className="mt-5 text-lg text-gray-700">{data.name}</h4>
                  <p className="rounded border-2 py-3 px-5 text-gray-700">
                    {data.value}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ) : detailActive === "Jadwal" ? (
        <div className="mt-7">
          <h3 className="text-2xl font-semibold text-gray-600">Jadwal</h3>
          <p className="mt-2 text-lg text-gray-600">Jadwal Anda di {grade}</p>

          <table className="mt-5 w-full text-left">
            <thead className=" text-lg text-gray-600">
              <tr className="border-b-2">
                <th className="px-7 py-3">Waktu</th>
                <th>Mata Pelajaran</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2">
                <td className="px-7 py-3">Jum'at M 1,3 - 09:30</td>
                <td>Dasar Desain Grafis</td>
              </tr>
              <tr>
                <td className="px-7 py-3">Rabu M 2,4 - 09:30</td>
                <td>Dasar Desain Grafis</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : detailActive === "Catatan Siswa" ? (
        <div className="mt-7 w-full rounded border-l-[5px] border-l-blue-500 p-7">
          <h1 className="text-xl font-semibold text-gray-600">
            Belum ada catatan siswa
          </h1>
          <p className="text-lg text-gray-500">
            Catatan siswa akan muncul ketika siswa sudah melakukan absensi
          </p>
        </div>
      ) : (
        <div className="mt-7">
          <h1 className="text-3xl font-bold text-gray-600">Kehadiran</h1>

          <table className="mt-5 w-full border text-left">
            <thead className="text-lg text-gray-600">
              <tr className="border-2 ">
                <th className="border-2 px-7 py-3 text-center text-gray-500">
                  No
                </th>
                <th className=" w-[60%]  border-2 px-7 py-3 text-gray-500">
                  Nama
                </th>
                <th className="px-7 py-3 text-gray-500">Status</th>
              </tr>
            </thead>
            {students.map(student => (
              <ClassListTable {...student} />
            ))}
          </table>
        </div>
      )}
    </Layout>
  );
}
