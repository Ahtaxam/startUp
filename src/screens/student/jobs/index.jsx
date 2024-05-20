import React, { useState } from "react";
import { useGetAllJobsQuery } from "../../../redux/slices/CreateJob";
import { Loader } from "../../../components/Loader";
import Card from "../../../components/Card";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";

function Jobs() {
  const [searchText, setSearchText] = useState("");
  // fetch all jobs from database
  const { data, isLoading } = useGetAllJobsQuery();
  const navigate = useNavigate();

  const handleCardClick = (obj) => {
    navigate(`/jobDetail/${obj.jobId}`);
  };
  const handleSearchJob = (e) => {
    setSearchText(e.target.value);
  };

  // filter jobs based on title
  const filteredJobs = data?.data.filter((job) =>
    job.title.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div>
      <Header />
      <p className="font-inter text-center text-2xl font-bold m-4">Jobs</p>

      {/* search bar */}
      <div className="flex m-4">
        <input
          type="search"
          className="rounded-lg min-w-[400px]"
          placeholder="Search Job"
          value={searchText}
          onChange={handleSearchJob}
        />
      </div>

      {/* render data on screens */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : filteredJobs && filteredJobs.length > 0 ? (
        <div className=" p-2 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 ]">
          {filteredJobs?.map((obj) => (
            <Card
              data={obj}
              key={obj._id}
              onClick={() => handleCardClick(obj)}
            />
          ))}
        </div>
      ) : (
        <p className="font-inter text-center text-lg">
          Sorry what you are looking for, not found
        </p>
      )}
    </div>
  );
}

export default Jobs;
