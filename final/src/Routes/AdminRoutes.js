/*
This file holds the routing information for the admin pages
*/
import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import AdminTemplate from "../pages/Admin/AdminTemplate";
import OutpassHistory from "../pages/Admin/Outpass";
import AdminProfile from "../pages/Admin/AdminProfile";
import DeleteBatch from "../pages/Admin/DeleteBatch";
import DeleteHistory from "../pages/Admin/DeleteHistory";
import ChangePassword from "../pages/Admin/ChangePass";
import AddEntity from "../pages/Admin/AddEntity";
import EntryExitTable from "../pages/Admin/EntryExitTable";
import BansTable from "../pages/Admin/ManageBans";
import ManageEntity from "../pages/Admin/ManageEntity";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminTemplate />}>
        <Route path="home" element={<AdminProfile />} />
        <Route path="add" element={<AddEntity />} />
        <Route path="records" element={<EntryExitTable />} />
        <Route path="bans" element={<BansTable />} />
        <Route path="manage" element={<ManageEntity />} />
        <Route path="outpass" element={<OutpassHistory />} />
        <Route path="deleteHistory" element={<DeleteHistory />} />
        <Route path="deleteBatch" element={<DeleteBatch />} />
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
