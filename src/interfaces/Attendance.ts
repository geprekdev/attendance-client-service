export interface Attendance {
  success: boolean;
  data: {
    user: {
      name: string;
      classroom: string;
      student_id: number;
    };
    schedule: {
      status: 'in' | 'out' | 'done' | 'off';
      date: string;
      start_time: number;
      end_time: number;
    };
    recent_activity: [
      {
        datetime: Date;
        type: 'Clock In' | 'Clock Out';
      }
    ];
  };
}
