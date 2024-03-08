// Home.tsx
import React, { useState, useEffect } from 'react';
import VideoCard from '../Component/VideoCard';
import Pagination from '../Component/Pagination';
// import VideoCard from './VideoCard';
// import Pagination from './Pagination';

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

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetchVideos();
  }, [currentPage]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`https://internship-service.onrender.com/videos?page=${currentPage}`);
      const data = await response.json();
      setVideos(data.data.posts);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.postId} video={video} />
        ))}
      </div>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
