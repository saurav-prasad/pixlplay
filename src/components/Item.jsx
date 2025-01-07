import { CircleCheckBig, Pencil, Trash2, X } from "lucide-react";
import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDeviceType from "../hooks/useDeviceType";
import deleteCanvasFunc from "../utils/deleteCanvas";
import {
  deleteInAllCanvases,
  updateNameInAllCanvases,
} from "../app/features/allCanvases";
import { useDispatch, useSelector } from "react-redux";
import editCanvasName from "../utils/editCanvasName";
import PopupModal from "./PopupModal";
import { deleteCanvas } from "../app/features/canvases";
import { setAlert } from "../app/features/alert";

function Item({ name, id }) {
  const [onEdit, setOnEdit] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const isMobile = useDeviceType();
  const dispatch = useDispatch();
  const [isPopupModal, setIsPopupModal] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // function to start the name editing
  const handleEditStart = () => {
    setOnEdit(true);
  };

  // function to cancel name editing
  const handleEditCancel = () => {
    setOnEdit(null);
    setEditValue("");
  };

  // function to save edited name
  const handleEditSave = async () => {
    setIsLoading(true);
    try {
      const updatedName = await editCanvasName(id, editValue);
      dispatch(updateNameInAllCanvases({ id, name: editValue }));
      setOnEdit(null);
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

  // function to delete the canvas
  const handleDeleteCanvas = async () => {
    togglePopupModal();
  };

  // toggle popup modal
  const togglePopupModal = () => {
    setIsPopupModal(!isPopupModal);
  };

  const getResult = async (result) => {
    if (result) {
      setIsLoading(true);
      try {
        const deletedCanvas = await deleteCanvasFunc(id);
        dispatch(deleteInAllCanvases(id));
        dispatch(deleteCanvas(id));
        dispatch(setAlert({ text: "Canvas deleted Successfully" }));
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

  // Focus the input when editing starts
  useEffect(() => {
    // console.log({ id, name });
    if (onEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [onEdit]);

  return (
    <>
      <div className="select-none cursor-pointer flex transform items-center rounded-lg transition-colors duration-300 text-gray-900 bg-[#9e99bf85] hover:text-gray-950 justify-between space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] hover:bg-[#6872a6af] backdrop-blur-[100px] border-2">
        <Link
          to={!onEdit && `/canvas/${id}`}
          className="h-[3rem] flex-1 flex justify-start items-center px-3 truncate"
        >
          {onEdit ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={handleOnChange}
              className={`w-full text-md font-medium pr-1 outline-none bg-transparent focus:border-b border-b`}
            />
          ) : (
            <span
              to={"/canvas"}
              className="text-md font-medium w-full truncate"
            >
              {name}
            </span>
          )}
        </Link>
        <div className="flex h-[2.8rem] justify-start items-center px-3">
          {isLoading ? (
            <span className="loader5"></span>
          ) : (
            <>
              <div
                className={`h-full w-9 flex justify-center items-center mx-2 group`}
                title={onEdit ? "Save Changes" : "Edit name"}
              >
                {onEdit ? (
                  <CircleCheckBig
                    onClick={handleEditSave}
                    className={`w-7 h-7 ${
                      !isMobile &&
                      "transition-all group-hover:scale-[0.85] duration-200"
                    }`}
                    aria-hidden="true"
                  />
                ) : (
                  <Pencil
                    onClick={handleEditStart}
                    className={`w-7 h-7 ${
                      !isMobile &&
                      "transition-all group-hover:rotate-90 group-hover:scale-[1.15] duration-200"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div
                className="h-full w-9 flex justify-center items-center mx-2 group"
                title={onEdit ? "Cancel" : "Delete"}
              >
                {onEdit ? (
                  <X
                    onClick={handleEditCancel}
                    className={`w-7 h-7 ${
                      !isMobile &&
                      "transition-all duration-200 group-hover:scale-125"
                    }`}
                    aria-hidden="true"
                  />
                ) : (
                  <Trash2
                    onClick={handleDeleteCanvas}
                    className={`w-7 h-7 ${
                      !isMobile &&
                      "transition-all duration-200 group-hover:scale-110"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {isPopupModal && (
        <PopupModal getResult={getResult} togglePopupModal={togglePopupModal} />
      )}
    </>
  );
}

export default memo(Item);
