'use client';

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import useSWR from 'swr';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarDaysIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/24/solid';

import { fetcher } from '~/lib/Fetcher';
import { StudentSchedule, TimeTable } from '~/interfaces/Schedule';
import { getClock, getFullDate } from '~/lib/Date';
import AppBar from '~/components/AppBar';

export default function Page() {
  const result = useSWR<StudentSchedule>('http://localhost:3001/student/schedule', fetcher, {
    dedupingInterval: 10000, // 10 second
  });
  const router = useRouter();

  const [timeTables, setTimeTables] = useState<TimeTable[] | undefined>();
  const [subject, setSubject] = useState<TimeTable[] | []>([]);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());

  useEffect(() => {
    if (!result.isLoading && result.data) {
      setTimeTables(result.data.data.timetables);
    }
  }, [result.isLoading, result.data]);

  useEffect(() => {
    if (timeTables) {
      const todaySubject = timeTables.filter(subj => getFullDate(subj.date) == getFullDate(dateSelected));
      setSubject(todaySubject);
    }
  }, [timeTables, dateSelected]);

  console.log(subject);

  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      {calendarOpen && (
        <div
          onClick={() => setCalendarOpen(false)}
          className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]"
        />
      )}
      <div className="w-full py-3 px-5 flex justify-between items-center">
        <h2 className="text-[#404040] font-semibold text-xl">Schedule</h2>
        <div className="bg-white p-2 rounded-full cursor-pointer" onClick={() => setCalendarOpen(prev => !prev)}>
          <CalendarDaysIcon width={24} className="text-[#404040]" />
        </div>
        {/* @ts-ignore */}
        {calendarOpen && <Calendar onChange={setDateSelected} value={dateSelected} className="absolute top-10" />}
      </div>

      <div className="px-5 pt-5">
        <div className="flex justify-between">
          <h4 className="text-[#404040]">{getFullDate(dateSelected)}</h4>
          <span className="text-[#404040]">{getClock(new Date())}</span>
        </div>

        <hr className="border-b border-[#dad9d9] w-11/12 mx-auto my-3" />

        <div>
          {subject.map((sub, idx) => (
            <div
              className="flex justify-between mb-5"
              key={idx}
              onClick={() => sub.on_going && router.push('/student/schedule')}
            >
              <p>{sub.start_time}</p>
              <div className={`${sub.on_going ? 'bg-[#1F1F7A]' : 'bg-[#CECEF3]'} w-9/12 p-5 rounded-2xl`}>
                <div className="flex justify-between">
                  <h3 className={`${sub.on_going ? 'text-gray-300' : 'text-gray-700'} font-semibold text-xl`}>
                    {sub.subject}
                  </h3>
                  <ChevronRightIcon width={24} className={`${sub.on_going ? 'text-gray-100' : 'text-gray-700'}`} />
                </div>

                <div className="flex gap-3 mt-3">
                  <ClockIcon width={20} className={`${sub.on_going ? 'text-gray-300' : 'text-gray-600'}`} />
                  <span className={`${sub.on_going ? 'text-gray-300' : 'text-gray-600'}`}>
                    {sub.start_time} - {sub.end_time}
                  </span>
                </div>
                <h3 className={`${sub.on_going ? 'text-gray-300' : 'text-gray-600'}`}>{sub.teacher.name}</h3>
              </div>
            </div>
          ))}

          {subject.length === 0 && 'Tidak ada Jadwal'}
        </div>
      </div>
      <AppBar active="schedule" />
    </div>
  );
}
