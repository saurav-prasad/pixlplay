import { Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";

function OnlineUsers({ toggleOnlineUsersPopup, getResult }) {
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

  const onlineUsersReducer = useSelector((state) => state.onlineUsersReducer);

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
                {Object.keys(onlineUsersReducer).map((userId, index) => (
                  <List
                    key={index}
                    name={onlineUsersReducer[userId].username}
                    icon={onlineUsersReducer[userId].profilePhoto}
                    toolName={onlineUsersReducer[userId].username}
                  />
                ))}
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  );
}
export default OnlineUsers;

function List({ name, icon, setTool, toolName, tool }) {
  const onClick = () => {
    // setTool({ name: toolName, component: icon });
  };

  return (
    <div
      onClick={onClick}
      className={`px-1 py-1 w-full rounded-md flex justify-start items-center gap-2 hover:bg-slate-100 transition-all cursor-pointer`}
    >
      <img
        src={icon}
        title="Eraser"
        className="flex items-center space-x-2 cursor-pointer relative rounded-full w-8 h-8 border hover:bg-gray-200"
      />
      <div className="flex-1 font-medium dark:text-gray-900 flex justify-start items-center">
        <div className="select-none">{name}</div>
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-00 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Remove
      </button>
    </div>
  );
}
