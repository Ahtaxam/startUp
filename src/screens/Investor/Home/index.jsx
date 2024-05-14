import React, { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/slices/Students";
import { Loader } from "../../../components/Loader";
import StudentCard from "../../../components/StudentCard";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/Path";
import { Header } from "../../../components/Header";

const [searchText, setSearchText] = useState("");

function InvestorHome() {
  const { data, isLoading } = useGetAllStudentsQuery();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const handleStudentDetails = (obj) => {
    navigate(`/studentDetail/${obj._id}`);
  };
  const handleSearchProject = (e) => {
    setSearchText(e.target.value);
  };
  const filteredUsers = data?.data.filter((user) =>
    user.Projects.some((project) =>
      project.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchText.toLowerCase())
      )
    )
  );

  return (
    <div>
      <Header />
      <p className="text-center m-4 text-3xl font-mono">Students</p>
      <div className="flex m-4">
        <input
          type="search"
          className="rounded-lg min-w-[400px]"
          placeholder="Search based on technology"
          value={searchText}
          onChange={handleSearchProject}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : user.status === "Pending" ? (
        <p className="text-center font-bold">
          Your Status is Pending. Can't perform any operation <br /> logout then
          came after break{" "}
        </p>
      ) : (
        <div className=" p-2 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 ]">
          {data?.data.map((obj) => (
            <StudentCard
              data={obj}
              onClick={() => handleStudentDetails(obj)}
              key={obj._id}
            ></StudentCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default InvestorHome;
