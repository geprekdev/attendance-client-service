'use client';

import { CalendarDaysIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/24/solid';
import AppBar from '~/components/AppBar';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const calendarState = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      <div className="w-full py-3 px-5 flex justify-between items-center">
        <h2 className="text-[#404040] font-semibold text-xl">Schedule</h2>
        <div className="bg-white p-2 rounded-full cursor-pointer" onClick={() => setCalendarOpen(prev => !prev)}>
          <CalendarDaysIcon width={24} className="text-[#404040]" />
        </div>
        {calendarOpen && <Calendar {...calendarState} className="absolute top-10" />}
      </div>

      <div className="px-5 pt-5" onClick={() => setCalendarOpen(false)}>
        <div className="flex justify-between">
          <h4 className="text-[#404040]">Rabu, 14 Desember 2022</h4>
          <span className="text-[#404040]">09:41</span>
        </div>

        <hr className="border-b border-[#dad9d9] w-11/12 mx-auto my-3" />

        <div>
          <div className="flex justify-between mb-5">
            <p>07.00</p>
            <Link href="/student/schedule/presence" className="bg-[#1F1F7A] w-9/12 p-5 rounded-2xl">
              <div className="flex justify-between">
                <h3 className="text-[#FAFAFA] font-semibold text-xl">PDS</h3>
                <ChevronRightIcon width={24} className="text-[#FAFAFA]" />
              </div>

              <div className="flex gap-3 mt-3">
                <ClockIcon width={20} className="text-gray-300" />
                <span className="text-gray-300">07.00 - 10.00</span>
              </div>
              <h3 className="text-gray-300">Azriel Sebastian, S. Kom</h3>
            </Link>
          </div>

          <div className="flex justify-between mb-5">
            <p>10.00</p>
            <div className="bg-[#CECEF3] w-9/12 p-5 rounded-2xl">
              <div className="flex justify-between">
                <h3 className="text-gray-700 font-semibold text-xl">PDS</h3>
                <ChevronRightIcon width={24} className="text-gray-600" />
              </div>

              <div className="flex gap-3 mt-3">
                <ClockIcon width={20} className="text-gray-600" />
                <span className="text-gray-600">10.00 - 14.00</span>
              </div>
              <h3 className="text-gray-600">Ridhwan Rasyid S, S. Kom</h3>
            </div>
          </div>

          <div className="flex justify-between mb-5">
            <p>14.00</p>
            <div className="bg-[#CECEF3] w-9/12 p-5 rounded-2xl">
              <div className="flex justify-between">
                <h3 className="text-gray-700 font-semibold text-xl">PDS</h3>
                <ChevronRightIcon width={24} className="text-gray-600" />
              </div>

              <div className="flex gap-3 mt-3">
                <ClockIcon width={20} className="text-gray-600" />
                <span className="text-gray-600">14.00 - 16.00</span>
              </div>
              <h3 className="text-gray-600">Sindu Aditya Janadi, S. Kom</h3>
            </div>
          </div>
        </div>
      </div>
      <AppBar active="schedule" />
    </div>
  );
}
