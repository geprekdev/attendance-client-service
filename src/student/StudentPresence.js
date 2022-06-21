import React from "react";
import Skeleton from "../components/Skeleton";
import isEmpty from "../util/EmptyObj";
import { useGetStudentPresenceQuery } from "./StudentAPI";

export default function Presence() {
  const { isLoading, isSuccess, data, isError } = useGetStudentPresenceQuery();

  return (
    <>
      {isLoading && (
        <>
          <h1>Pelajaran Hari Ini</h1>
          <div className="mt-3 rounded-lg bg-indigo-700 p-6 text-white">
            <Skeleton
              color="bg-indigo-200"
              height="1.5em"
              rounded="lg"
              width="100%"
            />
            <Skeleton
              height="1.5em"
              width="41%"
              rounded="lg"
              color="bg-indigo-200"
              margin="mt-4"
            />

            <Skeleton
              height="1.5em"
              width="60%"
              rounded="lg"
              color="bg-indigo-200"
              margin="mt-4 ml-auto"
            />
          </div>
        </>
      )}

      {isSuccess &&
        (() => {
          const lectures = { ...data.data.lectures };

          if (isEmpty(lectures)) {
            return (
              <div className="mt-5 space-x-3 rounded-full bg-white p-2">
                <button className="rounded-full bg-purple-600 px-3 text-white">
                  Info
                </button>
                <span className="text-purple-600">
                  Saat ini belum ada kelas
                </span>
              </div>
            );
          }

          for (const key in lectures) {
            return (
              <>
                <h1>Pelajaran Hari Ini</h1>
                <div className="mt-5 rounded-lg bg-indigo-700 p-6 text-white">
                  <h4 className="text-[17px] font-semibold">
                    {lectures[key].name}
                  </h4>
                  <p className="mt-4">
                    {lectures[key].start} - {lectures[key].end} WIB
                  </p>
                  <p className="text-right">{lectures[key].teacher}</p>
                </div>
              </>
            );
          }
        })()}
    </>
  );
}
