import { useContext, useEffect, useState } from "react";
import SharingContext from "../../context/SharingContext";
import axios from "axios";
import SearchableTable from "../../components/SearchableTable";

export default function ApproveOutpass() {
  const { APIaddr } = useContext(SharingContext);
  const [records, setRecords] = useState([]);
  const [dummy, setDummy] = useState(0);
  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get(`${APIaddr}outpass_requests/`);
      setRecords(response.data);
    };
    fetchRecords();
  }, [dummy]);
  console.log(records);
  const entries = records.map((record) => {
    return [
      record.name,
      record.roll_no,
      record.From,
      record.To,
      record.Reason,
      <button
        onClick={async () => {
          const response = await axios.post(`${APIaddr}outpass_requests/`, {
            id: record.id,
            status: "Approve",
          });
          if (response.data.success) window.alert(response.data.success);
          else window.alert(response.data.error);
          setDummy(Math.random());
        }}
      >
        APPROVE
      </button>,
      <button
        onClick={async () => {
          const response = await axios.post(`${APIaddr}outpass_requests/`, {
            id: record.id,
            status: "Reject",
          });
          if (response.data.success) window.alert(response.data.success);
          else window.alert(response.data.error);
          setDummy(Math.random());
        }}
      >
        REJECT
      </button>,
    ];
  });

  const data = {
    title: "Approve Student Outpass",
    headers: [
      "Name",
      "Registration Number",
      "From Date",
      "To Date",
      "Reason",
      "Approve",
      "Reject",
    ],
    entries: entries,
  };
  return <SearchableTable data={data} searchFor={"Registration Number"} />;
}
