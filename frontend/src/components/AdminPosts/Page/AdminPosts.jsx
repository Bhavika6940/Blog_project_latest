import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/authUtils";
import EditPostModal from "../Form/EditPostModal";
import { Popconfirm } from "antd";
import Swal from "sweetalert2";

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [ expandedRow, setExpandedRow ] = useState(null);
    const [loading , setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const openEdit = (post) => {
      setSelectedPost(post);
      setShowEdit(true);
    };


    const handleDelete = async (postId) => {
      try {
        await axiosInstance.delete(`/api/post/${postId}`);
        message.success("Post deleted successfully");
        fetchPosts();
      } catch (error) {
        console.error("Failed to delete post", error);
        message.error("Failed to delete post");
      }
    };


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
        fetchPosts();
        fetchCategories();
    },[]);

    const fetchPosts = async () => {
        try {
            const res = await axiosInstance.get("/api/post/posts");
            setPosts(res.data.data);
        }
        catch(error) {
            console.error("Failed to fetch posts", error);
        }
        finally{
            setLoading(false);
        }
    }

    const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
};


    const getPreview = (content) => {
        if(!content) return "";
        return content.split("\n")[0].slice(0,40);

    }

    if(loading){
        return <p className="text-light">Loading posts...</p>;
    }
     return (
    <div style={pageStyle}>
      <div className="container-fluid px-5 py-5">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-white mb-1">All Posts</h3>
            <p className="mb-0" style={{ color: "#cbd5f5" }}>
              Manage all posts with ease.
            </p>
          </div>
         
        </div>

        {/* Divider */}
        <div style={dividerStyle} />

        {/* Table */}
        <div style={tableCardStyle}>
          <div 
              className="table-responsive" 
              style={{
                maxHeight: '70vh',           // ← vertical scroll limit
                overflowY: 'auto',           // vertical scrollbar
                overflowX: 'auto',           // horizontal scrollbar when needed
                borderRadius: '1rem',
                scrollbarWidth: 'thin',      // firefox
                scrollbarColor: '#64748b #334155'
              }}
            >
          <table
            className="table align-middle mb-0"
            style={{ 
              borderCollapse: "separate",
              borderSpacing: "0 12px",
              minWidth: '1000px' }}
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
                    style={{ ...tableHeadStyle, width: colWidths[i] }}
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
                        {/* Index */}
                        {colIndex === 0 && <span className="fw-semibold">{index + 1}</span>}

                        {/* Image */}
                        {colIndex === 1 && (
                          post.image ? (
                            <img
                              src={`${import.meta.env.VITE_API_BASE_URL}/public/${post.image}`}
                              alt={post.title}
                              style={{ ...imageStyle, width: colWidths[1] }}
                            />
                          ) : (
                            <span className="text-muted">No Image</span>
                          )
                        )}

                        {/* Title */}
                        {colIndex === 2 && (
                            <span className="fw-semibold" style={titleStyle}>
                              {post.title}
                            </span>
                          )}

                        {/* Author */}
                        {colIndex === 3 && (post.user?.email || "N/A")}

                        {/* Category */}
                        {colIndex === 4 && (post.category?.name || "N/A")}

                        {/* Status */}
                        {colIndex === 5 && <span style={statusBadgeStyle(post.status)}>{post.status}</span>}

                        {/* Views */}
                        {colIndex === 6 && post.views}

                        {/* Content */}
                        {colIndex === 7 && (
                            <div style={{ maxWidth: colWidths[7], ...textTwoLines }}>
                              {expandedRow === post.id
                                ? post.content
                                : `${getPreview(post.content)}...`}
                            </div>
                          )}
                        {/* Actions */}
                        {colIndex === 8 && (
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              className="btn btn-sm"
                              style={editBtn}
                              data-bs-toggle="modal"
                              data-bs-target="#editPostModal"
                              onClick={() => openEdit(post)}
                            >
                              ✎
                            </button>
                            <Popconfirm
                                title="Delete Post"
                                description="Are you sure you want to delete this post?"
                                okText="Yes, Delete"
                                cancelText="Cancel"
                                okButtonProps={{ danger: true }}
                                onConfirm={() => handleDelete(post.id)}
                              >
                            <button
                              className="btn btn-sm"
                              style={deleteBtn}
                              onClick={() => handleDelete(post.id)}
                            >
                              🗑
                            </button>
                            </Popconfirm>
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

          {/* Modals */}
          
        </div>
      </div></div>
      <EditPostModal
              show={showEdit}
              post={selectedPost}
              categories={categories}
              onClose={() => setShowEdit(false)}
              onUpdated={fetchPosts}
            />
    </div>
  );

}

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
const textSingleLine = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const titleStyle = {
  fontWeight: 600,          // keep it semi-bold
  fontSize: "0.85rem",      // smaller than default
  whiteSpace: "nowrap",     // prevent wrapping
  overflow: "hidden",       // hide overflow
  textOverflow: "ellipsis", // add "..." for long titles
};

const textTwoLines = {
  display: "-webkit-box",
  WebkitLineClamp: 2, // shows max 2 lines
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const colWidths = {
  0: "40px",   // #
  1: "80px",   // Image
  2: "120px",  // Title
  3: "150px",  // Author
  4: "120px",  // Category
  5: "100px",  // Status
  6: "80px",   // Views
  7: "300px",  // Content
  8: "120px",  // Actions
};

export default AdminPosts;