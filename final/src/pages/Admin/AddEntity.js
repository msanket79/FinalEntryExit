import { useState } from "react";
import DropdownStylized from "../../components/DropdownStylized";
import AddStaff from "./AddStaff";
import AddStudent from "./AddStudent";
import AddSecurity from "./AddSecurity";
import ContinueStaff from "./ContinueStaff";

export default function AddEntity() {
  const [Entity, SetEntity] = useState("Select Entity");
  const options = [
    { key: 1, label: "Add Staff" },
    { key: 2, label: "Add Student" },
    { key: 3, label: "Add Security" },
  ];

  const handleStaffSubmit = (event) => {
    event.preventDefault();
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
      {Entity === "staffpg2" && <ContinueStaff />}
    </div>
  );
}
