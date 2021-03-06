import React, { useState } from "react";
import { API_ROOT } from "../../apiRoot";

const RequestForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { email: email };

    fetch(`${API_ROOT}/api/forgot_password`, {
      headers: { "Content-Type": "application/json" },
      method: "post",
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setMessage({
            status: data.status,
            message: data.message,
          });
        }
      });
  }

  const apiErrorMessage = () => {
    if (message.status === 500 || message.status === 422) {
      return (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <span className="block sm:inline">
            <p>{message.message}</p>
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button
              className="absolute bg-transparent text-2xl leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
              onClick={() => setMessage({})}
            >
              <span>x</span>
            </button>
          </span>
        </div>
      );
    }
  };

  const apiSuccessMessage = () => {
    if (message.status === 200) {
      return (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <span className="block sm:inline">
            <p>{message.message}</p>
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <button
              className="absolute bg-transparent text-2xl leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
              onClick={() => setMessage({})}
            >
              <span>x</span>
            </button>
          </span>
        </div>
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <button
            type="submit"
            className="
            px-6
            py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out"
          >
            Submit
          </button>
          {apiErrorMessage()}
          {apiSuccessMessage()}
        </form>
      </div>
    </div>
  );
};

export default RequestForgotPassword;
