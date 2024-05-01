import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../utils/Path";
import { useFormik } from "formik";
import ErrorMessage from "../../components/ErrorMessage";
import ImageUploader from "../../components/ImageUploader";
import { useSoftwareHouseCompleteProfileMutation } from "../../redux/slices/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { storeCurrentUser } from "../../utils/storeUser";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email required"),
  companyName: Yup.string().required("companyName is required"),
  ownerName: Yup.string().required("ownerName is required"),
  address: Yup.string().required("Address is required"),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required(),
  images: Yup.array().min(1, "Select At-least one image").required(),
});
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SoftwareHouseProfile = () => {
  const [softwareHouseProfile, { isLoading }] =
    useSoftwareHouseCompleteProfileMutation();

  const [selectedRole, setSelectedRole] = useState(0);
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues: {
        email: "",
        companyName: "",
        ownerName: "",
        address: "",
        phoneNo: "",
        images: [],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("companyName", values.companyName);
        formData.append("ownerName", values.ownerName);
        formData.append("address", values.address);
        formData.append("phoneNo", values.phoneNo);
        values.images.forEach((image, index) => {
          formData.append(`companyProfile${index}`, image);
        });
        try {
          let result = await fetch(`${BASE_URL}profile/software`, {
            method: "POST",

            body: formData,
          });
          result = await result.json();
          const { message, data, status, token } = result;
          // console.log(data, status, token);
          if (status === 400) {
            toast.error(message);
            return;
          }
          storeCurrentUser({ ...data, token });
          if (data?.role === "Software house") {
            navigate(PATH.SOFTWAREHOUSEHOME);
          }
          toast.success(message);
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.message);
        }
      },
    });

  const handleImageChange = (e) => {
    console.log(e);
    if (e.target.files) {
      setFieldValue("images", [
        ...values.images,
        ...Array.from(e.target.files),
      ]);
    }
  };

  const handleDeleteImage = (id) => {
    const images = values.images.filter((_, i) => i !== id);
    setFieldValue("images", images);
  };

  return (
    <div className="flex h-[100vh] overflow-y-auto px-4 ">
      <div className="w-full ">
        <h1 className="text-center font-bold text-xl">Complete Profile</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="youremail@gmail.com"
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email ? (
              <ErrorMessage error={errors.email} />
            ) : null}
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="Enter your company name"
              value={values.companyName}
              onChange={handleChange}
            />
            {touched.companyName && errors.companyName ? (
              <ErrorMessage error={errors.companyName} />
            ) : null}
          </div>

          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium">
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="Enter your last name"
              value={values.ownerName}
              onChange={handleChange}
            />
            {touched.ownerName && errors.ownerName ? (
              <ErrorMessage error={errors.ownerName} />
            ) : null}
          </div>
          <div class="mb-5">
            <label for="address" class="block mb-2 text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="youremail@gmail.com"
              value={values.address}
              onChange={handleChange}
            />
            {touched.address && errors.address ? (
              <ErrorMessage error={errors.address} />
            ) : null}
          </div>
          <div class="mb-5">
            <label
              for="phoneNo"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              class="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="*****"
              value={values.phoneNo}
              onChange={handleChange}
            />
            {touched.phoneNo && errors.phoneNo ? (
              <ErrorMessage error={errors.phoneNo} />
            ) : null}
          </div>

          <div class="mb-5">
            <label
              for="images"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Upload Images
            </label>
            <ImageUploader
              images={values.images}
              handleImageChange={handleImageChange}
              handleDeleteImage={handleDeleteImage}
            />
            {touched.images && <ErrorMessage error={errors.images} />}
          </div>
          {/* <input type="file" onChange={(e) => console.log(e)}/> */}

          <button
            type="submit"
            class="text-white bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-5"
          >
            {isLoading ? "updating..." : "update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SoftwareHouseProfile;
