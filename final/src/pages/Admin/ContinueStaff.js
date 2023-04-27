import { useState } from "react";
import Form from "../../components/Form";
import SearchableTable from "../../components/SearchableTable";

export default function ContinueStaff() {
  const [isWarden, setWarden] = useState(true);
  const [isFA, setFA] = useState(true);

  const wardenField = isWarden && {
    label: "Add students under warden",
    input: (
      <div>
        <button>Boys</button>
        <button>Girls</button>
        <button>All</button>
      </div>
    ),
  };

  const faData = {
    title: "Add students under the created Faculty Advisor",
    headers: ["Name", "Registration Number", "Batch", "Select"],
    entries: [
      ["Varun", "21BCS129", "2021", <input type="checkbox" />],
      ["Jaat", "21BCS106", "2021", <input type="checkbox" />],
      ["Sanket Samaga", "21BCS100", "2021", <input type="checkbox" />],
    ],
  };

  const faField = isFA && {
    label: "",
    input: (
      <div>
        <SearchableTable searchFor="Registration Number" data={faData} />
      </div>
    ),
  };

  const data = {
    Header: "Fill further details",
    fields: [
      wardenField,
      faField,
      {
        label: "",
        input: (
          <button className="nextBtn">
            <span className="btnText">Create Staff</span>
            <i className="uil uil navigator"></i>
          </button>
        ),
      },
    ],
  };
  return <Form data={data} onSubmit={(event) => event.preventDefault()} />;
}
