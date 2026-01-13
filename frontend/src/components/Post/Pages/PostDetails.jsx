import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/authUtils";


const PostDetails = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [loading , setLoading] = useState(true);
  
    useEffect(() => {
        const fetchPost = async () => {
            try{
                const res = await axiosInstance.get(`/api/post/${id}`);
                setPost(res.data.data);
            }
            catch(error){
                console.error("Failed to fetch post", error);
            } finally{
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);
      if (loading) {
    return (
      <div style={{ backgroundColor: "#1e293b", minHeight: "100vh" }}>
        <p className="text-white text-center mt-5 fw-semibold">
          Loading post...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: "#1e293b", minHeight: "100vh" }}>
        
        <p className="text-white text-center mt-5 fw-semibold">
          Post not found
        </p>
      </div>
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
      <div className="col-xxl-9 mx-auto">
        {/* Title */}
        <h1
          className="fw-bold text-white mb-3"
          style={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="d-flex flex-wrap gap-3 mb-4 text-light fw-semibold">
          <span>
            ✍ Author: <span className="text-info">{post.user?.username}</span>
          </span>
          <span>
            👁 Views: <span className="text-success">{post.views}</span>
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "2px",
            backgroundColor: "#334155",
            marginBottom: "30px",
          }}
        />

        {/* Image + Content Row */}
        <div className="row g-4">
          {/* Image Column */}
          {post.image && (
            <div className="col-lg-4 d-flex align-items-start">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/public/${post.image}`}
                alt={post.title}
                className="img-fluid rounded-4 shadow-lg"
                style={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Content Column */}
          <div className={post.image ? "col-lg-8" : "col-12"}>
            <div
              className="card shadow-lg rounded-4 p-4"
              style={{ backgroundColor: "#334155" }}
            >
              <div
                className="text-white fs-6 lh-lg"
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default PostDetails;