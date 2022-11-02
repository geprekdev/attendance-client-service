import {
  mdiAccountCircleOutline,
  mdiBellOutline,
  mdiBookOutline,
  mdiCalendarOutline,
  mdiHomeOutline,
  mdiLocationEnter,
  mdiSendCircleOutline,
  mdiViewDashboardOutline,
  mdiTimerOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Link, NavLink } from "react-router-dom";

export default function NewNav({ role }) {
  const studentMenu = [
    { pathIcon: mdiHomeOutline, text: "Home", link: "/student/" },
    {
      pathIcon: mdiCalendarOutline,
      text: "Schedule",
      link: "/student/schedule",
    },
    {
      pathIcon: mdiTimerOutline,
      text: "Statistic",
      link: "/student/statistic",
    },
    // {
    //   pathIcon: mdiSendCircleOutline,
    //   text: "Permission",
    //   link: "/student/permission",
    // },
    {
      pathIcon: mdiAccountCircleOutline,
      text: "Account",
      link: "/student/account",
    },
  ];

  const teacherMenu = [
    { pathIcon: mdiHomeOutline, text: "Home", link: "/teacher/" },
    {
      pathIcon: mdiCalendarOutline,
      text: "Schedule",
      link: "/teacher/schedule",
    },
    {
      pathIcon: mdiBookOutline,
      text: "Classroom",
      link: "/teacher/class",
    },
    {
      pathIcon: mdiAccountCircleOutline,
      text: "Account",
      link: "/teacher/account",
    },
  ];

  const staffMenu = [
    { pathIcon: mdiHomeOutline, text: "Home", link: "/staff/" },
    {
      pathIcon: mdiViewDashboardOutline,
      text: "Admin Panel",
      link: "https://admin.erpeelisme.my.id",
    },
    {
      pathIcon: mdiAccountCircleOutline,
      text: "Account",
      link: "/staff/account",
    },
  ];

  return (
    <>
      {role === "STUDENT" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[440px] border-t bg-white">
          <hr />

          <div className="flex justify-evenly p-5">
            {studentMenu.map(stMenu => (
              <NavLink
                to={stMenu.link}
                className={({ isActive }) => `group flex flex-col items-center
                text-indigo-400 hover:text-indigo-500 ${
                  isActive
                    ? "text-indigo-600 after:absolute  after:bottom-3 after:h-1 after:w-1 after:rounded-full after:bg-indigo-600 after:content-['']"
                    : "text-gray-400"
                }`}
                key={stMenu.text}
              >
                <Icon path={stMenu.pathIcon} size="23px" />
                <p className="mt-2 text-xs">{stMenu.text}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {role === "TEACHER" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[440px] bg-white">
          <hr />

          <div className="flex justify-evenly p-5">
            {teacherMenu.map(stMenu => (
              <NavLink
                to={stMenu.link}
                className={({ isActive }) =>
                  `group flex flex-col items-center hover:text-red-500 ${
                    isActive
                      ? "text-red-600 after:absolute after:bottom-3 after:h-1 after:w-1 after:rounded-full after:bg-red-400 after:content-['']"
                      : "text-gray-400"
                  }`
                }
                key={stMenu.text}
              >
                <Icon path={stMenu.pathIcon} size="23px" />
                <p className="mt-2 text-xs">{stMenu.text}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {role === "STAFF" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[440px] bg-white">
          <hr />

          <div className="flex justify-evenly p-5">
            <NavLink
              to="/staff/"
              className={({ isActive }) =>
                `group flex flex-col items-center hover:text-red-500 ${
                  isActive
                    ? "text-red-600 after:absolute after:bottom-3 after:h-1 after:w-1 after:rounded-full after:bg-red-400 after:content-['']"
                    : "text-gray-400"
                }`
              }
              key={mdiHomeOutline}
            >
              <Icon path={mdiHomeOutline} size="23px" />
              <p className="mt-2 text-xs">Home</p>
            </NavLink>

            <a
              href="https://admin.erpeelisme.my.id"
              target="__blank"
              rel="noreferrer"
              className="group flex flex-col items-center text-gray-400 hover:text-red-500"
              key={mdiViewDashboardOutline}
            >
              <Icon path={mdiViewDashboardOutline} size="23px" />
              <p className="mt-2 text-xs">Admin Panel</p>
            </a>

            <NavLink
              to="/staff/account"
              className={({ isActive }) =>
                `group flex flex-col items-center hover:text-red-500 ${
                  isActive
                    ? "text-red-600 after:absolute after:bottom-3 after:h-1 after:w-1 after:rounded-full after:bg-red-400 after:content-['']"
                    : "text-gray-400"
                }`
              }
              key={mdiAccountCircleOutline}
            >
              <Icon path={mdiAccountCircleOutline} size="23px" />
              <p className="mt-2 text-xs">Account</p>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
