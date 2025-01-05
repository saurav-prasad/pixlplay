import { TriangleAlert } from "lucide-react";
import React from "react";
import { Zoom } from "react-awesome-reveal";

function PopupModal({ togglePopupModal, getResult }) {

  // Handles button click and passes the result to the parent
  const onClick = (e, result) => {
    e.preventDefault();
    getResult(result); // Send result to the parent
    togglePopupModal(); // Close the modal
  };

  // Prevents the click event from propagating to the overlay
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        onClick={togglePopupModal}
        className="absolute z-[100] flex justify-center items-center left-0 top-0 w-screen h-[99vh] m-0"
      >
        <Zoom duration={200}>
          <div
            onClick={stopPropagation}
            className="flex flex-col justify-center max-w-xl mx-2 shadow-2xl shadow-red-400"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-t-md">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <TriangleAlert
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <span
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Delete Canvas
                  </span>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete your canvas? All of your
                      data will be permanently removed. This action cannot be
                      undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-md">
                <button
                  type="button"
                  onClick={(e) => onClick(e, true)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={(e) => onClick(e, false)}
                  data-autofocus
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  );
}

export default PopupModal;
