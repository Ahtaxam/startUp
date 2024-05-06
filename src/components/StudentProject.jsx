import React from "react";

function StudentProject({project}) {
  return (
    <div>
      <div key={project._id} className="border-2 p-4 mb-4 rounded-lg">
        <p className="font-inter font-bold mb-2">{project.title}</p>
        <p className="mb-4">{project.description}</p>
        <hr />
        <div className="flex flex-wrap">
          {project.keywords.map((keyword) => (
            <p key={keyword} className="m-4">
              {keyword}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentProject;
