import { useState, useEffect } from "react";
import RoleCard from "./RoleCard";
import CreateRoleModal from "../Form/CreateRoleModal";
import axiosInstance from "../../../utils/authUtils";
import Swal from "sweetalert2";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [editRole, setEditRole] = useState(null);

  const fetchRoles = async () => {
  try {
    const response = await axiosInstance.get("/api/role");
    setRoles(response.data.data);
  } catch (err) {
    console.error("Failed to fetch roles:", err);
    setRoles([]);
  }
};

  useEffect(() => {
    fetchRoles();
  }, []);

  const addRole = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/role", payload);
      const newRole = response.data.data;
      setRoles((prev) => [...prev, newRole]);
      Swal.fire({
                  title: "Success!",
                  text: "Role updated successfully!",      
                  icon: "success",     
                  confirmButtonText: "OK",
                  confirmButtonColor: "#4CAF50" 
                  });
      
      return response;
    } catch (err) {
      console.error("Error creating role:", err);
      throw err;
    }
  };

  const updateRole = async (id, payload) => {
    try {
      const res = await axiosInstance.put(`/api/role/${id}`, payload);
      const updatedRole = res.data.data;
      setRoles((prev) => prev.map((r) => (r.id === id ? updatedRole : r)));
      setEditRole(null);
      return res;
    } catch (err) {
      console.error("Error editing role:", err);
      throw err;
    }
  };

  return (
    <div style={{ backgroundColor: "#1e293b", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center px-5 py-4">
        <h3
          className="fw-bold text-white"
          style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
        >
          Role Management
        </h3>
        <button
          className="btn btn-warning fw-bold shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#createRoleModal"
        >
          + Create Role
        </button>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "2px",
          backgroundColor: "#334155",
          margin: "0 20px 20px 20px",
          borderRadius: "2px",
        }}
      />

      {/* Roles Content */}
      <div
        className="container-fluid px-5 overflow-auto"
        style={{ flexGrow: 1, maxHeight: "75vh" }}
      >
        <div className="row g-4">
          {roles.length === 0 && (
            <p className="text-white text-center fw-semibold mt-5">
              No roles found. Create your first role to get started.
            </p>
          )}

          {roles.map((role) => (
            <div key={role.id} className="col-md-6 col-lg-4">
              <div className="card shadow-lg rounded-4 bg-slate-700 p-3 h-100">
                <RoleCard
                  role={role}
                  onSelectEdit={setEditRole}
                  onEdit={updateRole}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Role Modal */}
      <CreateRoleModal onCreate={addRole} onUpdate={updateRole} editRole={editRole} />
    </div>
  );
};

export default Roles;
