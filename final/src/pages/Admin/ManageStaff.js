import { useContext, useEffect, useState } from "react";
import SearchableTable from "../../components/SearchableTable";
import SharingContext from "../../context/SharingContext";
import Modal from "../../components/Modal";
import axios from "axios";
import Form from "../../components/Form";

export default function ManageStaff() {
  const { APIaddr } = useContext(SharingContext);
  const [rawData, setRawData] = useState([]);
  const [dummy, setDummy] = useState();
  const [showModal, setShow] = useState(false);
  const [dat, setDat] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${APIaddr}manage_staff/`);
      setRawData(response.data);
    };
    fetchData();
  }, [dummy]);

  const entries = rawData.map((rowData) => {
    return [
      rowData.name,
      rowData.phone_no,
      <div className="btn">
        <button
          onClick={async () => {
            const response = await axios.get(
              `${APIaddr}management/staff/${rowData.id}/`
            );
            setDat(response.data);
            setShow(true);
          }}
        >
          Edit
        </button>
      </div>,
      <div className="btn">
        <button
          onClick={async () => {
            const formData = new FormData();
            await axios.delete(
              `${APIaddr}management/staff/${rowData.id}/`,
              formData
            );
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
    title: "Manage Staff",
    headers: ["Name", "Contact Number", "Edit Staff", "Delete Staff"],
    entries: entries,
  };

  const editData = {
    Header: `Editing ${dat.name} details`,
    fields: [
      {
        label: "",
        input: <input type="hidden" value={dat.id} />,
      },
      {
        label: "Name",
        input: <input value={dat.name} required />,
      },
      {
        label: "Email",
        input: <input value={dat.email} required />,
      },
      {
        label: "Contact Number",
        input: <input value={dat.phone_no} required />,
      },
      {
        label: "Password",
        input: <input value={dat.password} type="password" required />,
      },
      {
        label: "Upload profile picture",
        input: <input type="file" name="profile_pic" accept=".jpg, .jpeg" />,
      },
      {
        label: "",
        input: (
          <div className="btn">
            <button>Submit</button>
          </div>
        ),
      },
    ],
  };

  const handleSubmit = async (formData) => {
    const response = await axios.put(
      `${APIaddr}/management/staff/${formData.get("id")}/`,
      formData
    );
    setShow(false);
  };

  const closeModal = () => {
    setShow(false);
  };

  const footer = (
    <div className="btn">
      <button onClick={closeModal}>Cancel</button>
    </div>
  );

  return (
    <>
      <SearchableTable searchFor={"Registration Number"} data={data} />
      {showModal && (
        <Modal footer={footer} onClose={closeModal}>
          <Form data={editData} onSubmit={handleSubmit} />
        </Modal>
      )}
    </>
  );
}
