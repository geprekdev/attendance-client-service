import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "../util/Cookie";

export default function Home() {
  const [counter, setCounter] = useState(0);

  const menus = [
    {
      text: "Absensi kini menjadi jauh lebih mudah",
      subText:
        "Dengan SiAmawolu mempermudah kita untuk absensi bagi siswa,guru mauupun karyawan.",
      img: "/home-1.svg",
    },
    {
      text: "Lebih teratur dengan SiAmaWolu",
      subText:
        "Lebih teratur dengan SiAmaWolu Mengatur waktu agar menjadi lebih displin, tepat waktu, juga melatih kita untuk  bertanggung jawab.",
      img: "/home-2.svg",
    },
    {
      text: "Dengan SiAmawolu absensi jauh lebih praktis",
      subText:
        "SiAmawolu sangat praktis. dengan tampilan yang menarik, menjadikan kita nyaman dalam menggunakannya. ",
      img: "/home-3.svg",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // if (Cookie.getItem("token")) {
    navigate("/auth/login");
    // }
  }, []);

  return (
    <div className="relative mx-auto h-screen max-w-[444px] border bg-indigo-200 shadow-lg">
      <div className="mt-[10vh] flex justify-center">
        <img src={menus[counter].img} alt="" width="350px" />
      </div>
      <div className="w-ful absolute bottom-0 left-0 right-0 h-[40vh] rounded-t-[50px] bg-white">
        <div className="flex h-full flex-col justify-evenly px-10 py-2 text-center">
          <div className={`group flex justify-center gap-3 `}>
            {menus.map((menu, idx) => (
              <span
                className={`h-2 w-2 rounded-full ${
                  counter >= idx ? "bg-indigo-600" : "bg-indigo-200"
                }`}
                key={idx}
              ></span>
            ))}
          </div>
          <h1 className="text-2xl font-semibold">{menus[counter].text}</h1>
          <p className=" text-sm text-gray-500">{menus[counter].subText}</p>
          <button
            className="w-full rounded bg-indigo-600 py-3 font-semibold text-white"
            onClick={() =>
              counter <= 1 ? setCounter(counter + 1) : navigate("/auth/login")
            }
          >
            {counter <= 1 ? "Selanjutnya" : "Mulai"}
          </button>
        </div>
      </div>
      {/* <button
        className="rounded-lg border border-blue-500 py-3 px-5 text-xl font-semibold text-blue-700 hover:bg-blue-500 hover:text-white hover:transition"
        onClick={() => navigate("/auth/login")}
      >
        Login
      </button> */}
    </div>
  );
}
