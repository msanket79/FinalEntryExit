import { useContext, useEffect, useState } from "react";
import SearchableTable from "../../components/SearchableTable";
import SharingContext from "../../context/SharingContext";
import axios from "axios";

export default function ManageStudent() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  const [dummy, setDummy] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}manage_student/`);
      setRawData(response.data);
    };
    fetchData();
  }, [dummy]);

  const entries = rawData.map((rowData) => {
    return [
      rowData.name,
      rowData.roll_no,
      rowData.phone_no,
      rowData.emergency_phone_no,
      rowData.ban ? (
        <div className="btn">
          <button
            onClick={async () => {
              const formData = new FormData();
              formData.append("id", rowData.id);
              const response = await axios.post(
                `${APIaddr}unban_student/`,
                formData
              );
              setDummy(Math.random);
            }}
            className="approveBtn"
          >
            UNBAN
          </button>
        </div>
      ) : (
        <div className="btn">
          <button
            onClick={async () => {
              const formData = new FormData();
              formData.append("id", rowData.id);
              const response = await axios.post(
                `${APIaddr}ban_student/`,
                formData
              );
              setDummy(Math.random);
            }}
            className="deleteBtn"
          >
            BAN
          </button>
        </div>
      ),
      <div className="btn">
        <button
          onClick={async () => {
            const formData = new FormData();
            formData.append("id", rowData.id);
            await axios.post(`${APIaddr}delete_student/`, formData);
            setDummy(Math.random());
          }}
          className="deleteBtn"
        >
          Delete
        </button>
      </div>,
    ];
  });

  let data = {
    title: "Manage Students",
    headers: [
      "Name",
      "Registration Number",
      "Contact Number",
      "Emergency Number",
      "Ban/Unban Student",
      "Delete Student",
    ],
    entries: entries,
  };

  return <SearchableTable searchFor={"Registration Number"} data={data} />;
}
