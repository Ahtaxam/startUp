import React from 'react'
import { useGetAllStudentsQuery } from '../../../redux/slices/Students'
import { Loader } from '../../../components/Loader';
import StudentCard from '../../../components/StudentCard';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../utils/Path';

function InvestorHome() {
    const {data, isLoading} = useGetAllStudentsQuery();
    const navigate = useNavigate();
    const handleStudentDetails = (obj) => {
       navigate(`/studentDetail/${obj._id}`)
    }
    
  return (
    <div>
        <p className='text-center m-4 text-3xl font-mono'>Students</p>
        {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" p-2 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 ]">
          {data?.data.map((obj) => (
            <StudentCard data={obj} onClick={() => handleStudentDetails(obj)} key={obj._id}></StudentCard>
          ))}
        </div>
      )}
    </div>
  )
}

export default InvestorHome