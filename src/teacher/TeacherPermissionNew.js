import {
  mdiCheckCircleOutline,
  mdiChevronLeft,
  mdiUploadOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  useGetTeacherLeaveFullQuery,
  usePostTeacherLeaveFullMutation,
} from "./TeacherAPI";
import Cookie from "../util/Cookie";

export default function StudentPermissionNew() {
  const [triggerPostFull] = usePostTeacherLeaveFullMutation();
  const [attendanceScheduled, setAttendanceScheduled] = useState([]);
  const [alertForm, setAlertForm] = useState();

  const [dropdownActive, setDropdownActive] = useState(false);
  const [category, setCategory] = useState("Sakit");
  const [reason, setReason] = useState("");
  const [fileUpload, setFileUpload] = useState({});
  const [displayIMG, setDisplayIMG] = useState([]);

  const navigate = useNavigate();

  const { isSuccess, data } = useGetTeacherLeaveFullQuery({
    token: Cookie.getItem("token"),
  });

  const categories = ["Sakit", "Izin", "Keperluan Sekolah"];

  const handleLeaveFullSubmit = async () => {
    console.log("Mengajukan Izin...");

    const leave_type = parseInt(
      category === "Ijin" ? 0 : category === "Sakit" ? 1 : 2
    );
    const attendance_scheduled = [];

    attendanceScheduled.forEach(att => {
      if (att.isActive) {
        attendance_scheduled.push(att.id);
      }
    });

    let formData = new FormData();

    const att_scheduled = attendanceScheduled
      .map(att => {
        if (att.isActive) {
          return att.id;
        }
        return null;
      })
      .filter(att => att != null);

    formData.append("reason", reason);
    formData.append("leave_type", leave_type);
    formData.append("attendance_scheduled", att_scheduled[0]);
    formData.append("attachment", fileUpload[0]);

    const res = await triggerPostFull({
      formData,
      token: Cookie.getItem("token"),
    });

    console.log("respponse ->", res);

    if (res.data) {
      navigate("/teacher/permission", {
        state: { isSuccess: true },
      });
    } else {
      setAlertForm({
        status: true,
        message: `Tidak dapat mengirim, periksa form anda!`,
      });
    }
  };

  const handleDaysClick = position => {
    setAttendanceScheduled(
      [...attendanceScheduled].map((att, idx) => {
        if (idx === position) {
          return {
            ...att,
            isActive: !att.isActive,
          };
        } else return { ...att };
      })
    );
  };

  const handleCategorySelected = category => {
    setCategory(category);
  };

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setFileUpload(event.target.files);
      setDisplayIMG(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setAttendanceScheduled(
        data.attendanceTimetable.map(att => ({ ...att, isActive: false }))
      );

      // setDays(data.attendanceTimetable.map(d => ({ ...d, isActive: false })));
    }
  }, [isSuccess, data]);

  return (
    <Layout title="Teacher" role="TEACHER">
      <div className="relative mx-auto max-w-[444px] border px-5 py-3 pb-12 shadow-lg">
        <div className="-m-5 h-[50px] max-w-[150%] bg-[#c52831] pt-3 pl-3">
          <Link to="/teacher/">
            <Icon path={mdiChevronLeft} size="1.9em" color="white" />
          </Link>
        </div>

        <div className="mt-7">
          <h1 className=" text-3xl">Izin</h1>

          <div className="mx-auto mb-5 w-[50%]">
            <img src="/permission-letter.png" alt="Surat Izin" />
          </div>

          <div className="mx-auto w-[80%] text-center">
            {/* <h3 className="text-xl">Pilih jenis izin</h3> */}
            <p className="text-sm text-gray-500">
              Surat keterangan harus diunggah dalam bentuk JPG, PNG, PDF
            </p>
          </div>

          <div
            className={`mx-auto mt-7 w-[80%] cursor-pointer rounded border-2 border-red-500 text-center`}
          >
            <div className="px-5 py-3">
              <h1 className="text-2xl font-semibold">Full Day</h1>
              <p className="mt-2 text-sm text-gray-500">Izin untuk full day</p>
            </div>
            <div
              className={`w-full cursor-pointer border-t
                bg-red-500 py-1.5 text-center text-lg font-semibold`}
            >
              <Icon
                path={mdiCheckCircleOutline}
                size="28px"
                className={`mx-auto rounded-full text-white`}
              />
            </div>
          </div>

          <div className="mt-10 mb-[56px]">
            <>
              {alertForm?.status && (
                <div
                  className="mb-4 flex rounded-lg bg-yellow-100 p-4 text-sm text-yellow-700"
                  role="alert"
                >
                  <svg
                    className="mr-3 inline h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div>{alertForm.message}</div>
                </div>
              )}
              <h3 className="text-lg font-semibold">Pilih Tanggal</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {attendanceScheduled?.map((day, idx) => (
                  <div className={`ml-5 mb-3 text-gray-600`} key={day.name}>
                    <button
                      key={idx}
                      className={`${
                        day.isActive && "border-[1.7px] border-red-500"
                      } rounded-full border px-5 py-1.5 hover:bg-opacity-75 hover:shadow`}
                      is-active={day.isActive.toString()}
                      onClick={() => handleDaysClick(idx)}
                    >
                      {day.name}
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

              <div className="mt-3">
                <h3 className="text-lg font-semibold">Alasan</h3>
                <textarea
                  id="message"
                  rows="4"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 "
                  placeholder="Keperluan Sekolah"
                  required
                  onChange={e => setReason(e.target.value)}
                  value={reason}
                ></textarea>
              </div>

              <div onClick={() => setDropdownActive(false)}>
                <div className="mt-7">
                  <h3 className="mb-2 text-lg font-semibold">
                    Unggah Surat Izin
                  </h3>
                  <label htmlFor="upFile">
                    <div className="flex  cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 py-2">
                      <Icon
                        path={fileUpload[0] ? " " : mdiUploadOutline}
                        size="24px"
                        className="text-gray-800"
                      />
                      <p>{fileUpload?.name || "Tambahkan File"}</p>
                    </div>
                  </label>

                  <div className="mt-5">
                    <img src={displayIMG && displayIMG} alt="Pratinjau" />
                  </div>

                  <input
                    type="file"
                    id="upFile"
                    accept="image/"
                    className="hidden"
                    onChange={onImageChange}
                  />
                </div>

                <div
                  onClick={handleLeaveFullSubmit}
                  className="mt-7 w-full cursor-pointer bg-red-500 px-5
                    py-2 text-center text-white"
                >
                  <button type="submit">Ajukan</button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </Layout>
  );
}
