import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ReusableForm = ({ initialValues, validationSchema, onSubmit, buttonText }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
            <Field type="text" name="firstName" id="firstName" className="form-input mt-1 block w-full" />
            <ErrorMessage name="firstName" component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
            <Field type="text" name="lastName" id="lastName" className="form-input mt-1 block w-full" />
            <ErrorMessage name="lastName" component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <Field type="email" name="email" id="email" className="form-input mt-1 block w-full" />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <Field type="password" name="password" id="password" className="form-input mt-1 block w-full" />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={isSubmitting}>
            {buttonText}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReusableForm;
