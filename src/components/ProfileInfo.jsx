import { Contact, Mail, Phone, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRoute } from "../axios/axios";
import getAuthToken from "../utils/getAuthToken";
import { setAlert } from "../app/features/alert";
import { updateProfile } from "../app/features/auth";
import throttling from "../utils/throttling";
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
  const { user } = useSelector((state) => state.authReducer);
  const [profileInfo, setProfileInfo] = useState({
    name: user?.name,
    username: user?.username,
    phone: user?.phone,
    email: user?.email,
  });
  const [updateStatus, setUpdateStatus] = useState(false);
  const dispatch = useDispatch();
  const onSubmitRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus(true);
    if (!user) {
      dispatch(setAlert({ type: "danger", text: "Please Sign in first..." }));
    } else {
      onSubmitRef.current();
    }
  };

  useEffect(() => {
    onSubmitRef.current = throttling(async () => {
      try {
        const result = await authRoute.post("/updateuser", profileInfo, {
          headers: { "auth-token": getAuthToken() },
        });
        // console.log(result);
        dispatch(updateProfile({ ...result?.data?.data }));
        dispatch(setAlert({ type: "success", text: result?.data?.message }));
      } catch (error) {
        console.error(error);
        dispatch(
          setAlert({ type: "danger", text: error?.response?.data?.message })
        );
      } finally {
        setUpdateStatus(false);
      }
    }, 2000);
  }, []);

  const onCancel = (e) => {
    setProfileInfo({
      name: user?.name,
      username: user.username,
      phone: user?.phone,
      email: user.email,
    });
    navigate(-1)
  };
  const onChange = (e) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto py-8 sm:px-5 px-3 bg-[#9e99bf85] backdrop-blur-[9px] rounded-lg "
    >
      <div className="flex flex-col justify-center items-center space-y-8">
        <img
          className="h-24 w-24 rounded-full border p-1 bg-[#fdfdfd1c] border-y-purple-600 border-x-violet-500 object-cover"
          src={user?.profilePhoto}
          alt="dp"
        />
      </div>
      <div className="space-y-5 mt-5">
        {/* Username */}
        <div className="relative z-0 w-full border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus-within:border-indigo-600 group flex justify-start items-center">
          <span
            className={`${
              profileInfo?.username && "!flex"
            } group-focus-within:flex hidden select-none items-center text-gray-700 text-sm mr-1`}
          >
            pixlplay.vercel.app/
          </span>
          <input
            type="text"
            name="username"
            id="name"
            value={profileInfo?.username}
            onChange={onChange}
            required
            className={`sm:w-auto w-[inherit] flex-1 block py-2.5 px-0 !bg-transparent font-medium text-base text-gray-900pr-9 outline-none peer`}
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="select-none font-medium peer-focus:font-medium absolute text-base text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex justify-start items-center gap-1"
          >
            Username <span className="text-red-700 text-lg">*</span>
          </label>
          <User className="text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all" />
        </div>
        {/* Name */}
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="name"
            id="name"
            value={profileInfo?.name}
            onChange={onChange}
            required
            className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9 !bg-transparent"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="select-none font-medium peer-focus:font-medium absolute text-base text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex justify-start items-center gap-1"
          >
            Name <span className="text-red-700 text-lg">*</span>
          </label>
          <Contact className="absolute text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all right-0 top-3" />
        </div>
        {/* Email */}
        <div className="relative z-0 w-full group">
          <input
            type="email"
            name="email"
            id="name"
            value={profileInfo?.email}
            onChange={onChange}
            required
            className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9 !bg-transparent"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="select-none font-medium peer-focus:font-medium absolute text-base text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 flex justify-start items-center gap-1"
          >
            Email
            <span className="text-red-700 text-lg">*</span>
          </label>
          <Mail className="absolute text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all right-0 top-3" />
        </div>
        {/* Phone */}
        <div className="relative z-0 w-full group">
          <input
            type="number"
            name="phone"
            id="phone"
            value={profileInfo?.phone}
            onChange={onChange}
            className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9 !bg-transparent"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="select-none font-medium peer-focus:font-medium absolute text-base text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          <Phone className="absolute text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all right-0 top-3" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-x-6">
        <button
          disabled={updateStatus}
          onClick={onCancel}
          type="button"
          className="select-none text-gray-900 transition-all bg-transparent border border-gray-300 hover:ring-1 hover:ring-gray-100 rounded-lg text-sm px-4 py-2 font-semibold focus:bg-[#ffffff62]"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={updateStatus}
          className="text-gray-900 bg-gradient-to-r transition-all from-red-200 via-red-300 to-yellow-200 focus:bg-gradient-to-bl hover:ring-2 hover:ring-red-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center w-[69px] h-[40px]"
        >
          {updateStatus ? <span className="loader6" /> : "Save"}
        </button>
      </div>
    </form>
  );
}

export default ProfileInfo;
