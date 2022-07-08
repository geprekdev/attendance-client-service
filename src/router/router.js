import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "../customPage/HomePage";
// import ClassList from "../classroom";
// import ClassListDetail from "../classroom/ClassListDetail";
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

import ErrorPage from "../customPage/ErrorPage";

import TeacherHome from "../teacher/TeacherHome";
import TeacherSchedule from "../teacher/TeacherSchedule";
import TeacherActivity from "../teacher/TeacherActivity";
import TeacherPresence from "../teacher/TeacherPresence";
import TeacherAccount from "../teacher/TeacherAccount";

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
          <Route
            path="/student/permission/new"
            element={<StudentPermissionNew />}
          />
          <Route path="/student/activity" element={<StudentActivity />} />

          <Route path="/student/presence" element={<StudentPresence />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route
            path="/student/notification"
            element={<StudentNotification />}
          />

          <Route path="/teacher/" element={<TeacherHome />} />
          <Route path="/teacher/schedule" element={<TeacherSchedule />} />
          <Route path="/teacher/activity" element={<TeacherActivity />} />
          <Route path="/teacher/presence" element={<TeacherPresence />} />
          <Route path="/teacher/account" element={<TeacherAccount />} />
        </Route>

        {/* <Route path="/instructor/classlists" element={<ClassList />} />
        <Route path="/instructor/classlists/detail/:grade/:subject" element={<ClassListDetail />} /> */}

        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
