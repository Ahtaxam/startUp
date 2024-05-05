import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Avatar from "../../../assets/images/avatar.png";
import { getCurrentUser, storeCurrentUser } from "../../../utils/storeUser";
import { useUpdateProfileMutation } from "../../../redux/slices/UpdateProfile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/Path";
import { FaCamera } from "react-icons/fa";
import { Button } from "flowbite-react";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  // studentAbout:Yup.string().required("About is Required")
});

function UpdateStudentProfile() {
  const [cv, setCv] = useState(null);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const {
    firstName,
    lastName,
    profileImage,
    email,
    universityName,
    semester,
    cgpa,
    studentAbout,
    resume,
  } = user;
  const initialValues = {
    email,
    firstName,
    lastName,
    image: profileImage,
    universityName,
    semester,
    cgpa,
    studentAbout,
    // resume:null
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

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    // You can handle form submission here
    // e.stopPropagation()
    console.log(values);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("profileImage", values.image);
    formData.append("universityName", values.universityName);
    formData.append("semester", values.semester);
    formData.append("cgpa", values.cgpa);
    formData.append("studentAbout", values.studentAbout);
    formData.append("resume", cv);

    try {
      const { message, data } = await updateProfile(formData).unwrap();
      toast.success(message);
      storeCurrentUser({ ...user, ...data });
      navigate(PATH.STUDENTHOME);
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }

    // setSubmitting(false);
  };
  useEffect(() => {
    // Set previously selected resume file when component mounts
    if (resume) {
      setCv(resume);
    }
  }, [resume]);

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
                  htmlFor="universityName"
                  className="block text-sm font-medium text-gray-700"
                >
                  University Name
                </label>
                <Field
                  type="text"
                  name="universityName"
                  id="universityName"
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter university name"
                />
                <ErrorMessage
                  name="universityName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="semester"
                  className="block text-sm font-medium text-gray-700"
                >
                  Semester
                </label>
                <Field
                  type="number"
                  name="semester"
                  id="semester"
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter your Semester"
                />
                <ErrorMessage
                  name="semester"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cgpa"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cgpa
                </label>
                <Field
                  type="number"
                  name="cgpa"
                  id="cgpa"
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Enter your cgpa"
                />
                <ErrorMessage
                  name="cgpa"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="studentAbout"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <Field
                  type="text"
                  as="textarea"
                  name="studentAbout"
                  id="studentAbout"
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Describe Yourself"
                />
                <ErrorMessage
                  name="studentAbout"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="resume"
                  className="block text-lg font-medium text-gray-700"
                >
                  Resume
                  {resume && (
                    <Button
                      className="float-end bg-sky-600"
                      onClick={() => window.open(resume, "_blank")}
                    >
                      Preview Resume
                    </Button>
                  )}
                </label>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>

              <button
                type="submit"
                // disabled={isSubmitting}
                className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-4"
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

export default UpdateStudentProfile;
