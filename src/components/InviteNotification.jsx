import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsetInviteNoi } from "../app/features/inviteNoti";
import socket from "../socket/socket";
import sliceString from "../utils/sliceString";
import { useNavigate } from "react-router-dom";

function InviteNotification() {
  const {
    show,
    username,
    canvasId,
    adminUserId,
    adminProfilePhoto,
    canvasName,
  } = useSelector((state) => state.inviteNotiReducer);

  const [timer, setTimer] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // interval
  useEffect(() => {
    let intId;
    if (show) {
      setTimer(10);
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            dispatch(unsetInviteNoi());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      intId = intervalId;
    }
    return () => clearInterval(intId);
  }, [show]);

  const onIgnore = (e) => {
    e.preventDefault();
    dispatch(unsetInviteNoi());
  };
  const onAccept = (e) => {
    e.preventDefault();
    try {
      dispatch(unsetInviteNoi());
      socket.emit("accept-invitation", { canvasId, adminUserId, canvasName });
      navigate(`/livecanvas/${canvasId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className={`fixed top-5 right-2 md:right-[10%] w-fit z-[100] flex justify-center items-center transition-all ${
          show ? "translate-y-[0%]" : "translate-y-[-500%]"
        }`}
      >
        <div
          id="toast-default"
          className="alertContainer relative flex items-center w-fit max-w-md md:max-w-xl px-3 md:px-4 py-2 text-white  rounded-lg shadow"
          role="alert"
        >
          <div className="text-sm font-bold text-gray-900 flex items-center justify-start gap-2">
            <img
              src={adminProfilePhoto}
              className="flex items-center space-x-2 cursor-pointer relative rounded-full w-8 h-8 border hover:bg-gray-200"
            />
            <span className="absolute -left-2 -top-2 rounded-full p-1 text-center text-xs font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg w-6 h-6">
              {timer}
            </span>

            <span>{sliceString(username, 10)} is inviting!</span>
            <button
              onClick={onAccept}
              type="submit"
              className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:bg-indigo-700/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all "
            >
              Join
            </button>
            <button
              onClick={onIgnore}
              type="submit"
              className="rounded-md bg-red-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:bg-red-600/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all "
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InviteNotification;
