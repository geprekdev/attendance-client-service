'use client';

import { CalendarIcon, ChartPieIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';

export default function AppBar({ active }: { active: string }) {
  return (
    <div className="absolute bottom-0 bg-[#F1F5FB] flex justify-between w-full px-5 py-3">
      <Link href="/student" className="flex flex-col items-center">
        <HomeIcon className={`w-6 h-6 ${active == 'home' ? 'text-[#1F1F7A]' : 'text-gray-500'}`} />
        <span className={`${active == 'home' ? 'text-[#1F1F7A]' : 'text-gray-500'}`}>Home</span>
      </Link>
      <Link href="/student/schedule" className="flex flex-col items-center">
        <CalendarIcon className={`w-6 h-6 ${active == 'schedule' ? 'text-[#1F1F7A]' : 'text-gray-500'}`} />
        <span className={`${active == 'schedule' ? 'text-[#1F1F7A]' : 'text-gray-500'}`}>Schedule</span>
      </Link>
      <Link href="/" className="flex flex-col items-center">
        <ChartPieIcon className={`w-6 h-6 ${active == 'statistic' ? 'text-[#1F1F7A]' : 'text-gray-500'}`} />
        <span className={`${active == 'statistic' ? 'text-[#1F1F7A]' : 'text-gray-500'}`}>Statistic</span>
      </Link>
      <Link href="/" className="flex flex-col items-center">
        <UserCircleIcon className={`w-6 h-6 ${active == 'account' ? 'text-[#1F1F7A]' : 'text-gray-500'}`} />
        <span className={`${active == 'account' ? 'text-[#1F1F7A]' : 'text-gray-500'}`}>Account</span>
      </Link>
    </div>
  );
}
