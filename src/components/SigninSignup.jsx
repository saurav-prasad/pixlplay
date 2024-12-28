import { Eye, EyeOff, Mail } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useDeviceType from "../hooks/useDeviceType";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

function SigninSignup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCatVisible, setIsCatVisible] = useState(true);
  const [isCatWaving, setIsCatWaving] = useState(true);
  const isMobile = useDeviceType();
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
    isPasswordVisible ? setIsCatWaving(false) : setIsCatWaving(true);
  };
  const handleInput = () => {
    setIsCatVisible(true);
    setIsCatWaving(true);
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

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-2 ">
        <img
          onClick={() => setIsCatVisible(false)}
          alt="cat"
          src={`${
            isCatWaving
              ? "/src/assets/images/cat-waving.jpg"
              : "/src/assets/images/cat-seeing.jpg"
          }`}
          className={`absolute ${
            isMobile && "hidden"
          } w-80 object-contain -top-5 transition-all duration-500 ${
            isCatVisible ? "translate-y-0" : "translate-y-full blur-[60px]"
          }`}
        />
        <Zoom
          duration={180}
          className="w-full max-w-[28rem] bg-transparent backdrop-blur-[10px]"
        >
          <div
            onClick={() => setIsCatVisible(true)}
            className="flex h-fit flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-w-[28rem] mx-auto bg-transparent backdrop-blur-[10px] border-2 rounded-2xl shadow-lg border-[#ffffff45]"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1
                className="text-center font-whisper font-extrabold text-5xl text-indigo-700
            "
              >
                Pixl Play
              </h1>
              <h2 className="mt-10 text-center text-2xl/9 font-extrabold tracking-tight text-gray-800">
                {location.pathname === "/signup"
                  ? "Signup to your account"
                  : "Signin to your account"}
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                {/* Email */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    ref={(el) => (inputRefs.current[0] = el)}
                    onClick={handleInput}
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9"
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
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    ref={(el) => (inputRefs.current[1] = el)}
                    onClick={handleInput}
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    className="block py-2.5 px-0 w-full font-medium text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer pr-9"
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
                </div>
                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-700/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
                  >
                    {location.pathname === "/signup" ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </form>

              <p className="mt-10 font-medium text-center text-sm/6 text-gray-900 select-none">
                {location.pathname === "/signup"
                  ? "Already have an Account?"
                  : "Don't have an Account?"}{" "}
                <Link
                  to={location.pathname === "/signin" ? "/signup" : "/signin"}
                  className="font-semibold text-white hover:underline transition-all duration-1000 select-none"
                >
                  {location.pathname === "/signin"
                    ? "Create one for Free."
                    : "Log-in"}
                </Link>
              </p>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  );
}

export default SigninSignup;
