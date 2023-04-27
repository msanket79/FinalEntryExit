import axios from "axios";
import Form from "../../components/Form";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";

export default function AddStaff({ handleStaffSubmit }) {
  const { APIaddr } = useContext(SharingContext);

  const data = {
    Header: "Add Staff",
    fields: [
      {
        label: "Name",
        input: (
          <input type="text" placeholder="Enter Name" name="name" required />
        ),
      },
      {
        label: "Email",
        input: (
          <input type="email" placeholder="Enter Email" name="email" required />
        ),
      },
      {
        label: "Contact Number",
        input: (
          <input
            type="text"
            placeholder="Enter Contact Number"
            name="phone_no"
            required
          />
        ),
      },{
        label: "Password",
        input: (
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
        ),
      },
      {
        label: "Profile Picture",
        input: (
          <input type="file" accept=".jpg, .jpeg" name="profile_pic" required />
        ),
      },
      {
        label: "Is the staff a Warden?",
        input: <input type="checkbox" />,
      },
      {
        label: "Is the staff a Student Welfare Coordinator?",
        input: <input type="checkbox" value="swc" />,
      },
      {
        label: "Is the staff a Faculty Advisor?",
        input: <input type="checkbox" value="fa" />,
      },
      {
        label: "Gender",
        input: (
          <div className="gender-details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>
            </div>
          </div>
        ),
      },
      {
        label: "",
        input: (
          <button className="nextBtn">
            <span className="btnText">
              Create
            </span>
            <i className="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };

  const handleSubmit = async (formData) => {
    const response = await axios.post(`${APIaddr}create_staff/`,formData);
    if(response.data.error) window.alert(response.data.error)
  };

  return <Form data={data} onSubmit={handleSubmit} />;
}
