import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';


const CreatePost = () => {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null);
    const [categories , setCategories] = useState([]);
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

        const fetchCategories = async () => {
            try{
                const res = await axiosInstance.get("/api/category");
                setCategories(res.data.data);
            }
            catch (err) {
                console.error("Failed to load categories", err);
                }
        };
    
        useEffect(() => {
            fetchCategories();
        },[]);

        const handleChange = (e) => {
            setFormData( prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
        };

        const handleEditorChange = (value) => {
          setFormData((prev) => ({
            ...prev,
            content: value,
          }));
        };
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            try{
                const payload = new FormData();
                payload.append("title" , formData.title);
                payload.append("content", formData.content);
                payload.append("excerpt", formData.excerpt);
                payload.append("categoryId", formData.categoryId);
                payload.append("status", formData.status);
                payload.append("metaTitle", formData.metaTitle);
                payload.append("metaDescription", formData.metaDescription);

				payload.append(
					"tags",
					JSON.stringify(
						formData.tags
						? formData.tags.split(",").map((t) => t.trim()) 
						: []
					)
				);
				if(imageFile){
					payload.append("image", imageFile);
				}
                await axiosInstance.post("/api/post", payload , {
					headers : {
						"Content-type" : "multipart/form-data"
					},
				});
                setFormData({
					title: "",
					content: "",
					excerpt: "",
					categoryId: "",
					tags: "",
					status: "Draft",
					metaTitle: "",
					metaDescription: ""
        		});
				Swal.fire({
						title: "Success!",
						text: "Post created successfully!",       // your dynamic message
						icon: "success",     // "success", "error", "warning", "info", "question"
						confirmButtonText: "OK",
						confirmButtonColor: "#4CAF50" // optional
						});
            } 
            catch (err) {
                const message =
						err.response?.data?.message ||
						err.response?.data?.error ||
						"Something went wrong";

					console.error("Create post error:", err.response?.data || err);
					

					if (err.response?.status === 401) {
						navigate("/");
  }
            }
            finally {
                    setLoading(false);
                    }

            };
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
          style={{
            backgroundColor: "#0f172a",
            minHeight: "100vh",
            fontFamily: "Poppins, sans-serif",
          }}
        >

          <style>{`
            .ql-toolbar { background: #cbd5e1 !important; border-top-left-radius: 8px; border-top-right-radius: 8px; border: none !important; }
            .ql-container { background: #0f172a !important; color: white !important; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border: none !important; font-size: 16px; }
            .ql-editor { min-height: 300px; }
            .ql-editor.ql-blank::before { color: #64748b !important; }
          `}</style>
          <div className="container py-5">
            <div className="mb-4">
              <h3 className="fw-bold text-white mb-1">Create Post</h3>
              <p className="text-secondary mb-0">
                Write and publish content on{" "}
                <span className="text-warning fw-semibold">BLOGIFY</span>
              </p>
            </div>

            {/* ===== FORM CARD ===== */}
            <form
              onSubmit={handleSubmit}
              className="card shadow-lg border-0 rounded-4 p-4 p-md-5"
              style={{ backgroundColor: "#1e293b" }}
            >

              {/* Title */}
              <div className="mb-4">
                <label className="form-label text-light fw-semibold">
                  Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control bg-dark text-white border-0"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Content */}
              <div className="mb-4">
                <label className="form-label text-light fw-semibold">
                  Content
                </label>
                <div className="editor-wrapper rounded-3 overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={handleEditorChange}
                    modules={modules}
                    placeholder="Write your story here..."
                  />
            </div>
              </div>

              {/* Excerpt */}
              <div className="mb-4">
                <label className="form-label text-light fw-semibold">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  rows="3"
                  className="form-control bg-dark text-white border-0"
                  value={formData.excerpt}
                  onChange={handleChange}
                />
              </div>

              {/* Category & Status */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label text-light fw-semibold">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    className="form-select bg-dark text-white border-0"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label text-light fw-semibold">
                    Status
                  </label>
                  <select
                    name="status"
                    className="form-select bg-dark text-white border-0"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className="form-label text-light fw-semibold">
                  Tags <span className="text-secondary">(comma separated)</span>
                </label>
                <input
                  type="text"
                  name="tags"
                  className="form-control bg-dark text-white border-0"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              {/* Image */}
              <div className="mb-4">
                <label className="form-label text-light fw-semibold">
                  Featured Image
                </label>
                <input
                  type="file"
                  className="form-control bg-dark text-white border-0"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>

              {/* SEO */}
              <div className="mb-4">
                <label className="form-label text-light fw-semibold">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  className="form-control bg-dark text-white border-0"
                  value={formData.metaTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-5">
                <label className="form-label text-light fw-semibold">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  rows="2"
                  className="form-control bg-dark text-white border-0"
                  value={formData.metaDescription}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <div className="d-flex justify-content-end">
                <button
            type="submit"
            className="btn fw-bold px-4"
            disabled={loading}
            style={{
              backgroundColor: "#facc15",
              color: "#020617",
              borderRadius: "0.6rem",
              boxShadow: "0 8px 22px rgba(250, 204, 21, 0.45)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
              "0 12px 30px rgba(250, 204, 21, 0.65)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
              "0 8px 22px rgba(250, 204, 21, 0.45)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            >
            {loading ? "Creating..." : "Create Post"}
            </button>

              </div>

            </form>
          </div>
        </div>
);


        }

export default CreatePost;
