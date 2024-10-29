import React, { useState } from 'react';
import './Signup.css';
import { mixed, object, string } from 'yup';
import axios from 'axios';
import { Slide, toast, Zoom } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: null,
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const validateData = async () => {
    const validationSchema = object({
      userName: string().min(3).max(20).required(),
      email: string().email().required(),
      password: string().min(3).max(20).required(),
      image: mixed().required(),
    });

    try {
      await validationSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log('Validation error', error.errors);
      setLoader(false);
      setErrors(error.errors);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const isValid = await validateData();

    if (!isValid) {
      console.log('Form validation failed');
      return;
    }

    const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', user.image);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}auth/signup`, formData);
      console.log(data);
      setUser({
        userName: '',
        email: '',
        password: '',
        image: null,
      });

      if (data.message === 'success') {
        toast.success('Done, now sign in please', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Slide,
        });
        navigate('/Signin');
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error(error.response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Zoom,
        });
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Register</h2>
            <h4 className="text-center mb-3">Welcome, sign up here</h4>
            <p className="text-center">
              Already have an account?{' '}
              <Link to={'/Signin'}>
                <button type="button" className="btn btn-outline-secondary">
                  Login
                </button>
              </Link>
            </p>

            {errors.length > 0 &&
              errors.map((error, index) => (
                <p key={index} className="text-danger">
                  {error}
                </p>
              ))}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User Name
                </label>
                <input
                  id="userName"
                  className="form-control"
                  type="text"
                  name="userName"
                  value={user.userName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Profile Image
                </label>
                <input
                  id="image"
                  className="form-control"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-outline-success" disabled={loader}>
                  {!loader ? 'Register' : 'Please wait...'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
