import React from "react";

function ProjectCard({ data }) {
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
    <div className="bg-white shadow-lg p-4 w-full flex flex-col gap-4 cursor-pointer h-[100%] rounded-xl border border-[#1611401A] ">
        <div className="flex justify-between">
      <div>
        <p className="font-inter font-extrabold">Title</p>
        <p className="font-inter  text-xl">{title}</p>
      </div>
      <div>
        {/* <p className="font-inter font-extrabold">Category</p>
        <p className="font-inter  text-xl">{category}</p> */}
      </div>
      </div>
      <div>
        <p className="font-inter">Description</p>
        <p className="font-inter">{description.slice(0, 100)}....</p>
      </div>
    </div>
  );
}

export default ProjectCard;
