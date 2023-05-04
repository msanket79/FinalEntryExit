import { useContext, useEffect, useState } from "react";
import SearchableTable from "../../components/SearchableTable";
import SharingContext from "../../context/SharingContext";
import Modal from "../../components/Modal";
import axios from "axios";
import Form from "../../components/Form";

export default function ManageStudent() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  const [dummy, setDummy] = useState();
  const [showModal, setShow] = useState(false);
  const [dat, setDat] = useState({});
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
      <div className="btn">
        <button
          onClick={async () => {
            const formData = new FormData();
            formData.append("id", rowData.id);
            const response = await axios.post(`${APIaddr}`, formData);
            setDat(response.data);
            showModal(true);
          }}
        >
          Edit
        </button>
      </div>,
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
      "Edit",
      "Ban/Unban Student",
      "Delete Student",
    ],
    entries: entries,
  };

  const editData = {
    Header: `Editing ${dat.name} details`,
    fields: [
      {
        label: "Name",
        input: <input value={dat.name} required />,
      },
      {
        label: "Roll Number",
        input: <input value={dat.roll_no} required />,
      },
      {
        label: "Contact Number",
        input: <input value={dat.phone_no} required />,
      },
      {
        label: "Emergency Contact Number",
        input: <input value={dat.emergency_phone_no} required />,
      },
      {
        label: "",
        input: (
          <div className="btn">
            <button>Submit</button>
          </div>
        ),
      },
      // {
      //   label: "",
      //   input: (
      //     <div className="btn">
      //       <button>Cancel</button>
      //     </div>
      //   ),
      // },
    ],
  };

  const handleSubmit = async (formData) => {
    const response = await axios.post(`${APIaddr}`, formData);
    setShow(false);
  };

  return (
    <>
      <SearchableTable searchFor={"Registration Number"} data={data} />
      {showModal && (
        <Modal>
          <Form data={editData} onSubmit={handleSubmit} />
        </Modal>
      )}
    </>
  );
}
