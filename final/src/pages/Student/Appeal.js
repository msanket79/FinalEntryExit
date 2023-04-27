import { useContext } from "react";
import Form from "../../components/Form";
import SharingContext from "../../context/SharingContext";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Appeal() {
  const { APIaddr } = useContext(SharingContext);
  const [banData, setBanData] = useState([]);
  const [dummy, setDummy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}appeal_ban/`);
      setBanData(response.data);
    };
    fetchData();
  }, [dummy]);
  let data = {
    Header: "Appeal Ban",
    Title: "",
    fields: [{ label: "No ban found", input: <div></div> }],
  };
  if (banData.ban) {
    data = {
      Header: "Appeal Ban",
      Title: "",
      fields: [
        {
          label: "Your justification",
          input: <textarea name="reason" />,
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
  }
  if (banData.appeal) {
    data = {
      Header: "Appeal Ban",
      Title: "",
      fields: [
        {
          label: "Registration Number",
          input: <p>{banData.roll_no}</p>,
        },
        {
          label: "Justification",
          input: <p>{banData.reason}</p>,
        },
        {
          label: "",
          input: (
            <button
              onClick={async () => {
                const response = await axios.post(`${APIaddr}delete_ban/`);
                window.alert(response.data.success);
                setDummy("dfsa");
              }}
            >
              DELETE
            </button>
          ),
        },
      ],
    };
  }
  const handleSubmit = (formData) => {
    const postData = async () => {
      const response = await axios.post(`${APIaddr}appeal_ban/`, formData);
      setDummy("asd");
    };
    postData();
  };

  return <Form data={data} onSubmit={handleSubmit} />;
}
