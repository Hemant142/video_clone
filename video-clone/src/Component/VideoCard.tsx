// VideoCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <Link to={`/singleplayer/${video.postId}`}>
      <div className="border border-gray-300 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <img src={video.submission.thumbnail} alt={video.submission.title} className="w-full rounded-lg" />
        <div className="mt-2">
          <h2 className="text-lg font-bold">{video.submission.title}</h2>
          <p className="text-gray-600">{video.submission.description}</p>
        </div>
        <div className="flex justify-between mt-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18l-1.447-1.447C3.901 12.733 1 10.077 1 7.5 1 4.462 3.462 2 6.5 2c1.902 0 3.716 1.095 4.5 2.708C11.784 3.095 13.598 2 15.5 2 18.538 2 21 4.462 21 7.5c0 2.577-2.901 5.233-7.553 9.053L10 18z"
                clipRule="evenodd"
              />
            </svg>
            <span>{video.reaction.count}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18l-1.447-1.447C3.901 12.733 1 10.077 1 7.5 1 4.462 3.462 2 6.5 2c1.902 0 3.716 1.095 4.5 2.708C11.784 3.095 13.598 2 15.5 2 18.538 2 21 4.462 21 7.5c0 2.577-2.901 5.233-7.553 9.053L10 18z"
                clipRule="evenodd"
              />
            </svg>
            <span>{video.comment.count}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
