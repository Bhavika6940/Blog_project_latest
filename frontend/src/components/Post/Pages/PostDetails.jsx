import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/authUtils";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const PostDetails = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
       
        nprogress.start();
        const fetchPost = async () => {
            try{
                const res = await axiosInstance.get(`/api/post/get/${id}`);
                setPost(res.data.data);
            }
            catch(error){
                console.error("Failed to fetch post", error);
            } finally{
                setLoading(false);
                nprogress.done();
            }
        };
        fetchPost();
    }, [id]);


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#1e293b", minHeight: "100vh" }}>
        <div className="spinner-border text-info" role="status"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#1e293b", minHeight: "100vh" }}>
        <p className="text-white">Post not found</p>
      </div>
    );
  }

 return (
  <>
    <div style={{ 
      backgroundColor: "#1e293b", 
      minHeight: "100vh", 
      padding: "40px 20px",
      position: "relative", 
      overflow: "hidden"    
    }}>
      
      
      <div style={{
        position: "absolute",
        top: "20%",
        left: "-100px",
        width: "300px",
        height: "300px",
        backgroundColor: "rgba(57, 255, 20, 0.05)", 
        filter: "blur(100px)",
        borderRadius: "50%",
        zIndex: 0
      }}></div>

      
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "-100px",
        width: "400px",
        height: "400px",
        backgroundColor: "rgba(13, 202, 240, 0.05)", 
        filter: "blur(120px)",
        borderRadius: "50%",
        zIndex: 0
      }}></div>

      <div className="mx-auto" style={{ maxWidth: "800px", position: "relative", zIndex: 1 }}>
        
        
        <button 
          onClick={() => navigate("/allPosts")} 
          className="btn btn-sm mb-4 fw-bold shadow-sm"
          style={{ 
            backgroundColor: "#334155", 
            color: "#0dcaf0", 
            border: "1px solid rgba(13, 202, 240, 0.3)",
            padding: "8px 20px",
            borderRadius: "8px"
          }}
        >
          ← BACK
        </button>

        
        <div className="text-start mb-4">
          <h1 className="text-white fw-bold mb-2" style={{ fontSize: "2.2rem", letterSpacing: "-1px" }}>
            {post?.title}
          </h1>
          <p className="text-info small fw-bold opacity-75 text-uppercase" style={{ letterSpacing: "1px" }}>
            {post?.user?.username} • {post?.views} VIEWS
          </p>
        </div>

        
        {post?.image && (
          <div className="text-center mb-0">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/public/${post.image}`}
              alt=""
              className="img-fluid rounded-top-4 shadow-lg"
              style={{ 
                width: "100%", 
                maxHeight: "550px", 
                objectFit: "cover", 
                display: "block",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            />
          </div>
        )}

        
        <div 
          className="shadow-lg"
          style={{ 
            backgroundColor: "#334155", 
            borderRadius: post?.image ? "0 0 16px 16px" : "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden"
          }}
        >
          <div className="p-4 p-md-5">
            <div
              className="text-white fw-medium"
              style={{ 
                textAlign: "justify",
                lineHeight: "1.9",
                fontSize: "1.05rem",
                wordWrap: "break-word",
                color: "rgba(255,255,255,0.9)"
              }}
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default PostDetails;