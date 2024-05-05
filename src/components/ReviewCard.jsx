import React from "react";
import { Rating } from "react-simple-star-rating";

function ReviewCard({ data, onClick }) {
  const { _id, companyName, address, rating } = data;
  return (
    <div className="bg-white shadow-lg p-4 w-full flex flex-col gap-4 cursor-pointer h-[100%] rounded-xl border border-[#1611401A] ">
      <p className="font-inter">
        {" "}
        <span className="font-bold">Name:</span> {companyName}
      </p>
      <p className="font-inter mt-2">
        <span className="font-bold">Address:</span> {address}{" "}
      </p>
      <div>
        <p className="font-bold font-inter">Rating</p>
        <Rating
          onClick={(rate) => onClick(_id, rate)}
          SVGstyle={{ display: "inline" }}
          initialValue={1}
        />
      </div>
    </div>
  );
}

export default ReviewCard;
