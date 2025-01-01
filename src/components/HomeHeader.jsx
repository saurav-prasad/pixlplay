import {
  BadgePlus,
  GalleryHorizontalEnd,
  House,
  LogOut,
  Logs,
  Minimize2,
  UserRound,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";

function HomeHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
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
      endPoint: "/profile",
      icon: <UserRound className="mr-2 h-5 w-5" aria-hidden="true" />,
      name: "Profile",
    },
    {
      endPoint: "/signin",
      icon: <LogOut className="h-5 mr-2 w-5" aria-hidden="true" />,
      name: "Sign out",
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
        {menuConstants.map((item) => (
          <Link
            to={item.endPoint}
            className="md:flex hidden transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
          >
            {item.icon}
            <span className="truncate">{item.name}</span>
          </Link>
        ))}

        {/* Popup Menu */}
        <div
          onClick={toggleMenuOpen}
          className="md:hidden flex transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
        >
          <Logs className="h-7 mr-2 w-7" aria-hidden="true" />
        </div>
      </div>
      {isMenuOpen && <SliderMenu toggleMenuOpen={toggleMenuOpen} />}
    </div>
  );
}

export default HomeHeader;

function SliderMenu({ toggleMenuOpen }) {
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
            {/* Profile */}
            <Link
              to="/profile"
              className="pl-3 w-full flex transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
            >
              <UserRound className="mr-2 h-5 w-5" aria-hidden="true" />
              <span className="truncate">Profile</span>
            </Link>
            {/* Signin */}
            <Link
              to="/signin"
              className="pl-3 w-full flex transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none items-center"
            >
              <LogOut className="h-5 mr-2 w-5" aria-hidden="true" />
              <span className="truncate">Sign-out</span>
            </Link>
          </div>
        </Zoom>
      </div>
    </>
  );
}
