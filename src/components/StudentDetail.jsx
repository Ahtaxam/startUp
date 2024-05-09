import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStudentProjectsQuery } from "../redux/slices/Students";
import { Button } from "flowbite-react";
import StudentProject from "./StudentProject";
import { CustomModal } from "./CustomModal";
import { useSendInvestorEmailMutation } from "../redux/slices/SendEmail";
import { toast } from "react-toastify";
import { getCurrentUser } from "../utils/storeUser";
import { PATH } from "../utils/Path";
import { Loader } from "./Loader";
import Avatar from "../assets/images/avatar.png";

function StudentDetail() {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const { data, isLoading: loading } = useGetStudentProjectsQuery(id);
  const [sendInvestorEmail, { isLoading }] = useSendInvestorEmailMutation();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    universityName,
    Projects = [],
    profileImage,
    email,
    studentAbout,
  } = data?.data[0] || {};

  const handleSendMessageToStudent = async () => {
    if (message === "") {
      toast.error("message can not be empty");
      return;
    }
    try {
      const result = await sendInvestorEmail({
        sender: user.email,
        receiver: email,
        subject: "Startup Discussion Opportunity",
        message,
      }).unwrap();
      toast.success(result.message);
      navigate(PATH.INVESTORHOME);
    } catch (error) {
      console.log(error);
      toast.error("server error");
    }
  };
  return (
    <>
      <CustomModal
        openModal={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
      >
        <div>
          <p className="font-inter text-center mb-2 font-bold">
            Send your message
          </p>
          <textarea
            className="w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="flex justify-center m-2">
            <Button onClick={handleSendMessageToStudent}>
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </div>
      </CustomModal>
      <p className="text-center text-2xl font-bold font-inter m-4">
        Student Detail
      </p>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-start m-4 gap-5">
            <div className=" flex flex-col items-center gap-4  border-2 rounded-lg p-4 max-w-[400px] ">
              <img
                src={profileImage || Avatar}
                className="w-[200px] h-[200px] rounded-full"
              />
              <p className="font-inter">
                {firstName} {lastName} || {universityName}
              </p>
              <p className="font-inter"> {studentAbout} </p>

              <p>{email}</p>
            </div>
            <div className="flex-1">
              {Projects.map((project, i) => (
                <StudentProject project={project} key={i} />
              ))}
            </div>
          </div>

          {Projects.length > 0 && (
            <div className="flex justify-center">
              <Button onClick={() => setOpenModal(true)}>
                Initiate Discussion
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default StudentDetail;
