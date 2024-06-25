import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigation } from "react-router-dom";
import { PATH } from "../../utils/Path";
import { useFormik } from "formik";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../redux/slices/Auth";
import { toast } from "react-toastify";
import AvatarLogo from "../../assets/images/avatar.png";
import axios from "axios";
import { storeCurrentUser } from "../../utils/storeUser";

// signup validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const ROLE = ["Student", "Investor", "Software house"];
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [selectedRole, setSelectedRole] = useState(0);
  const [profileImage, setProfileImage] = useState(null); // State to hold the selected profile image

  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // send data to server
        const result = await createUser({
          ...values,
          role: ROLE[selectedRole],
        }).unwrap();

        const { message, data, token } = result;
        toast.success(message);

        // store current user
        storeCurrentUser({ ...data, token });

        // if software house complete profile route
        if (data.role === "Software house") {
          navigate(PATH.SOFTWAREHOUSE);
          return;
        }

        // redirect to login
        navigate(PATH.LOGIN);
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    },
  });

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProfileImage(imageFile);
  };

  return (
    <section className="flex h-[100vh] overflow-y-auto px-4 py-2 ">
      <div className=" w-full">
        <h1 className="text-center font-bold text-xl">Signup</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className="flex justify-center items-center">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)} // Create a URL for the selected image
                alt="Profile Preview"
                className="mt-2 rounded-full w-16 h-16 object-cover "
              />
            ) : (
              <img src={AvatarLogo} className="w-16 h-16" />
            )}
          </div> */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="Enter your first name"
              value={values.firstName}
              onChange={handleChange}
            />
            {touched.firstName && errors.firstName ? (
              <ErrorMessage error={errors.firstName} />
            ) : null}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="Enter your last name"
              value={values.lastName}
              onChange={handleChange}
            />
            {touched.lastName && errors.lastName ? (
              <ErrorMessage error={errors.lastName} />
            ) : null}
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
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
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="*****"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password ? (
              <ErrorMessage error={errors.password} />
            ) : null}
          </div>

          {/* <div className="mb-5">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Profile Pic
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              onChange={handleImageChange}
            />
          </div> */}

          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Role
            </label>
            <div className="flex justify-between">
              {ROLE.map((role, index) => (
                <button
                  key={index} // Don't forget to add a unique key when mapping over an array
                  onClick={() => setSelectedRole(index)}
                  type="button"
                  className={`p-2 border border-1 ${
                    index === selectedRole ? "border-[#00215E]" : ""
                  } rounded-lg`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* signup button */}
          <button
            type="submit"
            className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
          >
            {isLoading ? "loading..." : "Signup"}
          </button>
        </form>
        <p className="text-right mt-2">
          Already have an account?{" "}
          <Link to={PATH.LOGIN} className="underline">
            login
          </Link>{" "}
        </p>
      </div>
    </section>
  );
};

export default Signup;
