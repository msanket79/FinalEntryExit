import { useContext } from "react";
import SharingContext from "../context/SharingContext";

export default function () {
  const { setAuth, setCurRole } = useContext(SharingContext);
  window.location.replace("../login");
  setAuth(false);
  setCurRole("");
  return <div></div>;
}
