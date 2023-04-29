import axios from "axios";
import { useContext, useState } from "react";
import SharingContext from "../context/SharingContext";
import ReactDOM from "react-dom";
import { IoMailOutline, IoKeyOutline } from "react-icons/io5";
import Modal from "../components/Modal";

export default function LoginForm() {
  const { setAuth, setRole, APIaddr, setID } = useContext(SharingContext);
  const [show, setShow] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    const response = await axios.post(`${APIaddr}`, params);
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
          setRole("admin");
          return;
        } else if (response.data.staff) {
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
                <input type="email" placeholder="E-Mail" name="email" />
              </div>
              <div className="input-field">
                <IoKeyOutline className="login-icon" />
                <input type="password" placeholder="Password" name="password" />
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
