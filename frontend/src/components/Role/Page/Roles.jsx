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
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      fontFamily: "Poppins, sans-serif",
    }}
  >
    <div className="container-fluid px-5 py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-white mb-1">Role Management</h2>
          <p className="text-slate-300 mb-0" style={{ color: "#cbd5f5" }}>
            Define roles and control access permissions across the platform
          </p>
        </div>

        <button
          className="btn fw-bold px-4 py-2"
          style={{
            backgroundColor: "#facc15",
            color: "#020617",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 25px rgba(250,204,21,0.35)",
          }}
          data-bs-toggle="modal"
          data-bs-target="#createRoleModal"
          onClick={() => setEditRole(null)}
        >
          + Create Role
        </button>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, #facc15, transparent)",
          marginBottom: "3rem",
        }}
      />

      {/* Content */}
      <div
        style={{
          background: "rgba(51, 65, 85, 0.85)",
          backdropFilter: "blur(10px)",
          borderRadius: "1rem",
          padding: "2.5rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        {roles.length === 0 ? (
          <p className="text-center fw-semibold" style={{ color: "#e5e7eb" }}>
            No roles found. Create your first role to start managing access.
          </p>
        ) : (
          <div className="row g-4">
            {roles.map((role) => (
              <div key={role.id} className="col-md-6 col-lg-4">
                <RoleCard
                  role={role}
                  onSelectEdit={setEditRole}
                  onEdit={updateRole}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateRoleModal
        onCreate={addRole}
        onUpdate={updateRole}
        editRole={editRole}
      />
    </div>
  </div>
);

};

export default Roles;
