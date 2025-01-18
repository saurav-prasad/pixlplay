import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket/socket";
import { useParams } from "react-router-dom";

function OnlineUsers({ toggleOnlineUsersPopup, getResult }) {
  // use selectors
  const onlineUsersReducer = useSelector((state) => state.onlineUsersReducer);
  const { user } = useSelector((state) => state.authReducer);
  // use state
  const [allOnlineUsers, setAllOnlineUsers] = useState([]);

  // Handles button click and passes the result to the parent
  const onClick = (e, result) => {
    e.preventDefault();
    getResult(result); // Send result to the parent
    toggleOnlineUsersPopup(); // Close the modal
  };

  // Prevents the click event from propagating to the overlay
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // organize onlineusers data
  useEffect(() => {
    let newOnlineUsers = [];
    if (onlineUsersReducer) {
      Object.keys(onlineUsersReducer).map((userId) => {
        if (user?.id !== userId) {
          newOnlineUsers.push({
            userId,
            username: onlineUsersReducer[userId].username,
            profilePhoto: onlineUsersReducer[userId].profilePhoto,
          });
        }
      });
      setAllOnlineUsers(newOnlineUsers);
    }
  }, [onlineUsersReducer]);

  return (
    <>
      <div
        onClick={toggleOnlineUsersPopup}
        className="absolute z-[100] flex justify-center items-center left-0 md:top-0 -top-10 w-full h-[99vh] m-0"
      >
        <Zoom duration={200}>
          <div
            onClick={stopPropagation}
            className="flex flex-col justify-center md:w-[30vw] w-[80vw] mx-2 shadow-2xl shadow-indigo-300"
          >
            <div className="bg-gray-50 px-2 py-3 flex flex-col justify-center items-center sm:px-3 rounded-md">
              <h1 className="font-bold underline mb-4">All Online Users</h1>
              <div className="gap-3 max-h-96 overflow-auto w-full flex flex-col">
                {allOnlineUsers.length > 0 ? (
                  allOnlineUsers.map(
                    ({ userId, username, profilePhoto }, index) =>
                      user.id !== userId && (
                        <List
                          key={index}
                          userId={userId}
                          name={username}
                          icon={profilePhoto}
                          toolName={username}
                        />
                      )
                  )
                ) : (
                  <h1 className="font-medium text-lg mb-4 text-center text-gray-900">
                    *No one is Online.
                  </h1>
                )}
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  );
}
export default OnlineUsers;

function List({ name, icon, userId }) {
  const { user } = useSelector((state) => state.authReducer);
  const params = useParams();
  const canvasId = params.id;

  const [timer, setTimer] = useState(10);
  const [ifStartTimer, setIfStartTimer] = useState(false);

  const dispatch = useDispatch();

  // interval
  useEffect(() => {
    if (ifStartTimer) {
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setTimer(10);
            setIfStartTimer(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [ifStartTimer]);

  const onClick = (e) => {
    e.preventDefault();
    console.log(e);
    setIfStartTimer(true);
    socket.emit("invite-user", { toUserId: userId, canvasId });
  };

  return (
    <div
      className={`px-1 py-1 w-full rounded-md flex justify-start items-center gap-2 hover:bg-slate-100 transition-all cursor-pointer`}
    >
      <img
        src={icon}
        className="flex items-center space-x-2 cursor-pointer relative rounded-full w-8 h-8 border hover:bg-gray-200"
      />
      <div className="flex-1 font-medium dark:text-gray-900 flex justify-start items-center">
        <div className="select-none">{name}</div>
      </div>
      <button
        onClick={onClick}
        type="submit"
        className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-14"
      >
        {ifStartTimer ? timer : "Invite"}
      </button>
    </div>
  );
}
