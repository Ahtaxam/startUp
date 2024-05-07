import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createJobApi,
  useApplyjobMutation,
  useDeleteJobMutation,
  useGetSingleJobQuery,
} from "../redux/slices/CreateJob";
import { CustomModal } from "./CustomModal";
import DeleteWarning from "./DeleteWarning";
import { toast } from "react-toastify";
import { PATH } from "../utils/Path";
import { useDispatch } from "react-redux";
import { userRole } from "../utils/userRole";
import { getCurrentUser } from "../utils/storeUser";
import JobApplicants from "./JobApplicants";
import { Loader } from "./Loader";

function Jobdetail() {
  const [seeMore, setSeeMore] = useState(true);
  const role = userRole();
  const user = getCurrentUser();
  const [open, setOpen] = useState();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleJobQuery(id);
  const [deleteJob, { isLoading: loading }] = useDeleteJobMutation();
  const [applyJob, { isLoading: applyLoading }] = useApplyjobMutation();
  const {
    _id = "",
    title = "",
    description = "",
    date = "",
    experience = 0,
    salary = "",
    type = "",
    address,
    companyName,
    applications = [],
  } = data?.data?.[0] || {};
  console.log(data?.data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    setOpen(true);
  };
  const handleDeleteJob = async () => {
    try {
      const { message } = await deleteJob(id).unwrap();
      toast.success(message);
      dispatch(createJobApi.util.invalidateTags(["createdJob"]));
      navigate(PATH.SOFTWAREHOUSEHOME);
    } catch (err) {
      toast.error("Server Error");
    }
    setOpen(false);
  };
  const handleApplyJob = async () => {
    try {
      const { message } = await applyJob({
        userId: user._id,
        jobId: _id,
      }).unwrap();
      dispatch(createJobApi.util.invalidateTags(["createdJob"]));
      navigate(PATH.JOBS);

      toast.success(message);
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
    }
  };
  return (
    <>
      <CustomModal openModal={open} setOpenModal={() => setOpen(!open)}>
        <DeleteWarning
          handleDelete={handleDeleteJob}
          Cancel={() => setOpen(!open)}
        />
      </CustomModal>
      {isLoading ? (
        <div className="flex justify-center items-center m-4">
          <Loader />
        </div>
      ) : (
        <>
          <p className=" font-bold font-inter text-center m-4 text-4xl">
            Job Detail
          </p>

          <div className="shadow-lg bg-white flex flex-col  p-4 my-4 mx-auto w-[94%] sm:w-[80%] rounded-lg ">
            <div className="flex justify-end">
              {role === "Software house" ? (
                <button
                  className="border bg-red-600 w-[150px] text-white rounded m-4 p-2"
                  onClick={handleDeleteButton}
                >
                  Delete Job
                </button>
              ) : (
                <button
                  className="border bg-[#00215E] w-[150px] text-white  float-end rounded m-4 p-2"
                  onClick={handleApplyJob}
                >
                  {applyLoading ? "Applying..." : "Apply"}
                </button>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-bold">Title</p>
                <p className="font-inter">{title}</p>
              </div>

              <div>
                <p className="font-bold">Type</p>
                <p className="font-inter">{type}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-bold">Description</p>
              <p className="font-inter">
                {seeMore ? description.slice(0, 150) + "....." : description}
                <button
                  className=" p-1 -lg text-[#00215E]"
                  onClick={() => setSeeMore(!seeMore)}
                >
                  {" "}
                  {seeMore ? "see more" : "see less"}{" "}
                </button>
              </p>
            </div>

            <div className="mt-4">
              <p className="font-bold">Address</p>
              <p className="font-inter">{address}</p>
            </div>

            <div className="mt-4">
              <p className="font-bold">Company Name</p>
              <p className="font-inter">{companyName}</p>
            </div>

            <div className="flex justify-between mt-4">
              <div>
                <p className="font-bold">Experience</p>
                <p className="font-inter">
                  {experience} {experience > 1 ? "years" : "year"}{" "}
                </p>
              </div>

              <div>
                <p className="font-bold">Salary</p>
                <p className="font-inter">{salary}</p>
              </div>

              <div>
                <p className="font-bold">Deadline</p>
                {date}
              </div>
            </div>
          </div>

          {role === "Software house" && (
            <>
              {" "}
              <p className="text-center font-inter font-bold text-2xl m-4 underline">
                Applicants
              </p>
              <div className=" p-4 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2  ">
                <JobApplicants applications={applications} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Jobdetail;
