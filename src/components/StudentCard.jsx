import React from "react";

function StudentCard({ data, onClick }) {
  const { firstName, lastName, universityName, profileImage } = data;
  return (
    <div
      className="bg-white shadow-lg p-4 w-full flex flex-col gap-4 cursor-pointer h-[100%] rounded-xl border  "
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <p className="font-inter">
          <span className="font-bold">Name:</span> {firstName + " " + lastName}{" "}
        </p>
        <img src={profileImage} className="w-12 h-12 rounded-full" />
      </div>
      <p className="font-inter">
        <span className="font-bold">University Name: </span>
        {universityName}
      </p>
    </div>
  );
}

export default StudentCard;
