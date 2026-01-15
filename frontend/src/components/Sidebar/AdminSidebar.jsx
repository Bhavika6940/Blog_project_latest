import { NavLink } from "react-router-dom";
import { getUser } from "../../utils/authUtils";

const AdminSidebar = () => {
  const user = getUser();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  const adminLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
    { name: "Roles", path: "/role", icon: "bi-shield-lock" },
    { name: "Users", path: "/user", icon: "bi-people" },
    { name: "Categories", path: "/category", icon: "bi-tags" },
    { name: "Create Post", path: "/createBlog", icon: "bi-plus-circle" },
    { name: "Posts", path: "/posts", icon: "bi-file-earmark-text" },
  ];

  return (
    <div style={sidebarStyle}>
      
      <h3 className="fw-bold mb-1" style={brandStyle}>BLOGIFY</h3>
      <p className="small mb-4" style={emailStyle}>
        {user?.email}
      </p>

      <ul className="nav flex-column gap-2">
        {adminLinks.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path} className={navLinkClass}>
              <i className={`bi ${item.icon}`}></i>
              {item.name}
            </NavLink>
          </li>
        ))}
       
      </ul>
      <div className="mt-auto">
        <button
          className="btn btn-outline-danger btn-sm w-100 mt-4"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

const sidebarStyle = {
     width: "260px",
        height: "100vh",
        background: "linear-gradient(180deg, #0f172a, #1e293b)",
        boxShadow: "4px 0 12px rgba(0,0,0,0.4)",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
}

const brandStyle = { color: "#22c55e", letterSpacing: "1px" };
const emailStyle = { color: "#cbd5f5", wordBreak: "break-all" };
const navLinkClass = ({ isActive }) =>
  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 fw-semibold ${
    isActive ? "text-success bg-success bg-opacity-10" : "text-light"
  }`;