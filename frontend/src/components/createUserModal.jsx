import { useState, useEffect } from "react";

const CreateUserModal = ({ roles, onCreate, onUpdate, editUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleId: ""
  });

  // Populate form if editUser changes
  useEffect(() => {
    if (editUser) {
      setFormData({
        username: editUser.username || "",
        email: editUser.email || "",
        password: "", // leave blank for security
        roleId: editUser.roleId ? String(editUser.roleId) : ""
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        roleId: ""
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      if (!formData.username || !formData.email || !formData.roleId || (!editUser && !formData.password)) {
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      roleId: Number(formData.roleId)
    };

    if (!editUser) {
      payload.password = formData.password;
      onCreate(payload);
    } else {
      
      if (formData.password) payload.password = formData.password;
      onUpdate(editUser.id, payload);
    }

    
    setFormData({
      username: "",
      email: "",
      password: "",
      roleId: ""
    });

    }
    catch(err){
      e.stopPropagation();
      console.error("Submit failed:", err);

    }
    
  };

  return (
  <div
    className="modal fade"
    id="createUserModal"
    tabIndex="-1"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <form
        className="modal-content rounded-4 shadow-lg"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#1e293b",
          border: "1px solid #334155"
        }}
      >
        {/* Header */}
        <div
          className="modal-header border-0"
          style={{ backgroundColor: "#334155" }}
        >
          <h5 className="modal-title text-white fw-bold">
            {editUser ? "Update User" : "Create User"}
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
          />
        </div>

        {/* Body */}
        <div className="modal-body px-4 py-4">
          <div className="mb-3">
            <label className="form-label text-white fw-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "10px 12px"
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "10px 12px"
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white fw-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder={editUser ? "Password cannot be changed" : "Enter password"}
              value={formData.password}
              onChange={handleChange}
              required={!editUser}
              disabled={editUser}
              style={{
                backgroundColor: editUser ? "#020617" : "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "10px 12px",
                cursor: editUser ? "not-allowed" : "text"
              }}
            />
          </div>

          <div className="mb-2">
            <label className="form-label text-white fw-semibold">
              Role
            </label>
            <select
              name="roleId"
              className="form-select"
              value={formData.roleId}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "10px 12px"
              }}
            >
              <option value="" style={{ color: "#94a3b8" }}>
                Select role
              </option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer border-0 px-4 pb-4">
          <button
            type="button"
            className="btn btn-outline-light"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn fw-semibold text-white"
            data-bs-dismiss="modal"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              border: "none",
              padding: "8px 24px"
            }}
          >
            {editUser ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default CreateUserModal;
