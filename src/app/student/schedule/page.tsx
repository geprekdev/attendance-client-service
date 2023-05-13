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
  const result = useSWR<StudentSchedule>('http://localhost:3001/student/schedule', fetcher);
  const router = useRouter();

  const [timeTables, setTimeTables] = useState<TimeTable[] | undefined>();
  const [subject, setSubject] = useState<TimeTable[]>();

  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateSelected = useState(new Date());

  useEffect(() => {
    if (!result.isLoading && result.data) {
      setTimeTables(result.data.data.timetables);

      const ts = result.data.data.timetables.filter(subj => getFullDate(subj.date) == getFullDate(new Date()));
      setSubject(ts);

      console.log(ts);
    }
  }, [result.isLoading, result.data]);

  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      <div className="w-full py-3 px-5 flex justify-between items-center">
        <h2 className="text-[#404040] font-semibold text-xl">Schedule</h2>
        <div className="bg-white p-2 rounded-full cursor-pointer" onClick={() => setCalendarOpen(prev => !prev)}>
          <CalendarDaysIcon width={24} className="text-[#404040]" />
        </div>
        {calendarOpen && <Calendar {...dateSelected} className="absolute top-10" />}
      </div>

      <div className="px-5 pt-5" onClick={() => setCalendarOpen(false)}>
        <div className="flex justify-between">
          <h4 className="text-[#404040]">{getFullDate(dateSelected[0])}</h4>
          <span className="text-[#404040]">{getClock(new Date())}</span>
        </div>

        <hr className="border-b border-[#dad9d9] w-11/12 mx-auto my-3" />

        <div>
          {subject &&
            subject.map((sub, idx) => (
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
        </div>
      </div>
      <AppBar active="schedule" />
    </div>
  );
}
