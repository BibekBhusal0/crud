import { useContext, useState } from "react";
import { tweetContext } from "./App";
import { v4 as uuid } from "uuid";
import moment from "moment";

function Input() {
  const currentTime = moment().format("MMMM Do YYYY, h:mm a");
  const { dispatch } = useContext(tweetContext);
  const [text, setText] = useState("");
  var disabeled = text.trim() === "";

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handlePost = () => {
    const tweet = {
      id: uuid(),
      username: "Anonymous User",
      handle: "Anonymous",
      message: text,
      time: currentTime,
    };
    if (tweet.message !== "") {
      dispatch({ type: "POST", payload: { tweet } });
      setText("");
    }
  };

  return (
    <div className=" flex gap-2 border-2 border-gray-200 border-b-0 justify-between relative align-baseline">
      <textarea
        className=" text-xl h-28 resize-none  sm:w-9/12 w-8/12 focus:outline-none p-2 focus:drop-shadow-lg"
        name="input"
        value={text}
        onChange={handleChange}
        id="textarea"
        placeholder="Type something here and click the button Add Post"></textarea>
      <button
        onClick={handlePost}
        className={` border-2 rounded-lg sm:text-xl align-middle m-auto text-lg font-semibold px-6 py-3 h-14 border-blue-500 bg-transparent text-blue-500 ${
          disabeled
            ? " cursor-not-allowed"
            : "hover:border-transparent  hover:text-white hover:bg-blue-500 "
        }`}>
        Add Post
      </button>
    </div>
  );
}

export default Input;
