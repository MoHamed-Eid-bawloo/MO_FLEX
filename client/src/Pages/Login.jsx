import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useTmdbAPI } from "../Store/API";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { setIsLogin, isLogin } = useTmdbAPI();
  const backendURL =
    import.meta.env.VITE_BACKEND_SERVICE_URL || "http://localhost:5000";

  let [type, setType] = useState({
    email: false,
    password: false,
  });

  let [errorMsg, setErrorMsg] = useState("");

  let validationSchema = yup.object({
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
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async function (values) {
      setLoading(true);
      try {
        let response = await axios.post(
          `${backendURL}/api/auth/login`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          localStorage.setItem("UserData", JSON.stringify(response.data));
          localStorage.setItem("noToken", true);
          setIsLogin(true);
          navigation("/");
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMsg(
            "Email or Username is not exist! Please try a different one."
          );
        } else if (error.response && error.response.data) {
          setErrorMsg(
            error.response.data.message || "An unexpected error occurred."
          );
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
        <h2 className="text-white text-2xl font-bold mb-4">Login</h2>

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
        {isNotValid("password") && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={inputChange}
          className="px-4 py-2 bg-gray-700 text-white outline-none rounded-lg border border-gray-600 focus:border-mainorange"
        />
        <input
          type="submit"
          value={loading ? "Loading..." : "Login"}
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
