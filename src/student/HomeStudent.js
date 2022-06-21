import {
  mdiCheckboxMarkedCirclePlusOutline,
  mdiClipboardTextClockOutline,
  mdiPhone,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import isEmpty from "../util/EmptyObj";
import { useGetStudentClassesQuery } from "./StudentAPI";

export default function HomeStudent() {
  const { isLoading, isError, isSuccess, data } = useGetStudentClassesQuery();

  const menus = [
    { path: mdiCheckboxMarkedCirclePlusOutline, text: "Absen", href: "absent" },
    { path: mdiClipboardTextClockOutline, text: "Histori", href: "history" },
    { path: mdiPhone, text: "Hub Admin", href: "tel:085157782604" },
  ];

  return (
    <>
      <header>
        <h6 className="text-xs leading-7">Selamat Sore</h6>
        {isLoading && (
          <Skeleton
            color="bg-indigo-200"
            rounded="full"
            width="80%"
            height="1.2em"
          />
        )}

        <h1 className="mb-5 text-2xl font-semibold">
          {isSuccess && data?.data.name}
        </h1>
        <Fragment>
          {isLoading && (
            <Skeleton
              color="bg-indigo-200"
              height="4em"
              width="100%"
              rounded="lg"
            />
          )}

          <p className="text-xs leading-loose ">
            {isSuccess && data?.data.quote}
          </p>
        </Fragment>
      </header>
      <section className="my-10">
        <h5 className="text-sm font-semibold">Menu</h5>

        <div className="flex w-full items-center justify-center space-x-12">
          {menus.map(menu => (
            <Fragment key={menu.path}>
              {menu.path === mdiPhone ? (
                <a
                  href={menu.href}
                  className="group mt-4 flex cursor-pointer flex-col items-center justify-center text-indigo-400"
                >
                  <Icon
                    path={menu.path}
                    size="24px"
                    className="group-hover:text-indigo-800"
                  />
                  <span className="mt-1 text-xs group-hover:text-indigo-800">
                    {menu.text}
                  </span>
                </a>
              ) : (
                <Link
                  to={menu.href}
                  className="group mt-4 flex cursor-pointer flex-col items-center justify-center text-indigo-400"
                >
                  <Icon
                    path={menu.path}
                    size="24px"
                    className="group-hover:text-indigo-800"
                  />
                  <span className="mt-1 text-xs group-hover:text-indigo-800">
                    {menu.text}
                  </span>
                </Link>
              )}
            </Fragment>
          ))}
        </div>
      </section>
      {isLoading && (
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
      )}

      {isSuccess &&
        (isEmpty(data?.data.current_lecture) ? (
          <div className="mt-5 space-x-3 rounded-full bg-white p-2">
            <button className="rounded-full bg-purple-600 px-3 text-white">
              Info
            </button>
            <span className="text-purple-600">Saat ini belum ada kelas</span>
          </div>
        ) : (
          <div className="mt-5">
            <h3>Sedang Berlangsung</h3>
            <div className="mt-5 rounded-lg bg-indigo-700 p-6 text-white">
              <h4 className="text-[17px] font-semibold">
                {data?.data.current_lecture.subject}
              </h4>
              <p className="mt-4"> {data?.data.current_lecture.time}</p>

              <p className="text-right">{data?.data.current_lecture.teacher}</p>
            </div>
          </div>
        ))}
    </>
  );
}
