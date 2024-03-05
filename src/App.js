import { createContext, useReducer } from "react";
import Input from "./input";
import Tweets from "./tweets";
import moment from "moment";

const currentTime = moment().format("MMMM Do YYYY, h:mm a");
export const tweetContext = createContext();

const tweetArray = [
  {
    username: "Bibek Bhusal",
    handle: "bibekbhusal0",
    message:
      "CRUD stands for Create, Read, Update and Delete so this is a website which supports CRUD operations and I made It with react",
    id: 1,
    time: currentTime,
  },
  {
    username: "Bibek Bhusal ",
    handle: "bibekbhusal0",
    message:
      "You can delete this post by clicking on delete icon below and also change this message, usable buttons are on the left ",
    id: 2,
    time: currentTime,
  },
];

function tweetReducer(state, action) {
  switch (action.type) {
    case "DELETE":
      const removeID = action.payload.id;
      const returnState = state.filter((item) => item.id !== removeID);
      return returnState;

    case "POST":
      const newState = [...state];
      newState.push(action.payload.tweet);
      return newState;

    case "EDIT":
      const tempState = [...state];
      for (let i = 0; i < tempState.length; i++) {
        if (tempState[i].id === action.payload.id) {
          tempState[i].message = action.payload.message;
        }
      }
      return tempState;

    default:
      return state;
  }
}

function App() {
  const [tweets, dispatch] = useReducer(tweetReducer, tweetArray);

  return (
    <div id="main" className="p-3 pt-5 w-full mx-auto  sm:w-600">
      <tweetContext.Provider value={{ tweets, dispatch }}>
        <Input />
        <Tweets />
      </tweetContext.Provider>
    </div>
  );
}

export default App;
