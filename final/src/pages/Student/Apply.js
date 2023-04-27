import axios from "axios";
import Form from "../../components/Form";
import { useContext } from "react";
import SharingContext from "../../context/SharingContext";

export default function Apply() {
  const { APIaddr } = useContext(SharingContext);

  const data = {
    Header: "Apply for Outpass",
    Title: "",
    fields: [
      {
        label: "Date of Leaving",
        input: (
          <input
            type="date"
            placeholder="Enter date of Leaving"
            name="from_date"
          />
        ),
      },
      {
        label: "Date of Return",
        input: (
          <input
            type="date"
            placeholder="Enter date of Return"
            name="to_date"
          />
        ),
      },
      {
        label: "Reason",
        input: <textarea type="text" name="reason" />,
      },
      {
        label: "",
        input: (
          <button class="nextBtn">
            <span class="btnText">Submit Request</span>
            <i class="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };

  const handleSubmit = async (params) => {
    const today = new Date();
    const frm = new Date(params.get("from_date"));
    const to = new Date(params.get("to_date"));
    if (frm <= to) {
      const response = await axios.post(`${APIaddr}apply_outpass/`, params);
      if (response.data.success) window.alert(response.data.success);
      else if (response.data.error) window.alert(response.data.error);
    } else window.alert("From date is later than to date");
  };

  return <Form data={data} onSubmit={handleSubmit} />;
}
