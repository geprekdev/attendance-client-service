import { useRef, useEffect, useState } from "react";
import ProgressBar from "progressbar.js";
import { useGetStudentStatisticMutation } from "./StudentAPI";
import isEmpty from "../util/EmptyObj";
import Layout from "../components/Layout";

export default function StudentStatistic() {
  const myRef = useRef(null);
  const [data, setData] = useState({});
  const [triggerStudentStatistic] = useGetStudentStatisticMutation();

  const infoPresence = [
    { text: "Hadir", percent: 80 },
    { text: "Izin", percent: 0 },
    { text: "Sakit", percent: 0 },
    { text: "Alpha", percent: 20 },
  ];

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

  useEffect(() => {
    const bar = instanceProgressBar();

    async function getData() {
      const res = await triggerStudentStatistic().unwrap();

      console.log(res.data);

      bar.animate(res.data.kehadiran);

      if (res.data.kehadiran === 0) {
        bar.animate("0.005");
      }

      setData({ ...res.data });
    }

    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = "2rem";

    getData();

    return () => {
      try {
        bar.destroy();
        console.log("RAN");
      } catch (err) {
        console.log(err.message);
      }
    };
  }, []);

  return (
    <Layout title="Student Statistic" role="STUDENT">
      <div className="mx-auto mb-[56px] h-screen max-w-[444px]  border px-5 py-3 pb-24 shadow-lg">
        <div
          ref={myRef}
          className="relative m-5 mx-auto max-h-[270px]  max-w-[270px]"
        ></div>

        <div className="relative mt-14  w-full rounded-xl bg-white p-10 shadow-xl">
          <div className="mb-5 flex justify-between gap-7">
            {/* {infoPresence.map(presence => (
            <div className="flex flex-col" key={presence.text}>
              <h5 className="text-gray-400">{presence.text}</h5>
              <span className="text-center">{presence.percent}%</span>
            </div>
          ))} */}

            {isEmpty(data)
              ? ""
              : (() => {
                  // console.log(data);
                  for (const presence in data) {
                    if (Object.hasOwnProperty.call(data, presence)) {
                      // console.log(presence, " -> ", data[presence]);
                      // return <>{presence}</>;
                    }
                  }
                })()}

            {!isEmpty(data) ? (
              <>
                <div className="flex flex-col">
                  <h5 className="text-gray-400">Kehadiran</h5>
                  <span className="text-center">{data.kehadiran}%</span>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-gray-400">Izin</h5>
                  <span className="text-center">{data.ijin * 100}%</span>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-gray-400">Sakit</h5>
                  <span className="text-center">{data.sakit * 100}%</span>
                </div>

                <div className="flex flex-col">
                  <h5 className="text-gray-400">Alpha</h5>
                  <span className="text-center">{data.alpha * 100}%</span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <p className="text-justify text-sm">
            Kehadiranmu telah mencapai zona{" "}
            <strong className="text-red-600">Rentan</strong>, terus tingkatkan
            dan jangan sampai terlambat absen!
          </p>
        </div>
      </div>
    </Layout>
  );
}
