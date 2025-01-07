import {
  CircleCheckBig,
  Info,
  Logs,
  Pencil,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { Slide } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import deleteCanvasFunc from "../utils/deleteCanvas";
import {
  deleteInAllCanvases,
  updateNameInAllCanvases,
} from "../app/features/allCanvases";
import editCanvasName from "../utils/editCanvasName";
import { useDispatch, useSelector } from "react-redux";
import PopupModal from "./PopupModal";
import { deleteCanvas } from "../app/features/canvases";

function CanvasHeader() {
  const [isToggle, setToggle] = useState(false);
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

  const toggle = () => {
    setToggle(!isToggle);
  };

  // function to start the name editing
  const handleEditStart = () => {
    if (!isCanvasNotFound) {
      setOnEdit(true);
      setEditValue(canvasInfo.name);
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
    } catch (error) {
      console.error(error);
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
    !isCanvasNotFound && togglePopupModal();
  };

  const getResult = async (result) => {
    if (result) {
      setIsLoading(true);
      try {
        const deletedCanvas = await deleteCanvasFunc(canvasId);
        // console.log(deletedCanvas);
        dispatch(deleteInAllCanvases(canvasId));
        dispatch(deleteCanvas(canvasId));
      } catch (error) {
        console.error(error);
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

  useEffect(() => {
    setIsCanvasNotFound(false)
    const data = allCanvases?.filter((item) => item._id === canvasId)[0];
    setCanvasInfo(data);
  }, [canvasId, allCanvases]);

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
              onClick={toggle}
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
              <span className="text-xl flex-1 font-bold truncate">
                {canvasInfo?.name}
              </span>
            )}
          </div>
          {/* icons */}
          <div className="flex space-x-4 items-center">
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
                    <Pencil onClick={handleEditStart} aria-hidden="true" />
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
            <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all">
              <Share2 className="" />
            </div>
          </div>
        </div>
        {/* sidebar */}
        <div
          className={`absolute top-0 left-0 w-full transition-transform ${
            isToggle ? "translate-x-0:" : "-translate-x-full w-screen"
          } duration-200 ease-in-out`}
        >
          <Sidebar toggleSidebar={toggle} />
        </div>
        {isToggle && (
          <div
            onClick={toggle}
            className="absolute top-0 left-0 z-[5] h-screen w-screen bg-[#5f5f5f91]"
          ></div>
        )}
      </div>
      {isPopupModal && (
        <PopupModal getResult={getResult} togglePopupModal={togglePopupModal} />
      )}
    </>
  );
}

export default CanvasHeader;
