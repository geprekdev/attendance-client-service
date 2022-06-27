import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "../home/Home";
import ClassList from "../classroom";
import ClassListDetail from "../classroom/ClassListDetail";
import Login from "../auth/Login";
import ProtectedRouter from "./ProtectedRouter";
import StudentPresence from "../student/StudentPresence";
import StudentAccount from "../student/StudentAccount";
import StudentStatistic from "../student/StudentStatistic";
import NewStudentHome from "../student/NewStudentHome";
import StudentSchedule from "../student/StudentSchedule";
import StudentAttendance from "../student/StudentAttendance";
import StudentNotification from "../student/StudentNotification";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/student/" element={<NewStudentHome />} />
        <Route path="/student/schedule" element={<StudentSchedule />} />
        <Route path="/student/statistic" element={<StudentStatistic />} />
        <Route path="/student/account" element={<StudentAccount />} />

        <Route path="/student/presence" element={<StudentPresence />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/notification" element={<StudentNotification />} />

        <Route element={<ProtectedRouter />}>
          <Route path="/instructor/classlists" element={<ClassList />} />
          <Route
            path="/instructor/classlists/detail/:grade/:subject"
            element={<ClassListDetail />}
          />
        </Route>
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
