import Form from "../components/Form";
import Cookies from "js-cookie";
import axios from "axios";
import { useContext } from "react";
import SharingContext from "../context/SharingContext";
import { Link, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

export default function LoginForm() {
  const { setAuth, setRole, APIaddr, setID } = useContext(SharingContext);

  const navigate = useNavigate();

  const data = {
    Header: "Login",
    fields: [
      {
        label: "Email",
        input: <input type="email" name="email" required />,
      },
      {
        label: "Password",
        input: <input type="password" name="password" required />,
      },
      {
        label: "",
        input: <button>SUBMIT</button>,
      },
    ],
  };

  const handleSubmit = async (params) => {
    const response = await axios.post(`${APIaddr}`, params);
    if (response.data.success) {
      console.log(response.data);
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
      window.alert(
        "Something went wrong, usually it is due to wrong email or password, check again!"
      );
    }
  };

  return (
    <>
      <Form data={data} onSubmit={handleSubmit} />
    </>
  );
}
