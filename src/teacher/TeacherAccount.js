import { mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Cookie from "../util/Cookie";

export default function TeacherAccount() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const yes = window.confirm("Apakah Anda Ingin Keluar ?");
    if (yes) {
      Cookie.deleteItem("token");
      navigate("/auth/login");
    }
  };

  return (
    <Layout title="Teacher" role="TEACHER">
      <div className="mx-auto min-h-screen max-w-[444px] border pb-24 shadow-lg">
        <div className="flex items-center justify-between rounded-full bg-gradient-to-r from-red-700 to-[#f48282] px-5 py-2 ">
          <h1 className="text-xl text-white">Account</h1>

          <button onClick={handleLogout}>
            <Icon path={mdiLogout} size="24px" className="text-white" />
          </button>
        </div>
      </div>
    </Layout>
  );
}
