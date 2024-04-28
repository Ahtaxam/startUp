import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import { PATH } from "../utils/Path";
import Login from "../screens/Auth/Login";
import AuthLayout from "../screens/Auth/Layout";
import Signup from "../screens/Auth/Signup";
import SoftwareHouseProfile from "../screens/Profile/Software";

function AppRoute() {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path={PATH.HOME} />
        <Route
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
          path={PATH.LOGIN}
        />

        <Route
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
          path={PATH.SIGNUP}
        />

        <Route
          element={
            <AuthLayout>
              <SoftwareHouseProfile />
            </AuthLayout>
          }
          path={PATH.SOFTWAREHOUSE}
        />
      </Routes>
    </div>
  );
}

export default AppRoute;
