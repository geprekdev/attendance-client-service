import { useRef, useEffect, useState } from "react";
import ProgressBar from "progressbar.js";
import { useGetStudentStatisticMutation } from "./StudentAPI";
import isEmpty from "../util/EmptyObj";
import Layout from "../components/Layout";
import Cookie from "../util/Cookie";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";

export default function StudentStatistic() {
  const myRef = useRef(null);
  const [data, setData] = useState({});
  const [triggerStudentStatistic] = useGetStudentStatisticMutation();
  function instanceProgressBar() {
    return new ProgressBar.Circle(myRef.current, {
      color: "#aaa",
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 3,
      trailWidth: 1,
      easing: "easeInOut",
      duration: 1400,
      text: {
        autoStyleContainer: false,
      },
      from: { color: "#e65332", width: 1 },
      to: { color: "#6ee632", width: 3 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);
        circle.path.setAttribute("stroke-width", state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText("");
        } else {
          circle.setText(`${value}%`);
        }
      },
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    const bar = instanceProgressBar();

    async function getData() {
      const res = await triggerStudentStatistic({
        token: Cookie.getItem("token"),
      });

      bar.animate(res.data.presence);

      setData({ ...res });

      if (res.error.status === 401) {
        Cookie.deleteItem("token");
        navigate("/auth/login");
        return;
      }
    }

    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = "2rem";

    getData();

    setTimeout(() => {
      console.clear();
    }, 100);

    return () => {
      bar.destroy();
      setTimeout(() => {
        console.clear();
      }, 100);
    };
  }, []);

  return (
    <Layout title="Student Statistic" role="STUDENT">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        <div className="-m-5 h-[50px] max-w-[150%] bg-[#6A64F1] pt-3 pl-3">
          <Link to="/student/">
            <Icon path={mdiChevronLeft} size="1.9em" color="white" />
          </Link>
        </div>

        <div
          ref={myRef}
          className="relative m-5 mx-auto mt-12 max-h-[270px] max-w-[270px]"
        ></div>

        <div className="relative mt-14  w-full rounded-xl bg-white p-10 shadow-xl">
          <div className="mb-5 flex justify-between gap-7">
            {!isEmpty(data) && (
              <>
                <div className="flex flex-col">
                  <h5 className="text-gray-400">Kehadiran</h5>
                  <span className="text-center">{data.presence * 100}%</span>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-gray-400">Izin</h5>
                  <span className="text-center">{data.leave * 100}%</span>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-gray-400">Sakit</h5>
                  <span className="text-center">{data.leave * 100}%</span>
                </div>

                <div className="flex flex-col">
                  <h5 className="text-gray-400">Alpha</h5>
                  <span className="text-center">{data.absent * 100}%</span>
                </div>
              </>
            )}
          </div>

          <p className="text-justify text-sm">
            Kehadiranmu telah mencapai zona &nbsp;
            {data?.kehadiran > 80 ? (
              <>
                <strong className="text-red-600">Rentan</strong>, jangan lupa
                absen!
              </>
            ) : (
              <>
                <strong className="text-green-700">Aman</strong>, tingkatkan
                kedisiplinan mu
              </>
            )}
            ,
          </p>
        </div>
      </div>
    </Layout>
  );
}
