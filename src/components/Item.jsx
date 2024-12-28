import { CircleCheckBig, Pencil, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Item({ name }) {
  const [onEdit, setOnEdit] = useState(false);
  const [editValue, setEditValue] = useState(name);
  const navigate = useNavigate();
  const inputRef = useRef(null);

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
      <div className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-3 transition-colors duration-300 text-gray-900 bg-[#9e99bf85] hover:text-gray-950 justify-between space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] hover:bg-[#6872a6af] backdrop-blur-[100px] border-2">
        {onEdit ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={handleOnChange}
            className="w-full text-md font-medium pr-1 outline-none bg-transparent focus:border-b"
          />
        ) : (
          <Link to={"/canvas"} className="text-md font-medium w-full truncate">
            {name}
          </Link>
        )}
        <div className="flex space-x-5">
          <div title={onEdit ? "Save Changes" : "Edit name"}>
            {onEdit ? (
              <CircleCheckBig
                onClick={handleEditEnd}
                className="transform hover:rotate-90 hover:scale-125 duration-700"
                aria-hidden="true"
              />
            ) : (
              <Pencil
                onClick={() =>
                  setTimeout(() => {
                    handleEditStart();
                  }, 100)
                }
                className="transform hover:rotate-90 hover:scale-125 duration-300"
                aria-hidden="true"
              />
            )}
          </div>
          <div title={onEdit ? "Cancel" : "Delete"}>
            {onEdit ? (
              <X
                onClick={() =>
                  setTimeout(() => {
                    handleEditEnd();
                  }, 100)
                }
                className="transform hover:scale-150 duration-300"
                aria-hidden="true"
              />
            ) : (
              <Trash2
                className="transform hover:scale-150 duration-300"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
