import { useEffect, useState } from "react";
import CreateCategoryModal from "../Form/CreateCategoryModal";
import axiosInstance from "../../../utils/authUtils";
import Swal from "sweetalert2";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/category");
      setCategories(res.data.data);
    } catch {
      Swal.fire("Error", "Failed to fetch categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (payload) => {
    try {
      await axiosInstance.post("/api/category", payload);
      fetchCategories();
      Swal.fire("Success", "Category created successfully", "success");
    } catch {
      Swal.fire("Error", "Failed to create category", "error");
    }
  };

  const updateCategory = async (id, payload) => {
    try {
      const res = await axiosInstance.put(`/api/category/${id}`, payload);
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? res.data.data : c))
      );
      setEditCategory(null);
      Swal.fire("Success", "Category updated successfully", "success");
    } catch {
      Swal.fire("Error", "Failed to update category", "error");
    }
  };

  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: "Delete Category?",
      text: `Are you sure you want to delete "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosInstance.delete(`/api/category/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      Swal.fire("Deleted", "Category deleted successfully", "success");
    } catch {
      Swal.fire("Error", "Failed to delete category", "error");
    }
  };

  if (loading) {
    return (
      <div style={loaderWrapper}>
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div className="container-fluid px-5 py-5">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-white mb-1">Category Management</h2>
            <p className="mb-0" style={{ color: "#cbd5f5" }}>
              Organize content using structured categories.
            </p>
          </div>

          <button
            className="btn fw-bold px-4 py-2"
            data-bs-toggle="modal"
            data-bs-target="#createCategoryModal"
            style={primaryBtn}
            onClick={() => setEditCategory(null)}
          >
            + Add Category
          </button>
        </div>

        {/* Divider */}
        <div style={dividerStyle} />

        {/* Table */}
        <div style={tableCardStyle}>
          <table
            className="table align-middle mb-0"
            style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
          >
            <thead>
              <tr>
                {["#", "Name", "Description", "Created", "Actions"].map(
                  (h) => (
                    <th key={h} style={tableHeadStyle}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {categories.length ? (
                categories.map((cat, i) => (
                  <tr key={cat.id}>
                    <td style={cellStyle(i)}>{i + 1}</td>
                    <td style={cellStyle(i)} className="fw-semibold">
                      {cat.name}
                    </td>
                    <td style={cellStyle(i)}>
                      {cat.description || "-"}
                    </td>
                    <td style={cellStyle(i)}>
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td style={cellStyle(i)}>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm"
                          style={editBtn}
                          data-bs-toggle="modal"
                          data-bs-target="#createCategoryModal"
                          onClick={() => setEditCategory(cat)}
                        >
                          ✎
                        </button>
                        <button
                          className="btn btn-sm"
                          style={deleteBtn}
                          onClick={() => handleDelete(cat.id, cat.name)}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={emptyStateStyle}>
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      <CreateCategoryModal
        onCreate={createCategory}
        onUpdate={updateCategory}
        editCategory={editCategory}
      />
    </div>
  );
};

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  fontFamily: "Poppins, sans-serif",
};

const dividerStyle = {
  height: "1px",
  background:
    "linear-gradient(to right, transparent, #facc15, transparent)",
  marginBottom: "3rem",
};

const tableCardStyle = {
  background: "rgba(51, 65, 85, 0.85)",
  backdropFilter: "blur(10px)",
  borderRadius: "1rem",
  padding: "1.5rem",
  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
};

const tableHeadStyle = {
  backgroundColor: "#334155",
  color: "#f8fafc",
  border: "none",
  padding: "14px",
  fontWeight: "700",
  fontSize: "0.85rem",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
};

const cellStyle = (i) => ({
  backgroundColor: i % 2 === 0 ? "#334155" : "#3f4f67",
  color: "#e5e7eb",
  border: "none",
  padding: "14px",
});

const primaryBtn = {
  backgroundColor: "#facc15",
  color: "#020617",
  borderRadius: "0.75rem",
  boxShadow: "0 10px 25px rgba(250,204,21,0.35)",
};

const editBtn = {
  backgroundColor: "#38bdf8",
  color: "#020617",
};

const deleteBtn = {
  backgroundColor: "#ef4444",
  color: "#020617",
};

const emptyStateStyle = {
  textAlign: "center",
  color: "#94a3b8",
  padding: "1.5rem",
};

const loaderWrapper = {
  height: "100vh",
  backgroundColor: "#1e293b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};


export default Category;
