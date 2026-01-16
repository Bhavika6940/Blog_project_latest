import { useEffect, useState } from "react";

const CreateRoleModal = ({ onCreate, onUpdate , editRole }) => {


  const [formData , setFormData] = useState({
     name: "",
     description: ""
  });

  useEffect(() => {
    if(editRole) {
      setFormData({
        name : editRole.name,
        description :editRole.description
      });
    } else{

      setFormData({
        name: "",
        description: ""
      });

    }
  }, [editRole]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim()
    };
    try {
      if(editRole){
       await onUpdate(editRole.id , payload);
    }
    else{
       await onCreate(payload);
    }
    setFormData({name : "", description: ""});
    
    }
    catch (err) {
     
    console.error("Submit failed:", err);
    
  }
   
  };

  return (
  <div
    className="modal fade"
    id="createRoleModal"
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
        {/* Header */}
        <div className="modal-header border-0 px-4 pt-4 pb-3">
          <div>
            <h5 className="modal-title fw-bold mb-1" style={{ color: "#facc15" }}>
              {editRole ? "Update Role" : "Create New Role"}
            </h5>
            <p
              className="mb-0"
              style={{ color: "#cbd5f5", fontSize: "0.9rem" }}
            >
              Define role identity and access description
            </p>
          </div>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
          />
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #facc15, transparent)",
          }}
        />

        {/* Body */}
        <div className="modal-body px-4 py-4">
          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#e5e7eb" }}>
              Role Name
            </label>
            <input
              name="name"
              className="form-control"
              placeholder="e.g. Administrator"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "12px",
                borderRadius: "0.6rem",
              }}
            />
          </div>

          <div>
            <label className="form-label fw-semibold" style={{ color: "#e5e7eb" }}>
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Describe the responsibilities and scope of this role"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "12px",
                borderRadius: "0.6rem",
                resize: "none",
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer border-0 px-4 pb-4">
          <button
            type="button"
            className="btn fw-semibold"
            data-bs-dismiss="modal"
            style={{
              color: "#e5e7eb",
              backgroundColor: "#334155",
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
            {editRole ? "Update Role" : "Create Role"}
          </button>
        </div>
      </form>
    </div>
  </div>
);


};

export default CreateRoleModal;