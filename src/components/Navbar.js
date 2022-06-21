import {
  mdiAccountCircleOutline,
  mdiHomeOutline,
  mdiNoteEditOutline,
  mdiSignalCellularOutline,
} from "@mdi/js";

import Icon from "@mdi/react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [role, setRole] = useState("");
  const [wlp, setWlp] = useState("");

  const menus = [
    { path: mdiHomeOutline, text: "Home", url: "/student/" },
    { path: mdiNoteEditOutline, text: "Presence", url: "/student/presence" },
    {
      path: mdiSignalCellularOutline,
      text: "Statistic",
      url: "/student/statistic",
    },
    { path: mdiAccountCircleOutline, text: "Account", url: "/student/account" },
  ];

  useEffect(() => {
    setWlp(window.location.pathname);
    const r = wlp.includes("/student")
      ? "STUDENT"
      : wlp.includes("/instructor") && "TEACHER";

    setRole(r);
  }, [wlp]);

  return (
    <>
      {role === "TEACHER" ? (
        <nav className="shadow-grey-200 flex h-[65px] w-full items-center justify-between border-b-2 bg-white py-10 px-20">
          <span className="font-bold">
            <img src="/logo_sekolah.jpg" alt="Logo SMK 8 Semarang" width="40" />
          </span>

          <div className="flex items-center justify-between gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>

            <div className="w-70 block ">
              <h4 className="text-sm text-sky-600">Instruktur</h4>
              <h3 className="font-semibold text-gray-600 hover:underline hover:decoration-sky-600">
                Dian Nirmala Santi, S Kom
              </h3>
            </div>

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down"
                viewBox="0 0 16 16"
              >
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
              </svg>
            </button>
          </div>
        </nav>
      ) : role === "STUDENT" &&
        window.location.pathname === "/student/absent" ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-0 mx-auto mb-3 w-full max-w-[360px] rounded-xl bg-white px-5 py-3">
          <div className="flex justify-between">
            {menus.map(menu => (
              <NavLink
                to={menu.url}
                key={menu.text}
                className={({ isActive }) =>
                  `group flex cursor-pointer flex-col items-center 
                    ${isActive ? "text-indigo-900" : "text-indigo-400"}`
                }
              >
                <Icon
                  path={menu.path}
                  size="24px"
                  className="transition-color duration-200 group-hover:text-indigo-700"
                />
                <p className="mt-2 text-xs group-hover:text-indigo-700">
                  {menu.text}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
