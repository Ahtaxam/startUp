import React from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/Path';
import { useFormik } from 'formik';
import ErrorMessage from '../../components/ErrorMessage';
import { useLoginUserMutation } from '../../redux/slices/Auth';
import { toast } from 'react-toastify';
import { storeCurrentUser } from '../../utils/storeUser';

// validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

// puwejigecu@mailinator.com
const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,

    // when click submit button api call
    onSubmit: async (values) => {
      try {
        const result = await loginUser(values).unwrap();
        const { message, token, data } = result;
        toast.success(message);
        storeCurrentUser({ ...data, token });
        if (data?.role === 'Student') {
          navigate(PATH.STUDENTHOME);
          return;
        }
        if (data?.role === 'Software house') {
          navigate(PATH.SOFTWAREHOUSEHOME);
          return;
        }
        if (data?.role === 'Investor') {
          navigate(PATH.INVESTORHOME);
          return;
        }
        storeCurrentUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          profileImage: data.profileImage,
        });
      } catch (err) {
        toast.error(err.data.message);
      }
    },
  });

  return (
    <div className='h-[100vh] flex justify-center items-center overflow-y-auto px-4'>
      <div className=' p-4 rounded flex h-full flex-col justify-center flex-1 space-y-4 md:space-y-6'>
        <h1 className='text-center font-bold text-xl'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label for='email' className='block mb-2 text-sm font-medium'>
              Your email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='outline-none text-sm rounded-lg  block w-full p-2'
              placeholder='youremail@gmail.com'
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email ? (
              <ErrorMessage error={errors.email} />
            ) : null}
          </div>
          <div className='mb-5'>
            <label
              for='password'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Your password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='outline-none text-gray-900 text-sm rounded-lg block w-full p-2'
              placeholder='*****'
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password ? (
              <ErrorMessage error={errors.password} />
            ) : null}
          </div>

          <button
            type='submit'
            className='text-white bg-blue-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center '
          >
            {isLoading ? 'Logging...' : 'Login'}
          </button>
        </form>
        <p className='text-right mt-2'>
          Don't have an Account?{' '}
          <Link to={PATH.SIGNUP} className='underline'>
            signup
          </Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default Login;
