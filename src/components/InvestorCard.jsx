import { Button } from "flowbite-react";
import React from "react";

function InvestorCard({ data, onClick }) {
  const { firstName, lastName, email } = data;
  return (
    <div className="shadow rounded-lg p-4">
      <p className="font-inter">
        <span className="font-bold">Name: </span>
        {firstName} {lastName}
      </p>

      <p className="font-inter mt-4">
        <span className="font-bold">Email: </span>
        {email}
      </p>
      <Button className="mt-4" onClick={onClick}>Request Funding</Button>
    </div>
  );
}

export default InvestorCard;
