import axios from "axios";
import { useContext, useState } from "react";
import SharingContext from "../context/SharingContext";
import ReactDOM from "react-dom";
import { IoMailOutline, IoKeyOutline } from "react-icons/io5";
import Modal from "../components/Modal";
// import { AES, enc } from "crypto-js";

export default function LoginForm() {
  const { setAuth, setRole, APIaddr, setID, setAccess, setCurRole } =
    useContext(SharingContext);
  const [show, setShow] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    // let encoded = AES.encrypt(
    //   params.get("email"),
    //   "3t6w9z$B&E)H@McQ"
    // ).toString();
    // params.set("email", encoded);
    // encoded = AES.encrypt(
    //   params.get("password"),
    //   "3t6w9z$B&E)H@McQ"
    // ).toString();
    // params.set("password", encoded);
    let response = {};
    if (!localStorage.getItem("token"))
      response = await axios.post(`${APIaddr}`, params);
    else
      response.data = {
        success: true,
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
      };

    if (response.data.success) {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.baseURL = `${APIaddr}`;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${response.data.token}`;
      }
      ReactDOM.unstable_batchedUpdates(() => {
        setID(response.data.id);
        setAuth(true);
        if (response.data.student) {
          setRole("student");
        } else if (response.data.admin) {
          setRole(response.data.admin);
        } else if (response.data.staff) {
          setAccess(response.data.staff);
          setCurRole(response.data.curr_role);
          setRole("staff");
        } else if (response.data.security) {
          setRole("security");
        }
      });
    } else {
      setShow(true);
    }
  };

  const onClose = () => {
    setShow(false);
  };

  const footer = (
    <div className="btn">
      <button className="approveBtn" onClick={onClose}>
        Retry
      </button>
    </div>
  );

  return (
    <>
      <div className="container3">
        <div className="form-box">
          <h1 id="title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-field">
                <IoMailOutline className="login-icon" />
                <input
                  type="email"
                  placeholder="E-Mail"
                  name="email"
                  required
                />
              </div>
              <div className="input-field">
                <IoKeyOutline className="login-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              </div>
              {/* <p>
                Forgotten Password ? <a href="#"> Click Here!</a>
              </p> */}
            </div>
            <div className="btn-field">
              <button type="submit" className="disable" id="signinBtn">
                Sign In
              </button>
            </div>
          </form>
          {show && (
            <Modal onClose={onClose} footer={footer}>
              Oops, something went wrong, check your login credentials.
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
