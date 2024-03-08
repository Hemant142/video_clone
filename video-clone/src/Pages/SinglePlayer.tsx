import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiLike, BiDislike,BiSolidLike, BiSolidDislike  } from "react-icons/bi";
// import { BiSolidLike, BiSolidDislike  } from "react-icons/bi";
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
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    fetchVideo();
  }, [liked]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://internship-service.onrender.com/videos`
      );
      const data = response.data.data;
      const foundVideo = data.posts.find((v: Video) => v.postId === id);
      setVideo(foundVideo || null);

      // Retrieve likes from local storage
      const storedLikes = localStorage.getItem("likes");
      if (storedLikes) {
        const likes = JSON.parse(storedLikes);

        const existingLike = likes.find(
          (item: { postId: string }) => item.postId === id
        );
        if (existingLike) {
          setLikes(existingLike.like);
          setLiked(existingLike.isLiked);
        } else {
        }
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
    // Update like data in local storage
    const storedLikes = localStorage.getItem("likes");
    let likesArray: {
      like: number;
      postId: string | undefined;
      isLiked: boolean;
    }[] = [];
    if (storedLikes) {
      likesArray = JSON.parse(storedLikes);
    }
    const existingLikeIndex = likesArray.findIndex(
      (item: { postId: string | undefined }) => item.postId === id
    );
    if (existingLikeIndex !== -1) {
      likesArray[existingLikeIndex].isLiked = true;
      likesArray[existingLikeIndex].like = likes + 1;
    } else {
      likesArray.push({
        like: video!.reaction.count + 1,
        postId: id,
        isLiked: true,
      });
    }
    localStorage.setItem("likes", JSON.stringify(likesArray));
  };

  const handleDislike = () => {
    setDisliked(true);
    setLiked(false);
    // Update like data in local storage
    const storedLikes = localStorage.getItem("likes");
    let likesArray: {
      like: number;
      postId: string | undefined;
      isLiked: boolean;
    }[] = [];
    if (storedLikes) {
      likesArray = JSON.parse(storedLikes);
    }
    const existingLikeIndex = likesArray.findIndex(
      (item: { postId: string | undefined }) => item.postId === id
    );
    if (existingLikeIndex !== -1) {
      likesArray[existingLikeIndex].isLiked = false;
      likesArray[existingLikeIndex].like = likes - 1;
    } else {
      likesArray.push({
        like: video!.reaction.count - 1,
        postId: id,
        isLiked: false,
      });
    }
    localStorage.setItem("likes", JSON.stringify(likesArray));
  };
  

  const handleComment = () => {
    // Store comment in local storage or handle comment functionality
    console.log("Comment button clicked");
  };

  return (
    <div className="container mx-auto">
      {video ? (
        <>
          <video
            controls
            className="w-full"
            style={{
              maxWidth: "90%",
              maxHeight: "500px",
              marginLeft: "5%",
              marginRight: "5%",
              borderRadius: "10px",
            }}
            src={video.submission.mediaUrl}
          >
            Your browser does not support the video tag.
          </video>
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-2xl font-bold">{video.submission.title}</h2>
            <div className="flex items-center">
              <div className="flex items-center border border-gray-300 rounded-full px-2 py-1 mr-2">
                <button
                  className={`flex items-center `}
                  onClick={handleLike}
                  disabled={liked}
                >{liked?(<BiSolidLike className="mr-1" />):(<BiLike className="mr-1" />)}
                  
                  <span>{likes == 0 ? video.reaction.count : likes}</span>
                </button>
                <button 
               
                 disabled={disliked}
                className="ml-2" onClick={handleDislike}>
                    {disliked?(<BiSolidDislike className="mr-1"  />):(  <BiDislike  className="mr-1"  />)}
                
                </button>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleComment}
              >
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
