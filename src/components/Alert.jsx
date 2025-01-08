import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsetAlert } from "../app/features/alert";

function Alert() {
  const { type, text, show } = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeOutId;
    if (show) {
      timeOutId = setTimeout(() => {
        dispatch(unsetAlert());
      }, 1800);
    }
    return () => clearTimeout(timeOutId);
  }, [show]); 

  return (
    <>
      <div
        className={`fixed top-5 left-0 w-full z-[100] flex justify-center items-center transition-all ${
          show ? "translate-y-[0%]" : "translate-y-[-500%]"
        }`}
      >
        <div
          id="toast-default"
          className="alertContainer flex items-center w-fit max-w-md md:max-w-xl px-4 py-2 text-white  rounded-lg shadow"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-7 h-7 bg-[#589efd] rounded-lg">
            {type == "danger" ? (
              <svg
                className="w-5 h-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                <span className="sr-only">Warning icon</span>
              </svg>
            ) : (
              <svg
                className="w-5 h-5  text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M15.133 10.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175ZM4 4a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 4 4ZM2 8H1a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 16 4Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
              </svg>
            )}
          </div>
          <div className="ms-3 text-sm font-bold text-gray-900 select-none">{text}</div>
        </div>
      </div>
    </>
  );
}

export default Alert;
