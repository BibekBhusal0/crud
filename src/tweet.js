import { FaUser, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiChat3Line } from "react-icons/ri";
import { ImLoop } from "react-icons/im";
import { FaRegHeart } from "react-icons/fa6";
import { createContext, useContext, useRef, useState } from "react";
import { tweetContext } from "./App";

function Icon({ icon, red, onClick }) {
  return (
    <div
      onClick={onClick}
      className={` text-3xl text-gray-400 cursor-pointer ${
        red ? "hover:text-red-500" : "hover:text-blue-400"
      } `}>
      {icon}
    </div>
  );
}

function Edit({ tweet: { message, id } }) {
  const { toggleEditMode } = useContext(editContext);
  const { dispatch } = useContext(tweetContext);
  const ref = useRef();

  const handleCancel = () => {
    toggleEditMode(false);
  };
  const handleSave = () => {
    dispatch({ type: "EDIT", payload: { message: ref.current.value, id: id } });
    toggleEditMode(false);
  };

  return (
    <div>
      <textarea
        name="edit-mode"
        className=" w-full p-2 h-24 resize-none focus:outline-none focus:drop-shadow-lg shadow-none"
        defaultValue={message.trim()}
        ref={ref}></textarea>
      <button
        className=" text-white bg-blue-600 rounded-md px-3 py-1 capitalize text-lg mx-2"
        onClick={handleSave}>
        save
      </button>
      <button
        className=" text-white bg-gray-600 rounded-md px-3 py-1 capitalize text-lg mx-2"
        onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

function NoEdit({ tweet: { username, handle, id, message, time } }) {
  const { dispatch } = useContext(tweetContext);
  const { toggleEditMode } = useContext(editContext);
  const handleDelete = () => {
    dispatch({ type: "DELETE", payload: { id } });
  };
  const handleEidt = () => {
    // dispatch({ type: "EDIT", payload: { id } });
    toggleEditMode(true);
  };
  return (
    <>
      {/* user */}
      <div className="flex text-left  items-center gap-1 my-2 text-gray-950">
        <FaUser className="border p-1 border-black rounded-full w-12  h-12 " />
        <h1 className="text-3xl capitalize font-semibold">{username}</h1>
        <p className="text-gray-700">@{handle}</p>
      </div>
      <div className="text-lg">{message}</div>
      <div className="flex justify-between px-4 pt-4 pb-1">
        <div className="flex gap-3">
          <Icon onClick={handleEidt} icon={<FaEdit />} red={false} />
          <Icon onClick={handleDelete} icon={<RiDeleteBin6Line />} red={true} />
        </div>
        <div className="flex gap-3">
          <Icon icon={<RiChat3Line />} red={false} />
          <Icon icon={<ImLoop />} red={false} />
          <Icon icon={<FaRegHeart />} red={true} />
        </div>
        <div>{time}</div>
      </div>
    </>
  );
}

const editContext = createContext();
function Tweet({ tweet }) {
  const [editMode, toggleEditMode] = useState(false);

  return (
    <editContext.Provider value={{ editMode, toggleEditMode }}>
      <div className="w-full p-2 border-gray-200 border-2 border-b-0 ">
        {editMode ? <Edit tweet={tweet} /> : <NoEdit tweet={tweet} />}
      </div>
    </editContext.Provider>
  );
}

export default Tweet;
