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

  console.log(role);

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
      <form
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
      </form>
    </Layout>
  );
}

// dropdown dengan dicoret
