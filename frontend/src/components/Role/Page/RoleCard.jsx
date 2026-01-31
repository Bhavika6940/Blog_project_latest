import { useNavigate } from "react-router-dom";

const RoleCard = ({ role, onSelectEdit }) => {
  const navigate = useNavigate();

  const openPermissions = () => {
    navigate(`/roles/${role.id}/permissions`);
  };

  return (
  <div
    className="h-100"
    style={{
      background: "rgba(30, 41, 59, 0.9)",
      backdropFilter: "blur(8px)",
      borderRadius: "1rem",
      padding: "1.75rem",
      boxShadow: "0 15px 30px rgba(0,0,0,0.35)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow =
        "0 20px 40px rgba(0,0,0,0.45)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow =
        "0 15px 30px rgba(0,0,0,0.35)";
    }}
  >
    
    <div className="mb-3">
      <h5 className="fw-bold mb-1" style={{ color: "#facc15" }}>
        {role.name}
      </h5>
      <p
        className="mb-0"
        style={{
          color: "#e5e7eb",
          fontSize: "0.95rem",
          lineHeight: "1.6",
        }}
      >
        {role.description || "No description provided for this role."}
      </p>
    </div>

    
    <div
      style={{
        height: "1px",
        backgroundColor: "#334155",
        margin: "1rem 0",
      }}
    />

    
    <div className="d-flex gap-2">
      <button
        className="btn btn-sm fw-bold flex-grow-1"
        style={{
          backgroundColor: "#facc15",
          color: "#020617",
          borderRadius: "0.5rem",
        }}
        data-bs-toggle="modal"
        data-bs-target="#createRoleModal"
        onClick={() => onSelectEdit(role)}
      >
        Edit
      </button>

      <button
        className="btn btn-sm fw-bold flex-grow-1"
        style={{
          backgroundColor: "#38bdf8",
          color: "#020617",
          borderRadius: "0.5rem",
        }}
        onClick={openPermissions}
      >
        Permissions
      </button>
    </div>
  </div>
);

};

export default RoleCard;
