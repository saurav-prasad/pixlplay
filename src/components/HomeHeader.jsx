import {
  GalleryHorizontalEnd,
  House,
  LogIn,
  LogOut,
  Logs,
  RadioTower,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import keyGenerator from "../utils/keyGenerator";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";

function HomeHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const handleLogout = useLogout();

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthClick = () => {
    if (user) {
      handleLogout();
    } else {
      navigate("/signin");
    }
  };

  const menuConstants = [
    {
      endPoint: "/",
      icon: <House className="mr-2 h-5 w-5" aria-hidden="true" />,
      name: "Home",
    },
    {
      endPoint: "/canvases",
      icon: (
        <GalleryHorizontalEnd className="mr-2 h-5 w-5" aria-hidden="true" />
      ),
      name: "Canvases",
    },
    {
      endPoint: "/livecanvases",
      icon: <RadioTower className="mr-2 h-5 w-5" aria-hidden="true" />,
      name: "Live canvases",
    },
  ];

  return (
    <div className="flex justify-between items-center sm:px-9 px-2 py-2 bg-transparent backdrop-blur-lg w-full transition-all text-gray-900 text-lg sm:font-semibold font-medium shadow-[#e3b0b3] shadow-md mb-3 fixed top-0 z-10">
      <Link
        to={"/"}
        className="transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none flex items-center"
      >
        <h1
          className="text-center font-whisper font-extrabold text-[2.1rem] text-indigo-700
            "
        >
          Pixl Play
        </h1>
      </Link>
      {/* Home */}
      <div className="flex sm:gap-5 gap-2 flex-1 justify-end items-start">
        {menuConstants.map((item, index) => (
          <Link
            key={keyGenerator()}
            to={item.endPoint}
            className="md:flex hidden transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
          >
            {item.icon}
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
        {user && (
          <>
            {/* profile */}
            <Link
              key={keyGenerator()}
              to={"/profile"}
              className="md:flex hidden transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
            >
              {/* <UserRound aria-hidden="true" /> */}
              <img
                className="mr-2 h-6 object-contain w-6 rounded-full ring-1 ring-white"
                alt={user?.username}
                src={user?.profilePhoto}
              />
              <span className="truncate">{user?.username}</span>
            </Link>
          </>
        )}

        {/* Sign in / Sign out */}
        <span
          onClick={handleAuthClick}
          className="md:flex hidden transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
        >
          {user ? (
            <LogOut className="h-5 mr-2 w-5" aria-hidden="true" />
          ) : (
            <LogIn className="h-5 mr-2 w-5" aria-hidden="true" />
          )}{" "}
          <span className="truncate">{user ? "Sign-out" : "Sign-in"}</span>
        </span>

        {/* Popup Menu */}
        <div
          onClick={toggleMenuOpen}
          className="md:hidden flex justify-center items-center transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none"
        >
          <Logs className="h-7 mr-2 w-7" aria-hidden="true" />
        </div>
      </div>
      {isMenuOpen && (
        <PopupMenu
          user={user}
          toggleMenuOpen={toggleMenuOpen}
          handleAuthClick={handleAuthClick}
        />
      )}
    </div>
  );
}

export default HomeHeader;

function PopupMenu({ toggleMenuOpen, user, handleAuthClick }) {
  const handleContainerClick = (e) => {
    toggleMenuOpen();
  };

  return (
    <>
      {/* bg-[#9E99BF] */}
      <div
        onClick={handleContainerClick}
        className="absolute flex justify-between bg-[#00000079] right-0 top-0 z-10 w-screen h-screen pt-12"
      >
        <Zoom
          duration={150}
          className="flex justify-between items-center px-3 py-5 bg-[#ffffff] rounded-lg text-gray-900 text-lg sm:font-semibold font-medium shadow-md z-10 w-[85%] mx-auto h-fit"
        >
          {/* Home */}
          <div className="flex sm:gap-5 gap-2 flex-1 justify-end items-start flex-col">
            <div className="flex items-center gap-3 w-full ">
              <Link
                to="/"
                className="pl-3 flex-1 transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none flex items-center"
              >
                <House className="mr-2 h-5 w-5" aria-hidden="true" />
                <span className="truncate">Home</span>
              </Link>
              <div
                onClick={toggleMenuOpen}
                className="transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none flex items-center"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            {/* Canvases */}
            <Link
              to="/canvases"
              className="pl-3 w-full flex transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
            >
              <GalleryHorizontalEnd
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span className="truncate">Canvases</span>
            </Link>
            {/* LiveCanvases Canvases */}
            <Link
              to="/livecanvases"
              className="pl-3 w-full flex transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
            >
              <RadioTower
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span className="truncate">Live Canvases</span>
            </Link>
            {user && (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="pl-3 w-full flex transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
                >
                  {/* <UserRound className="mr-2 h-5 w-5" aria-hidden="true" /> */}
                  <img
                    className="mr-2 h-6 object-contain w-6 rounded-full ring-1 ring-gray-700"
                    alt={user?.username}
                    src={user?.profilePhoto}
                  />
                  <span className="truncate">{user?.username}</span>
                </Link>
              </>
            )}
            {/* Signin */}
            <span
              onClick={handleAuthClick}
              className="pl-3 w-full flex transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
            >
              {user ? (
                <LogOut className="h-5 mr-2 w-5" aria-hidden="true" />
              ) : (
                <LogIn className="h-5 mr-2 w-5" aria-hidden="true" />
              )}{" "}
              <span className="truncate">{user ? "Sign-out" : "Sign-in"}</span>
            </span>
          </div>
        </Zoom>
      </div>
    </>
  );
}
