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
          onClick={() => {
            setDat(rowData);
            setShow(true);
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
            await axios.delete(
              `${APIaddr}management/student/${rowData.id}/`,
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
        label: "",
        input: <input type="hidden" name="id" value={dat.id} />,
      },
      {
        label: "",
        input: <input type="hidden" value={dat.gender} name="gender" />,
      },
      {
        label: "Name",
        input: <input defaultValue={dat.name} name="name" required />,
      },
      {
        label: "Email",
        input: <input defaultValue={dat.email} name="email" required />,
      },
      {
        label: "Roll Number",
        input: <input defaultValue={dat.roll_no} name="roll_no" required />,
      },
      {
        label: "Contact Number",
        input: <input defaultValue={dat.phone_no} name="phone_no" required />,
      },
      {
        label: "Emergency Contact Number",
        input: (
          <input
            defaultValue={dat.emergency_phone_no}
            name="emergency_phone_no"
            required
          />
        ),
      },
      {
        label: "Father's Name",
        input: <input defaultValue={dat.father} name="father" required />,
      },
      {
        label: "Password",
        input: <input type="password" name="password" />,
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
    const id = formData.get("id");
    if (formData.get("password") === "") formData.delete("password");
    formData.delete("id");
    const response = await axios.put(
      `${APIaddr}management/student/${id}/`,
      formData
    );
    setShow(false);
    setDummy(Math.random());
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
