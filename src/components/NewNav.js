import {
  mdiAccountCircleOutline,
  mdiBellOutline,
  mdiCalendarOutline,
  mdiHome,
} from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";

export default function NewNav({ role }) {
  const studentMenu = [
    { pathIcon: mdiHome, text: "Home", link: "/student/" },
    {
      pathIcon: mdiCalendarOutline,
      text: "Scheduled",
      link: "/student/scheduled",
    },
    {
      pathIcon: mdiBellOutline,
      text: "Notification",
      link: "/student/notification",
    },
    {
      pathIcon: mdiAccountCircleOutline,
      text: "Account",
      link: "/student/account",
    },
  ];

  return (
    <>
      {role === "STUDENT" && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[440px] bg-white ">
          <hr />

          <div className="flex justify-evenly p-5">
            {studentMenu.map(stMenu => (
              <NavLink
                to={stMenu.link}
                className={({ isActive }) => `group flex flex-col items-center
                text-indigo-400 hover:text-indigo-500 ${
                  isActive
                    ? "text-indigo-600 after:absolute  after:bottom-3 after:h-1 after:w-1 after:rounded-full after:bg-indigo-600 after:content-['']"
                    : "text-indigo-400"
                }
               `}
                key={stMenu.text}
              >
                <Icon path={stMenu.pathIcon} size="23px" />
                <p className="mt-2 text-xs">{stMenu.text}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
