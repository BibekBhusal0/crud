import { useContext } from "react";
import Tweet from "./tweet";
import { tweetContext } from "./App";

function Tweets() {
  const { tweets } = useContext(tweetContext);
  return (
    <div className="w-full drop-shadow-md shadow-black border-b-2 borderb-gray-200">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

export default Tweets;
