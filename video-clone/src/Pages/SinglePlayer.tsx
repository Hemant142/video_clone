import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const SinglePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`https://internship-service.onrender.com/videos`);
      const data = response.data.data;
      console.log(data,":juyfyt")
      const foundVideo = data.posts.find((v: Video) => v.postId === id);
      setVideo(foundVideo || null);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleLike = () => {
    setLiked(true);
    // Store like in local storage
    localStorage.setItem(`liked_${id}`, 'true');
  };

  const handleComment = () => {
    // Store comment in local storage or handle comment functionality
    console.log('Comment button clicked');
  };

  return (
    <div className="container mx-auto">
      {video ? (
        <>
          <video
            controls
            className="w-full"
            style={{ maxWidth: '100%' }}
            src={video.submission.mediaUrl}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={togglePlay}
          >
            Your browser does not support the video tag.
          </video>
          <div className={`overlay ${isHovering && !isPlaying ? 'visible' : 'hidden'}`}>
            <button className="play-pause" onClick={togglePlay}>
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 4.293a1 1 0 011.414 1.414L5.414 9H16a1 1 0 010 2H5.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4 5a1 1 0 011.555-.832l9 6a1 1 0 010 1.664l-9 6A1 1 0 014 15V5z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-2xl font-bold">{video.submission.title}</h2>
            <div className="flex items-center">
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 ${liked && 'opacity-50'}`}
                onClick={handleLike}
                disabled={liked}
              >
                Like ({video.reaction.count})
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleComment}>
                Comment
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">{video.submission.description}</p>
        </>
      ) : (
        <div>No video found</div>
      )}
    </div>
  );
};

export default SinglePlayer;
