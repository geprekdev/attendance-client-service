import {
  mdiCalendar,
  mdiCheckCircleOutline,
  mdiChevronLeft,
  mdiCircleOutline,
  mdiUploadOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function StudentPermissionNew() {
  const menus = [
    { type: "Half Day", text: "Izin untuk sementara waktu" },
    { type: "Full Day", text: "Izin untuk seharian penuh" },
  ];

  const [cal, setCal] = useState();

  console.log(cal);

  const [mapel, setMapel] = useState([
    { name: "Matematika Terapan", isActive: false },
    { name: "Sejarah Indonesia", isActive: false },
    { name: "Fisika dan Kosmologi", isActive: false },
    { name: "Kesenian Daerah", isActive: false },
    { name: "Pemodelan Perangkat Lunak", isActive: false },
  ]);

  const [typePermission, setTypePermission] = useState("Half Day");

  return (
    <Layout title="Student" role="STUDENT">
      <div className="mx-auto max-w-[444px] border px-5 py-3 pb-24 shadow-lg">
        <div className="-m-5 h-[50px] max-w-[150%] bg-[#6A64F1] pt-3 pl-3">
          <Link to="/student/permission">
            <Icon path={mdiChevronLeft} size="1.9em" color="white" />
          </Link>
        </div>

        <Calendar selectRange value={cal} onChange={setCal} />

        <div className="mt-7">
          <h1 className=" text-3xl">Izin</h1>

          <div className="mx-auto mb-5 w-[50%]">
            <img src="/permission-letter.png" alt="Surat Izin" />
          </div>

          <div className="mx-auto w-[80%] text-center">
            <h3 className="text-xl">Pilih jenis izin</h3>
            <p className="text-sm text-gray-500">
              Surat keterangan harus diunggah dalam bentuk JPG, PNG, PDF
            </p>
          </div>

          <div className="mt-7 flex justify-between gap-5">
            {menus.map(menu => (
              <div
                className={`cursor-pointer rounded border-2 ${
                  typePermission === menu.type ? "border-indigo-500" : ""
                }`}
                onClick={() => setTypePermission(menu.type)}
                key={menu.text}
              >
                <div className="px-5 py-3">
                  <h1 className="text-lg font-semibold">{menu.type}</h1>
                  <p className="mt-2 text-sm text-gray-500">{menu.text}</p>
                </div>
                <div
                  className={`w-full cursor-pointer border-t ${
                    typePermission === menu.type
                      ? "bg-indigo-500"
                      : "bg-gray-100 "
                  }  py-1.5 text-center text-lg font-semibold`}
                >
                  <Icon
                    path={
                      typePermission === menu.type
                        ? mdiCheckCircleOutline
                        : mdiCircleOutline
                    }
                    size="28px"
                    className={`mx-auto rounded-full ${
                      typePermission === menu.type
                        ? "text-white"
                        : "text-gray-400"
                    } `}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 mb-[56px]">
            {typePermission === "Half Day" ? (
              <>
                <h3 className="text-lg font-semibold">Pilih Tanggal</h3>
                <div className="mt-1 flex items-center justify-between rounded-lg bg-gray-100 px-5 py-2">
                  <p>Juni, 20 - Juni, 21</p>
                  <Icon path={mdiCalendar} size="24px" />
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold">Pilih Mapel</h3>
                  <div className="flex flex-wrap">
                    {mapel.map((mpl, idx) => (
                      <div className="ml-5 mb-3 text-gray-600" key={mpl.name}>
                        <button
                          className="rounded-full border px-5 py-1.5 hover:bg-indigo-200"
                          onClick={() => ""}
                        >
                          {mpl.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold">Kategori</h3>
                  <p className="ml-5">Keperluan Sekolah</p>
                </div>

                <div className="mt-7">
                  <h3 className="mb-2 text-lg font-semibold">
                    Unggah Surat Izin
                  </h3>
                  <label htmlFor="upFile">
                    <div className="flex  cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 py-2">
                      <Icon
                        path={mdiUploadOutline}
                        size="24px"
                        className="text-gray-800"
                      />
                      <p>Tambahkan FIle</p>
                    </div>
                  </label>

                  <input
                    type="file"
                    id="upFile"
                    accept=".png .jpg .jpeg .pdf"
                    className="hidden"
                  />
                </div>

                <div className="mt-7 w-full cursor-pointer bg-indigo-500 px-5 py-2 text-center text-white">
                  Ajukan
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
