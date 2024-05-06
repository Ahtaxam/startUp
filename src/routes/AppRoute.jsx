import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import { PATH } from "../utils/Path";
import Login from "../screens/Auth/Login";
import AuthLayout from "../screens/Auth/Layout";
import Signup from "../screens/Auth/Signup";
import SoftwareHouseProfile from "../screens/Profile/Software";
import SoftwareHouseHome from "../screens/softwarehouse/home";
import RootLayout from "../screens";
import Jobdetail from "../components/Jobdetail";
import UpdateSoftwareProfile from "../screens/updateprofile/softwarehouse";
import UpdateStudentProfile from "../screens/updateprofile/students";
import { userRole } from "../utils/userRole";
import RoleRoute from "./RoleRoute";
import StudentHome from "../screens/student/home";
import ProjectDetail from "../components/ProjectDetail";
import PublishedProjects from "../screens/softwarehouse/projects";
import Jobs from "../screens/student/jobs";
import Reviews from "../screens/Reviews";
import InvestorHome from "../screens/Investor/Home";

function AppRoute() {
  const userrole = userRole();
  console.log(userrole);
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

        <Route element={<SoftwareHouseHome />} path={PATH.SOFTWAREHOUSEHOME} />
        <Route element={<Jobdetail />} path={PATH.JOBDETAIL} />
        <Route element={<PublishedProjects />} path={PATH.PROJECTS} />

        <Route
          element={
            <RoleRoute role="Software house">
              <UpdateSoftwareProfile></UpdateSoftwareProfile>{" "}
            </RoleRoute>
          }
          path={PATH.UPDATESOFTWAREPROFILE}
        />
        <Route
          element={
            <RoleRoute role="Student">
              <UpdateStudentProfile></UpdateStudentProfile>{" "}
            </RoleRoute>
          }
          path={PATH.UPDATESTUDENTPROFILE}
        />

        <Route element={<StudentHome />} path={PATH.STUDENTHOME} />
        <Route element={<ProjectDetail />} path={PATH.PROJECTDETAIL} />
        <Route element={<Jobs />} path={PATH.JOBS} />

        <Route element={<Reviews />} path={PATH.REVIEWS} />



        <Route element={<InvestorHome/>} path={PATH.INVESTORHOME} />
      </Routes>
    </div>
  );
}

export default AppRoute;
