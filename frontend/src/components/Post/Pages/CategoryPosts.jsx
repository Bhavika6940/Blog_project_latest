import {useEffect , useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import axiosInstance from "../../../utils/authUtils";
import nprogress from "nprogress";
import "nprogress/nprogress.css";


const CategoryPosts = () => {
    const {slug} = useParams();
    const [posts, setPosts] = useState([]);
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages , setTotalPages] = useState(1);
    const limit = 3;

    useEffect (() => {
        setCurrentPage(1);
    },[slug]);

    useEffect (() => {
        nprogress.start();
        fetchPostByCategory();       
    }, [slug, currentPage]);

    const fetchPostByCategory = async () => {
        try {
            const res = await axiosInstance.get(
                `/api/post/category/${slug}?page=${currentPage}&limit=${limit}`
            );
            setPosts(res.data.data);
            setTotalPages(res.data.pagination.totalPages);
            console.log(res.data.data);
            
        }
        catch(error){
            console.error("Failed to fetch category posts", error);
        }finally{
            setLoading(false);
            nprogress.done();
        }
    };

    if(loading) {
        return (
            <div
               className = "d-flex justify-content-center align-items-center"
               style = {{backgroundColor : "#1e293b" , minHeight : "100vh"}}>

                <div className = "spinner-border text-info" role = "status">

                </div>
            </div>
        )
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
      
      <div className="mb-4 text-center">
        <h1 className="fw-bold text-white h2 mb-2">
          {slug.replace("-", " ").toUpperCase()}
        </h1>
        <div
          className="mx-auto"
          style={{
            height: "2px",
            width: "60px",
            backgroundColor: "#0dcaf0",
            borderRadius: "2px",
          }}
        />
      </div>

      
      <div
        style={{
          height: "1px",
          backgroundColor: "#334155",
          marginBottom: "40px",
        }}
      />

      
      {posts.length === 0 ? (
        <p className="text-white fw-semibold text-center mt-4">
          No posts available in this category
        </p>
      ) : (
        <div className="d-flex justify-content-center flex-wrap gap-4">
          {posts.map((post) => (
            <div
              className="card border-0 shadow-sm"
              key={post.id}
              style={{
                backgroundColor: "#334155",
                color: "white",
                borderRadius: "14px",
                width: "300px",
              }}
            >
              {post.image && (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/public/${post.image}`}
                  alt={post.title}
                  onError={(e) => (e.target.src = "/default-image.png")}
                  className="card-img-top"
                  style={{
                    height: "190px",
                    objectFit: "cover",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                  }}
                />
              )}
              <div className="card-body d-flex flex-column p-4">
                <h6 className="fw-semibold mb-2">{post.title}</h6>
                <p className="small text-light mb-3" style={{ opacity: 0.9 }}>
                  {post.excerpt || "No excerpt available"}
                </p>
                <p className="mb-3 small fw-medium">
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
                    onClick={() => navigate(`/postContent/${post.id}/post`)}
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
{totalPages > 1 && (
  <nav className="mt-5 pt-4">
    <ul className="pagination justify-content-center align-items-center gap-2">
      
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link border-0 shadow-none rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: currentPage === 1 ? "#334155" : "transparent",
            color: currentPage === 1 ? "#64748b" : "#0dcaf0",
            border: `1px solid ${currentPage === 1 ? "#475569" : "#0dcaf0"}`,
          }}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      
      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
       
        if (
          pageNum === 1 ||
          pageNum === totalPages ||
          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
        ) {
          return (
            <li key={pageNum} className="page-item">
              <button
                className="page-link border-0 shadow-none rounded-circle fw-bold d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: currentPage === pageNum ? "#0dcaf0" : "transparent",
                  color: currentPage === pageNum ? "#1e293b" : "#fff",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          );
        } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
          return (
            <span key={pageNum} className="text-muted px-1">
              ...
            </span>
          );
        }
        return null;
      })}

      
      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button
          className="page-link border-0 shadow-none rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: currentPage === totalPages ? "#334155" : "transparent",
            color: currentPage === totalPages ? "#64748b" : "#0dcaf0",
            border: `1px solid ${currentPage === totalPages ? "#475569" : "#0dcaf0"}`,
          }}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
    
   
    <p className="text-center mt-3 small text-secondary" style={{ opacity: 0.7 }}>
      Showing Page {currentPage} of {totalPages}
    </p>
  </nav>
)}
</div>
</div>
)



}

export default CategoryPosts;