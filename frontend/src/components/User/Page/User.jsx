import { useEffect, useState } from "react";
import CreateUserModal from "../Form/CreateUserModal";
import axiosInstance from "../../../utils/authUtils";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEdit] = useState(null);

  // Fetch data
  const fetchData = async () => {
    try {
      const [usersRes, rolesRes, permissionsRes] = await Promise.all([
       axiosInstance.get("/api/user"),
       axiosInstance.get("/api/role"),
       axiosInstance.get("/api/userPermission")
      ]);
      setUsers(usersRes.data.data);
      setRoles(rolesRes.data.data);
      setPermissions(permissionsRes.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createUser = async (userData) => {
    try {
      await axiosInstance.post("/api/user", userData);
      fetchData();
      setEdit(null);
    } catch (err) {
      console.error("Create user error:", err);
      Swal.fire({
              title: "Error!",
              text: "Failed to create user",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#e74c3c", 
            })
      
    }
  };

  // Maps for fast lookup
  const roleMap = roles.reduce((acc, role) => {
    acc[role.id] = role.name;
    return acc;
  }, {});

  // Toggle permissions
  const togglePermission = (userId, field) => {
    setPermissions((prev) => {
      const existing = prev.find(p => p.userId === userId);

      if (!existing) {
        return [
          ...prev,
          {
            userId,
            canRead: field === "canRead",
            canWrite: field === "canWrite",
            canDelete: field === "canDelete"
          }
        ];
      }

      return prev.map((perm) =>
        perm.userId === userId ? { ...perm, [field]: !perm[field] } : perm
      );
    });
  };

  // Save permissions
  const savePermissions = async (userId) => {
    const perm = permissions.find(p => p.userId === userId);
    const payload = {
      canRead: perm?.canRead ?? false,
      canWrite: perm?.canWrite ?? false,
      canDelete: perm?.canDelete ?? false
    };

    try {
      await axiosInstance.put(`/api/userPermission/${userId}`, payload);
      Swal.fire({
                  title: "Success!",
                  text: "Permission saved successfully!",       
                  icon: "success",     
                  confirmButtonText: "OK",
                  confirmButtonColor: "#4CAF50" 
                  });

      
    } catch (err) {
      console.error("Error saving user permission:", err);
      Swal.fire({
              title: "Error!",
              text: "Failed to save permission",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#e74c3c", 
            })
      
    }
  };

  // Edit user
const updateUser = async (userId, payload) => {
  try {
    await axiosInstance.put(`/api/user/${userId}`, payload);
    setUsers(prev =>
    prev.map(u => (u.id === userId ? { ...u, ...payload } : u))
    );
    setEdit(null);
    Swal.fire({
                  title: "Success!",
                  text: "User updated successfully!",       
                  icon: "success",     
                  confirmButtonText: "OK",
                  confirmButtonColor: "#4CAF50" 
                  });

    
    
  } catch (err) {
    console.error("Failed to update user:", err);
    

Swal.fire({
              title: "Error!",
              text: "Failed to update user!",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#e74c3c", 
            })
    
  }
};

  // Delete user
  const handleDelete = async (userId) => {
    const data = users.find(u => u.id === userId);
    if (!data) {
      console.warn("The user you are trying to delete is not found!");
      return;
    }

    try {
      await axiosInstance.delete(`/api/user/${userId}`);
      setUsers(prev => prev.filter(u => u.id !== userId));
      Swal.fire({
                  title: "Success!",
                  text: "User deleted successfully!",       
                  icon: "success",    
                  confirmButtonText: "OK",
                  confirmButtonColor: "#4CAF50" 
                  });

      
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
              title: "Error!",
              text: "Failed to delete user!",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#e74c3c", 
            })
      
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  
  const permissionMap = permissions.reduce((acc, perm) => {
    acc[perm.userId] = perm;
    return acc;
  }, {});

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
          <h2 className="fw-bold text-white mb-1">User Management</h2>
          <p style={{ color: "#cbd5f5" }} className="mb-0">
            Manage users, roles, and permission access.
          </p>
        </div>

        <button
          className="btn fw-bold px-4 py-2"
          data-bs-toggle="modal"
          data-bs-target="#createUserModal"
          style={{
            backgroundColor: "#facc15",
            color: "#020617",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 25px rgba(250,204,21,0.35)",
          }}
          onClick={() => setEdit(null)}
        >
          + Create User
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
      {users.length === 0 ? (
        <div className="text-center fw-semibold" style={{ color: "#e5e7eb" }}>
          No users found. Create your first user to get started.
        </div>
      ) : (
        <div
          className="table-responsive rounded-4 p-4"
          style={{
            background: "rgba(51, 65, 85, 0.85)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <table
            className="table align-middle mb-0"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 12px",
            }}
          >
            {/* Table Head */}
            <thead>
              <tr>
                {["#", "User", "Email", "Role", "Permissions", "Actions"].map(
                  (head, i) => (
                    <th
                      key={i}
                      style={{
                        backgroundColor: "#334155",
                        color: "#f8fafc",
                        fontWeight: "700",
                        border: "none",
                        padding: "14px",
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                      }}
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user, index) => {
                const userPerm = permissionMap[user.id] || {
                  canRead: false,
                  canWrite: false,
                  canDelete: false,
                };

                return (
                  <tr key={user.id}>
                    {/* Index */}
                    <td style={cellStyle(index)}>
                      <span className="fw-semibold">{index + 1}</span>
                    </td>

                    {/* Username */}
                    <td style={cellStyle(index)}>
                      <span className="fw-semibold">{user.username}</span>
                    </td>

                    {/* Email */}
                    <td style={cellStyle(index)}>{user.email}</td>

                    {/* Role Badge */}
                    <td style={cellStyle(index)}>
                      <span
                        style={{
                          padding: "6px 14px",
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          letterSpacing: "0.6px",
                          color: "#e0e7ff",
                          background:
                            "linear-gradient(135deg, #1e40af, #2563eb)",
                          boxShadow:
                            "0 2px 6px rgba(37, 99, 235, 0.35)",
                        }}
                      >
                        {roleMap[user.roleId]}
                      </span>
                    </td>

                    {/* Permissions */}
                    <td style={cellStyle(index)}>
                      <div className="d-flex gap-3">
                        {["canRead", "canWrite", "canDelete"].map((field) => (
                          <div
                            className="form-check form-switch"
                            key={field}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={userPerm[field]}
                              onChange={() =>
                                togglePermission(user.id, field)
                              }
                            />
                            <label
                              className="form-check-label"
                              style={{ color: "#e5e7eb" }}
                            >
                              {field.replace("can", "")}
                            </label>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={cellStyle(index)}>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#22c55e",
                            color: "#020617",
                          }}
                          onClick={() => savePermissions(user.id)}
                        >
                          ✓
                        </button>

                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#38bdf8",
                            color: "#020617",
                          }}
                          onClick={() => setEdit(user)}
                          data-bs-toggle="modal"
                          data-bs-target="#createUserModal"
                        >
                          ✎
                        </button>

                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#ef4444",
                            color: "#020617",
                          }}
                          onClick={() => handleDelete(user.id)}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <CreateUserModal
        roles={roles}
        onCreate={createUser}
        onUpdate={updateUser}
        editUser={editUser}
      />
    </div>
  </div>
);

};
const cellStyle = (index) => ({
  backgroundColor: index % 2 === 0 ? "#334155" : "#3f4f67",
  color: "#e5e7eb",
  border: "none",
  padding: "14px",
});

export default Users;
