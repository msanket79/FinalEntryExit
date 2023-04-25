/*
This file generates the Administrator Panel template site(Header, Navbar, Footer). 
*/
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";
import classNames from "classnames";
import ThemeSelector from "../../components/ThemeSelector";
import {
  IoHomeOutline,
  IoListOutline,
  IoCloseCircleOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoLogOutOutline,
  IoClipboardOutline,
  IoTrashOutline,
  IoDocumentTextOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

export default function AdminTemplate() {
  const { show, dark, setAuth } = useContext(SharingContext);

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
      title: "Add Entity",
      to: "add",
      icon: <IoPersonAddOutline />,
    },
    {
      title: "Manage Entity",
      to: "manage",
      icon: <IoPeopleOutline />,
    },
    {
      title: "Entry Exit Details",
      to: "records",
      icon: <IoClipboardOutline />,
    },
    {
      title: "Unban Requests",
      to: "bans",
      icon: <IoListOutline />,
    },
    {
      title: "Delete History",
      to: "deleteHistory",
      icon: <IoCloseCircleOutline />,
    },
    // {
    //   title: "Delete Batch",
    //   to: "deleteBatch",
    //   icon: <IoTrashOutline />,
    // },
    {
      title: "Outpass",
      to: "outpass",
      icon: <IoDocumentTextOutline />,
    },
    {
      title: "Change Password",
      to: "changePassword",
      icon: <IoLockClosedOutline />,
    },
    {
      title: "Sign Out",
      to: "../logout",
      icon: <IoLogOutOutline />,
      onClick: () => {
        setAuth(false);
      },
    },
  ];

  return (
    <div className={bodyClass}>
      <NavBar links={links} />
      <div className={mainClass}>
        <Header label="Admin Panel" />
        <Outlet />
        <ThemeSelector />
        <Footer />
      </div>
    </div>
  );
}
