import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "./AuthAPI";
import Cookie from "../util/Cookie";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [triggerLogin] = useLoginMutation();

  const [data, setData] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const data = await triggerLogin({ username, password });
    setData(data);

    if (data?.data?.token) {
      Cookie.setItem("token", `Token ${data.data.token}`);

      setTimeout(() => {
        role === "STUDENT" ? navigate("/student/") : navigate("/instructor");
      }, 1000);
    }
  };

  useEffect(() => {}, []);

  return (
    <Layout title="Login">
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-50 pt-6 sm:justify-center sm:pt-0">
        <div className="mx-auto w-full p-5 sm:max-w-md">
          <h2 className="mb-12 text-center text-5xl font-extrabold">
            Welcome.
          </h2>

          {data?.error?.data?.non_field_errors ? (
            <div
              className="relative mb-6 flex items-center rounded-md bg-red-100 py-3 px-5 text-sm text-red-500 "
              role="alert"
            >
              <div className="mr-2 w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                  />
                </svg>
              </div>
              <span>Username atau Password salah</span>
            </div>
          ) : data?.error ? (
            <div
              className="relative mb-6 flex items-center rounded-md bg-red-100 py-3 px-5 text-sm text-red-500 "
              role="alert"
            >
              <div className="mr-2 w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                  />
                </svg>
              </div>
              <span>Username atau Password tidak boleh kosong</span>
            </div>
          ) : (
            <div
              className="relative mb-4 flex items-center rounded-md bg-green-100 py-3 px-5 text-sm text-green-500 "
              role="alert"
            >
              <div className="mr-2 w-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <span>Anda berhasil login</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-1 block" htmlFor="rj;">
                Username
              </label>
              <input
                id="rj;"
                type="text"
                name="rj;"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm invalid:animate-pulse   invalid:border-2 invalid:border-red-400 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="mb-1 block" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm invalid:animate-pulse invalid:border-2 invalid:border-red-400  focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="mx-auto flex w-[80%] justify-between text-base font-semibold">
              <button
                type="button"
                className={`${
                  role === "TEACHER" &&
                  "rounded-lg bg-gradient-to-r from-[#ff00cc] to-indigo-700 py-2 px-5 font-semibold text-white"
                }`}
                onClick={() => setRole("TEACHER")}
              >
                Teacher
              </button>
              <button
                type="button"
                className={`${
                  role === "STUDENT" &&
                  "rounded-lg bg-gradient-to-r from-[#ff00cc5a] to-[#4338ca5a] py-2 px-5 font-semibold text-black"
                }`}
                onClick={() => setRole("STUDENT")}
              >
                Student
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex w-full items-center ">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-semibold capitalize text-white transition hover:bg-blue-700 focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-700 disabled:opacity-25">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

// dropdown dengan dicoret
