import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function Sign_Up() {
  const [loading, setLoading] = useState(false);
  const backendURL =
    import.meta.env.VITE_BACKEND_SERVICE_URL || "http://localhost:5000";

  let [type, setType] = useState({
    username: false,
    email: false,
    password: false,
  });


  let [errorMsg, setErrorMsg] = useState("");

  let validationSchema = yup.object({
    username: yup
      .string()
      .matches(
        /^[A-Z][A-Za-z0-9_\s]{7,29}$/,
        "Username must start with a capital letter and be in the range of 8 to 29 characters."
      )
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .matches(
        /^([0-9])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long."
      )
      .required("Password is required"),
  });

  const navigation = useNavigate();

  let formik = useFormik({
    initialValues: {
      username: "",  
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async function (values) {
      setLoading(true);
      try {
        let response = await axios.post(
          `${backendURL}/api/auth/signup`,
          values,
          {
            headers: {
              "Content-Type": "application/json",  
            },
          }
        );
        if (response.status === 200) {
          navigation("/log-in");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMsg("Email or Username already exists! Please try a different one.");
        } else if (error.response && error.response.data) {
          setErrorMsg(error.response.data.message || "An unexpected error occurred.");
        } else {
          setErrorMsg("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    },
  });
  

  function formSubmit(event) {
    event.preventDefault();
    formik.handleSubmit();
    setType({
      username: true,
      email: true,
      password: true,
    });
  }

  function inputChange(event) {
    setType({ ...type, [event.target.name]: true });
    formik.handleChange(event);
  }

  function isNotValid(value) {
    return formik.errors[value] && formik.touched[value] && type[value];
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-primaryGray">
      <form
        className="w-10/12 md:w-2/5 flex flex-col space-y-4 text-center bg-secondaryGray p-6 rounded-lg shadow-lg"
        onSubmit={formSubmit}
      >
        <h2 className="text-white text-2xl font-bold mb-4">Sign Up</h2>
        {isNotValid("username") && (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        )}
        <input
          type="text"
          placeholder="Your Full Name"
          name="username"
          onChange={inputChange}
          className="px-4 py-2 bg-gray-700 text-white outline-none rounded-lg border border-gray-600 focus:border-mainorange"
        />

        {isNotValid("password") && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
        <input
          type="password"
          placeholder="Create Password"
          name="password"
          onChange={inputChange}
          className="px-4 py-2 bg-gray-700 text-white outline-none rounded-lg border border-gray-600 focus:border-mainorange"
        />

        {isNotValid("email") && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={inputChange}
          className="px-4 py-2 bg-gray-700 text-white outline-none rounded-lg border border-gray-600 focus:border-mainorange"
        />

        <input
          type="submit"
          value={loading ? "Loading..." : "Sign Up"}
          className={`text-center py-2 bg-mainorange rounded-lg font-medium cursor-pointer ${
            loading ? "bg-orange-900 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        />

        {errorMsg && <p className="text-red-500 text-sm mt-3">{errorMsg}</p>}
      </form>
    </div>
  );
}
