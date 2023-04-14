'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/solid';

import HalfDay from './HalfDay';
import FullDay from './FullDay';

export default function Page() {
  const [permissionType, setPermissionType] = useState<'HalfDay' | 'FullDay'>('HalfDay');
  const activeClass = 'bg-white outline outline-[#BABAE8]';

  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      <div className="w-full py-3 px-5 flex gap-3 items-center">
        <Link href="/student" className="p-2">
          <ArrowLeftIcon width={24} className="text-[#404040]" />
        </Link>
        <h2 className="text-[#404040] font-semibold text-xl">Pengajuan Izin</h2>
      </div>

      <div className="px-5 pt-7">
        <p className="text-[#525252]">Untuk mengajukan izin, silahkan upload surat keterangan dalam bentuk JPG, PNG, PDF</p>
        <h4 className="text-lg text-[#525252] font-medium mt-5">Jenis Izin</h4>

        <div className="flex justify-around mt-2">
          <button
            className={`${
              permissionType == 'HalfDay' ? activeClass : 'bg-[#CECEF3]'
            } p-2 px-3 flex gap-2 rounded-full w-2/5`}
            onClick={() => setPermissionType('HalfDay')}
          >
            <ClockIcon width={24} className="text-[#1F1F7A]" />
            <span>Half Day</span>
          </button>
          <button
            className={`${
              permissionType == 'FullDay' ? activeClass : 'bg-[#CECEF3]'
            } p-2 px-3 flex gap-2 rounded-full w-2/5`}
            onClick={() => setPermissionType('FullDay')}
          >
            <CalendarDaysIcon width={24} className="text-[#1F1F7A]" />
            <span>Full Day</span>
          </button>
        </div>

        {permissionType == 'HalfDay' && <HalfDay />}
        {permissionType == 'FullDay' && <FullDay />}

        <div className="absolute bottom-10 left-0 right-0">
          <button className="bg-[#1F1F7A] text-center block mx-auto px-32 py-3 font-semibold text-white">Ajukan Izin</button>
        </div>
      </div>
    </div>
  );
}
