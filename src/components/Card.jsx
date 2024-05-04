import { Badge } from "flowbite-react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function Card({ data, onClick }) {
  const {
    title,
    description,
    date,
    type,
    experience,
    salary,
    address,
    companyName,
    hasApplied
  } = data;
  return (
    <div
      className="bg-white shadow-lg p-4 w-full flex flex-col gap-4 cursor-pointer h-[100%] rounded-xl border border-[#1611401A] "
      onClick={onClick}
    >
      {hasApplied && <Badge color="purple" className="w-fit p-2">Applied</Badge>}
      <div className="flex justify-between">
        <div>
          <p className="font-bold">Title</p>
          <p className="font-inter">{title}</p>
        </div>

        <div>
          <p className="font-bold">Type</p>
          <p className="font-inter">{type}</p>
        </div>
      </div>

      <div>
        <p className="font-bold">Description</p>
        <p className="font-inter">
          {description.slice(0, 100)}
          {description.length > 100 && "....."}
        </p>
      </div>

      <div>
        <p className="font-bold">Address</p>
        <p className="font-inter">{address}</p>
      </div>

      <div>
        <p className="font-bold">Company Name</p>
        <p className="font-inter">{companyName}</p>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="font-bold">Experience</p>
          <p className="font-inter">
            {experience} {experience > 1 ? "years" : "year"}{" "}
          </p>
        </div>

        <div>
          <p className="font-bold">Salary</p>
          <p className="font-inter">{salary}</p>
        </div>

        <div>
          <p className="font-bold">Expiry date</p>
          {date}
        </div>
      </div>
    </div>
  );
}

export default Card;
