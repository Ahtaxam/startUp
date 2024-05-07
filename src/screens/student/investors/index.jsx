import React, { useState } from "react";
import { useGetAllInvestorsQuery } from "../../../redux/slices/Investor";
import { Header } from "../../../components/Header";
import { Loader } from "../../../components/Loader";
import InvestorCard from "../../../components/InvestorCard";
import { getCurrentUser } from "../../../utils/storeUser";
import { CustomModal } from "../../../components/CustomModal";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { useSendInvestorEmailMutation } from "../../../redux/slices/SendEmail";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/Path";

function Investors() {
  const [studentMessage, setStudentMessage] = useState("");
  const navigate = useNavigate();
  const [investorEmail, setInvestorEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const user = getCurrentUser();
  const { data, isLoading } = useGetAllInvestorsQuery();
  const [sendFundingRequest, { isLoading: loading }] =
    useSendInvestorEmailMutation();
  const handleFundingRequest = (obj) => {
    setOpenModal(true);
    setInvestorEmail(obj.email);
  };

  const handleSendMessage = async () => {
    if (studentMessage === "") {
      toast.error("Please write your message");
      return;
    }
    try {
      const result = await sendFundingRequest({
        sender: user.email,
        receiver: investorEmail,
        subject: "Funding request",
        message: studentMessage,
      }).unwrap();
      toast.success(result.message);
      setStudentMessage("");
      setOpenModal(!openModal);
    } catch (error) {
      console.log(error);
      toast.error("server error");
    }
  };
  return (
    <div>
      <>
        <CustomModal
          openModal={openModal}
          setOpenModal={() => setOpenModal(!openModal)}
        >
          <p className="font-inter text-center font-bold mb-2">
            Send Your Message
          </p>
          <textarea
            className="w-full mb-2"
            value={studentMessage}
            onChange={(e) => setStudentMessage(e.target.value)}
            placeholder="Write message"
          ></textarea>

          <Button color="success" onClick={handleSendMessage}>
            {loading ? "Sending..." : " Send Message"}
          </Button>
        </CustomModal>
        <Header />
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className=" p-2 grid grid-cols-1 sm:grid-cols-3  gap-4 mt-2 ]">
            {data?.data.map((obj, i) => (
              <InvestorCard
                data={obj}
                key={i}
                onClick={() => handleFundingRequest(obj)}
              />
            ))}
          </div>
        )}
      </>
    </div>
  );
}

export default Investors;
