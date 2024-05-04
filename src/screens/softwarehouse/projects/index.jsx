import React from 'react'
import { Header } from '../../../components/Header'
import { useGetAllPublishedprojectsQuery } from '../../../redux/slices/PublishProjects'
import { Loader } from '../../../components/Loader';
import ProjectCard from '../../../components/ProjectCard';
import { useNavigate } from 'react-router-dom';

function PublishedProjects() {
    const {data, isLoading} = useGetAllPublishedprojectsQuery();
    console.log(data);
    const navigate = useNavigate();

    const handleProjectDetail = (obj) => {
      navigate(`/projectDetail/${obj.projectId}`)
    }
  return (
    <div>
        <Header/>
        <p className='font-inter font-bold text-4xl text-center m-4'>Student Projects</p>
        {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" p-2 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 ]">
          {data?.data.map((obj) => (
            <ProjectCard data={obj} onClick={() => handleProjectDetail(obj)}></ProjectCard>
          ))}
        </div>
      )}
    </div>
  )
}

export default PublishedProjects