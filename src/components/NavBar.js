/*
This file holds all the code to generate Navbar based on the links passed.
*/

import { useContext } from "react";
import "../style.css";
import { NavLink } from "react-router-dom";
import className from "classnames";
import SharingContext from "../context/SharingContext";

// Need to add active and pending class colours in css

export default function NavBar({ links }) {
  const { show } = useContext(SharingContext);

  // Adjust the className based on navbar collapse state
  const navclass = className("navigation", {
    active: !show,
  });

  // Render links based on the prop passed
  // Title is the label displayed to the user
  // Icon is the Icon rendered to the user
  // to is the path to navigate to
  const renderedLinks = links.map((link) => {
    return (
      <li key={link.title}>
        <NavLink
          to={link.to}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          onClick={link.handleClick}
        >
          <span className="icon">{link.icon}</span>
          {show && <span className="title">{link.title}</span>}
        </NavLink>
      </li>
    );
  });

  return (
    <div className={navclass}>
      <ul>
        <li>
          <NavLink>
            <div className="title logo">
              <a>
                <span>S</span>
                {show && "ilhouette"}{" "}
                {/* Display the stylised S when collapsed */}
              </a>
            </div>
          </NavLink>
          <div className="nav-toggler">
            <span></span>
          </div>
        </li>
        {renderedLinks}
      </ul>
    </div>
  );
}
