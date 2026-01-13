import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


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
        <p className="text-center text-white mt-5">Loading posts...</p>
      </>
    );
  }

  return (
  <div
    style={{
      backgroundColor: "#1e293b",
      minHeight: "100vh",
      fontFamily: "Poppins, sans-serif",
    }}
  >


    <div className="container-fluid px-5 py-5">
      {/* Header */}
      <div className="mb-5 text-center">
        <h1
          className="fw-bold text-white display-5 mb-2"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
        >
          Posts
        </h1>
        <p className="fw-semibold text-light fs-5">
          Explore and manage blog content categorized for easy access.
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "2px",
          backgroundColor: "#334155",
          marginBottom: "50px",
          borderRadius: "2px",
        }}
      />

      <div className="col-xxl-9 mx-auto">
        {Object.keys(postsByCategory).length === 0 ? (
          <p className="text-white fw-semibold text-center">
            No posts available
          </p>
        ) : (
          Object.entries(postsByCategory).map(
            ([categoryName, posts]) => (
              <div key={categoryName} className="mb-5">
                {/* Category Header */}
                <h4
                  className="fw-bold mb-4"
                  style={{
                    color: "#a3b129",
                    borderBottom: "2px solid #7ea12b",
                    display: "inline-block",
                    paddingBottom: "6px",
                  }}
                >
                  {categoryName}
                </h4>

                <div className="row">
                  {posts.map((post) => (
                    <div
                      className="col-md-6 col-lg-4 mb-4"
                      key={post.id}
                    >
                      <div
                        className="card h-100 shadow-lg rounded-4"
                        style={{
                          backgroundColor: "#334155",
                          color: "white",
                        }}
                      >
                        {post.image && (
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/public/${post.image}`}
                            alt={post.title}
                            onError={(e) => {
                              e.target.src = "/default-image.png"; // fallback if image fails
                            }}
                            className="card-img-top"
                            style={{
                              height: "190px",
                              objectFit: "cover",
                              borderTopLeftRadius: "1rem",
                              borderTopRightRadius: "1rem",
                            }}
                          />

                        )}

                        <div className="card-body d-flex flex-column">
                          <h5 className="fw-bold mb-2">
                            {post.title}
                          </h5>

                          <p className="small text-light mb-2">
                            {post.excerpt ||
                              "No excerpt available"}
                          </p>

                         

                          <p className="mb-2 fw-semibold">
                            <span className="text-info">
                              Author:
                            </span>{" "}
                            {post.user?.username}
                          </p>

                          <div className="mt-auto d-flex justify-content-between align-items-center">
                            <span
                              className={`badge ${
                                post.status === "Published"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                              } px-3 py-2`}
                            >
                              {post.status}
                            </span>

                            <button
                                 className="btn btn-outline-info btn-sm fw-semibold"
                                 onClick = {() => navigate(`/postContent/${post.id}/post`)}>
                                  Read
                                 </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  </div>
);

};

export default Posts;
