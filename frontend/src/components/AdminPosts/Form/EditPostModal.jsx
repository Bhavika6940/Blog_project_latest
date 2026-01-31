import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/authUtils";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

const EditPostModal = ({ show, onClose, post, categories, onUpdated }) => {
  const [loading, setLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    categoryId: "",
    tags: "",
    status: "Draft",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        categoryId: post.categoryId || "",
        tags: post.tags?.join(", ") || "",
        status: post.status || "Draft",
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };



const handleEditorChange = (value) => {
	setFormData((prev) => ({
		...prev,
		content : value
	}))
}

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      const tagsArray = formData.tags
         ? formData.tags.split(",").map(t => t.trim()).filter(Boolean)
         : [];
         Object.keys(formData).forEach((key) => {
            if(key !== "tags"){
              payload.append(key, formData[key]);
            }
         });

      tagsArray.forEach(tag => payload.append("tags[]",tag));
      console.log("Tags array:", tagsArray);

      await axiosInstance.put(`/api/post/${post.id}`, payload);

      Swal.fire("Updated!", "Post updated successfully", "success");
      onUpdated();
      onClose();
    } catch (err) {
      console.log("Edit error :", err);
      Swal.fire("Error", "Failed to update post", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  return (
    <div 
      className="modal fade show d-block" 
      style={{
        position: "fixed", 
        inset: 0, 
        backgroundColor: "rgba(0,0,0,0.85)", 
        zIndex: 9999,
        overflowY: "auto"
      }}
    >
		<style>{`
        .ql-toolbar { background: #cbd5e1 !important; border-top-left-radius: 8px; border-top-right-radius: 8px; border: none !important; }
        .ql-container { background: #0f172a !important; color: white !important; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border: none !important; font-size: 16px; }
        .ql-editor { min-height: 400px; }
        .ql-editor.ql-blank::before { color: #64748b !important; }
      `}</style>
      
      <div className="py-5" style={{ width: "90%", maxWidth: "1000px", margin: "0 auto" }}>
        <div 
          className="modal-content border-0 rounded-4" 
          style={{ 
            background: "#1e293b", 
            minHeight: "80vh", 
            flexDirection: "column"
          }}
        >
          <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="modal-header border-0 p-4" style={{ position: "sticky", top: 0, background: "#1e293b", zIndex: 10, borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
              <h5 className="text-white fw-bold m-0">Edit Post</h5>
              <button className="btn-close btn-close-white" onClick={onClose} />
            </div>

           
            <div className="modal-body px-5 py-2">
                

                <div className="mb-4">
                    <label className="form-label text-light fw-semibold mb-2">Post Title</label>
                    <input
                      className="form-control bg-dark text-white border-0 py-3"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter post title"
                      required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label text-light fw-semibold mb-2">Content</label>
					<div className="rounded-3 overflow-hidden">
                    <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={handleEditorChange}
                        modules={modules}
                        placeholder="Edit your content here..."
                      />
					  </div>
                </div>

                <hr className="border-secondary opacity-25 my-5" />
                
                <div className="row">
                  <div className="col-md-6 mb-4">
                      <label className="form-label text-light fw-semibold mb-2">Category</label>
                      <select
                        className="form-select bg-dark text-white border-0 py-2"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                  </div>

                  <div className="col-md-6 mb-4">
                      <label className="form-label text-light fw-semibold mb-2">
                        Tags <span className="text-secondary">(comma separated)</span>
                      </label>
                      <input
                        className="form-control bg-dark text-white border-0 py-2"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="React, Space, Astronomy"
                      />
                  </div>
                </div>

                

                <hr className="border-secondary opacity-25 my-5" />

                <h6 className="text-light fw-bold mb-4">SEO Settings</h6>

                <div className="mb-4">
                    <label className="form-label text-light fw-semibold mb-2">Meta Title</label>
                    <input
                      type="text"
                      name="metaTitle"
                      className="form-control bg-dark text-white border-0 py-2"
                      value={formData.metaTitle}
                      onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label text-light fw-semibold mb-2">Meta Description</label>
                    <textarea
                      rows="4"
                      name="metaDescription"
                      className="form-control bg-dark text-white border-0"
                      value={formData.metaDescription}
                      onChange={handleChange}
                    />
                </div>
            </div>

            
            <div className="modal-footer border-0 p-4" style={{ position: "sticky", bottom: 0, background: "#1e293b", zIndex: 10, borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem" }}>
              <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn fw-bold px-5"
                disabled={loading}
                style={{ backgroundColor: "#facc15",
						color: "#020617",
						borderRadius: "0.75rem",
						boxShadow: "0 10px 25px rgba(250,204,21,0.35)",}}
              >
                {loading ? "Updating..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;