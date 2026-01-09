import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import CreateUserModal from "../components/createUserModal";
import axiosInstance from "../utils/authUtils";

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
      alert("Failed to create user");
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
      alert("Permission saved successfully!");
    } catch (err) {
      console.error("Error saving user permission:", err);
      alert("Failed to save permission");
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
    alert("User updated successfully!");
    
  } catch (err) {
    console.error("Failed to update user:", err);
    alert("Failed to update user!");
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
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user!");
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

  // Map permissions for rendering
  const permissionMap = permissions.reduce((acc, perm) => {
    acc[perm.userId] = perm;
    return acc;
  }, {});

 return (
  <div
    className="d-flex flex-column vh-100 vw-100"
    style={{ backgroundColor: "#1e293b", fontFamily: "Poppins, sans-serif" }}
  >
    <Navbar />

    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-white">User Management</h3>
        <button
          className="btn btn-warning fw-semibold"
          data-bs-toggle="modal"
          data-bs-target="#createUserModal"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Create User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center text-light mt-5">No users found.</div>
      ) : (
        <div
          className="table-responsive rounded-4 shadow-lg p-3"
          style={{ backgroundColor: "#334155" }}
        >
          <table
            className="table align-middle mb-0"
            style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
          >
            {/* Table Head */}
            <thead>
              <tr>
                {["#", "Username", "Email", "Role", "Permissions", "Actions"].map(
                  (head, i) => (
                    <th
                      key={i}
                      style={{
                        backgroundColor: "#475569",
                        color: "#f8fafc",
                        fontWeight: "700",
                        border: "none",
                        padding: "14px"
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
                  canDelete: false
                };

                return (
                  <tr key={user.id} style={{ transition: "all 0.2s ease" }}>
                      {[
                        index + 1,
                        user.username,
                        user.email,
                        "ROLE",
                        "PERMISSIONS",
                        "ACTIONS"
                      ].map((_, colIndex) => (
                        <td
                          key={colIndex}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#334155" : "#3f4f67",
                            color: "#e5e7eb",
                            border: "none",
                            padding: "14px",
                            verticalAlign: "middle"
                          }}
                        >
                          {colIndex === 0 && <span className="fw-semibold">{index + 1}</span>}
                          {colIndex === 1 && <span className="fw-semibold">{user.username}</span>}
                          {colIndex === 2 && user.email}

                          {colIndex === 3 && (
                          <span
                            className="fw-semibold text-uppercase"
                            style={{
                              minWidth: "110px",
                              height: "30px",
                              lineHeight: "30px",
                              textAlign: "center",
                              display: "inline-block",
                              fontSize: "0.75rem",
                              letterSpacing: "0.6px",
                              borderRadius: "999px",
                              color: "#e0e7ff",
                              background: "linear-gradient(135deg, #1e40af, #2563eb)",
                              boxShadow: "0 2px 6px rgba(37, 99, 235, 0.35)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {roleMap[user.roleId]}
                          </span>
                        )}

                          {colIndex === 4 && (
                            <div className="d-flex gap-3">
                              {["canRead", "canWrite", "canDelete"].map(field => (
                                <div className="form-check form-switch" key={field}>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={userPerm[field]}
                                    onChange={() => togglePermission(user.id, field)}
                                  />
                                  <label className="form-check-label text-white">
                                    {field.replace("can", "")}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}

                          {colIndex === 5 && (
                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => savePermissions(user.id)}
                              >
                                <i className="bi bi-check2-circle"></i>
                              </button>

                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => setEdit(user)}
                                data-bs-toggle="modal"
                                data-bs-target="#createUserModal"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(user.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>

                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>

    <CreateUserModal
      roles={roles}
      onCreate={createUser}
      onUpdate={updateUser}
      editUser={editUser}
    />
  </div>
);

};

export default Users;
