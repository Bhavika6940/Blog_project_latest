import { useEffect, useState } from "react";
import Navbar from "../../Sidebar/Sidebar";
import CreateCategoryModal from "../Form/CreateCategoryModal";
import axiosInstance from "../../../utils/authUtils";
import Swal from "sweetalert2";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEdit] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/category");
      setCategories(res.data.data);
      console.log("Category data", res.data.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      alert(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (formData) => {
    try {
      await axiosInstance.post("/api/category", formData);
      fetchCategories(); // refresh list
    } catch (err) {
      console.error("Failed to create category : ", err);
      alert("Failed to create category!");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await axiosInstance.delete(`/api/category/${id}`);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      alert(`Category "${name}" deleted successfully!`);
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category");
    }
  };

  const updateCategory = async (id, payload) => {
    try {
      const res = await axiosInstance.put(`/api/category/${id}`, payload);
      const updatedCategory = res.data.data;
      setCategories(prev => prev.map(c => (c.id === id ? updatedCategory : c)));
      setEdit(null);
      Swal.fire({
                  title: "Success!",
                  text: "Category updated successfully!",       
                  icon: "success",    
                  confirmButtonText: "OK",
                  confirmButtonColor: "#4CAF50" 
                  });
      
    } catch (err) {
      console.error("Error editing category:", err);
      Swal.fire({
              title: "Error!",
              text: "Failed to update category!",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#e74c3c", // red for error
            })
            
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#1e293b" }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#1e293b", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      <Navbar />

      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-white" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>Category Management</h2>
          <button
            className="btn btn-warning fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#createCategoryModal"
          >
            <i className="bi bi-plus-circle me-2"></i> Add Category
          </button>
        </div>

        {/* Table Card */}
        <div className="card shadow-lg rounded-4" style={{ backgroundColor: "#334155" }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                  <tr>
                    {["#", "Name", "Description", "Created At", "Actions"].map((h, i) => (
                      <th
                        key={i}
                        className={`text-white ${h === "Actions" ? "text-center" : ""}`}
                        style={{
                          backgroundColor: "#475569",
                          borderColor: "#64748b"
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

              <tbody>
                  {categories.length > 0 ? categories.map((cat, index) => {
                    const rowBg = index % 2 === 0 ? "#334155" : "#3f4f67";

                    return (
                      <tr
                        key={cat.id}
                        style={{
                          backgroundColor: rowBg,
                          transition: "background-color 0.2s ease"
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#1e40af33")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = rowBg)
                        }
                      >
                        <td style={{ backgroundColor: "transparent", color: "#e2e8f0" }}>
                          {index + 1}
                        </td>
                        <td
                          className="fw-semibold"
                          style={{ backgroundColor: "transparent", color: "#e2e8f0" }}
                        >
                          {cat.name}
                        </td>
                        <td style={{ backgroundColor: "transparent", color: "#e2e8f0" }}>
                          {cat.description || "-"}
                        </td>
                        <td style={{ backgroundColor: "transparent", color: "#e2e8f0" }}>
                          {new Date(cat.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          className="text-center"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <button
                            className="btn btn-outline-info btn-sm me-2"
                            title="Edit Category"
                            onClick={() => setEdit(cat)}
                            data-bs-toggle="modal"
                            data-bs-target="#createCategoryModal"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            title="Delete Category"
                            onClick={() => handleDelete(cat.id, cat.name)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center fw-semibold"
                        style={{ backgroundColor: "#334155", color: "#94a3b8" }}
                      >
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>

            </table>
          </div>
        </div>
      </div>

      <CreateCategoryModal
        categories={categories}
        onCreate={createCategory}
        onUpdate={updateCategory}
        editCategory={editCategory}
      />
    </div>
  );
};

export default Category;
