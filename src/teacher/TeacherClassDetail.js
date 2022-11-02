import { Navigate, NavLink, Outlet, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Cookie from "../util/Cookie";
import { useGetTeacherClassDetailQuery } from "./TeacherAPI";
import Skeleton from "../components/Skeleton";
import isEmpty from "../util/EmptyObj";

export default function TeacherClass() {
  const { id } = useParams();
  const { isLoading, data, isSuccess, isError, error } = useGetTeacherClassDetailQuery({
    token: Cookie.getItem("token").slice(0, -1),
    idClass: id,
  });

  const menus = [
    { text: "Kehadiran", link: `/teacher/class/${id}/presence` },
    { text: "Jurnal", link: `/teacher/class/${id}/journal` },
  ];

  // useEffect(() => {
  //   navigate("journal");
  // }, []);

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
    <Layout role="TEACHER">
      <div className="relative mx-auto min-h-screen max-w-[444px] border px-5 py-3 pb-24 shadow-lg">
        <div className="w-full rounded-lg bg-[#a20b0b] p-5 text-white">
          {isLoading && (
            <div className="mt-5 w-[60%]">
              <Skeleton />
            </div>
          )}
          <h1 className="pt-5 text-2xl font-semibold">{isSuccess && data.subject}</h1>

          {isLoading && (
            <div className="w-[30%]">
              <Skeleton />
            </div>
          )}
          <p className="text-lg"> {isSuccess && data.grade}</p>
        </div>

        <div className="flex w-full justify-evenly border-b p-3">
          {menus.map(menu => (
            <div className="group px-5 py-2 text-gray-500 hover:text-gray-600" key={menu.text}>
              <NavLink
                to={menu.link}
                className={({ isActive }) =>
                  `relative ${
                    isActive
                      ? "after:content-[' '] text-red-600 after:absolute after:bottom-0 after:left-0 after:-mb-1 after:h-0.5 after:w-full after:rounded-t-full after:bg-red-500"
                      : "group-hover:border-b-2 group-hover:border-b-red-300 "
                  }`
                }
              >
                {menu.text}
              </NavLink>
            </div>
          ))}
        </div>

        {isEmpty(data) ? (
          <div className="mx-auto mt-10 text-center text-xl font-semibold text-red-600">
            <p>Daftar Hadir Kosong</p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </Layout>
  );
}
