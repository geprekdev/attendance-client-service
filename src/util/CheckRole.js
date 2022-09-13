import { Navigate } from "react-router-dom";

export default function CheckRole(role) {
  console.log("RAN");

  switch (role) {
    case role === "0":
      return <Navigate to="/student/" state={true} />;
    case role === "1":
      return <Navigate to="/teacher/" state={true} />;
    case role === "2":
      return <Navigate to="/staff/" state={true} />;
    default:
      return <Navigate to="/auth/login" />;
  }
}
