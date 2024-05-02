import React, { useState } from 'react'
import { Header } from '../../../components/Header'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom';
import { CustomModal } from '../../../components/CustomModal';
import Publishproject from './publishProject';

function StudentHome() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <Header/>
      <CustomModal
        openModal={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
      >
        <Publishproject  />
      </CustomModal>
      <Button onClick={handleClick}>Publish Project</Button>
    </div>
  )
}

export default StudentHome