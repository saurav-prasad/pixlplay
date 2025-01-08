import { Contact, Eye, EyeOff, Mail, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useDeviceType from "../hooks/useDeviceType";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";
import CatWaving from "../assets/images/cat-waving.jpg";
import CatSeeing from "../assets/images/cat-seeing.jpg";
import { useDispatch, useSelector } from "react-redux";
import { authRoute } from "../axios/axios";
import { login } from "../app/features/auth";

function SigninSignup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCatVisible, setIsCatVisible] = useState(true);
  const [isCatWaving, setIsCatWaving] = useState(true);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const isMobile = useDeviceType();
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
    isPasswordVisible ? setIsCatWaving(false) : setIsCatWaving(true);
  };
  // handle input focus
  const handleInput = () => {
    setIsCatVisible(true);
    setIsCatWaving(true);
  };

  // handle on input change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignup) {
        const result = await authRoute.post("/createuser", {
          name: formData?.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        const { token: _, ...rest } = result.data.data;
        // console.log(result.data);
        // console.log(rest);
        dispatch(login(rest));
        localStorage.setItem("token", result.data.data.token);
      } else {
        const result = await authRoute.post("/loginuser", {
          email: formData.email,
          password: formData.password,
        });
        const { token: _, ...rest } = result.data.data;
        // console.log(result.data);
        // console.log(rest);
        dispatch(login(rest));
        localStorage.setItem("token", result.data.data.token);
      }
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError();
      }, 5000);
      setIsLoading(false);
    }
  };

  // handle test user sign in
  const handleOnTestClick = () => {};

  // switch sign in and sign up
  const toggleAuth = (e) => {
    setFormData({
      email: "",
      password: "",
      name: "",
      username: "",
    });
    navigate(!isSignup ? "/signup" : "/signin");
  };

  useEffect(() => {
    const checkFocus = () => {
      const isAnyInputFocused = inputRefs.current.some(
        (ref) => ref === document.activeElement
      );
      setIsCatWaving(isAnyInputFocused);
    };

    window.addEventListener("focusin", checkFocus);
    window.addEventListener("focusout", checkFocus);

    return () => {
      window.removeEventListener("focusin", checkFocus);
      window.removeEventListener("focusout", checkFocus);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsCatWaving(false);
    }, 2000);
  }, []);

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

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-2 ">
        {!isMobile && !isSignup && (
          <img
            onClick={() => setIsCatVisible(false)}
            alt="cat"
            src={`${isCatWaving ? CatWaving : CatSeeing}`}
            className={`absolute w-80 object-contain -top-[2.1rem] transition-all duration-500 ${
              isCatVisible ? "translate-y-0" : "translate-y-full blur-[60px]"
            }`}
          />
        )}
        <Zoom
          duration={180}
          className="w-full max-w-[28rem] bg-transparent backdrop-blur-[10px]"
        >
          <div
            onClick={() => setIsCatVisible(true)}
            className="flex h-fit flex-1 flex-col justify-center px-5 md:px-6 py-12 lg:px-8 max-w-[28rem] mx-auto bg-transparent backdrop-blur-[10px] border-2 rounded-2xl shadow-lg border-[#ffffff45]"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1
                className="text-center font-whisper font-extrabold text-5xl text-indigo-700
            "
              >
                Pixl Play
              </h1>
              <h2 className="mt-6 text-center text-2xl/9 font-extrabold tracking-tight text-gray-800">
                {location.pathname === "/signup"
                  ? "Sign up to your account"
                  : "Sign in to your account"}
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                onSubmit={handleSubmit}
                className={`${isSignup ? "space-y-4" : "space-y-6"}`}
              >
                {isSignup && (
                  <>
                    {/* Name */}
                    <div className="relative z-0 w-full group">
                      <input
                        ref={(el) => (inputRefs.current[0] = el)}
                        onClick={handleInput}
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleOnChange}
                        className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9 !bg-transparent"
                        placeholder=" "
                      />
                      <label
                        htmlFor="name"
                        className="select-none font-medium peer-focus:font-medium absolute text-base text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Name
                      </label>
                      <Contact className="absolute text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all right-0 top-3" />
                    </div>

                    {/* Username */}
                    <div className="relative z-0 w-full group">
                      <input
                        ref={(el) => (inputRefs.current[0] = el)}
                        onClick={handleInput}
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleOnChange}
                        className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9 !bg-transparent"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="username"
                        className="select-none font-medium peer-focus:font-medium absolute text-base text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Username
                      </label>
                      <User className="absolute text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all right-0 top-3" />
                    </div>
                  </>
                )}
                {/* Email */}
                <div className="relative z-0 w-full group">
                  <input
                    ref={(el) => (inputRefs.current[0] = el)}
                    onClick={handleInput}
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9 !bg-transparent"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className="select-none font-medium peer-focus:font-medium absolute text-base text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                  <Mail className="absolute text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all right-0 top-3" />
                </div>

                {/* Password */}
                <div className="relative z-0 w-full group">
                  <input
                    ref={(el) => (inputRefs.current[1] = el)}
                    onClick={handleInput}
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9 !bg-transparent"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    className="select-none font-medium peer-focus:font-medium absolute text-base text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                  {isPasswordVisible ? (
                    <Eye
                      onClick={handlePasswordVisible}
                      className="cursor-pointer absolute text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all right-0 top-3"
                    />
                  ) : (
                    <EyeOff
                      onClick={handlePasswordVisible}
                      className="cursor-pointer absolute text-gray-600 peer-focus:text-indigo-600 duration-300 transition-all right-0 top-3"
                    />
                  )}
                  {/* error texts */}
                  <span className="text-[#b40808] text-sm font-medium absolute bottom-[-1.35rem] text-justify">
                    {error}
                  </span>
                </div>
                {/* Submit */}
                <div className={`${error ? "!mt-[1.7rem]" : "!mt-[1.2rem]"}`}>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-700/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                  >
                    {isLoading ? (
                      <span className="loader"></span>
                    ) : isSignup ? (
                      "Sign up"
                    ) : (
                      "Sign in"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleOnTestClick}
                    className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-700/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                  >
                    Sign in as Test User
                  </button>
                </div>
              </form>

              <p className="mt-10 font-medium text-center text-sm/6 text-gray-900 select-none">
                {isSignup
                  ? "Already have an Account?"
                  : "Don't have an Account?"}{" "}
                <span
                  onClick={toggleAuth}
                  className="font-semibold text-white hover:underline transition-all duration-1000 select-none"
                >
                  {!isSignup ? "Create one for Free." : "Log-in"}
                </span>
              </p>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  );
}

export default SigninSignup;
