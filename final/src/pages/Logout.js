import axios from "axios";
import { useContext, useEffect } from "react";
import SharingContext from "../context/SharingContext";

export default function () {
  const { setAuth, setCurRole, APIaddr } = useContext(SharingContext);
  useEffect(() => {
    const deleteToken = async () => {
      axios.post(`${APIaddr}logout/`)
  }
  deleteToken()
  }, [])
  
  setAuth(false);
  setCurRole("");
  window.location.replace("../login");
  return <div></div>;
}
