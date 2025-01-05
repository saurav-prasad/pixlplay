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

function Sidebar({ toggleSidebar }) {
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

  // toggle popup modal
  const togglePopupModal = () => {
    setIsPopupModal(!isPopupModal);
  };

  // function to create a new canvas
  const handleNewCanvasClick = useRef(null);

  useEffect(() => {
    handleNewCanvasClick.current = throttling(async () => {
      try {
        if (user) {
          const result = await createNewCanvas(user?.id);
          dispatch(addInAllCanvases(result));
        }
      } catch (error) {
        console.error(error);
      }
    }, 1500);
  }, [user]);

  // function to start the name editing
  const handleEditStart = (value, id) => {
    setEditIndex(id);
    setEditValue(value);
  };

  // function to cancel name editing
  const handleEditCancel = () => {
    setEditIndex(null);
    setEditValue("");
  };

  // function to delete the canvas
  const handleDeleteCanvas = async (id) => {
    setDeleteCanvasId(id);
    togglePopupModal();
  };

  const getResult = async (result) => {
    if (result) {
      try {
        const deletedCanvas = await deleteCanvasFunc(deleteCanvasId);
        // console.log(deletedCanvas);
        dispatch(deleteInAllCanvases(deleteCanvasId));
        dispatch(deleteCanvas(deleteCanvasId));
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Deletion canceled");
    }
  };
  // function to save edited name
  const handleEditSave = async (id) => {
    try {
      const updatedName = await editCanvasName(id, editValue);
      dispatch(updateNameInAllCanvases({ id, name: editValue }));
      setEditIndex(null);
      setEditValue("");
    } catch (error) {
      console.error(error);
    }
  };

  // function to handle value of input tag
  const handleOnChange = (e) => {
    setEditValue(e.target.value);
  };

  // logout the user
  const handleLogout = () => {
    if (user) {
      dispatch(logout());
      removeAuthToken();
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  const handleNavigateCanvas = (id) => {
    if (isMobile || window.innerWidth <= 768) {
      navigate(!editIndex && `/canvas/${id}`);
      toggleSidebar();
    } else {
      navigate(!editIndex && `/canvas/${id}`);
    }
  };
  // fetch canvases
  useEffect(() => {
    async function fetchData() {
      try {
        if (allCanvases) {
          const sortedArr = sortArray(allCanvases);
          setCanvases(sortedArr);
        } else {
          const response = await getAllCanvases();
          dispatch(setAllCanvases(response));
          setCanvases(response);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [allCanvases]);

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
          {/* New Canvas */}
          <div className="px-6 pb-5 flex md:block justify-between items-center">
            <div
              onClick={handleNewCanvasClick.current}
              className="-mx-3 w-full md:w-auto"
            >
              <span className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900 group">
                <BadgePlus
                  className="h-6 w-6 transform group-hover:rotate-[360deg] group-hover:scale-125 duration-1000"
                  aria-hidden="true"
                />
                <span className="mx-4 text-md font-medium">New Canvas</span>
              </span>
            </div>
          </div>

          {/* All Canvases */}
          <div className="flex-1 overflow-y-auto px-6 hideScrollbar space-y-2">
            {allCanvases &&
              canvases.map((item, index) => (
                <div
                  title={item.name}
                  key={item._id} // Use a stable key
                  className={`select-none cursor-pointer flex transform items-center rounded-lg transition-colors duration-300 hover:bg-gray-200 
                    ${
                      item._id === canvasId && "bg-gray-400/75"
                    } bg-gray-50 hover:text-gray-900 justify-between space-x-2`}
                >
                  <div
                    onClick={() => handleNavigateCanvas(item._id)}
                    className="truncate h-[2.5rem] py-2 flex-1 flex justify-start items-center px-3 "
                  >
                    {editIndex === index ? (
                      <input
                        ref={(el) => (inputRef.current[index] = el)}
                        type="text"
                        value={editValue}
                        onChange={handleOnChange}
                        className="w-full text-md font-medium pr-1 outline-none"
                      />
                    ) : (
                      <p className="text-md font-medium w-full truncate">
                        {item.name}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-4 py-2 px-3">
                    {editIndex === index ? (
                      <CircleCheckBig
                        onClick={() => handleEditSave(item._id)}
                        className="h-6 w-6 transform hover:rotate-90 hover:scale-125 duration-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <Pencil
                        onClick={() => handleEditStart(item.name, index)}
                        className="h-6 w-6 transform hover:rotate-90 hover:scale-125 duration-300"
                        aria-hidden="true"
                      />
                    )}
                    {editIndex === index ? (
                      <X
                        onClick={handleEditCancel}
                        className="h-6 w-6 transform hover:scale-150 duration-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <Trash2
                        onClick={() => handleDeleteCanvas(item._id)}
                        className="h-6 w-6 transform hover:scale-150 duration-700"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Profile and Sign-out */}
          <div className="px-6 py-5">
            <div className="space-y-4">
              <span
                onClick={() => navigate("/profile")}
                className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                <UserRound className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">Profile</span>
              </span>
              <span
                onClick={handleLogout}
                className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut className="h-6 w-6" aria-hidden="true" />
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

export default Sidebar;
