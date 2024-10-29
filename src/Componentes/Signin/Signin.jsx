import React, { useContext, useState } from 'react';
import { mixed, object, string } from 'yup';
import axios from 'axios';
import { Slide, toast, Zoom } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import './Signin.css';

export default function Signin() {
  const { setUserToken } = useContext(UserContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const validateData = async () => {
    const validationSchema = object({
      email: string().email().required(),
      password: string().min(3).max(20).required(),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const isValid = await validateData();

    if (!isValid) {
      console.log("Form validation failed");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}auth/signin`, {
        email: user.email,
        password: user.password,
      });
      setUser({
        email: '',
        password: '',
      });

      if (data.message === 'success') {
        toast.success('Log in Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Login</h2>

            {errors.length > 0 &&
              errors.map((error, index) => (
                <p key={index} className="text-danger">
                  {error}
                </p>
              ))}

            <form onSubmit={handleSubmit} className='formSignin'>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 text-center">
                <Link to={'/ForgetPassword'}>
                  <button type="button" className="btn btn-light">
                    Forgot Password?
                  </button>
                </Link>
              </div>

              <div className="d-grid mb-2">
                <button type='submit' className='btn btn-outline-success' disabled={loader}>
                  {!loader ? 'Log in' : 'Wait...'}
                </button>
              </div>

              <div className="d-grid mb-2 w-100 p-0 btnu">
                <Link to={'/Signup'}> 
                  <button type="button" className="btn btn-outline-info w-100" disabled={loader}>
                    {!loader ? "Doesn't have an account? Sign up" : 'Wait...'}
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
