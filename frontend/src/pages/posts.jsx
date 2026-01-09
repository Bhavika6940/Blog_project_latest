import { useEffect, useState } from "react";
import axiosInstance from "../utils/authUtils";
import Navbar from "../components/navbar";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔹 Group posts by category
  const postsByCategory = posts.reduce((acc, post) => {
    const categoryName = post.category?.name || "Uncategorized";

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push(post);
    return acc;
  }, {});

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center text-white mt-5">Loading posts...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-white fw-bold mb-4">Posts</h2>

        {Object.keys(postsByCategory).length === 0 ? (
          <p className="text-white">No posts available</p>
        ) : (
          Object.entries(postsByCategory).map(([categoryName, posts]) => (
            <div key={categoryName} className="mb-5">
              {/* ✅ CATEGORY HEADING */}
              <h4 className="text-info fw-bold mb-3">
                {categoryName}
              </h4>

              <div className="row">
                {posts.map((post) => (
                  <div className="col-md-4 mb-4" key={post.id}>
                    <div
                      className="card h-100 shadow-lg"
                      style={{
                        backgroundColor: "#1e293b",
                        color: "white",
                        borderRadius: "16px",
                      }}
                    >
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="card-img-top"
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px",
                          }}
                        />
                      )}

                      <div className="card-body">
                        <h5 className="fw-bold">{post.title}</h5>

                        {/* ✅ EXCERPT */}
                        <p className="small text-muted">
                          {post.excerpt || "No excerpt available"}
                        </p>

                        {/* ✅ META DESCRIPTION */}
                        {post.metaDescription && (
                          <p className="small text-light fst-italic">
                            {post.metaDescription}
                          </p>
                        )}

                        <p className="mb-1">
                          <strong>Author:</strong> {post.user?.name}
                        </p>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <span
                            className={`badge ${
                              post.status === "Published"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {post.status}
                          </span>

                          <small className="text-muted">
                            👁 {post.views}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Posts;
