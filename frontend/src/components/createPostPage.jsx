import { useEffect, useState } from "react";
import axiosInstance from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";


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
            } 
            catch (err) {
                const message =
						err.response?.data?.message ||
						err.response?.data?.error ||
						"Something went wrong";

					console.error("Create post error:", err.response?.data || err);
					alert(message);

					if (err.response?.status === 401) {
						navigate("/");
  }
            }
            finally {
                    setLoading(false);
                    }

            };

          return (
            <>
             <Navbar />
            <div
				style={{
					backgroundColor: "#1e293b",
					minHeight: "100vh",
					fontFamily: "Poppins, sans-serif"
				}}
				>
				<div className="container py-5">

					{/* Header */}
					<div className="text-center mb-5">
					<h2
						className="fw-bold text-white mb-2"
						style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
					>
						Create New Post
					</h2>
					<p className="fw-semibold text-light fs-6">
						Publish high-quality content on{" "}
						<span className="text-warning fw-bold">BLOGIFY</span>
					</p>
					</div>

					{/* Form Card */}
					<form
					onSubmit={handleSubmit}
					className="card shadow-lg rounded-4 p-4 p-md-5 mx-auto"
					style={{ backgroundColor: "#334155", maxWidth: "900px" }}
					>

					{/* Title */}
					<div className="mb-4">
						<label className="form-label text-white fw-semibold">
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
						<label className="form-label text-white fw-semibold">
						Content
						</label>
						<textarea
						name="content"
						rows="6"
						className="form-control bg-dark text-white border-0"
						value={formData.content}
						onChange={handleChange}
						required
						/>
					</div>

					{/* Excerpt */}
					<div className="mb-4">
						<label className="form-label text-white fw-semibold">
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
						<label className="form-label text-white fw-semibold">
							Category
						</label>
						<select
							name="categoryId"
							className="form-select bg-dark text-white border-0"
							value={formData.categoryId}
							onChange={handleChange}
							required
						>
							<option value="">Select Category</option>
							{categories.map(cat => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
							))}
						</select>
						</div>

						<div className="col-md-6 mb-4">
						<label className="form-label text-white fw-semibold">
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
						<label className="form-label text-white fw-semibold">
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

					{/* Image Upload */}
					<div className="mb-4">
						<label className="form-label text-white fw-semibold">
						Featured Image
						</label>
						<input
						type="file"
						name="image"
						className="form-control bg-dark text-white border-0"
						accept="image/*"
						onChange={(e) => setImageFile(e.target.files[0])}
						/>
					</div>

					{/* Meta Title */}
					<div className="mb-4">
						<label className="form-label text-white fw-semibold">
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

					{/* Meta Description */}
					<div className="mb-5">
						<label className="form-label text-white fw-semibold">
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
					<div className="text-end">
						<button
						type="submit"
						className="btn btn-warning fw-bold px-4"
						disabled={loading}
						>
						{loading ? "Creating..." : "Create Post"}
						</button>
				</div>

			</form>
			</div>
		</div>

            </>
            );
        }

export default CreatePost;
