import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createJobApi,
  useDeleteJobMutation,
  useGetSingleJobQuery,
} from "../redux/slices/CreateJob";
import { CustomModal } from "./CustomModal";
import DeleteWarning from "./DeleteWarning";
import { toast } from "react-toastify";
import { PATH } from "../utils/Path";
import { useDispatch } from "react-redux";

function Jobdetail() {
  const [seeMore, setSeeMore] = useState(true);
  const [open, setOpen] = useState();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleJobQuery(id);
  const [deleteJob, { isLoading: loading }] = useDeleteJobMutation();
  const {
    title = "",
    description = "",
    date = "",
    experience = 0,
    salary = "",
    type = "",
    address,
    companyName,
  } = data?.data?.[0] || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    setOpen(true);
  };
  const handleDeleteJob = async () => {
    try {
      const { message } = await deleteJob(id).unwrap();
      toast.success(message);
      dispatch(createJobApi.util.invalidateTags(["createdJob"]))
      navigate(PATH.SOFTWAREHOUSEHOME);
    } catch (err) {
      toast.error("Server Error");
    }
    setOpen(false);
  };
  return (
    <>
      <CustomModal openModal={open} setOpenModal={() => setOpen(!open)}>
        <DeleteWarning
          handleDelete={handleDeleteJob}
          Cancel={() => setOpen(!open)}
        />
      </CustomModal>
      <div className="shadow-lg bg-white flex flex-col  p-4 my-4 mx-auto w-[94%] sm:w-[80%] rounded-lg ">
        <div className="flex justify-between">
          <p className=" font-bold font-inter  m-4 text-4xl">Job Detail</p>
          <button
            className="border bg-red-600 w-[150px] text-white rounded m-4 p-2"
            onClick={handleDeleteButton}
          >
            Delete Job
          </button>
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
            <p className="font-bold">Expiry date</p>
            {date}
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobdetail;
