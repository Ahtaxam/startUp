import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCamera } from "react-icons/fa";

import { getCurrentUser, storeCurrentUser } from "../../../utils/storeUser";
import { useUpdateProfileMutation } from "../../../redux/slices/UpdateProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PATH } from "../../../utils/Path";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  email: Yup.string().email("invalid email").required("email is required"),
});

function UpdateInvestorProfile() {
  const user = getCurrentUser();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const { email, firstName, lastName, profileImage } = user;
  const initialValues = {
    email,
    firstName,
    lastName,
    image: profileImage,
  };

  const [selectedImage, setProfileImage] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setProfileImage(file);
    setFieldValue("image", file);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const { firstName, lastName, email } = values;

    const result = await uploadImageToCloudinary(selectedImage);
    try {
      const { message, data } = await updateProfile({
        firstName,
        lastName,
        email,
        profileImage: result?.url,
      }).unwrap();

      toast.success(message);
      storeCurrentUser({ ...user, ...data });
      navigate(PATH.INVESTORHOME);
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto h-[100vh] my-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center mt-4">
        Update Profile
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Form>
              <div className="mb-4 flex items-center justify-center">
                <label htmlFor="image" className="cursor-pointer">
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : profileImage
                    }
                    alt=""
                    className="w-20 h-20 rounded-full border border-gray-400"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                    />
                    <FaCamera className="absolute cursor-pointer right-3 -top-6" />
                  </div>
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter first name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter last name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  readOnly
                  className="mt-1 p-2 border rounded-md w-full bg-[#F5F5F5]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                // disabled={isSubmitting}
                className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default UpdateInvestorProfile;
