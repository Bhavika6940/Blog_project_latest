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
      e.stopPropagation();
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
            {editRole ? "Update Role" : "Create Role"}
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
              Role Name
            </label>
            <input
              name="name"
              className="form-control"
              placeholder="Enter role name"
              value={formData.name}
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

          <div className="mb-2">
            <label className="form-label text-white fw-semibold">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Enter role description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "10px 12px",
                resize: "none"
              }}
            />
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
            className="btn fw-semibold text-white"
            type="submit"
            data-bs-dismiss="modal"
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              border: "none",
              padding: "8px 24px"
            }}
          >
            {editRole ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default CreateRoleModal;