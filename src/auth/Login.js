import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import cookie from "../util/Cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLoginMutation } from "./AuthAPI";
import { useRef } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const authSlice = useSelector(state => state.authSlice.value);

  const [triggerLogin] = useLoginMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    // const res = await triggerLogin({
    //   username,
    //   password,
    // }).unwrap();
    // cookie.setItem("s8refresh", res.refresh);
    // navigate("/instructor/classlists", {
    //   replace: true,
    //   state: { cookie: res.refresh },
    // });

    window.location = "/student/";
  };

  useEffect(() => {
    // if (cookie.getItem("s8acctkn") && cookie.getItem("s8refresh")) {
    //   navigate("/instructor/classlists");
    // }
  }, []);

  return (
    <Layout>
      {/* <form
        className="mx-auto flex max-w-xl flex-col items-center gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-3"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-3"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div
          className={`w-1/3 space-x-10 text-center text-2xl ${
            !role && "text-red-500"
          }
          `}
        >
          <span
            className={`cursor-pointer ${role === "TEACHER" && "strikeout"}`}
            onClick={() => setRole("STUDENT")}
          >
            Siswa
          </span>
          <span>/</span>
          <span
            className={`cursor-pointer ${role === "STUDENT" && "strikeout"}`}
            onClick={() => setRole("TEACHER")}
          >
            Guru
          </span>
        </div>
        <button className="btn-primary" onSubmit={handleSubmit}>
          Login
        </button>
      </form> */}

      <div className="flex min-h-screen w-full flex-col items-center bg-gray-50 pt-6 sm:justify-center sm:pt-0">
        <div className="mx-auto w-full p-5 sm:max-w-md">
          <h2 className="mb-12 text-center text-5xl font-extrabold">
            Welcome.
          </h2>
          <form>
            <div className="mb-4">
              <label className="mb-1 block" htmlFor="email">
                Username
              </label>
              <input
                id="email"
                type="text"
                name="email"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
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
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
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
              <button
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-semibold capitalize text-white transition hover:bg-red-700 focus:border-red-700 focus:outline-none focus:ring focus:ring-red-200 active:bg-red-700 disabled:opacity-25"
                onClick={() => navigate("/student/")}
              >
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
