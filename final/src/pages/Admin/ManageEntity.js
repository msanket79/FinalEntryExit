import { useState } from "react";
import DropdownStylized from "../../components/DropdownStylized";
import ManageStudent from "./ManageStudent";
import ManageSecurity from "./ManageSecurity";
import ManageStaff from "./ManageStaff";

export default function AddEntity() {
  const [Entity, SetEntity] = useState("Select Entity");
  const options = [
    { key: 1, label: "Manage Staff" },
    { key: 2, label: "Manage Student" },
    { key: 3, label: "Manage Security" },
  ];

  return (
    <div>
      {Entity === "Select Entity" && (
        <DropdownStylized
          current={Entity}
          setCurrent={SetEntity}
          options={options}
        />
      )}
      {Entity === "Manage Staff" && <ManageStaff />}
      {Entity === "Manage Student" && <ManageStudent />}
      {Entity === "Manage Security" && <ManageSecurity />}
    </div>
  );
}
