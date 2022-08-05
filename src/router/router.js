import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "../auth/Login";
import ProtectedRouter from "./ProtectedRouter";

import StudentPresence from "../student/StudentPresence";
import StudentAccount from "../student/StudentAccount";
import StudentStatistic from "../student/StudentStatistic";
import StudentHome from "../student/StudentHome";
import StudentSchedule from "../student/StudentSchedule";
import StudentAttendance from "../student/StudentAttendance";
import StudentNotification from "../student/StudentNotification";
import StudentPermission from "../student/StudentPermission";
import StudentPermissionNew from "../student/StudentPermissionNew";
import StudentActivity from "../student/StudentActivity";

import Home from "../common/HomePage";
import ErrorPage from "../common/ErrorPage";

import TeacherHome from "../teacher/TeacherHome";
import TeacherSchedule from "../teacher/TeacherSchedule";
import TeacherActivity from "../teacher/TeacherActivity";
import TeacherPresence from "../teacher/TeacherPresence";
import TeacherAccount from "../teacher/TeacherAccount";
import TeacherClass from "../teacher/TeacherClass";
import TeacherClassDetail from "../teacher/TeacherClassDetail";
import TeacherClassJournal from "../teacher/TeacherClassJournal";
import TeacherClassPresence from "../teacher/TeacherClassPresence";
import TeacherClassJournalAddNew from "../teacher/TeacherClassJournalAddNew";
import TeacherPermission from "../teacher/TeacherPermission";
import TeacherPermissionNew from "../teacher/TeacherPermissionNew";

import StaffHome from "../staff/StaffHome";
import StaffActivity from "../staff/StaffActivity";
import StaffAccount from "../staff/StaffAccount";
import StaffPermission from "../staff/StaffPermission";
import StaffPermissionNew from "../staff/StaffPermissionNew";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rusakk" element={<ErrorPage />} />

        <Route element={<ProtectedRouter />}>
          <Route path="/student/" element={<StudentHome />} />
          <Route path="/student/schedule" element={<StudentSchedule />} />
          <Route path="/student/statistic" element={<StudentStatistic />} />
          <Route path="/student/account" element={<StudentAccount />} />
          <Route path="/student/permission" element={<StudentPermission />} />
          <Route path="/student/permission/new" element={<StudentPermissionNew />} />
          <Route path="/student/activity" element={<StudentActivity />} />

          <Route path="/student/presence" element={<StudentPresence />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/notification" element={<StudentNotification />} />

          <Route path="/teacher/" element={<TeacherHome />} />
          <Route path="/teacher/permission" element={<TeacherPermission />} />
          <Route path="/teacher/permission/new" element={<TeacherPermissionNew />} />

          <Route path="/teacher/class" element={<TeacherClass />} />
          <Route path="/teacher/class/:id" element={<TeacherClassDetail />}>
            <Route path="journal" element={<TeacherClassJournal />} />
            <Route path="presence" element={<TeacherClassPresence />} />
            <Route path="journal/new" element={<TeacherClassJournalAddNew />} />
          </Route>

          <Route path="/teacher/schedule" element={<TeacherSchedule />} />
          <Route path="/teacher/activity" element={<TeacherActivity />} />
          <Route path="/teacher/presence" element={<TeacherPresence />} />
          <Route path="/teacher/account" element={<TeacherAccount />} />

          <Route path="/staff/" element={<StaffHome />} />
          <Route path="/staff/activity" element={<StaffActivity />} />
          <Route path="/staff/account" element={<StaffAccount />} />
          <Route path="/staff/permission" element={<StaffPermission />} />
          <Route path="/staff/permission/new" element={<StaffPermissionNew />} />


        </Route>

        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}