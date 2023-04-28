import { useContext, useMemo, useState } from "react";
import DropdownStylized from "../../components/DropdownStylized";
import AddStaff from "./AddStaff";
import AddStudent from "./AddStudent";
import AddSecurity from "./AddSecurity";
import ContinueStaff from "./ContinueStaff";
import BulkAddStudents from "./BulkAddStudents";
import axios from "axios";
import SharingContext from "../../context/SharingContext";

export default function AddEntity() {
  const [Entity, SetEntity] = useState("Select Entity");
  const [staffLevel, setStaffLevel] = useState(null);
  const { APIaddr } = useContext(SharingContext);

  const options = [
    { key: 1, label: "Add Staff" },
    { key: 2, label: "Add Student" },
    { key: 3, label: "Add Security" },
    { key: 4, label: "Bulk Add Students" },
  ];

  const handleStaffSubmit = async (formData) => {
    const response = await axios.post(`${APIaddr}create_staff/`, formData);
    if (response.data.error) window.alert(response.data.error);
    setStaffLevel([formData.get("Permission_level"), response.data.id]);
    SetEntity("staffpg2");
  };

  return (
    <div>
      {Entity === "Select Entity" && (
        <DropdownStylized
          current={Entity}
          setCurrent={SetEntity}
          options={options}
        />
      )}
      {Entity === "Add Staff" && (
        <AddStaff handleStaffSubmit={handleStaffSubmit} />
      )}
      {Entity === "Add Student" && <AddStudent />}
      {Entity === "Add Security" && <AddSecurity />}
      {Entity === "staffpg2" && staffLevel && (
        <ContinueStaff staffLevel={staffLevel} setEntity={SetEntity} />
      )}

      {Entity === "Bulk Add Students" && <BulkAddStudents />}
    </div>
  );
}
