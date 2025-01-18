import React, { useState, useEffect, useRef } from "react";
import { useTmdbAPI } from "../Store/API";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { userData, setIsLogin, setUserData } = useTmdbAPI();
  const [currentUser, setCurrentUser] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const imageRef = useRef();
  const navigate = useNavigate();
  const backendURL ="https://mo-flex-mohamed-eids-projects-a6eeb72b.vercel.app"


  const [type, setType] = useState({
    username: false,
    email: false,
    password: false,
  });

  const validationSchema = yup.object({
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
      .matches(/^.{6,}$/, "Password must be at least 8 characters long.")
      .required("Password is required"),
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await convertToBase64(file);

    setUserData({ ...userData, avatar: base64Image });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${backendURL}/api/user/update/${userData._id}`,
          { ...userData, ...values },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setSuccessMsg("Profile updated successfully ✅");
          localStorage.setItem("UserData", JSON.stringify(response.data));
          setErrorMsg("");
          setUserData(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMsg(
            "Email or Username already exists! Please try a different one."
          );
        } else {
          setErrorMsg("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setCurrentUser(userData);
  }, [userData]);

  const handleLogOut = () => {
    localStorage.removeItem("UserData");
    localStorage.removeItem("noToken");
    setIsLogin(false);
    navigate("/log-in");
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `${backendURL}/api/user/delete/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.clear();
        setIsLogin(false);
        navigate("/sign-up");
      }
    } catch (error) {
      console.error(
        "Error deleting account:",
        error.response?.data || error.message
      );
    }
  };

  const inputChange = (event) => {
    setType({ ...type, [event.target.name]: true });
    formik.handleChange(event);
  };

  const isNotValid = (value) =>
    formik.errors[value] && formik.touched[value] && type[value];

  return (
    <div className="w-full h-full flex justify-center items-center mt-10">
      <div className="w-10/12 space-y-2 md:w-2/5">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col space-y-2"
        >
          <div className="w-full h-auto flex flex-col items-center justify-center">
            <img
              src={userData?.avatar || currentUser?.avatar}
              alt="profile picture"
              className="h-[100px] w-[100px] rounded-full mb-5"
            />
            <p className="text-lightGray2 text-2xl font-semibold uppercase">
              {userData?.username}
            </p>
            <button
            disabled
              type="button"
              className="rounded-full bg-mainorange text-black font-semibold text-sm px-3 py-1 mt-2"
              onClick={() => imageRef.current.click()}
            >
              Change Photo
            </button>
            <input
              ref={imageRef}
              onChange={handleAvatarChange}
              type="file"
              name="avatar"
              accept="image/*"
              hidden
            />
          </div>

          <input
            type="text"
            placeholder="Your full name"
            name="username"
            onChange={inputChange}
            className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-gray-600"
          />
          {isNotValid("username") && (
            <p className="text-red-500">{formik.errors.username}</p>
          )}

          <input
            type="password"
            placeholder="New password"
            name="password"
            onChange={inputChange}
            className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-gray-600"
          />
          {isNotValid("password") && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={inputChange}
            className="px-2 py-2 w-full bg-secondaryGray text-white outline-none rounded-lg border border-gray-600"
          />
          {isNotValid("email") && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}

          <input
            type="submit"
            value={loading ? "Updating..." : "Update Profile"}
            className={`text-center py-2 w-full bg-mainorange rounded-lg font-medium cursor-pointer ${
              loading ? "bg-orange-900 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          />
        </form>

        <div className="w-full flex gap-2 flex-wrap">
          <button
            type="button"
            className="flex-1 py-4 px-1 rounded-lg bg-black text-mainorange"
            onClick={handleLogOut}
          >
            Log Out
          </button>
          <button
            disabled
            type="button"
            className="flex-1 py-4 px-1 rounded-lg bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-black"
            onClick={deleteUser}
          >
            Delete Account
          </button>
        </div>

        {successMsg && <p className="text-green-500 italic">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 italic">{errorMsg}</p>}
      </div>
    </div>
  );
}
