/*
This file generates the Administrator Panel template site(Header, Navbar, Footer). 
*/
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import classNames from "classnames";
import ThemeSelector from "../../components/ThemeSelector";
import {
  IoHomeOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
  IoLogOutOutline,
  IoCheckmarkDoneOutline,
  IoPaperPlaneOutline,
  IoEyeOutline,
  IoPersonAddOutline,
} from "react-icons/io5";

export default function StaffTemplate() {
  const { show, dark, setAuth } = useContext(SharingContext);

  const navigate = useNavigate();

  // Adjust the className for navbar collapse toggle
  const mainClass = classNames("main", {
    active: !show,
  });

  // Adjust the className to toggle Dark mode
  const bodyClass = classNames("divbody", {
    dark: dark,
  });

  // Explanation of the objects can be found in the Navbar component
  const links = [
    {
      title: "Home",
      to: "home",
      icon: <IoHomeOutline />,
    },
    {
      title: "Approve Outpass",
      to: "approve",
      icon: <IoCheckmarkCircleOutline />,
    },
    {
      title: "View Approved Outpasses",
      to: "viewApprovedOutpasses",
      icon: <IoCheckmarkDoneOutline />,
    },
    {
      title: "Students Out on Outpass",
      to: "viewStudentsOut",
      icon: <IoPaperPlaneOutline />,
    },
    {
      title: "View Students",
      to: "viewStudents",
      icon: <IoEyeOutline />,
    },
    {
      title: "Add Students",
      to: "addStudents",
      icon: <IoPersonAddOutline />,
    },
    {
      title: "Change Password",
      to: "changePassword",
      icon: <IoLockClosedOutline />,
    },
    {
      title: "Logout",
      to: "../logout",
      icon: <IoLogOutOutline />,
      onClick: () => {
        setAuth(false);
        navigate("../login");
      },
    },
  ];

  return (
    <div className={bodyClass}>
      <NavBar links={links} />
      <div className={mainClass}>
        <Header label="Staff Panel" />
        <Outlet />
        <ThemeSelector />
        <Footer />
      </div>
    </div>
  );
}
