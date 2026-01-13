import { useNavigate } from "react-router-dom";

const RoleCard = ({ role, onSelectEdit }) => {
  const navigate = useNavigate();

  const openPermissions = () => {
    navigate(`/roles/${role.id}/permissions`);
  };

  return (
    <div className="col-12">
      <div
        className="card shadow-lg rounded-4 h-100 d-flex flex-column p-3"
        style={{ backgroundColor: "#1e293b", minHeight: "180px", transition: "transform 0.2s" }}
      >
        {/* Role Info */}
        <div className="mb-3">
          <h5 className="fw-bold text-white mb-1">{role.name}</h5>
          <p className="text-light small mb-0" style={{ lineHeight: "1.5" }}>
            {role.description || "No description"}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-auto d-flex gap-2">
          <button
            className="btn btn-warning btn-sm fw-bold flex-grow-1"
            data-bs-toggle="modal"
            data-bs-target="#createRoleModal"
            onClick={() => {
              onSelectEdit(role);
              const modal = new bootstrap.Modal(
                document.getElementById("createRoleModal")
              );
              modal.show();
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-info btn-sm fw-bold flex-grow-1"
            onClick={openPermissions}
          >
            Permissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
