import axios from "axios";
import { useContext, useState } from "react";
import SharingContext from "../context/SharingContext";
import ReactDOM from "react-dom";
import { IoMailOutline, IoKeyOutline } from "react-icons/io5";
import Modal from "../components/Modal";

export default function LoginForm() {
  const { setAuth, setRole, APIaddr, setID, setAccess, setCurRole } =
    useContext(SharingContext);
  const [show, setShow] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    const response = await axios.post(`${APIaddr}`, params);

    console.log(response.data);
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
        console.log(response.data.staff[0]);
        if (response.data.student) {
          setRole("student");
        } else if (response.data.admin) {
          setRole(response.data.admin);
          return;
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
