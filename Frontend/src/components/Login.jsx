import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login() {


  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();


  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/admin/signin",
        inputs
      );

      if (data.message === "Admin successfully logged in") {
        toast.success("Successfully Logged In");
        localStorage.setItem("token", data.token);
        console.log(data.token)
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 410 &&
        error.response.data.error === "Email doesn't exist"
      ) {
        toast.error("Please provide a correct email");
      } else if (
        error.response &&
        error.response.status === 411 &&
        error.response.data.error === "unvalid password"
      ) {
        toast.error("Please provide a correct password");
      } else {
        console.log(error);
      }
    }
  };



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-red-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Admin Dashboard
        </p>
      </div>
    </div>
  )
}

export default Login
