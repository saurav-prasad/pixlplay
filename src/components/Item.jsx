import { CircleCheckBig, Pencil, Trash2, X } from "lucide-react";
import React, { memo, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDeviceType from "../hooks/useDeviceType";

function Item({ name }) {
  const [onEdit, setOnEdit] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const isMobile = useDeviceType();

  const handleEditStart = (id, value) => {
    setOnEdit(true);
  };

  const handleEditEnd = () => {
    setOnEdit(null);
  };
  const handleOnChange = (e) => {
    setEditValue(e.target.value);
  };
  // Focus the input when editing starts
  useEffect(() => {
    if (onEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [onEdit]);

  return (
    <>
      <div className="select-none cursor-pointer flex transform items-center rounded-lg transition-colors duration-300 text-gray-900 bg-[#9e99bf85] hover:text-gray-950 justify-between space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] hover:bg-[#6872a6af] backdrop-blur-[100px] border-2">
        <Link
          to={!onEdit && "/canvas"}
          className="h-[3rem] flex-1 flex justify-start items-center px-3"
        >
          {onEdit ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={handleOnChange}
              className={`w-full text-md font-medium pr-1 outline-none bg-transparent focus:border-b`}
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
          <div
            className={`h-full w-9 flex justify-center items-center mx-2 group`}
            title={onEdit ? "Save Changes" : "Edit name"}
          >
            {onEdit ? (
              <CircleCheckBig
                onClick={handleEditEnd}
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
                onClick={handleEditEnd}
                className={`w-7 h-7 ${
                  !isMobile &&
                  "transition-all duration-200 group-hover:scale-125"
                }`}
                aria-hidden="true"
              />
            ) : (
              <Trash2
                className={`w-7 h-7 ${
                  !isMobile &&
                  "transition-all duration-200 group-hover:scale-110"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Item);
