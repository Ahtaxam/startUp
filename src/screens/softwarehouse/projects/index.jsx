import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { useGetAllPublishedprojectsQuery } from "../../../redux/slices/PublishProjects";
import { Loader } from "../../../components/Loader";
import ProjectCard from "../../../components/ProjectCard";
import { useNavigate } from "react-router-dom";

function PublishedProjects() {
  const [searchText, setSearchText] = useState("");

  // get app projects of students
  const { data, isLoading } = useGetAllPublishedprojectsQuery();

  const navigate = useNavigate();

  const handleProjectDetail = (obj) => {
    navigate(`/projectDetail/${obj.projectId}`);
  };

  // handle search state
  const handleSearchProject = (e) => {
    setSearchText(e.target.value);
  };

  // filter project based on tech stack
  const filteredProjects = data?.data.filter((obj) =>
    obj.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchText.toLowerCase())
    )
  );


  return (
    <div>
      <Header />
      <p className="font-inter font-bold text-4xl text-center m-4">
        Student Projects
      </p>

      {/* serach bar fro projects */}
      <div className="flex m-4">
        <input
          type="search"
          className="rounded-lg min-w-[400px]"
          placeholder="Search based on technology"
          value={searchText}
          onChange={handleSearchProject}
        />
      </div>
      {/* if loading show loader */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
        // show projects
      ) : filteredProjects && filteredProjects.length > 0 ? (
        <>
          <div className=" p-2 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 ]">
            {filteredProjects.map((obj) => (
              <ProjectCard
                data={obj}
                onClick={() => handleProjectDetail(obj)}
                key={obj._id}
              ></ProjectCard>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center font-inter text-lg">
          Looks like we're sailing in the land of unicorns - no projects found!
        </p>
      )}
    </div>
  );
}

export default PublishedProjects;
