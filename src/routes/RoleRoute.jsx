import React from "react";
import { Navigate } from "react-router-dom";
import { userRole } from "../utils/userRole";

function RoleRoute({ children, role }) {
  const user = userRole();
  return (
    <>
      {user === role ? (
        children
      ) : (
        <Navigate
          to={`${
            user === "Software house"
          } ? "/softwarehouse/home": "student/home"`}
        />
      )}
    </>
  );
}

export default RoleRoute;
