import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ErrorMessage from "../../../components/ErrorMessage";
import axios from "axios";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import { useDispatch } from "react-redux";
import ImageUploader from "../../../components/ImageUploader";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title required"),
  description: Yup.string().required("description is required"),
  category: Yup.string().required("category is required"),
  projectLink: Yup.string().url().nullable(),
  githubLink: Yup.string().url().nullable(),
  images: Yup.array().min(1, "Select At-least one image").required(),
  studentName: Yup.string().required("student name is required"),
  universityName: Yup.string().required("university name is required"),
  keywords:Yup.array().min(1, "Select At-least one Keyword").required(),
});
const BASE_URL = import.meta.env.VITE_BASE_URL;

const KEYWORD = [
    { value: 'Reactjs', label: 'Reactjs' },
    { value: 'Nodejs', label: 'Nodejs' },
    { value: 'MERN', label: 'MERN' }
  ]

const PublishProject = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue, } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        category: "",
        projectLink: "",
        githubLink: "",
        images: [],
        studentName: "",
        universityName: "",
        keywords:[]
      },
      validationSchema: validationSchema,
      onSubmit: async (values, errors) => {
        console.log(values);
        console.log(errors);
        // try {
        //   const { message, data } = await createJob(values).unwrap();
        //   toast.success(message);
        //   setOpenModal();
        //   dispatch(createJobApi.util.invalidateTags(["createdJob"]));
        // } catch (err) {
        //   console.log(err);
        //   toast.error("Internal Server Error");
        // }
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

  const handleKeyword = (values) => {
    const keywordValues = values.map(item => item.value);
  setFieldValue("keywords", keywordValues);
  }

  return (
    
    <div className="">
      <div className="w-full ">
        <h1 className="text-center font-bold text-xl">Create Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              Project title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="Enter project title"
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
              project Description
            </label>

            <textarea
              name="description"
              id="description"
              className="w-full"
              rows="5"
              placeholder="Enter project Description"
              value={values.description}
              onChange={handleChange}
            ></textarea>
            {touched.description && errors.description ? (
              <ErrorMessage error={errors.description} />
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium"
            >
              Project Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="outline-none text-sm rounded-lg  block w-full p-2"
              placeholder="Enter project category"
              value={values.category}
              onChange={handleChange}
            />

            {touched.category && errors.category ? (
              <ErrorMessage error={errors.category} />
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="experience"
              className="block mb-2 text-sm font-medium"
            >
              Project keyword
            </label>
            <CreatableSelect isMulti onChange={handleKeyword} options={KEYWORD } name="keywords" id="keywords"/>
            {touched.keywords && errors.keywords ? (
              <ErrorMessage error={errors.keywords} />
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="projectLink"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Project Link
            </label>
            <input
              type="text"
              id="projectLink"
              name="projectLink"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Enter project live link"
              value={values.projectLink}
              onChange={handleChange}
            />
            {touched.projectLink && errors.projectLink ? (
              <ErrorMessage error={errors.projectLink} />
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="githubLink"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Github Link
            </label>
            <input
              type="text"
              id="githubLink"
              name="githubLink"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Enter project github link"
              value={values.githubLink}
              onChange={handleChange}
            />
            {touched.githubLink && errors.githubLink ? (
              <ErrorMessage error={errors.githubLink} />
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="images"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Project Images
            </label>
            <ImageUploader
              images={values.images}
              handleImageChange={handleImageChange}
              handleDeleteImage={handleDeleteImage}
            />
            {touched.images && <ErrorMessage error={errors.images} />}
          </div>

          <div className="mb-5">
            <label
              htmlFor="studentName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Enter Student Name"
              value={values.studentName}
              onChange={handleChange}
            />
            {touched.studentName && errors.studentName ? (
              <ErrorMessage error={errors.studentName} />
            ) : null}
          </div>

          <div className="mb-5">
            <label
              htmlFor="universityName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              University Name
            </label>
            <input
              type="text"
              id="universityName"
              name="universityName"
              className="outline-none text-gray-900 text-sm rounded-lg block w-full p-2"
              placeholder="Enter University Name"
              value={values.universityName}
              onChange={handleChange}
            />
            {touched.universityName && errors.universityName ? (
              <ErrorMessage error={errors.universityName} />
            ) : null}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-5"
          >
            {"isLoading" ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishProject;
