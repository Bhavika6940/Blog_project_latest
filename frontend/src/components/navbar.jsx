import { NavLink } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // redirect to login
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4"
      style={{
        background: "linear-gradient(90deg, #1e293b, #0f172a)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }}
    >
      
      <NavLink
        to="/dashboard"
        className="navbar-brand fw-bold"
        style={{ color: "#22c55e", letterSpacing: "1px" }}
      >
        BLOGIFY
      </NavLink>

      
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      
      <div className="collapse navbar-collapse" id="mainNavbar">
       
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {[
            { name: "Roles", path: "/role" },
            { name: "Users", path: "/user" },
            { name: "Categories", path: "/category" },
            {name : "+ Post", path: "/createBlog"}
          ].map((item) => (
            <li className="nav-item" key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link fw-semibold ${isActive ? "text-success" : "text-light"}`
                }
                style={{ marginRight: "12px" }}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        
        <div className="d-flex align-items-center gap-3">
          <span
            className="badge rounded-pill"
            style={{
              background: "linear-gradient(90deg, #4ade80, #22d3ee)",
              color: "#0f172a",
              fontWeight: "600"
            }}
          >
            SA
          </span>
          <span className="small text-light">Super Admin</span>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={logout} 
            style={{ borderRadius: "8px", transition: "0.2s" }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
