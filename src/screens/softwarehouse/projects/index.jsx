// import React, { useState } from "react";
// import { Header } from "../../../components/Header";
// import { useGetAllPublishedprojectsQuery } from "../../../redux/slices/PublishProjects";
// import { Loader } from "../../../components/Loader";
// import ProjectCard from "../../../components/ProjectCard";
// import { useNavigate } from "react-router-dom";

// function PublishedProjects() {
//   const [searchText, setSearchText] = useState("");
//   const { data, isLoading } = useGetAllPublishedprojectsQuery();
//   const navigate = useNavigate();

//   const handleProjectDetail = (obj) => {
//     navigate(`/projectDetail/${obj.projectId}`);
//   };

//   const handleSearchProject = (e) => {
//     setSearchText(e.target.value);
//     const filteredProjects = data?.data.filter((obj) =>
//       obj.keywords.some((keyword) =>
//         keyword.toLowerCase().includes(e.target.value.toLowerCase())
//       )
//     );

//     console.log(filteredProjects);
//   };
//   return (
//     <div>
//       <Header />
//       <p className="font-inter font-bold text-4xl text-center m-4">
//         Student Projects
//       </p>
//       <div className="flex m-4">
//         <input
//           type="search"
//           className="rounded-lg min-w-[400px]"
//           placeholder="Search based on technology"
//           value={searchText}
//           onChange={handleSearchProject}
//         />
//       </div>
//       {isLoading ? (
//         <div className="flex justify-center items-center">
//           <Loader />
//         </div>
//       ) : (
//         <div className=" p-2 grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2 ]">
//           {data?.data.map((obj) => (
//             <ProjectCard
//               data={obj}
//               onClick={() => handleProjectDetail(obj)}
//               key={obj._id}
//             ></ProjectCard>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PublishedProjects;

import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { useGetAllPublishedprojectsQuery } from "../../../redux/slices/PublishProjects";
import { Loader } from "../../../components/Loader";
import ProjectCard from "../../../components/ProjectCard";
import { useNavigate } from "react-router-dom";

function PublishedProjects() {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useGetAllPublishedprojectsQuery();
  const navigate = useNavigate();

  const handleProjectDetail = (obj) => {
    navigate(`/projectDetail/${obj.projectId}`);
  };

  const handleSearchProject = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProjects = data?.data.filter((obj) =>
    obj.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchText.toLowerCase())
    )
  );
  console.log(filteredProjects);

  return (
    <div>
      <Header />
      <p className="font-inter font-bold text-4xl text-center m-4">
        Student Projects
      </p>
      <div className="flex m-4">
        <input
          type="search"
          className="rounded-lg min-w-[400px]"
          placeholder="Search based on technology"
          value={searchText}
          onChange={handleSearchProject}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
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
