import { useNavigate, Link } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { useState, useRef, useEffect } from "react";
import axiosInstance from "../../utils/authUtils";

const Navbar = () => {
    const navigate = useNavigate();
    const [showCategories, setShowCategories] = useState(false);
    const [categories , setCategories] = useState([]);
    const categoryRef = useRef(null);
    const handleNavigation = (path) => {
        nprogress.start();
        navigate(path);
        nprogress.done();
    };
    const fetchCategories = async () =>{
        try{
            const dbRes = axiosInstance.get("/api/category/getCat");
            setCategories((await dbRes).data.data);
            console.log("Categories", (await dbRes).data.data);
        }
        catch(error){
            console.log("Error while fetching the data:", error)
        }
    }
    useEffect(() => {
        fetchCategories();
    },[])

    useEffect(() => {
     const handleClickOutside = (event) => {
     if (
      categoryRef.current &&
      !categoryRef.current.contains(event.target)
    ) {
      setShowCategories(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



    return (
        <nav
            style={{
                backgroundColor: "#000000",
                padding: "15px 5%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
        >
            
            <div 
                onClick={() => handleNavigation("/about")}
                style={{ cursor: "pointer" }}
            >
                <h2
                    style={{
                        color: "#22c55e", 
                        fontWeight: "900",
                        margin: 0,
                        fontSize: "1.8rem",
                        letterSpacing: "1px",
                        textTransform: "uppercase"
                    }}
                >
                    BLOGIFY
                </h2>
            </div>

         <div style={{ display: "flex",alignItems : "center", justifyContent: "flex-end" , gap: "40px" , paddingLeft: "100px" }}>
                        
                <div 
                    onClick={() => handleNavigation("/allPosts")} 
                    style={navItemStyle}
                    onMouseOver={(e) => e.target.style.opacity = "1"}
                    onMouseOut={(e) => e.target.style.opacity = "0.8"}
                >
                    Home
                </div>
                <div 
                    onClick={() => handleNavigation("/about")} 
                    style={navItemStyle}
                    onMouseOver={(e) => e.target.style.opacity = "1"}
                    onMouseOut={(e) => e.target.style.opacity = "0.8"}
                >
                    About
                </div>

                <div
                    ref={categoryRef}
                     style = {{
                        position : "relative",
                        color : "#fff",
                        fontSize : "0.9rem",
                        fontWeight : "600",
                        cursor : "pointer",
                        letterSpacing : "1px",
                        textTransform : "uppercase",
                        opacity : 0.8,
                     }}
                     onClick={() => setShowCategories((prev) => !prev)}>
                        
                        Categories

                        {showCategories && (
                        <div
                           style = {{
                            position : "absolute",
                            top : "130%",
                            left : 0,
                            backgroundColor : "#111",
                            border : "1px solid rgba(255,255,255,0.1)",
                            borderRadius : "6px",
                            minWidth : "160px",
                            zIndex : 1000,
                            padding : "8px 0"
                           }}
                           onClick={(e) => e.stopPropagation()}>
                            {categories.map((categories) => (
                                <div
                                    key={categories.slug}
                                    onClick={() => handleNavigation(`/posts/category/${categories.slug}`)}
                                    style={{
                                        padding: "10px 16px",
                                        fontSize : "0.85rem",
                                        cursor : "pointer",
                                        color: "#fff",
                                        opacity : 0.85
                                    }}
                                    >
                                        {categories.name}
                                </div>
                            ))}
                           </div>
                        )}
                </div>
            </div>
        </nav>
    );
}

const navItemStyle = { 
                        color: "#ffffff", 
                        fontSize: "0.9rem", 
                        fontWeight: "600", 
                        cursor: "pointer",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        opacity: 0.8,
                        transition: "opacity 0.2s"
            };

export default Navbar;