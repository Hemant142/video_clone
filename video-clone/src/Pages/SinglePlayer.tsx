import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";

const SinglePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { page } = useParams();
  const [video, setVideo] = useState<any>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<string[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [expend, setExpend] = useState(false);
  const [newComment, setNewComment] = useState<string>("");
  //  console.log(page,"page")
  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, [liked, totalComments]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://internship-service.onrender.com/videos?page=${page}`
      );
      const data = response.data.data;

      const foundVideo = data.posts.find((v: any) => v.postId === id);
      console.log(data, "vidfound");
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
        }
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const fetchComments = () => {
    const storedComments = localStorage.getItem(`comments_${id}`);
    if (storedComments) {
      const parsedComments = JSON.parse(storedComments);
      setComments(parsedComments);
      setTotalComments(parsedComments.length);
    }
  };

  const addComment = () => {
    if (newComment.trim() === "") {
      alert("Please add a comment");
      return;
    }
    const storedComments = localStorage.getItem(`comments_${id}`);
    let commentsArray: string[] = [];
    if (storedComments) {
      commentsArray = JSON.parse(storedComments);
    }
    commentsArray.push(newComment);
    localStorage.setItem(`comments_${id}`, JSON.stringify(commentsArray));
    setNewComment("");
    setTotalComments(totalComments + 1);
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
    addComment();
  };
  const handleCommentCancel = () => {
    setNewComment("");
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
          <div className="flex justify-between items-center mt-4 mr-5 ml-5">
            <div>
              {" "}
              <h2 className="text-2xl font-bold">{video.submission.title}</h2>
              <h4 className="text-md font-bold">{video.creator.name}</h4>
            </div>

            <div className="flex items-center">
              <div className="flex items-center border border-gray-300 rounded-full px-2 py-1 mr-2">
                <button
                  className={`flex items-center `}
                  onClick={handleLike}
                  disabled={liked}
                >
                  {liked ? (
                    <BiSolidLike className="mr-1" />
                  ) : (
                    <BiLike className="mr-1" />
                  )}
                  <span>{likes == 0 ? video.reaction.count : likes}</span>
                </button>
                <button
                  disabled={disliked}
                  className="ml-2"
                  onClick={handleDislike}
                >
                  {disliked ? (
                    <BiSolidDislike className="mr-1" />
                  ) : (
                    <BiDislike className="mr-1" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mr-5 ml-5">
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
          <div className="mr-5 ml-5">
            <h3 className="text-xl font-bold">{totalComments} Comments</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <input
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none"
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-10">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleCommentCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleComment}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-gray-100 rounded-md p-3">
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No video found</div>
      )}
    </div>
  );
};

export default SinglePlayer;
