import {
  CircleCheckBig,
  CloudUpload,
  Info,
  LogOut,
  Logs,
  Pencil,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import deleteCanvasFunc from "../utils/deleteCanvas";
import {
  deleteInAllCanvases,
  updateNameInAllCanvases,
} from "../app/features/allCanvases";
import editCanvasName from "../utils/editCanvasName";
import { useDispatch, useSelector } from "react-redux";
import PopupModal from "./PopupModal";
import { deleteCanvas } from "../app/features/canvases";
import { setAlert } from "../app/features/alert";
import OnlineUsers from "./OnlineUsers";
import socket from "../socket/socket";

const Sidebar = lazy(() => import("./Sidebar"));
const LiveSidebar = lazy(() => import("./LiveSidebar"));

function CanvasHeader() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const { allCanvases } = useSelector((state) => state.allCanvasesReducer);
  const [isPopupModal, setIsPopupModal] = useState();
  const [canvasInfo, setCanvasInfo] = useState({});
  const inputRef = useRef(null);
  const canvasId = useParams()?.id;
  const dispatch = useDispatch();
  const [isCanvasNotFound, setIsCanvasNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnlineUsersPopup, setIsOnlineUsersPopup] = useState(false);
  const location = useLocation();
  const canvasAdmin = useSelector((state) => state.canvasAdminReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { allLiveCanvases } = useSelector(
    (state) => state.allLiveCanvasesReducer
  );

  const handelToggleSidebar = () => {
    setIsToggleSidebar(!isToggleSidebar);
  };

  // function to start the name editing
  const handleEditStart = () => {
    if (!isCanvasNotFound) {
      setOnEdit(true);
      setEditValue(canvasInfo.name);
    } else {
      dispatch(setAlert({ type: "danger", text: "Not allowed!" }));
    }
  };

  // function to cancel name editing
  const handleEditCancel = () => {
    setOnEdit(false);
    setEditValue("");
  };

  // function to save edited name
  const handleEditSave = async () => {
    setIsLoading(true);
    try {
      const updatedName = await editCanvasName(canvasId, editValue);
      dispatch(updateNameInAllCanvases({ id: canvasId, name: editValue }));
      setOnEdit(false);
      setEditValue(editValue);
      dispatch(setAlert({ text: "Canvas name Updated Successfully" }));
    } catch (error) {
      console.error(error);
      dispatch(
        setAlert({ type: "danger", text: error?.response?.data?.message })
      );
    } finally {
      setIsLoading(false);
    }
  };

  // toggle popup modal
  const togglePopupModal = () => {
    setIsPopupModal(!isPopupModal);
  };

  // function to delete the canvas
  const handleDeleteCanvas = async (id) => {
    !isCanvasNotFound
      ? togglePopupModal()
      : dispatch(setAlert({ type: "danger", text: "Not allowed!" }));
  };

  const getResult = async (result) => {
    if (result) {
      setIsLoading(true);
      try {
        if (!location.pathname.startsWith("/livecanvas")) {
          const deletedCanvas = await deleteCanvasFunc(canvasId);
          // console.log(deletedCanvas);
          dispatch(deleteInAllCanvases(canvasId));
          dispatch(deleteCanvas(canvasId));
          dispatch(setAlert({ text: "Canvas deleted Successfully" }));
          if (canvasAdmin.includes(canvasId)) {
            // console.log("object");
            socket.emit("delete-canvas", canvasId);
          }
        } else {
          socket.emit("leave-canvas", { canvasId });
          dispatch(setAlert({ text: "Canvas left Successfully" }));
        }
      } catch (error) {
        console.error(error);
        dispatch(
          setAlert({ type: "danger", text: error?.response?.data?.message })
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Deletion canceled");
    }
  };

  // function to handle value of input tag
  const handleOnChange = (e) => {
    setEditValue(e.target.value);
  };
  // online users handler
  const toggleOnlineUsersPopup = () => {
    setIsOnlineUsersPopup(!isOnlineUsersPopup);
  };

  // handle leave live canvas

  // function to delete the canvas
  const handleLeaveCanvas = () => {
    socket.emit("can-leave-canvas", canvasId);
    socket.on("if-leave-canvas", ({ success }) => {
      if (success) {
        togglePopupModal();
      } else {
        dispatch(setAlert({ type: "danger", text: "Canvas not accessable." }));
      }
    });
  };

  useEffect(() => {
    setIsCanvasNotFound(false);
    if (location.pathname.startsWith("/livecanvas")) {
      const data = allLiveCanvases?.filter(
        (item) => item.canvasId === canvasId
      )[0];
      setCanvasInfo(data);
    } else {
      const data = allCanvases?.filter((item) => item._id === canvasId)[0];
      setCanvasInfo(data);
    }
  }, [canvasId]);

  // Focus the input when editing starts
  useEffect(() => {
    if (onEdit) {
      inputRef.current.focus();
    }
  }, [onEdit]);

  useEffect(() => {
    const filtrLen = allCanvases?.filter(
      (item) => item._id === canvasId
    ).length;
    filtrLen <= 0 ? setIsCanvasNotFound(true) : setIsCanvasNotFound(false);
  }, [allCanvases]);

  return (
    <>
      <div className="relative">
        <div className="flex justify-between items-center px-2 py-1 bg-white shadow-md w-full overflow-hidden">
          <div className="flex items-center space-x-4 flex-1 overflow-hidden">
            <div
              onClick={handelToggleSidebar}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
            >
              <Logs className="cursor-pointer" />
            </div>
            {onEdit ? (
              <input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={handleOnChange}
                className="w-full text-xl font-bold outline-none"
              />
            ) : (
              <>
                {user && (
                  <span className="text-xl flex-1 font-bold truncate">
                    {location.pathname.startsWith("/livecanvas")
                      ? canvasInfo?.canvasName
                      : canvasInfo?.name}
                  </span>
                )}
                {!user && (
                  <span className="text-xl flex-1 font-bold truncate">
                    Your work won't be saved.{" "}
                  </span>
                )}
              </>
            )}
          </div>
          {/* icons */}
          {user && (
            <div className="flex space-x-4 items-center">
              {location.pathname.startsWith("/livecanvas") ? (
                <>
                  <div
                    onClick={handleLeaveCanvas}
                    title="save changes"
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
                  >
                    <LogOut className="h-6 w-6 transform hover:translate-x-1 duration-300" />
                  </div>
                </>
              ) : (
                <>
                  {isLoading ? (
                    <span className="loader5"></span>
                  ) : (
                    <>
                      {/* edit - save */}
                      <div
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
                        title={onEdit ? "Save Changes" : "Edit name"}
                      >
                        {onEdit ? (
                          <CircleCheckBig
                            onClick={handleEditSave}
                            aria-hidden="true"
                          />
                        ) : (
                          <Pencil
                            onClick={handleEditStart}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      {/* cancel - delete */}
                      <div
                        // onClick={onEdit ? handleEditEnd() : null}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
                        title={onEdit ? "Cancel" : "Delete"}
                      >
                        {onEdit ? (
                          <X onClick={handleEditCancel} aria-hidden="true" />
                        ) : (
                          <Trash2
                            onClick={handleDeleteCanvas}
                            aria-hidden="true"
                            className="transition-all hover:scale-125 duration-200"
                          />
                        )}
                      </div>
                    </>
                  )}
                  {/* share */}
                  <div
                    onClick={toggleOnlineUsersPopup}
                    title="save changes"
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
                  >
                    <Share2 className="" />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {/* sidebar */}
        <div
          className={`absolute top-0 left-0 w-full transition-transform ${
            isToggleSidebar ? "translate-x-0:" : "-translate-x-full w-screen"
          } duration-200 ease-in-out`}
        >
          {location.pathname.startsWith("/livecanvas") && (
            <Suspense>
              <LiveSidebar toggleSidebar={handelToggleSidebar} />
            </Suspense>
          )}{" "}
          {!location.pathname.startsWith("/livecanvas") && (
            <Suspense>
              <Sidebar toggleSidebar={handelToggleSidebar} />
            </Suspense>
          )}
        </div>
        {isToggleSidebar && (
          <div
            onClick={handelToggleSidebar}
            className="absolute top-0 left-0 z-[5] h-screen w-screen bg-[#5f5f5f91]"
          ></div>
        )}
      </div>
      {isPopupModal && (
        <PopupModal getResult={getResult} togglePopupModal={togglePopupModal} />
      )}
      {isOnlineUsersPopup && (
        <OnlineUsers toggleOnlineUsersPopup={toggleOnlineUsersPopup} />
      )}
    </>
  );
}

export default CanvasHeader;
