/*
This file generates the Administrator Panel template site(Header, Navbar, Footer). 
*/
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import classNames from "classnames";
import {
  IoHomeOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
  IoLogOutOutline,
  IoCheckmarkDoneOutline,
  IoPaperPlaneOutline,
  IoEyeOutline,
  IoPersonAddOutline,
  IoSwapHorizontalOutline,
} from "react-icons/io5";

export default function StaffTemplate() {
  const { show, setAuth } = useContext(SharingContext);

  const switcher = (event) => {
    event.preventDefault();
    console.log("SWITCH");
  };

  // Adjust the className for navbar collapse toggle
  const mainClass = classNames("main", {
    active: !show,
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
    },
    {
      title: "Switch to FA",
      icon: <IoSwapHorizontalOutline />,
      disableActive: true,
      handleClick: (event) => {
        event.preventDefault();
        console.log("Switch");
      },
    },
  ];

  return (
    <div className="divbody">
      <NavBar links={links} />
      <div className={mainClass}>
        <Header label="Staff Panel" />
        <Outlet />
      </div>
    </div>
  );
}
