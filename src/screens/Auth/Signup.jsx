import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigation } from "react-router-dom";
import { PATH } from "../../utils/Path";
import { useFormik } from "formik";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../redux/slices/Auth";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const ROLE = ["Student", "Investor", "Software house"];

const Signup = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [selectedRole, setSelectedRole] = useState(0);
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
      // if (ROLE[selectedRole] === "Software house") {
      //   navigate(PATH.SOFTWAREHOUSE);
      // }

      try {
        const { message, data } = await createUser({
          ...values,
          role: ROLE[selectedRole],
        }).unwrap();
        toast.success(message);
        if (data.role === "Software house") {
          navigate(PATH.SOFTWAREHOUSE);
        }
      } catch (err) {
        toast.error(err.data.message);
      }
    },
  });

  const handleRole = (role) => {
    setSelectedRole(role);
  };

  return (
    <section className="flex h-[100vh] overflow-y-auto px-4 py-2 ">
      <div className=" w-full">
        <h1 className="text-center font-bold text-xl">Signup</h1>
        <form onSubmit={handleSubmit}>
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
