import React, { useState } from "react";
import { useSendEmailMutation } from "../redux/slices/SendEmail";
import { getCurrentUser } from "../utils/storeUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../utils/Path";

function HireMessage({ student, Cancel }) {
  const [sendEmail, { isLoading }] = useSendEmailMutation();
  const [message, setMessage] = useState("");
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { email, companyName, phoneNo, address } = user;
  const handleSendOffer = async () => {
    try {
      const result = await sendEmail({
        email,
        student,
        message,
        companyName,
        address,
        phoneNo,
      }).unwrap();
      console.log(result);
      toast.success("offer sent successfully");
      navigate(PATH.PROJECTS)
      Cancel()
    } catch (err) {
      console.log(err);
      toast.error("server errro")
    }
  };
  return (
    <div>
      <textarea
        placeholder="Please write your message"
        className="w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="flex justify-center">
        <button
          className="border bg-[#00215E] p-2 rounded text-white w-[150px]"
          onClick={handleSendOffer}
        >
          {isLoading ? "Sending..." : "Send Offer"}
        </button>
      </div>
    </div>
  );
}

export default HireMessage;
