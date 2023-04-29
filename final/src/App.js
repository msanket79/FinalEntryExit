import StudentRoutes from "./Routes/StudentRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import StaffRoutes from "./Routes/StaffRoutes";
import SecurityRoutes from "./Routes/SecurityRoutes";
import LoginRoutes from "./Routes/LoginRoutes";
import { useContext, useEffect, useState } from "react";
import SharingContext from "./context/SharingContext";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { role, isAuth } = useContext(SharingContext);

  const navigate = useNavigate();
  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    setDummy(!dummy);
    console.log(isAuth);
    console.log(role);
    if (role === "admin" && isAuth === true) {
      navigate("/admin/home");
    } else if (role === "student" && isAuth === true) {
      navigate("/student/home", { replace: true });
    } else if (role === "staff" && isAuth === true) {
      navigate("/staff/home");
    } else if (role === "security" && isAuth === true) {
      navigate("/security/profile");
    }
  }, [isAuth, role]);

  return (
    <>
      {true && <LoginRoutes />}
      {/* {isAuth && role === "student" && <StudentRoutes />}
      {isAuth && role === "admin" && <AdminRoutes />}
      {isAuth && role === "staff" && <StaffRoutes />}
      {isAuth && role === "security" && <SecurityRoutes />} */}
      <StudentRoutes />
      <AdminRoutes />
      <StaffRoutes />
      <SecurityRoutes />
    </>
  );
}
