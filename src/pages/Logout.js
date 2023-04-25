import { useContext } from "react";
import SharingContext from "../context/SharingContext";

export default function () {
  const { setAuth } = useContext(SharingContext);
  window.location.replace("../login");
  setAuth(false);

  return <div></div>;
}
