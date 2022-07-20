import {
  mdiCalendar,
  mdiCheckCircleOutline,
  mdiChevronLeft,
  mdiCircleOutline,
  mdiUploadOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
// import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getFullDate } from "../util/Date";
import { useGetStudentLeaveQuery } from "./StudentAPI";

export default function StudentPermissionNew() {
  const menus = [
    { type: "Half Day", text: "Izin untuk sementara waktu" },
    { type: "Full Day", text: "Izin untuk seharian penuh" },
  ];

  const [mapel, setMapel] = useState([
    { name: "Matematika asfasfas", isActive: false },
    { name: "Sejarah Indonesia", isActive: false },
    { name: "Fisika dan Kosmologi", isActive: false },
    { name: "Kesenian Daerah", isActive: false },
    { name: "Pemodelan Perangkat Lunak", isActive: false },
  ]);

  const [hari, setHari] = useState([
    { name: "Senin, 18 Juli 2022", isActive: false },
    { name: "Selasa, 19 Juli 2022", isActive: false },
    { name: "Rabu, 20 Juli 2022", isActive: false },
    { name: "Kamis, 21 Juli 2022", isActive: false },
    { name: "Jumat, 22 Juli 2022", isActive: false },
    { name: "Sabtu, 23 Juli 2022", isActive: false },
    { name: "Minggu, 24 Juli 2022", isActive: false },
  ]);

  const [isSuccess, data] = useGetStudentLeaveQuery();
  console.log(isSuccess && data);

  const [dropdownActive, setDropdownActive] = useState(false);
  const [category, setCategory] = useState("Sakit");

  const [cal, setCal] = useState();

  const categories = ["Sakit", "Izin", "Keperluan Sekolah"];

  const handleMapelClick = position => {
    setMapel(
      [...mapel].map((mpl, idx) => {
        if (idx === position) {
          return {
            ...mpl,
            isActive: !mpl.isActive,
          };
        } else return { ...mpl };
      })
    );
  };

  const handleClick = position => {
    setHari(
      [...hari].map((h, idx) => {
        if (idx === position) {
          return {
            ...h,
            isActive: !h.isActive,
          };
        } else return { ...h };
      })
    );
  };

  const handleCategorySelected = category => {
    setCategory(category);
  };

  const [typePermission, setTypePermission] = useState("Half Day");

  return (
    <Layout title="Student" role="STUDENT">
      <div className="relative mx-auto max-w-[444px] border px-5 py-3 pb-12 shadow-lg">
        <div className="-m-5 h-[50px] max-w-[150%] bg-[#6A64F1] pt-3 pl-3">
          <Link to="/student/permission">
            <Icon path={mdiChevronLeft} size="1.9em" color="white" />
          </Link>
        </div>

        {/* <Calendar selectRange value={cal} onChange={setCal} /> */}

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
            {typePermission === "Half Day" && (
              <>
                <h3 className="text-lg font-semibold">Hari Ini</h3>
                <div className="mt-1 flex items-center justify-between rounded-lg bg-gray-100 px-5 py-2">
                  <p>{getFullDate(new Date())}</p>
                </div>

                <div className="mt-7">
                  <h3 className="text-lg font-semibold">Pilih Mapel</h3>
                  <div className="flex flex-wrap">
                    {mapel.map((mpl, idx) => (
                      <div
                        className={`ml-5 mb-3 text-gray-600 `}
                        key={mpl.name}
                      >
                        <button
                          key={idx}
                          className={`${
                            mpl.isActive && "border-[1.5] border-blue-500"
                          } rounded-full border px-5 py-1.5 hover:bg-opacity-75 hover:shadow`}
                          is-active={mpl.isActive.toString()}
                          onClick={() => handleMapelClick(idx)}
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
                    accept=".png .jpg .jpeg "
                    className="hidden"
                  />
                </div>

                <div className="mt-7 w-full cursor-pointer bg-indigo-500 px-5 py-2 text-center text-white">
                  Ajukan
                </div>
              </>
            )}

            {typePermission === "Full Day" && (
              <>
                <h3 className="text-lg font-semibold">Pilih Tanggal</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hari.map((h, idx) => (
                    <div className={`ml-5 mb-3 text-gray-600`} key={h.name}>
                      <button
                        key={idx}
                        className={`${
                          h.isActive && "border-[1.5] border-blue-500"
                        } rounded-full border px-5 py-1.5 hover:bg-opacity-75 hover:shadow`}
                        is-active={h.isActive.toString()}
                        onClick={() => handleClick(idx)}
                      >
                        {h.name}
                      </button>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold">Kategori</h3>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border-b bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setDropdownActive(!dropdownActive)}
                >
                  {category}
                </button>

                {/* Isi Dropdown */}
                {dropdownActive && (
                  <div
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-md  bg-white shadow-lg ring-1 ring-black ring-opacity-5 "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      {categories.map(category => (
                        <button
                          className={`block px-4 py-2 text-sm text-gray-400 hover:text-gray-700`}
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                          key={category}
                          onClick={() => handleCategorySelected(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div onClick={() => setDropdownActive(false)}>
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
                      accept=".png .jpg .jpeg "
                      className="hidden"
                    />
                  </div>

                  <div className="mt-7 w-full cursor-pointer bg-indigo-500 px-5 py-2 text-center text-white">
                    Ajukan
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
