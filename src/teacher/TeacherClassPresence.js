import { mdiCheckBold, mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Cookie from "../util/Cookie";
import { useGetTeacherClassDetailQuery } from "./TeacherAPI";
import Skeleton from "../components/Skeleton";

export default function TeacherClassPresence() {
  const { id } = useParams();

  const { isLoading, data, isSuccess, isError, error } = useGetTeacherClassDetailQuery({
    token: Cookie.getItem("token").slice(0, -1),
    idClass: id,
  });
  const [day, setDay] = useState();
  const [dropdownActive, setDropdownActive] = useState(false);
  const [alphaPresenceCount, setAlphaPresenceCount] = useState({});

  useEffect(() => {
    document.title = "Teacher Class";
    if (isSuccess) {
      setDay(Object.keys(data.date).shift());
    }
  }, [isSuccess]);

  useEffect(() => {
    let alphaCount = 0;
    let presenceCount = 0;

    data?.date[day]?.forEach(d => {
      if (d.status === "ALPHA") {
        alphaCount += 1;
      } else {
        presenceCount += 1;
      }
    });

    setAlphaPresenceCount({
      alpha: alphaCount,
      presence: presenceCount,
    });
  }, [data?.date, day]);

  const handleDayClicked = e => {
    setDay(e.target.textContent);
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

  return (
    <div onClick={() => (dropdownActive ? setDropdownActive(false) : null)}>
      <div className="relative ml-auto mt-5 w-[50%] ">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border-b py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          {isLoading && "Selasa, 1 Jan 1970"}
          {isSuccess && day}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
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
              {isSuccess &&
                (() => {
                  let temp = [];
                  for (const obj in data.date) {
                    temp.push(
                      <button
                        className={`block px-4 py-2 text-sm ${
                          obj === day ? "text-gray-700" : "text-gray-400"
                        } hover:text-gray-700`}
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                        key={obj}
                        onClick={handleDayClicked}
                      >
                        {obj}
                      </button>
                    );
                  }

                  return temp;
                })()}
            </div>
          </div>
        )}
      </div>
      <p className="text-gray-600">Hadir: {alphaPresenceCount.presence}</p>
      <p className="text-gray-600">Alpha: {alphaPresenceCount.alpha} </p>
      <div className="mx-5 mt-3">
        {isLoading && (
          <>
            <div>
              <Skeleton />
            </div>
            <div className="mt-3">
              <Skeleton />
            </div>
          </>
        )}

        {isSuccess &&
          data.date[day]?.map((student, idx) => (
            <div
              className="flex w-full items-center gap-5 border-y border-gray-100 py-2 pl-6 pr-3 text-gray-600 transition duration-150 first:border-t-0 last:border-b-0 hover:bg-gray-50"
              key={idx}
            >
              <span>{idx + 1}</span>
              <Icon
                path={student.status === "ALPHA" ? mdiClose : mdiCheckBold}
                size="16px"
                className={`${student.status === "ALPHA" ? "text-red-500" : "text-green-600"}`}
              />

              <p>{student.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
