import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Cookie from "../util/Cookie";
import {
  useGetTeacherJournalAddNewQuery,
  usePostTeacherJournalAddNewMutation,
} from "./TeacherAPI";

export default function TeacherClassJournalAddNew() {
  const { data, isSuccess, isLoading, isError, error } =
    useGetTeacherJournalAddNewQuery({
      token: Cookie.getItem("token"),
    });

  const { id } = useParams();

  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [triggerPost] = usePostTeacherJournalAddNewMutation();

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await triggerPost({
      token: Cookie.getItem("token"),
      description,
    });

    if (res.data === "valid") {
      console.log(`/teacher/class/${id}/journal`);
      window.location = `/teacher/class/${id}/journal`;
      // return <Navigate to={`/teacher/class/${id}/journal`} />;
    }
  };

  // Unauthorize
  if (isError && error.status === 401) {
    Cookie.deleteItem("token");
    return <Navigate to={"/auth/login"} />;
  }

  // Role permission
  if (isError && error.status === 403) {
    Cookie.deleteItem("token");
    return <Navigate to={"/auth/login"} />;
  }

  // 406
  if (isError && error.status === 406) {
    return (
      <Navigate to={`/teacher/class/${id}/journal`} state={{ err: true }} />
    );
  }

  return (
    <div className="mt-3">
      {isSuccess && data === null ? (
        <Navigate to={`/teacher/class/${id}/journal`} state={{ err: true }} />
      ) : (
        <>
          <h1 className="text-right text-xl font-semibold">Jurnal Mengajar</h1>

          <div className="mt-3">
            <form onSubmit={handleSubmit}>
              <h3 className="font-semibold">Kelas</h3>
              <div className="mt-2 rounded-lg bg-gray-100 px-5 py-2">
                {isSuccess && data.grade}
              </div>

              <div className="mt-5">
                <h3 className="font-semibold">Mata Pelajaran</h3>
                <div className="mt-2 rounded-lg bg-gray-100 px-5 py-2">
                  {isSuccess && data.subject}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-semibold">Kegiatan</h3>
                <textarea
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                  className="mt-2 w-full rounded bg-gray-100 px-5 py-2"
                />
              </div>

              <button
                type="submit"
                className="mb-[50px] mt-5 w-full rounded-lg bg-red-500 px-5 py-2 text-center font-semibold text-white hover:bg-red-600"
              >
                Kirim
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
