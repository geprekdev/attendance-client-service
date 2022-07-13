import { mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Skeleton from "../components/Skeleton";
import Cookie from "../util/Cookie";
import { useGetTeacherAccountInfoQuery } from "./TeacherAPI";

export default function TeacherAccount() {
  const navigate = useNavigate();
  const { data, isError, isSuccess, error, isLoading } =
    useGetTeacherAccountInfoQuery({
      token: Cookie.getItem("token"),
    });

  const handleLogout = () => {
    const yes = window.confirm("Apakah Anda Ingin Keluar ?");
    if (yes) {
      Cookie.deleteItem("token");
      navigate("/auth/login");
    }
  };

  // Unauthorize
  if (isError && error.status === 401) {
    Cookie.deleteItem("token");
    window.location = "/auth/login";
    return;
  }

  // Role permission
  if (isError && error.status === 403) {
    navigate("/teacher/");
    return;
  }

  return (
    <Layout title="Teacher" role="TEACHER">
      <div className="mx-auto min-h-screen max-w-[444px] border pb-24 shadow-lg">
        <div className=" mx-5 mt-3 flex items-center justify-between rounded-full bg-gradient-to-r from-red-700 to-[#f48282] px-5 py-2 ">
          <h1 className="text-xl text-white">Account</h1>
        </div>
        <div className="-mb-[30px] mt-[25px] flex justify-center">
          <img
            src="https://i.pinimg.com/originals/6d/31/a8/6d31a83bbabc72d7c74491654546fbd0.jpg"
            alt="Logo"
            className=" mx-auto h-32 w-32 transform rounded-full border-4 border-white shadow-md transition duration-200 hover:animate-pulse"
          />
        </div>

        {isLoading && (
          <>
            <div className="mt-16"></div>
          </>
        )}

        <div className="mx-auto w-[90%]">
          <div className="mb-4 mt-7">
            <label
              className="text-grey-darker mb-2 block text-sm font-bold"
              htmlFor="username"
            >
              Username
            </label>
            <div className="text-grey-darker w-full appearance-none rounded border py-2 px-3 text-gray-500 shadow">
              {(isSuccess && data.user.username) || "."}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="text-grey-darker mb-2 block text-sm font-bold"
              htmlFor="username"
            >
              Name
            </label>
            <div className="text-grey-darker w-full appearance-none rounded border py-2 px-3 text-gray-500 shadow">
              {(isSuccess &&
                data.user.first_name + " " + data.user.last_name) ||
                "."}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="text-grey-darker mb-2 block text-sm font-bold"
              htmlFor="username"
            >
              Email
            </label>
            <div className="text-grey-darker w-full appearance-none rounded border py-2 px-3 text-gray-500 shadow">
              {(isSuccess && data.user.email) || "siamawolu@erpeelisme.my.id"}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="text-grey-darker mb-2 block text-sm font-bold"
              htmlFor="username"
            >
              NIP
            </label>
            <div className="text-grey-darker w-full appearance-none rounded border py-2 px-3 text-gray-500 shadow">
              {(isSuccess && data.user.nip) || 18591274109}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-10 w-full rounded-lg bg-red-500 py-1.5 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}

// Log Absensi
// Dropdown
