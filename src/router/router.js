import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "../home/Home";
import ClassList from "../classroom";
import ClassListDetail from "../classroom/ClassListDetail";
import Login from "../auth/Login";
import ProtectedRouter from "./ProtectedRouter";
import HomeStudent from "../student/HomeStudent";
import StudentPresence from "../student/StudentPresence";
import StudentAccount from "../student/StudentAccount";
import StudentStatistic from "../student/StudentStatistic";
import StudentAbsent from "../student/StudentAbsent";
import NewStudentHome from "../student/NewStudentHome";
import StudentScheduled from "../student/StudentScheduled";
import StudentAttendance from "../student/StudentAttendance";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/student/" element={<NewStudentHome />} />
        <Route path="/student/scheduled" element={<StudentScheduled />} />
        <Route path="/student/statistic" element={<StudentStatistic />} />
        <Route path="/student/account" element={<StudentAccount />} />

        <Route path="/student/home" element={<HomeStudent />} />
        <Route path="/student/presence" element={<StudentPresence />} />
        <Route path="/student/absent" element={<StudentAbsent />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />

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