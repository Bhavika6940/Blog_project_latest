import { NavLink } from "react-router-dom";
import { getUser } from "../../utils/authUtils";

const Sidebar = () => {
  const user = getUser();
  console.log("user role", user?.roleId);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        width: "250px",
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
      }}
    >
     
      <h3
        className="fw-bold mb-1"
        style={{ color: "#22c55e", letterSpacing: "1px" }}
      >
        BLOGIFY
      </h3>

      
      <p
        className="small mb-4"
        style={{ color: "#cbd5f5", wordBreak: "break-all" }}
      >
        {user?.email}
      </p>

      
      <ul className="nav flex-column gap-2">
        {[
          { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
          { name: "Roles", path: "/role", icon: "bi-shield-lock" },
          { name: "Users", path: "/user", icon: "bi-people" },
          { name: "Categories", path: "/category", icon: "bi-tags" },
          { name: "Create Post", path: "/createBlog", icon: "bi-plus-circle" },
          // { name: "Posts", path: "/blog", icon: "bi-eye" },
          { name: "Posts", path: "/posts", icon: "bi-file-earmark-text" },
        ].map((item) => (
          <li className="nav-item" key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 fw-semibold ${
                  isActive
                    ? "text-success bg-success bg-opacity-10"
                    : "text-light"
                }`
              }
            >
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

export default Sidebar;
