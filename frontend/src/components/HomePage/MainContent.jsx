import React, { useState, useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareIcon from '@mui/icons-material/Share';
import UserComment from "../HomePage/UserComment/UserComment";

function MainContent() {
  const [activeCommentIndex, setActiveCommentIndex] = useState(null); // Track the active post
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch posts from backend
  useEffect(() => {
  fetch("http://localhost:5000/allposts") // Replace with your backend URL
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      return response.json();
    })
    .then((data) => {
      setPosts(data.reverse()); // Reverse the array to show latest post first
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
    });
}, []);

  const toggleCommentSection = (idx) => {
    setActiveCommentIndex((prevIndex) => (prevIndex === idx ? null : idx)); // Toggle logic
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading posts...</p>; // Show loading state
  }

  return (
    <main className="flex-1 mb-16 max-w-[600px] w-full pb-4 space-y-6">
      {posts.map((post, idx) => (
        <div key={post._id} className="rounded-lg shadow-md overflow-hidden">
          {/* Post Header */}
          <div className="flex justify-between items-center px-2.5 py-2">
            <div className="flex justify-center items-center cursor-pointer">
              <img
                src="https://img.freepik.com/free-photo/close-up-portrait-young-african-man-with-stubble_171337-1296.jpg" // Default profile image
                alt="Profile"
                className="w-9 h-9 object-cover rounded-full shadow-lg"
              />
              <div className="ml-3">
                <p className="text-[15px]">
                  {post.postedBy?.userName}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {post.updatedAt}
                  {/* Replace with real timestamp if available */}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center cursor-pointer">
              <MoreVertIcon style={{ fontSize: "30px" }} />
            </div>
          </div>

          {/* Post Image */}
          <div className="w-full">
            <img
              className="w-full h-auto max-h-[550px] object-cover"
              src={post.image} // Post image from backend
              alt="Post"
            />
          </div>

          {/* Post Actions */}
          <div className="px-4 mt-1 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button>
                  <FavoriteBorderRoundedIcon style={{ fontSize: "30px" }} />
                </button>
                <button onClick={() => toggleCommentSection(idx)}>
                  <ModeCommentOutlinedIcon style={{ fontSize: "30px" }} />
                </button>
              </div>
              <div className="flex justify-center items-center px-2">
                <button>
                  <ShareIcon style={{ fontSize: "30px" }} />
                </button>
              </div>
            </div>
            <div className=" mt-2 flex items-center tex">
              <span className="mr-1 font-Poppins text-[14px] font-semibold">
                {post.postedBy.name}
              </span>
              <p className=" text-[14px] font-Poppins  ">
                {post.body} {/* Post body from backend */}
              </p>
            </div>

            <p className=" text-[13px] text-gray-600 dark:text-gray-300">
              Liked by 120 people
            </p>
          </div>

          {/* Comment Section */}
          {activeCommentIndex === idx && (
            <div className="mt-2 px-4">
              <UserComment />
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

export default MainContent;
