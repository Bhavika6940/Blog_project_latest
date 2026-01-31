import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PermissionCard from "./PermissionCard";
import axiosInstance from "../../../utils/authUtils";
import Swal from "sweetalert2";

const Permissions = () => {
  const { roleId } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    try {
      const roleResponse = await axiosInstance.get(`/api/role/${roleId}`);
      setRole(roleResponse.data.data);

      const response = await axiosInstance.get("/api/permission/");
      const allPermissions = response.data.data;

      const rolePermsRes = await axiosInstance.get(`/api/rolePermission/role/${roleId}`);
      const rolePermissions = rolePermsRes.data.data;

      const permsWithDefault = allPermissions.map(p => {
        const rolePerm = rolePermissions.find(rp => rp.permissionId === (p.permissionId ?? p.id));
        return {
          ...p,
          permissionId: p.permissionId ?? p.id,
          canRead: rolePerm ? rolePerm.canRead : false,
          canWrite: rolePerm ? rolePerm.canWrite : false,
          canDelete: rolePerm ? rolePerm.canDelete : false,
        };
      });

      setPermissions(permsWithDefault);
    } catch (err) {
      console.error("Error fetching permissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [roleId]);

  const togglePermission = (index, field) => {
    setPermissions(prev =>
      prev.map((p, i) => (i === index ? { ...p, [field]: !p[field] } : p))
    );
  };

  const savePermissions = async () => {
    try {
      const payload = permissions.map(({ permissionId, canRead, canWrite, canDelete }) => ({
        permissionId,
        canRead,
        canWrite,
        canDelete
      }));

      await axiosInstance.put(`/api/rolePermission/${roleId}`, payload);
       Swal.fire({
                  title: "Success!",
                  text: "Permissions updated successfully!",       
                  icon: "success",     
                  confirmButtonText: "OK",
                  confirmButtonColor: "#4CAF50" 
                  });
      
      
    } catch (err) {
      console.error("Error saving permissions:", err);
      Swal.fire({
              title: "Error!",
              text: "Failed to save permissions!",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#e74c3c", 
            })
      
    }
  };

  if (loading) {
    return <div className="text-center mt-5 text-white">Loading permissions...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        color: "white",
      }}
    >
     

      <div className="container px-5 py-5">

        {/* Header */}
        <div className="text-center mb-5">
          <h2
            className="fw-bold display-5 text-white mb-2"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
          >
            Assign Permissions
          </h2>
          <p className="fw-semibold text-light fs-6" style={{ maxWidth: "700px", margin: "0 auto", textAlign: "justify" }}>
            Configure access for the role <span className="fw-bold text-warning">{role?.name}</span>. 
            Enable or disable permissions to control what users assigned to this role can read, write, or delete.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "2px",
            backgroundColor: "#334155",
            marginBottom: "50px",
            borderRadius: "2px"
          }}
        />

        {/* Permission Cards */}
        <div className="row g-3 justify-content-center">
          {permissions.map((permission, index) => (
            <PermissionCard
              key={`${permission.permissionId}-${permission.resource}`}
              permission={permission}
              index={index}
              onToggle={togglePermission}
            />
          ))}
        </div>


        {/* Save Button */}
        <div className="text-center mt-5">
          <button
            className="btn btn-warning fw-bold px-4 py-2"
            style={{
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              borderRadius: "8px",
              fontSize: "1rem"
            }}
            onClick={savePermissions}
          >
            Save Permissions
          </button>
        </div>

      </div>
    </div>
  );
};

export default Permissions;
