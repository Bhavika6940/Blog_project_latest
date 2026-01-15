import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const EditPostModal = ({ post, categories, onSuccess }) => {
    const navigate = useNavigate();

    
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
				metaTitle: post.metaTitle || "",
				metaDescription: post.metaDescription || "",
				tags: post.tags ? post.tags.join(", ") : "",
				status: post.status || "Draft",
				categoryId: post.categoryId || "",
			});
			}
		}, [post]);

        const handleChange = (e) =>{
			const { name, value } = e.target;
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		};
        
        const handleUpdate = async () => {
			try{
				setLoading(true);

				const payload = {
					...formData,
					tags: formData.tags
					? formData.tags.split(",").map((t) => t.trim())
					: [],
				};
				await axiosInstance.put(`/api/post/${post.id}`, payload);
				onSuccess();
      			document.getElementById("editPostClose").click();
			}
            
            catch (err) {
                console.error("Update failed:", err);
			}

            finally {
                    setLoading(false);
             }

            };

          return (
			<div
			className="modal fade"
			id="editPostModal"
			tabIndex="-1"
			aria-hidden="true"
			>
			<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
				<div
				className="modal-content"
				style={{ backgroundColor: "#334155", color: "#fff" }}
				>
				<div className="modal-header border-0">
					<h5 className="modal-title fw-bold">Edit Post</h5>
					<button
					id="editPostClose"
					type="button"
					className="btn-close btn-close-white"
					data-bs-dismiss="modal"
					/>
				</div>

				<div className="modal-body">
					{/* Title */}
					<div className="mb-3">
					<label className="form-label">Title</label>
					<input
						className="form-control bg-dark text-white border-0"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
					</div>

					{/* Content */}
					<div className="mb-3">
					<label className="form-label">Content</label>
					<textarea
						rows="5"
						className="form-control bg-dark text-white border-0"
						name="content"
						value={formData.content}
						onChange={handleChange}
					/>
					</div>

					{/* Excerpt */}
					<div className="mb-3">
					<label className="form-label">Excerpt</label>
					<textarea
						rows="2"
						className="form-control bg-dark text-white border-0"
						name="excerpt"
						value={formData.excerpt}
						onChange={handleChange}
					/>
					</div>

					{/* Category & Status */}
					<div className="row">
					<div className="col-md-6 mb-3">
						<label className="form-label">Category</label>
						<select
						className="form-select bg-dark text-white border-0"
						name="categoryId"
						value={formData.categoryId}
						onChange={handleChange}
						>
						<option value="">Select category</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
							{cat.name}
							</option>
						))}
						</select>
					</div>

					<div className="col-md-6 mb-3">
						<label className="form-label">Status</label>
						<select
						className="form-select bg-dark text-white border-0"
						name="status"
						value={formData.status}
						onChange={handleChange}
						>
						<option value="Draft">Draft</option>
						<option value="Published">Published</option>
						</select>
					</div>
					</div>

					{/* Tags */}
					<div className="mb-3">
					<label className="form-label">Tags</label>
					<input
						className="form-control bg-dark text-white border-0"
						name="tags"
						placeholder="react, node, backend"
						value={formData.tags}
						onChange={handleChange}
					/>
					</div>

					{/* Meta Title */}
					<div className="mb-3">
					<label className="form-label">Meta Title</label>
					<input
						className="form-control bg-dark text-white border-0"
						name="metaTitle"
						value={formData.metaTitle}
						onChange={handleChange}
					/>
					</div>

					{/* Meta Description */}
					<div className="mb-3">
					<label className="form-label">Meta Description</label>
					<textarea
						rows="2"
						className="form-control bg-dark text-white border-0"
						name="metaDescription"
						value={formData.metaDescription}
						onChange={handleChange}
					/>
					</div>
				</div>

				<div className="modal-footer border-0">
					<button
					className="btn btn-secondary"
					data-bs-dismiss="modal"
					>
					Cancel
					</button>
					<button
					type="submit"
					className="btn fw-semibold text-white"
					onClick={handleUpdate}
					disabled={loading}
					style={{
							background: "linear-gradient(135deg, #2563eb, #1e40af)",
							border: "none",
							padding: "8px 24px"
							}}
					>
					{loading ? "Updating..." : "Update "}
					</button>
				</div>
				</div>
			</div>
			</div>
  );
    }

export default EditPostModal;



            