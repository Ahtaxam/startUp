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
import {
  publishProjectApi,
  usePublishProjectsMutation,
} from "../../../redux/slices/PublishProjects";
import { getToken } from "../../../utils/storeUser";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";

// validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("title required"),
  description: Yup.string().required("description is required"),
  category: Yup.string().required("category is required"),
  projectLink: Yup.string().url().nullable(),
  githubLink: Yup.string().url().nullable(),
  images: Yup.array().min(1, "Select At-least one image").required(),
  // studentName: Yup.string().required("student name is required"),
  // universityName: Yup.string().required("university name is required"),
  keywords: Yup.array().min(1, "Select At-least one Keyword").required(),
});
const BASE_URL = import.meta.env.VITE_BASE_URL;

const KEYWORD = [
  { value: "Reactjs", label: "Reactjs" },
  { value: "Nodejs", label: "Nodejs" },
  { value: "MERN", label: "MERN" },
];

const PublishProject = ({ setOpenModal }) => {
  const [publishProject, { isLoading }] = usePublishProjectsMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = getToken();

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        category: "",
        projectLink: "",
        githubLink: "",
        images: [],
        keywords: [],
      },
      validationSchema: validationSchema,
      onSubmit: async (values, errors) => {
        setLoading(true);
        const {
          title,
          description,
          category,
          projectLink,
          githubLink,
          keywords,
        } = values;
        let images = [];

        try {
          for (const image of values.images) {
            const imageUrl = await uploadImageToCloudinary(image);
            images.push(imageUrl?.url);
          }

          const { message, data } = await publishProject({
            title,
            description,
            category,
            projectLink,
            githubLink,
            keywords,
            images,
          }).unwrap();

          toast.success(message);
          dispatch(publishProjectApi.util.invalidateTags(["publishProject"]));
          setLoading(false);
          setOpenModal();
        } catch (err) {
          setLoading(false);
          console.log(err);
          toast.error(err.response.data.message);
        }
      },
    });

  const handleImageChange = (e) => {
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
    const keywordValues = values.map((item) => item.value);
    setFieldValue("keywords", keywordValues);
  };

  return (
    <div className="">
      <div className="w-full ">
        <h1 className="text-center font-bold text-xl">Publish Project</h1>
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
              Project Description
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
            <CreatableSelect
              isMulti
              onChange={handleKeyword}
              options={KEYWORD}
              name="keywords"
              id="keywords"
            />
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

          <button
            type="submit"
            className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-5"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishProject;
