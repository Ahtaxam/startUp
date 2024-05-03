import React, { useState } from "react";
import { Header } from "../../../components/Header";
import Button from "../../../components/Button";
import { CustomModal } from "../../../components/CustomModal";
import CreateJob from "../../../components/CreateJob";
import { useGetCreatedJobQuery } from "../../../redux/slices/CreateJob";
import Card from "../../../components/Card";
import { Loader } from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/Path";

function SoftwareHouseHome() {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, error } = useGetCreatedJobQuery();
  const navigate = useNavigate();
  const handleClick = () => {
    setOpenModal(true);
  };

  const handleCardClick = (obj) => {
    navigate(`/jobDetail/${obj.jobId}`);
  };
  return (
    <div>
      <Header />
      <CustomModal
        openModal={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
      >
        <CreateJob setOpenModal={() => setOpenModal(false)} />
      </CustomModal>
      <Button onClick={handleClick}>Create Job</Button>
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

export default SoftwareHouseHome;
