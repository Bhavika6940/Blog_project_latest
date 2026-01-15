import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/authUtils";
import EditPostModal from "../Form/EditPostModal";

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [ expandedRow, setExpandedRow ] = useState(null);
    const [loading , setLoading] = useState(true);
    const [postToEdit, setPostToEdit] = useState(null);
    const [categories, setCategories] = useState([]);


    const handleDelete = async (postId) => {
        try{
            await axiosInstance.delete(`/api/post/${postId}`);
            fetchPosts();
        }
        catch(error){
            console.error("Failed to delete post", error);
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
  <div
    className="container-fluid"
    style={{ fontFamily: "Poppins, sans-serif" }}
  >
    <h3 className="fw-bold text-white mb-4"> All Posts</h3>

    <div
      className="table-responsive rounded-4 shadow-lg p-3"
      style={{ backgroundColor: "#334155" }}
    >
      <table
        className="table align-middle mb-0"
        style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
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
                key={i}
                style={{
                  backgroundColor: "#475569",
                  color: "#f8fafc",
                  fontWeight: "700",
                  border: "none",
                  padding: "14px",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              {Array.from({ length: 9 }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#334155" : "#3f4f67",
                    color: "#e5e7eb",
                    border: "none",
                    padding: "14px",
                    verticalAlign: "middle",
                  }}
                >
                  {/* Index */}
                  {colIndex === 0 && (
                    <span className="fw-semibold">{index + 1}</span>
                  )}

                  {/* Image */}
                  {colIndex === 1 && (
                    post.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/public/${post.image}`}
                        alt={post.title}
                        style={{
                          width: "70px",
                          height: "44px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          boxShadow: "0 2px 6px rgba(0,0,0,.35)",
                        }}
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )
                  )}

                  {/* Title */}
                  {colIndex === 2 && (
                    <span className="fw-semibold">{post.title}</span>
                  )}

                  {/* Author */}
                  {colIndex === 3 && (post.user?.email || "N/A")}

                  {/* Category */}
                  {colIndex === 4 && (post.category?.name || "N/A")}

                  {/* Status */}
                  {colIndex === 5 && (
                    <span
                      className="fw-semibold text-uppercase"
                      style={{
                        minWidth: "70px",
                        height: "28px",
                        lineHeight: "28px",
                        textAlign: "center",
                        display: "inline-block",
                        fontSize: "0.7rem",
                        borderRadius: "999px",
                        color:
                          post.status === "Published"
                            ? "#dcfce7"
                            : "#fef9c3",
                        background:
                          post.status === "Published"
                            ? "linear-gradient(135deg, #15803d, #22c55e)"
                            : "linear-gradient(135deg, #a16207, #facc15)",
                      }}
                    >
                      {post.status}
                    </span>
                  )}

                  {/* Views */}
                  {colIndex === 6 && post.views}

                  {/* Content */}
                  {colIndex === 7 && (
                    <div style={{ maxWidth: "250px" }}>
                      {expandedRow === post.id
                        ? post.content
                        : `${getPreview(post.content)}...`}
                      {/* <button
                        className="btn btn-link btn-sm text-info p-0 ms-1"
                        onClick={() => toggleExpand(post.id)}
                      >
                        {expandedRow === post.id ? "Show less" : "Read more"}
                      </button> */}
                    </div>
                  )}

                  {/* Actions */}
                  {colIndex === 8 && (
                        <div className="d-flex align-items-center gap-2 flex-nowrap">
                            <button className="btn btn-primary btn-sm"
                            onClick={() => setPostToEdit(post)}
                                data-bs-toggle="modal"
                                data-bs-target="#editPostModal">
                            <i className="bi bi-pencil"></i>
                            </button>

                            <button className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(post.id)}>
                            <i className="bi bi-trash"></i>
                            </button>
                        </div>
                        )}

                </td>
              ))}
            </tr>
          ))}

          {posts.length === 0 && (
            <tr>
              <td
                colSpan="9"
                className="text-center text-muted"
                style={{ padding: "20px" }}
              >
                No posts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <EditPostModal
            post={postToEdit}
            categories={categories}
            onSuccess={fetchPosts}
            />

      
    </div>
  </div>
);

}

export default AdminPosts;