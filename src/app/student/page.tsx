import { DocumentArrowDownIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import AppBar from '~/components/AppBar';
import { Attendance } from '~/interfaces/Attendance';
import { getClock, getFullDate } from '~/lib/Date';

async function getAttendance<TResponse>() {
  const res = await fetch('http://localhost:3001/attendance', { cache: 'force-cache', next: { revalidate: 10 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json() as TResponse;
}

export default async function Page() {
  const result = await getAttendance<Attendance>();

  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      <div className="px-5 pt-7">
        <span className="text-gray-600 mb-2">Selamat pagi,</span>
        <h1 className="text-4xl font-bold max-w-[70%] text-[#171717]">{result.success && result.data.user.name}</h1>

        <div className="bg-white rounded-xl p-5 mt-10">
          <div className="flex justify-between mb-3">
            <h4 className="font-semibold">Jadwal Sekolah</h4>
            <h4 className="text-[#262626]">{result.success && result.data.schedule.date}</h4>
          </div>
          <h2 className="font-bold text-3xl text-center">
            {result.success && `${result.data.schedule.start_time} - ${result.data.schedule.end_time}`} WIB
          </h2>
          <hr className="my-5" />
          <div className="px-4 py-2 mx-auto flex justify-between">
            <button className="bg-[#1F1F7A] text-white rounded py-3 px-10 font-bold">Clock in</button>
            <button className="bg-[#E5E5E5] rounded py-3 px-10">Clock out</button>
          </div>
        </div>

        <div className="flex justify-between gap-5 mt-7">
          <Link href="/student/permission/new" className="py-3 w-1/2 rounded-full bg-[#CECEF3]">
            <span className="gap-2 w-fit mx-auto flex">
              <DocumentTextIcon className="w-6 h-6 text-[#1F1F7A]" />
              Pengajuan Izin
            </span>
          </Link>
          <Link href="/student/permission/history" className="py-3 w-1/2 rounded-full bg-[#CECEF3]">
            <span className="gap-2 w-fit mx-auto flex">
              <DocumentArrowDownIcon className="w-6 h-6 text-[#1F1F7A]" />
              Riwayat Izin
            </span>
          </Link>
        </div>

        <div className="bg-[#FAFAFA] rounded-t-3xl px-5 pt-2 pb-10 mt-7 absolute w-full left-0 right-0 mx-auto">
          <div className="flex justify-between">
            <h2 className="text-gray-700 text-xl font-semibold">Aktivitas Terkini</h2>
            <Link href="/student/log" className="text-[#3D3D8F] underline font-semibold">
              Log Absensi
            </Link>
          </div>
          {/*  */}
          {result.success &&
            result.data.recent_activity.map((activity, idx) => (
              <div className="mt-5" key={idx + ''}>
                <h5 className="text-gray-500 px-2 font-semibold">{getFullDate(activity.datetime)}</h5>
                <div className="bg-white p-2 rounded">
                  <div className="flex justify-between">
                    <div className="flex gap-5 text-gray-500">
                      <span>{getClock(activity.datetime)}</span>
                      <span>{activity.type}</span>
                    </div>
                    <span>X</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-5 text-gray-500">
                      <span>{getClock(activity.datetime)}</span>
                      <span>{activity.type}</span>
                    </div>
                    <span>O</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <AppBar active="home" />
    </div>
  );
}

export const metadata = {
  title: 'Student',
};
