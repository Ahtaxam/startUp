import React from "react";

function ProjectCard({ data, onClick }) {

  // destructure project properties
  const {
    title,
    description,
    category,
    keywords,
    images,
    studentName,
    universityName,
    projectLink,
    githubLink,
  } = data || {};
  return (
    <div
      className="bg-white shadow-lg p-4 w-full flex flex-col gap-4 cursor-pointer h-[100%] rounded-xl border border-[#1611401A] "
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div>
          <p className="font-inter font-bold">Title</p>
          <p className="font-inter  text-lg">{title}</p>
        </div>
        <div>
          <p className="font-inter font-bold">Category</p>
          <p className="font-inter  text-lg">{category}</p>
        </div>
      </div>
      <div>
        <p className="font-inter font-bold">Description</p>
        <p className="font-inter text-lg">{description.slice(0, 100)}....</p>
      </div>
    </div>
  );
}

export default ProjectCard;
