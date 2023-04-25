import axios from "axios";
import Form from "../../components/Form";
import { useContext, useState } from "react";
import SharingContext from "../../context/SharingContext";
import OutpassExit from "./OutpassExit";

export default function ManualEntry() {
  const { APIaddr } = useContext(SharingContext);
  const [rollNo, setRollNo] = useState("");

  const data = {
    Header: "Add entry",
    fields: [
      {
        label: "Enter Registration number",
        input: <input type="text" name="roll_no" required />,
      },
      {
        label: "",
        input: (
          <button class="nextBtn">
            <span class="btnText">Make Manual Entry</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
      {
        label: "",
        input: <input type="hidden" name="entry_type" value="manual" />,
      },
    ],
  };

  const handleSubmit = async (formData) => {
    const response = await axios.post(`${APIaddr}direct_entry/`, formData);
    if (response.data.success) window.alert(response.data.success);
    else if (response.data.error) window.alert(response.data.error);
    if (response.data.outpass) setRollNo(formData.get("roll_no"));
  };

  return (
    <>
      {!rollNo && <Form data={data} onSubmit={handleSubmit} />}
      {rollNo && <OutpassExit rollNo={rollNo} setRollNo={setRollNo} />}
    </>
  );
}
