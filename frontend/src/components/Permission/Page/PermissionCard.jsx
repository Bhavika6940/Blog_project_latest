const PermissionCard = ({ permission, index, onToggle }) => {
  const toggle = (field) => {
    onToggle(index, field);
  };

  const checkboxColor = "#071831"; 

  return (
    <div className="col-sm-6 col-md-4">
      <div
        className="card h-100"
        style={{
          backgroundColor: "#334155",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        
        <div>
          <h6
            className="fw-bold mb-2"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
          >
            {permission.name}
          </h6>

          
          <p
            className="small mb-3"
            style={{ color: "#cbd5e1", lineHeight: "1.4", minHeight: "40px" }}
          >
            {permission.description || "No description available"}
          </p>
        </div>

        
        <div className="d-flex gap-3 justify-content-between mt-2">
          {["canRead", "canWrite", "canDelete"].map((field) => (
            <label
              key={field}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: "600",
                color: "#fff", 
                gap: "4px",
                fontSize: "0.9rem"
              }}
            >
              <input
                type="checkbox"
                checked={!!permission[field]}
                onChange={() => toggle(field)}
                style={{
                  accentColor: checkboxColor,
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  transition: "transform 0.1s ease"
                }}
              />
              {field.replace("can", "")}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionCard;
