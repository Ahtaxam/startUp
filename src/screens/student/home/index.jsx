import React, { useState } from "react";
import { Header } from "../../../components/Header";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "../../../components/CustomModal";
import Publishproject from "./publishProject";
import { useGetPublishProjectsQuery } from "../../../redux/slices/PublishProjects";
import { Loader } from "../../../components/Loader";
import ProjectCard from "../../../components/ProjectCard";
import { PATH } from "../../../utils/Path";

function StudentHome() {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = useGetPublishProjectsQuery();
  const navigate = useNavigate();
  const handleClick = () => {
    setOpenModal(true);
  };
  const handleProjectDetail = (obj) => {
    navigate(`/projectDetail/${obj.projectId}`)
  }
  return (
    <div>
      <Header />
      <CustomModal
        openModal={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
      >
        <Publishproject setOpenModal={() => setOpenModal(!openModal)} />
      </CustomModal>
      <Button onClick={handleClick}>Publish Project</Button>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" p-2 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 ]">
          {data?.data.map((obj) => (
            <ProjectCard data={obj} onClick={() => handleProjectDetail(obj)} key={obj._id}></ProjectCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentHome;
