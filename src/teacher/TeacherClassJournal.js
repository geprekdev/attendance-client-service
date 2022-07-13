import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Link, useParams } from "react-router-dom";
import { useGetTeacherJournalQuery } from "./TeacherAPI";
import Cookie from "../util/Cookie";

export default function TeacherJournal() {
  const { id } = useParams();

  const { data, isSuccess, isLoading } = useGetTeacherJournalQuery(
    {
      token: Cookie.getItem("token"),
      id,
    },
    {
      refetchOnFocus: true,
    }
  );

  console.log(isSuccess && data);

  return (
    <div className=" mt-4">
      {isSuccess && data.length === 0 ? (
        <p className="mt-5 text-center text-gray-500">Tidak Ada Jurnal</p>
      ) : (
        data?.map(journal => (
          <div
            className="mx-auto my-5 w-[80%] cursor-default border-4 border-y-transparent border-r-transparent border-l-red-300 px-5 py-2 text-gray-900 shadow hover:border-l-red-500 hover:shadow-md"
            key={journal.description}
          >
            <h3 className="mb-1.5 font-semibold">{journal.description}</h3>
            <p className="text-gray-500">{journal.date}</p>
          </div>
        ))
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
