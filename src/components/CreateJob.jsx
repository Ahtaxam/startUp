import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../utils/Path";
import { useFormik } from "formik";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { toast } from "react-toastify";
import { createJobApi, useCreateJobMutation } from "../redux/slices/CreateJob";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title required"),
  description: Yup.string().required("description is required"),
  type: Yup.string().required("type is required"),
  experience: Yup.number().min(1).required("experience is required"),
  salary: Yup.string().required("salary is required"),
  companyName: Yup.string().required("company name is required"),
  address: Yup.string().required("Address is required"),
  date: Yup.date()
    .min(new Date(), "Date must be in the future")
    .required("Date is required")
    .test({
      name: "greaterThanToday",
      exclusive: true,
      message: "Date must be greater than today",
      test: function (value) {
        const today = new Date();
        return value > today;
      },
    }),
});
const BASE_URL = import.meta.env.VITE_BASE_URL;

const JOBType = ["Full-Time", "Part-Time", "Internship", "Contract"]

const CreateJob = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleSubmit,  touched, setFieldValue } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        type: JOBType[0],
        experience: 0,
        salary: "",
        date: "",
        address: "",
        companyName: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          const { message, data } = await createJob(values).unwrap();
          toast.success(message);
          setOpenModal();
          dispatch(createJobApi.util.invalidateTags(["createdJob"]));
        } catch (err) {
          console.log(err);
          toast.error("Internal Server Error");
        }
      },
    });

  return (
    <div className="">
      <div className="w-full ">
        <h1 className="text-center font-bold text-xl">Create Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              Job title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="Enter job title"
              value={values.title}
              onChange={handleChange}
            />
            {touched.title && errors.title ? (
              <ErrorMessage error={errors.title} />
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium"
            >
              Job Description
            </label>

            <textarea
              name="description"
              id="description"
              className="w-full"
              rows="10"
              placeholder="Enter job Description"
              value={values.description}
              onChange={handleChange}
            ></textarea>
            {touched.description && errors.description ? (
              <ErrorMessage error={errors.description} />
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="job type"
              className="block mb-2 text-sm font-medium"
            >
              Job type
            </label>
            <select
              className="w-full"
              name="type"
              onChange={handleChange}
              value={values.type}
            >
              {/* <option disabled selected>Select any value</option>
              <option value="Full-Time"> Full Time</option>
              <option value="Part-Time"> Part Time</option>
              <option value="Contract"> Contract</option>
              <option value="Internship">Internship</option> */}
              {
                JOBType.map((type) => (
                  <option value={type}>{type}</option>
                ))
              }
            </select>
            {touched.ownerName && errors.ownerName ? (
              <ErrorMessage error={errors.ownerName} />
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="experience"
              className="block mb-2 text-sm font-medium"
            >
              Experience level
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              value={values.experience}
              onChange={handleChange}
            />
            {touched.experience && errors.experience ? (
              <ErrorMessage error={errors.experience} />
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="salary"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Enter salary range"
              value={values.salary}
              onChange={handleChange}
            />
            {touched.salary && errors.salary ? (
              <ErrorMessage error={errors.salary} />
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="companyName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Enter company name"
              value={values.companyName}
              onChange={handleChange}
            />
            {touched.companyName && errors.companyName ? (
              <ErrorMessage error={errors.companyName} />
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Enter Address"
              value={values.address}
              onChange={handleChange}
            />
            {touched.address && errors.address ? (
              <ErrorMessage error={errors.address} />
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Application deadline
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              value={values.date}
              onChange={handleChange}
            />
            {touched.date && errors.date ? (
              <ErrorMessage error={errors.date} />
            ) : null}
          </div>

          <button
            type="submit"
            // onClick={() => handleSubmitValues(values)}
            className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-5"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
