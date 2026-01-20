import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/category");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    nprogress.start();
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
      nprogress.done();
    }
  };

 

 

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
      <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#1e293b", minHeight: "100vh" }}>
        <div className="spinner-border text-info" role="status"></div>
      </div>
    );
  }


  return (
    <>
    
        <div
          style={{
            backgroundColor: "#1e293b",
            minHeight: "100vh",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <div className="container-fluid px-5 py-5">
            
            <div className="mb-5 text-center">
        
        <span 
          className="text-info fw-bold small text-uppercase mb-2 d-block" 
          style={{ letterSpacing: "2px", opacity: "0.8" }}
        >
          Insights & Perspectives
        </span>

      
        <h1
          className="fw-bold text-white h2 mb-3"
          style={{ 
            textShadow: "0 4px 10px rgba(0,0,0,0.3)",
            letterSpacing: "-0.01em" 
          }}
        >
          Featured Articles
        </h1>

        
        <div 
          className="mx-auto mb-4" 
          style={{ 
            height: "3px", 
            width: "60px", 
            backgroundColor: "#0dcaf0", 
            borderRadius: "2px" 
          }}
        ></div>
        <p 
          className="fw-medium text-light opacity-75 fs-6 mx-auto" 
          style={{ maxWidth: "650px", lineHeight: "1.6" }}
        >
          Explore a curated collection of deep dives and expert analysis designed to keep you informed and inspired.
        </p>
      </div>

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
                <h4
                  className="fw mb-4"
                  style={{
                    color: "#e7d90f",
                    display: "inline-block",
                    paddingBottom: "4px",
                    fontSize: "30px",
                    textTransform: "uppercase"
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
                            onError={(e) =>
                              (e.target.src = "/default-image.png")
                            }
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
                            {post.excerpt || "No excerpt available"}
                          </p>

                          <p className="mb-2 fw-semibold">
                            <span className="text-info">Author:</span>{" "}
                            {post.user?.username || "Unknown"}
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
                              onClick={() =>
                                navigate(`/postContent/${post.id}/post`)
                              }
                            >
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
  </>
);

};
export default Posts;