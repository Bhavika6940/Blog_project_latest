import { useState, useEffect } from "react";


const CreateUserModal = ({ roles, onCreate, onUpdate, editUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleId: ""
  });

  
  useEffect(() => {
    if (editUser) {
      setFormData({
        username: editUser.username || "",
        email: editUser.email || "",
        password: "", 
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
          background: "rgba(51, 65, 85, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid #334155",
        }}
      >
        
        <div className="modal-header border-0 px-4 pt-4 pb-3">
          <div>
            <h5 className="fw-bold mb-1" style={{ color: "#facc15" }}>
              {editUser ? "Update User" : "Create New User"}
            </h5>
            <p className="mb-0" style={{ color: "#cbd5f5", fontSize: "0.9rem" }}>
              Manage user identity and role assignment
            </p>
          </div>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
          />
        </div>

        
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #facc15, transparent)",
          }}
        />

        
        <div className="modal-body px-4 py-4">
          
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#e5e7eb" }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="e.g. john_doe"
              value={formData.username}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#e5e7eb" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#e5e7eb" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder={
                editUser ? "Password cannot be changed" : "Enter secure password"
              }
              value={formData.password}
              onChange={handleChange}
              required={!editUser}
              disabled={editUser}
              style={{
                ...inputStyle,
                backgroundColor: editUser ? "#020617" : "#0f172a",
                cursor: editUser ? "not-allowed" : "text",
                opacity: editUser ? 0.7 : 1,
              }}
            />
          </div>

          
          <div>
            <label className="form-label fw-semibold" style={{ color: "#e5e7eb" }}>
              Role
            </label>
            <select
              name="roleId"
              className="form-select"
              value={formData.roleId}
              onChange={handleChange}
              required
              style={inputStyle}
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

        
        <div className="modal-footer border-0 px-4 pb-4">
          <button
            type="button"
            className="btn fw-semibold"
            data-bs-dismiss="modal"
            style={{
              backgroundColor: "#334155",
              color: "#e5e7eb",
              borderRadius: "0.6rem",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn fw-bold"
            data-bs-dismiss="modal"
            style={{
              backgroundColor: "#facc15",
              color: "#020617",
              borderRadius: "0.6rem",
              padding: "8px 28px",
              boxShadow: "0 10px 25px rgba(250,204,21,0.35)",
            }}
          >
            {editUser ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

const inputStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  color: "#e5e7eb",
  padding: "12px",
  borderRadius: "0.6rem",
};

export default CreateUserModal;
