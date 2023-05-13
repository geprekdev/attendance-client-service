export interface StudentSchedule {
  success: boolean;
  data: {
    timetables: TimeTable[];
  };
}

export interface TimeTable {
  date: Date;
  on_going: boolean;
  subject: string;
  start_time: string;
  end_time: string;
  teacher: {
    name: string;
  };
}
