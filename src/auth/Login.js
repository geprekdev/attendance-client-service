import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useLoginMutation } from "./AuthAPI";
import Cookie from "../util/Cookie";
import { Navigate, useNavigate } from "react-router-dom";
import CheckRole from "../util/CheckRole";

export default function Login() {
  const [triggerLogin] = useLoginMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    const res = await triggerLogin({ username, password });
    if (res.error) {
      setData(res.error);
      setLoading(false);
      return;
    }

    setData(res.data);
    setLoading(false);

    const timer = setTimeout(() => {
      if (res.data.role === "student") {
        Cookie.setItem("token", `Token ${res.data.token}0`);

        navigate("/student/", { state: true });
        return;
      }

      if (res.data.role === "teacher") {
        Cookie.setItem("token", `Token ${res.data.token}1`);

        navigate("/teacher/", { state: true });
        return;
      }

      Cookie.setItem("token", `Token ${res.data.token}2`);
      navigate("/staff/", { state: true });

      clearTimeout(timer);
    }, 500);
  };

  useEffect(() => {
    const token = Cookie.getItem("token");
    const role = token.substring(token.length - 1);

    switch (role) {
      case "0":
        // console.log("Student,l -> ", role);
        navigate("/student/", { state: true });
        break;
      case "1":
        // console.log("Teacher,l -> ", role);
        navigate("/teacher/", { state: true });
        break;
      case "2":
        // console.log("Staff,l -> ", role);
        navigate("/staff/", { state: true });
        break;
      default:
        // console.log("Default,l ->", role);
        navigate("/auth/login", { state: true });
        break;
    }
  }, []);

  // console.log("Follow bang @nduuadi \ncemas kau dek bek bek bek...");

  return (
    <Layout title="Login">
      <div className="mx-auto h-screen  max-w-[444px] border shadow-lg">
        <div className=" -mt-10 flex min-h-screen w-full flex-col items-center justify-center">
          <div className="mx-auto w-full p-5 sm:max-w-md">
            <h2 className="text-center text-3xl font-semibold text-gray-800">
              {!data?.name ? (
                <>
                  <span>SiAmaWolu</span>
                  <span className="block text-base text-gray-300">@RPLTeam</span>
                </>
              ) : (
                <>
                  <span className="text-2xl text-gray-600">{data.name}</span>
                </>
              )}
            </h2>

            <img src="/logo_rpl.jpg" alt="SMKN 8 Semarang" width="100px" className="mx-auto mt-7 mb-10" />

            {data?.data?.non_field_errors && (
              <div
                className="relative mb-6 flex items-center rounded-md bg-red-100 py-3 px-5 text-sm text-red-500 "
                role="alert"
              >
                <div className="mr-2 w-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            )}

            {data?.data?.username && (
              <div
                className="relative mb-6 flex items-center rounded-md bg-yellow-100 py-3 px-5 text-sm text-gray-500 "
                role="alert"
              >
                <div className="mr-2 w-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm invalid:animate-pulse   invalid:border invalid:border-red-400 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm invalid:animate-pulse invalid:border invalid:border-red-400  focus:border-indigo-500 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <button
                  className={`inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-semibold capitalize text-white transition hover:bg-blue-700  focus:outline-none focus:ring focus:ring-blue-200 ${
                    loading && "cursor-not-allowed border-gray-700 bg-gray-500 hover:bg-gray-500 disabled:opacity-25"
                  }`}
                >
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// dropdown dengan dicoret
