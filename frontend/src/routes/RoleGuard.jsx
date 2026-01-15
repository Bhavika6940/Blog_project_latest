import { Navigate } from "react-router-dom";
import {getUser}  from "../utils/authUtils";

const RoleGuard = ({children, allowedRoles}) => {
    const user = getUser();
    const role = user?.role;

    if(!user){
        return <Navigate to = "/" replace />;   
    }

    if(!allowedRoles.includes(role)){
        return <Navigate to = "/dashboard" replace />;  
    }
    return children;

}

export default RoleGuard;