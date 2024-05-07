import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { CustomModal } from "./CustomModal";
import DeleteWarning from "./DeleteWarning";
import { toast } from "react-toastify";
import { PATH } from "../utils/Path";
import { useDispatch } from "react-redux";
import { useGetSingleProjectQuery } from "../redux/slices/PublishProjects";
import { userRole } from "../utils/userRole";
import HireMessage from "./HireMessage";
import { Loader } from "./Loader";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function ProjectDetail() {
  const role = userRole();
  const [seeMore, setSeeMore] = useState(true);
  const [open, setOpen] = useState();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProjectQuery(id);
  //   const [deleteJob, { isLoading: loading }] = use();
  const {
    title = "",
    description = "",
    category = "",
    keywords = [],
    images = [],
    projectLink = "",
    githubLink = "",
    universityName = "",
    studentName = "",
    createdBy = {},
  } = data?.data?.[0] || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    setOpen(true);
  };
  const handleDeleteJob = async () => {
    // try {
    //   const { message } = await deleteJob(id).unwrap();
    //   toast.success(message);
    //   dispatch(createJobApi.util.invalidateTags(["createdJob"]))
    //   navigate(PATH.SOFTWAREHOUSEHOME);
    // } catch (err) {
    //   toast.error("Server Error");
    // }
    // setOpen(false);
  };
  const handleHireStudent = () => {
    setOpen(true);
  };
  return (
    <>
      <CustomModal openModal={open} setOpenModal={() => setOpen(!open)}>
        <HireMessage student={createdBy.email} Cancel={() => setOpen(!open)} />
      </CustomModal>
      <p className=" font-bold font-inter text-center m-4 text-4xl">
        Project Detail
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center m-4">
          <Loader />
        </div>
      ) : (
        <>
          <div className="shadow-lg bg-white flex flex-col  p-4 my-4 mx-auto w-[94%] sm:w-[80%] rounded-lg ">
            <div className="flex justify-between">
              {role === "Software house" && (
                <button
                  className="border bg-[#00215E] w-[150px] text-white rounded m-4 p-2"
                  onClick={handleHireStudent}
                >
                  Approved
                </button>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-bold">Title</p>
                <p className="font-inter">{title}</p>
              </div>

              <div>
                <p className="font-bold">Category</p>
                <p className="font-inter">{category}</p>
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
              <p className="font-bold mb-2">Technologies</p>
              {keywords.map((words) => (
                <span className="font-inter mr-3  border border-sky-800 rounded-lg p-2">
                  {" "}
                  {words}
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <div className="mt-4">
                <p className="font-bold">Student Name</p>
                <p className="font-inter">
                  {createdBy.firstName + " " + createdBy.lastName}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-bold">Student Email</p>
                <p className="font-inter">{createdBy.email}</p>
              </div>

              <div className="mt-4">
                <p className="font-bold">University Name</p>
                <p className="font-inter">{createdBy.universityName}</p>
              </div>
            </div>

            {githubLink && (
              <div className="mt-4">
                <p className="font-bold">Github Link</p>
                <p className="font-inter">{githubLink}</p>
              </div>
            )}

            {projectLink && (
              <div className="mt-4">
                <p className="font-bold">Project Link</p>
                <p className="font-inter">{projectLink}</p>
              </div>
            )}
            <div className="mt-4">
              <p className="font-bold">Project Images</p>
              <Carousel responsive={responsive}>
                {images.map((image) => (
                  <img
                    src={image}
                    alt="image"
                    className="w-[300px] h-[300px] object-fill"
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectDetail;
