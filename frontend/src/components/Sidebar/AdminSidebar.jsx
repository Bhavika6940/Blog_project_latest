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
    <aside style={sidebarStyle}>
       
      <div>
        <h3 style={brandStyle}>BLOGIFY</h3>
        <p style={emailStyle}>{user?.email}</p>
        <hr style={dividerStyle} />
      </div>

      
      <ul className="nav flex-column gap-2 mt-2">
        {adminLinks.map((item) => (
          <li key={item.name} className="nav-item">
            <NavLink
              to={item.path}
              className={navLinkClass}
              style={navLinkStyle}
            >
              <i className={`bi ${item.icon}`} style={iconStyle}></i>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      
      <button
        onClick={logout}
        className="btn btn-outline-danger btn-sm fw-semibold mt-auto"
        style={logoutBtnStyle}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
const sidebarStyle = {
  width: "260px",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  padding: "24px 20px",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(180deg, #0f172a, #1e293b)",
  boxShadow: "4px 0 18px rgba(0,0,0,0.45)",
  zIndex: 1000,
};

const brandStyle = {
  color: "#22c55e", 
  fontWeight: "900",
  margin: 0,
  fontSize: "1.8rem",
  letterSpacing: "1px",
  textTransform: "uppercase"
};

const emailStyle = {
  color: "#cbd5f5",
  fontSize: "0.8rem",
  wordBreak: "break-word",
  marginBottom: "0.5rem",
};

const dividerStyle = {
  borderColor: "#334155",
  marginBottom: "1rem",
};

const navLinkStyle = {
  transition: "all 0.25s ease",
};

const navLinkClass = ({ isActive }) =>
  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 fw-semibold ${
    isActive
      ? "text-success bg-success bg-opacity-10"
      : "text-light"
  }`;

const iconStyle = {
  fontSize: "1.1rem",
  minWidth: "20px",
};

const logoutBtnStyle = {
  borderRadius: "10px",
  padding: "10px",
};
