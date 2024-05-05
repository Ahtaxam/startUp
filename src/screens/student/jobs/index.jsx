import React from "react";
import { useGetAllJobsQuery } from "../../../redux/slices/CreateJob";
import { Loader } from "../../../components/Loader";
import Card from "../../../components/Card";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header";

function Jobs() {
  const { data, isLoading } = useGetAllJobsQuery();
  const navigate = useNavigate();
  

  const handleCardClick = (obj) => {
    navigate(`/jobDetail/${obj.jobId}`);
  };
  return (
    <div>
        <Header/>
      <p className="font-inter text-center text-2xl font-bold m-4">Jobs</p>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" p-2 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 ]">
          {data?.data.map((obj) => (
            <Card
              data={obj}
              key={obj._id}
              onClick={() => handleCardClick(obj)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
