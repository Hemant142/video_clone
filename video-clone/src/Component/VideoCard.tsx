// VideoCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Video {
  postId: string;
  creator: {
    name: string;
    id: string;
    handle: string;
    pic: string;
  };
  comment: {
    count: number;
    commentingAllowed: boolean;
  };
  reaction: {
    count: number;
    voted: boolean;
  };
  submission: {
    title: string;
    description: string;
    mediaUrl: string;
    thumbnail: string;
    hyperlink: string;
    placeholderUrl: string;
  };
}

interface Props {
  video: Video;
}

const VideoCard: React.FC<Props> = ({ video }) => {
  const [expend, setExpend] = useState(false);

  return (
    <div className="border border-gray-300 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
      <Link to={`/singleplayer/${video.postId}`}>
        <img
          src={video.submission.thumbnail}
          alt={video.submission.title}
          className="w-full rounded-lg"
        />
      </Link>
      <div className="mt-2">
        <h2 className="text-lg font-bold">{video.submission.title}</h2>
        <p className="text-gray-600">
          {expend
            ? video.submission.description
            : `${video.submission.description.substring(0, 50)}...`}
          {!expend ? (
            <button className="font-bold " onClick={() => setExpend(!expend)}>
              Read More
            </button>
          ) : (
            <button className="font-bold " onClick={() => setExpend(!expend)}>
              Read Less
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
