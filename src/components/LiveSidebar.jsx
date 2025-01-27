import React, { useEffect, useRef, useState } from "react";
import {
  LogOut,
  UserRound,
  BadgePlus,
  Pencil,
  Trash2,
  Minimize2,
  CircleCheckBig,
  X,
  House,
  LogIn,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import createNewCanvas from "../utils/createNewCanvas";
import {
  addInAllCanvases,
  deleteInAllCanvases,
  setAllCanvases,
  updateNameInAllCanvases,
} from "../app/features/allCanvases";
import editCanvasName from "../utils/editCanvasName";
import getAllCanvases from "../utils/getAllCanvases";
import sortArray from "../utils/sortArray";
import { logout } from "../app/features/auth";
import removeAuthToken from "../utils/removeAuthToken";
import deleteCanvasFunc from "../utils/deleteCanvas";
import useDeviceType from "../hooks/useDeviceType";
import PopupModal from "./PopupModal";
import throttling from "../utils/throttling";
import { deleteCanvas } from "../app/features/canvases";
import ItemSkeleton from "./ItemSkeleton";
import genEmptyArr from "../utils/genEmptyArr";
import { setAlert } from "../app/features/alert";
import useLogout from "../hooks/useLogout";
import socket from "../socket/socket";

function LiveSidebar({ toggleSidebar }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const isMobile = useDeviceType();
  const { allCanvases } = useSelector((state) => state.allCanvasesReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [canvases, setCanvases] = useState([]);
  const [isPopupModal, setIsPopupModal] = useState();
  const [deleteCanvasId, setDeleteCanvasId] = useState();
  const canvasId = useParams()?.id;
  const [isLoading, setIsLoading] = useState();
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(genEmptyArr(5));
  const handleLogoutHook = useLogout();
  const { allLiveCanvases } = useSelector(
    (state) => state.allLiveCanvasesReducer
  );

  // toggle popup modal
  const togglePopupModal = () => {
    setIsPopupModal(!isPopupModal);
  };

  // function to create a new canvas
  const handleNewCanvasClick = useRef(null);

  useEffect(() => {
    handleNewCanvasClick.current = throttling(async () => {
      setIsLoadingSkeleton(genEmptyArr(1));
      try {
        if (user) {
          const result = await createNewCanvas(user?.id);
          dispatch(addInAllCanvases(result));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingSkeleton([]);
      }
    }, 1500);
  }, [user]);

  // function to delete the canvas
  const handleLeaveCanvas = async (id) => {
    socket.emit("can-leave-canvas", id);
    socket.on("if-leave-canvas", ({ success }) => {
      if (success) {
        setDeleteCanvasId(id);
        togglePopupModal();
      } else {
        dispatch(setAlert({ type: "danger", text: "Not allowed" }));
      }
    });
  };

  const getResult = async (result) => {
    if (result) {
      setIsLoading(deleteCanvasId);
      try {
        socket.emit("leave-canvas", { canvasId: deleteCanvasId });
        dispatch(setAlert({ text: "Canvas left Successfully" }));
      } catch (error) {
        console.error(error);
        dispatch(setAlert({ type: "danger", text: error }));
      } finally {
        setIsLoading(null);
      }
    } else {
      console.log("Deletion canceled");
    }
  };

  // logout the user
  const handleLogout = () => {
    if (user) {
      handleLogoutHook();
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  const handleNavigateCanvas = (id) => {
    if (isMobile || window.innerWidth <= 768) {
      navigate(!editIndex && `/livecanvas/${id}`);
      toggleSidebar();
    } else {
      navigate(!editIndex && `/livecanvas/${id}`);
    }
  };
  // fetch canvases
  useEffect(() => {
    try {
      setCanvases(allLiveCanvases);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingSkeleton([]);
    }
  }, [allLiveCanvases]);

  // Focus the input when editing starts
  useEffect(() => {
    if (editIndex !== null && inputRef.current[editIndex]) {
      inputRef.current[editIndex].focus();
    }
  }, [editIndex]);

  return (
    <>
      <aside className="shadow-xl z-10 fixed sm:h-screen h-full w-[90%] md:w-64 border-r">
        <div className="flex flex-col h-full justify-between text-gray-800 bg-white">
          {/* New Canvas */}
          <div className="px-6 pt-5 pb-4 flex md:block justify-between items-center">
            <div
              className="-mx-3 w-[85%] md:w-auto"
              onClick={() => navigate("/")}
            >
              <span className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900">
                <House className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">Home</span>
              </span>
            </div>
            <div
              className="md:hidden cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
              onClick={toggleSidebar}
            >
              <Minimize2 />
            </div>
          </div>
          {/* All Canvases */}
          <div className="flex-1 overflow-y-auto px-6 hideScrollbar space-y-2">
            {isLoadingSkeleton.length > 0 &&
              isLoadingSkeleton.map((_, index) => (
                <Skeleton key={index} />
              ))}{" "}
            {isLoadingSkeleton.length < 3 && canvases.length > 0 ? (
              canvases.map((item, index) => (
                <div
                  title={item.canvasName}
                  key={index} // Use a stable key
                  className={`select-none cursor-pointer flex transform items-center rounded-lg transition-colors duration-300 hover:bg-gray-200 
                    ${
                      item.canvasId === canvasId && "!bg-[#9ca3af96]"
                    } bg-gray-50 hover:text-gray-900 justify-between space-x-2`}
                >
                  <div
                    onClick={() => handleNavigateCanvas(item.canvasId)}
                    className="truncate h-[2.5rem] py-2 flex-1 flex justify-start items-center px-3 "
                  >
                    <p className="text-md font-medium w-full truncate">
                      {item.canvasName}
                    </p>
                  </div>
                  {/* edit / delete */}
                  <div className="flex space-x-4 py-2 px-3">
                    <LogOut
                      onClick={() => handleLeaveCanvas(item.canvasId, index)}
                      className="h-6 w-6 transform hover:translate-x-1 duration-300"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center text-lg font-bold">
                No canvases available!
              </h1>
            )}
          </div>

          {/* Profile and Sign-out */}
          <div className="px-6 py-5">
            <div className="space-y-4">
              {user && (
                <span
                  onClick={() => navigate("/profile")}
                  className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
                >
                  {/* <UserRound className="h-6 w-6" aria-hidden="true" /> */}
                  <img
                    className="h-7 object-contain w-7 rounded-full ring-1 ring-gray-800"
                    alt={user?.username}
                    src={user?.profilePhoto}
                  />
                  <span className="mx-4 text-md font-medium truncate">
                    {user?.username}
                  </span>
                </span>
              )}
              <span
                onClick={handleLogout}
                className="-mx-3 group mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                {user ? (
                  <LogOut
                    className="h-6 w-6 group-hover:translate-x-1 transition-all"
                    aria-hidden="true"
                  />
                ) : (
                  <LogIn className="h-6 w-6" aria-hidden="true" />
                )}
                <span className="mx-4 text-md font-medium">Sign-out</span>
              </span>
            </div>
          </div>
        </div>
      </aside>
      {isPopupModal && (
        <PopupModal getResult={getResult} togglePopupModal={togglePopupModal} />
      )}
    </>
  );
}

export default LiveSidebar;

function Skeleton() {
  return (
    <>
      <div
        role="status"
        className="w-full space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 px-3 py-3 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-16 mb-2.5"></div>
            <div className="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-9 mb-2.5"></div>
            <div className="w-12 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </>
  );
}
