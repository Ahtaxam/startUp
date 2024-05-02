import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCamera } from "react-icons/fa";

import Avatar from "../../../assets/images/avatar.png";
import { getCurrentUser, storeCurrentUser } from "../../../utils/storeUser";
import { useUpdateProfileMutation } from "../../../redux/slices/UpdateProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PATH } from "../../../utils/Path";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  address: Yup.string().required("Address is required"),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required(),
});

function UpdateSoftwareProfile() {
  const user = getCurrentUser();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation ();
  const navigate = useNavigate();
  

  const { email, firstName, lastName, profileImage, phoneNo, address } = user;
  const initialValues = {
    email,
    firstName,
    lastName,
    image: profileImage,
    phoneNo,
    address,
  };

  const [selectedImage, setProfileImage] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setFieldValue("image", file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    // You can handle form submission here
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("profileImage", values.image);
    formData.append("phoneNo", values.phoneNo);
    formData.append("address", values.address);

    try {
      const { message, data } = await updateProfile(formData).unwrap();
      toast.success(message);
      storeCurrentUser({ ...user, ...data });
      navigate(PATH.SOFTWAREHOUSEHOME);
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
                    src={selectedImage ? selectedImage : profileImage}
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
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phoneNo"
                  id="phoneNo"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <ErrorMessage
                  name="phoneNo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <Field
                  type="text"
                  name="address"
                  id="address"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <ErrorMessage
                  name="address"
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

export default UpdateSoftwareProfile;
