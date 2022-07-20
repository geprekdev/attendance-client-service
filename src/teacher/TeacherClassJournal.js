import { mdiInformationOutline, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useGetTeacherJournalQuery } from "./TeacherAPI";
import Cookie from "../util/Cookie";
import Skeleton from "../components/Skeleton";
import { useState } from "react";

export default function TeacherJournal() {
  const { id } = useParams();
  const { state } = useLocation();
  const [alert, setAlert] = useState(false);
  const { data, isSuccess, isLoading, isError, error } =
    useGetTeacherJournalQuery(
      {
        token: Cookie.getItem("token"),
        id,
      },
      { refetchOnFocus: true }
    );

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

  return (
    <div className=" mt-4">
      {state?.err && (
        <div
          className={`${
            alert ? "hidden" : "flex"
          } justify-between rounded-lg border-2 border-red-300 p-3 text-red-800  shadow-inner`}
          onClick={() => setAlert(true)}
        >
          <p className="flex items-center self-center">
            <strong>
              <Icon
                className="mr-2 text-red-500"
                path={mdiInformationOutline}
                size="20px"
              />
            </strong>
            Anda sudah mengirim Journal!
          </p>
          <strong className="align-center alert-del cursor-pointer text-xl">
            &times;
          </strong>
        </div>
      )}

      {isSuccess && data.length === 0 ? (
        <p className="mt-5 text-center text-gray-500">Tidak Ada Jurnal</p>
      ) : (
        data?.map(journal => (
          <div
            className="mx-auto my-5 w-[80%]  cursor-default border-4 border-y-transparent border-r-transparent border-l-red-300 px-5 py-2 text-gray-900 shadow hover:border-l-red-500 hover:shadow-md"
            key={journal.description}
          >
            <h3 className="mb-1.5 font-semibold">{journal.description}</h3>
            <p className="text-gray-500">{journal.date}</p>
          </div>
        ))
      )}

      {isLoading && (
        <>
          <div className="mx-auto my-5 h-[50px] w-[80%]">
            <Skeleton height={"50px"} />
          </div>
          <div className="mx-auto h-[50px] w-[80%]">
            <Skeleton height={"50px"} />
          </div>
        </>
      )}

      {/* Add new journal */}
      <div className="sticky bottom-[100px]">
        <div className="ml-auto flex h-14 w-14 cursor-pointer items-center rounded-full bg-red-500 shadow-xl hover:bg-red-600">
          <Link to="new" className="flex justify-center">
            <Icon path={mdiPlus} className="text-gray-100" size="78%" />
          </Link>
        </div>
      </div>
    </div>
  );
}
