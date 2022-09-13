import Icon from "@mdi/react";
import Layout from "../components/Layout";
import { getMonthYear } from "../util/Date";
import { useGetTeacherActivityQuery } from "./TeacherAPI";
import Cookie from "../util/Cookie";
import { Navigate } from "react-router-dom";

export default function TeacherActivity() {
  const { isSuccess, data, isError, error } = useGetTeacherActivityQuery({
    token: Cookie.getItem("token").slice(0, -1),
  });

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

  console.log(data);
  return (
    <Layout role="TEACHER">
      <div className="mx-auto min-h-screen max-w-[444px] border px-5 py-3 shadow-lg">
        <div className="flex items-center justify-between rounded-full bg-gradient-to-r from-red-700 to-[#f48282] px-5 py-2 ">
          <h1 className="text-xl text-white">Activity</h1>
        </div>

        <div className="mt-3">
          <h3 className="text-lg font-semibold">{getMonthYear(new Date())}</h3>

          <h3 className="text-lg font-semibold text-blue-600">
            Presensi Harian Anda
          </h3>

          <div className="mt-3 mb-[100px]">
            <table className="w-full text-center">
              <thead className="bg-gray-100 text-gray-800">
                <tr className="">
                  <th className="py-1">Tanggal</th>
                  <th className="py-1">Masuk</th>
                  <th className="py-1">Pulang</th>
                  <th className="py-1">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {isSuccess &&
                  data.map(activity => (
                    <tr className="hover:bg-gray-50" key={activity.day}>
                      <td className="py-1">{activity.day}</td>
                      <td className="py-1">{activity.clock_in}</td>
                      <td className="py-1">{activity.clock_out}</td>
                      <td className="py-1">{activity.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
