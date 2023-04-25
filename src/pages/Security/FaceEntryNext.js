import axios from "axios";
import Form from "../../components/Form";
import { useContext, useState } from "react";
import SharingContext from "../../context/SharingContext";
import { useNavigate } from "react-router-dom";
import OutpassExit from "./OutpassExit";

export default function FaceEntryNext({ record, setData }) {
  const { APIaddr } = useContext(SharingContext);
  const [rollNo, setRollNo] = useState("");
  const navigate = useNavigate();
  const data = {
    Header: "Confirm student",
    fields: [
      {
        label: "Name",
        input: <p>{record.name}</p>,
      },
      {
        label: "Registration Number",
        input: <p>{record.roll_no}</p>,
      },
      {
        label: "Image",
        input: <img src={`${APIaddr}` + record.profile_pic} />,
      },
      {
        label: "",
        input: (
          <button
            class="nextBtn"
            onClick={async () => {
              const formData = new FormData();
              formData.append("roll_no", record.roll_no);
              formData.append("entry_type", "face_accept");
              const response = await axios.post(
                `${APIaddr}direct_entry/`,
                formData
              );
              if (response.data.success) {
                window.alert(response.data.success);
                navigate("../manualEntry");
              } else if (response.data.error) window.alert(response.data.error);
              if (response.data.outpass) setRollNo(record.roll_no);
            }}
          >
            <span class="btnText">Confirm Student</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
      {
        label: "",
        input: (
          <button class="nextBtn" onClick={() => setData({})}>
            <span class="btnText">Cancel</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };

  const handleSubmit = () => {};

  return (
    <>
      {!rollNo && <Form data={data} onSubmit={handleSubmit} />}
      {rollNo && <OutpassExit rollNo={rollNo} setRollNo={setRollNo} />}
    </>
  );
}
