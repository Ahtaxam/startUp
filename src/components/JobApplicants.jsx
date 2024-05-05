import { Button } from "flowbite-react";
import React from "react";

function JobApplicants({ applications }) {
  const handleDownloadResume = () => {
    
  };
  return (
    <div className="shadow-lg p-4">
      {applications.length === 0 && (
        <p className="font-inter text-red-600">No Application Received</p>
      )}
      {applications.map((obj) => {
        const {
          firstName,
          lastName,
          profileImage,
          email,
          universityName,
          resume,
        } = obj?.user;
        return (
          <>
            <div className="flex justify-between items-center">
              <p>
                <span className="font-bold"> Name:</span>{" "}
                {firstName + " " + lastName}
              </p>
              {profileImage && (
                <img src={profileImage} className="w-24 h-24  rounded-full" />
              )}
            </div>
            <p>
              <span className="font-bold"> Email:</span> {email}
            </p>

            <p className="mt-4">
              <span className="font-bold"> University Name:</span>{" "}
              {universityName}
            </p>
            <a href={resume} download={true} target="__blank">
              <Button className="mt-4" onClick={handleDownloadResume}>
                Resume
              </Button>
            </a>
          </>
        );
      })}
    </div>
  );
}

export default JobApplicants;
