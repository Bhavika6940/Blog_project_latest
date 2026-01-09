import { useEffect , useState } from "react";


const CreateCategoryModal = ({ onCreate , editCategory , onUpdate}) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [formData , setFormData] = useState({
        name : "",
        description : ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(editCategory) {
            setFormData({
                name : editCategory.name || "",
                description : editCategory.description || ""
            });
        } else {
            setFormData({ name : "" , description : ""});
        }
    }, [editCategory])

    const handleChange = (e) => {
        setFormData( prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name : formData.name.trim(),
            description : formData.description.trim()
        };
        try{
            if(editCategory){
                await onUpdate(editCategory.id, payload);
            }
            else{
                await onCreate(payload);
            }
            setFormData({name : "", description: ""});
        }
        catch(err){
            e.stopPropagation();
            console.error("Submission failed", err);
        }
    }

  

   return (
  <div
    className="modal fade"
    id="createCategoryModal"
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
            {editCategory ? "Update Category" : "Create Category"}
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
          />
        </div>

        {/* Body */}
        <div className="modal-body px-4 py-4">
          <div className="mb-4">
            <label className="form-label text-white fw-semibold">
              Category Name
            </label>
            <input
              className="form-control"
              name="name"
              placeholder="Enter category name"
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

          <div className="mb-3">
            <label className="form-label text-white fw-semibold">
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Optional description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
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
            disabled={loading}
            data-bs-dismiss="modal"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              border: "none",
              padding: "8px 22px"
            }}
          >
            {editCategory ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default CreateCategoryModal;