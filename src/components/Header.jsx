import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "../assets/icons/logo.svg";
import { getCurrentUser, logoutUser } from "../utils/storeUser";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../utils/Path";

const HEADER = [
  {
    label: "Home",
    studentPath: PATH.STUDENTHOME,
    softwareHouse: PATH.SOFTWAREHOUSEHOME,
  },
  {
    label: "Projects",
    studentPath: null,
    softwareHouse: PATH.PROJECTS,
  },
  {
    label: "Jobs",
    studentPath: PATH.JOBS,
    softwareHouse: null,
  },
];

export function Header() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { firstName, lastName, role, email, profileImage } = user;

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <Navbar fluid rounded className="shadow">
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={profileImage} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {" "}
              {firstName + " " + lastName}{" "}
            </span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item>
            {" "}
            <Link
              to={
                role === "Software house"
                  ? PATH.SOFTWAREHOUSEHOME
                  : PATH.STUDENTHOME
              }
            >
              {" "}
              Dashboard
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              to={
                role === "Student"
                  ? PATH.UPDATESTUDENTPROFILE
                  : PATH.UPDATESOFTWAREPROFILE
              }
            >
              Update Profile
            </Link>
          </Dropdown.Item>
          {role === "Student" && <Dropdown.Item><Link to={PATH.REVIEWS}>Reviews</Link></Dropdown.Item>}
          <Dropdown.Divider />
          <Dropdown.Item
            className="text-red-600 font-bold"
            onClick={handleLogout}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link
          to={role === "Student" ? PATH.STUDENTHOME : PATH.SOFTWAREHOUSEHOME}
          active
        >
          Home
        </Link>
        {role === "Student" ? (
          <>
          <Link to={PATH.JOBS}>Jobs</Link>
          <Link to={PATH.INVESTORS}> Investors</Link>
          </>
        ) : (
          <Link to={PATH.PROJECTS}>Projects</Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
