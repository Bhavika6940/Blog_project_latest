import React from "react";
import { useNavigate, Link } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        nprogress.start();
        navigate(path);
        nprogress.done();
    };

    return (
        <nav
            style={{
                backgroundColor: "#000000",
                padding: "15px 5%", // Matches your wide layout padding
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
        >
            {/* Logo Section */}
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

            {/* Navigation Options Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                
                {/* READ BLOGS ELEMENT */}
                <div 
                    onClick={() => handleNavigation("/allPosts")} 
                    style={{ 
                        color: "#ffffff", 
                        fontSize: "0.9rem", 
                        fontWeight: "600", 
                        cursor: "pointer",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        opacity: 0.8,
                        transition: "opacity 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.opacity = "1"}
                    onMouseOut={(e) => e.target.style.opacity = "0.8"}
                >
                    Read Blogs
                </div>
                <div 
                    onClick={() => handleNavigation("/about")} 
                    style={{ 
                        color: "#ffffff", 
                        fontSize: "0.9rem", 
                        fontWeight: "600", 
                        cursor: "pointer",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        opacity: 0.8,
                        transition: "opacity 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.opacity = "1"}
                    onMouseOut={(e) => e.target.style.opacity = "0.8"}
                >
                    Home
                </div>

                {/* User Identity underline decoration */}
                <div style={{ width: "40px", textAlign: "right" }}>
                    <div 
                        style={{ 
                            height: "2px", 
                            width: "100%", 
                            backgroundColor: "#22c55e", 
                            marginTop: "4px" 
                        }} 
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;