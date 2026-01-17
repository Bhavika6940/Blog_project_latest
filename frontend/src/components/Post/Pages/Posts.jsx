import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/authUtils";
import EditPostModal from "../Form/EditPostModal";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postToEdit, setPostToEdit] = useState(null);
  const [categories, setCategories] = useState([]);

 const handleDelete = async (postId) => {
  const confirmed = window.confirm("Do you want to delete this post?");
  if (!confirmed) return;

  try {
    await axiosInstance.delete(`/api/post/${postId}`);
    fetchPosts();
    alert("Post deleted successfully");
  } catch (error) {
    console.error("Failed to delete post", error);
  }
};


  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/category");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/api/post/posts");
      setPosts(res.data.data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getPreview = (content) => {
    if (!content) return "";
    return content.split("\n")[0].slice(0, 40);
  };

  if (loading) {
    return <p className="text-light">Loading posts...</p>;
  }

  return (
    <div style={pageStyle}>
      <div className="container-fluid px-5 py-5">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-white mb-1">All Posts</h3>
            <p className="mb-0" style={{ color: "#cbd5f5" }}>
              Manage all posts with ease.
            </p>
          </div>
        </div>

        
        <div style={dividerStyle} />

        
        <div style={tableCardStyle}>
          <div
           
            className="table-responsive"
              style={{
                height: "calc(100vh - 200px)",     // adjust 200px according to your header + top margin
                minHeight: "400px",
                overflow: "auto",
                borderRadius: "1rem",
                background: "rgba(51, 65, 85, 0.85)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 20px 40px rgba(250, 9, 9, 0.4)",       // ← visual debug
              }}
          >
            <table
              className="table align-middle mb-0"
              style={{
                width: "100%",
                minWidth: "1300px",               // ← crucial for horizontal scroll
                borderCollapse: "separate",
                borderSpacing: "0 12px",
              }}
            >
              <thead>
                <tr>
                  {[
                    "#",
                    "Image",
                    "Title",
                    "Author",
                    "Category",
                    "Status",
                    "Views",
                    "Content",
                    "Actions",
                  ].map((head, i) => (
                    <th
                      key={head}
                      style={{
                        ...tableHeadStyle,
                        width: colWidths[i],
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        backgroundColor: "#334155",
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {posts.length ? (
                  posts.map((post, index) => (
                    <tr key={post.id}>
                      {Array.from({ length: 9 }).map((_, colIndex) => (
                        <td
                          key={colIndex}
                          style={{
                            ...cellStyle(index),
                            width: colWidths[colIndex],
                          }}
                        >
                          
                          {colIndex === 0 && (
                            <span className="fw-semibold">{index + 1}</span>
                          )}

                          
                          {colIndex === 1 &&
                            (post.image ? (
                              <img
                                src={`${import.meta.env.VITE_API_BASE_URL}/public/${post.image}`}
                                alt={post.title}
                                style={{
                                  ...imageStyle,
                                  width: colWidths[1],
                                }}
                              />
                            ) : (
                              <span className="text-muted">No Image</span>
                            ))}

                          
                          {colIndex === 2 && (
                            <span className="fw-semibold" style={titleStyle}>
                              {post.title}
                            </span>
                          )}

                         
                          {colIndex === 3 && (post.user?.email || "N/A")}

                          
                          {colIndex === 4 && (post.category?.name || "N/A")}

                          
                          {colIndex === 5 && (
                            <span style={statusBadgeStyle(post.status)}>
                              {post.status}
                            </span>
                          )}

                          
                          {colIndex === 6 && post.views}

                          
                          {colIndex === 7 && (
                            <div
                              style={{
                                maxWidth: colWidths[7],
                                ...textTwoLines,
                              }}
                            >
                              {expandedRow === post.id
                                ? post.content
                                : `${getPreview(post.content)}...`}
                            </div>
                          )}

                          
                          {colIndex === 8 && (
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-sm"
                                style={editBtn}
                                onClick={() => setPostToEdit(post)}
                                data-bs-toggle="modal"
                                data-bs-target="#editPostModal"
                              >
                                ✎
                              </button>
                              <button
                                className="btn btn-sm"
                                style={deleteBtn}
                                onClick={() => handleDelete(post.id)}
                              >
                                🗑
                              </button>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={emptyStateStyle}>
                      No posts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

         
          <EditPostModal
            post={postToEdit}
            categories={categories}
            onSuccess={fetchPosts}
          />
        </div>
      </div>
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
  background: "linear-gradient(to right, transparent, #facc15, transparent)",
  marginBottom: "3rem",
};

const tableCardStyle = {
  background: "rgba(51, 65, 85, 0.85)",
  backdropFilter: "blur(10px)",
  borderRadius: "1rem",
  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  overflow: "hidden", 
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
  verticalAlign: "middle",
});

const imageStyle = {
  width: "70px",
  height: "44px",
  objectFit: "cover",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 6px rgba(0,0,0,.35)",
};

const statusBadgeStyle = (status) => ({
  minWidth: "70px",
  height: "28px",
  lineHeight: "28px",
  textAlign: "center",
  display: "inline-block",
  fontSize: "0.7rem",
  borderRadius: "999px",
  color: status === "Published" ? "#dcfce7" : "#fef9c3",
  background:
    status === "Published"
      ? "linear-gradient(135deg, #15803d, #22c55e)"
      : "linear-gradient(135deg, #a16207, #facc15)",
});

const editBtn = {
  backgroundColor: "#38bdf8",
  color: "#020617",
  border: "none",
};

const deleteBtn = {
  backgroundColor: "#ef4444",
  color: "#020617",
  border: "none",
};

const emptyStateStyle = {
  textAlign: "center",
  color: "#94a3b8",
  padding: "2.5rem 1rem",
  fontSize: "1.1rem",
};

const textTwoLines = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const titleStyle = {
  fontWeight: 600,
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const colWidths = {
  0: "50px",   
  1: "90px",   
  2: "180px",  
  3: "180px",  
  4: "140px",  
  5: "110px",  
  6: "90px",   
  7: "340px",  
  8: "140px",  
};

export default AdminPosts;