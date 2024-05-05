import React, { useState } from "react";
import { useGetAllSoftwareHousesQuery } from "../../redux/slices/SoftwareHouse";
import { Loader } from "../../components/Loader";
import ReviewCard from "../../components/ReviewCard";
import { Rating } from "react-simple-star-rating";
import { usePostRewiewMutation } from "../../redux/slices/Reviews";
import { getCurrentUser } from "../../utils/storeUser";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createJobApi } from "../../redux/slices/CreateJob";

function Reviews() {
  const [postReview] = usePostRewiewMutation();
  const [rating, setRating] = useState(0);
  const { data, isLoading } = useGetAllSoftwareHousesQuery();
  const user = getCurrentUser();
  const dispatch = useDispatch();

  const handleRating = async (companyId, rate) => {
    try {
      const { message } = await postReview({
        company: companyId,
        givenBy: user._id,
        rating: rate,
      }).unwrap();
      toast.success(message);
      dispatch(createJobApi.util.invalidateTags(["createdJob"]))
    } catch (error) {
      console.log(error);
      toast.error("server error");
    }
  };
  return (
    <div>
      <p className="text-center m-4 font-bold text-3xl">Submit your Reviews</p>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" p-2 grid grid-cols-1 sm:grid-cols-4  gap-4 mt-2 ]">
          {data?.data.map((obj) => (
            <ReviewCard data={obj} onClick={handleRating} key={obj._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
