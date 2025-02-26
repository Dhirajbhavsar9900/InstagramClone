import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import LeftSidebar from "../HomePage/LeftSidebar";
import BottomNav from "../HomePage/BottomNav";
import Mobilelogout from "./MobileHeader/Mobilelogout";
import ProfileAbout from "./ProfileAbout.js/ProfileAbout";
import ProfilePostLoader from "../Loaders/ProfilePostLoader";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const postsRef = useRef(null); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://instagramclone-djuv.onrender.com/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          setPosts(result);
          setUserInfo(result[0].postedBy);
        }
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && activeTab === "posts") {
   
      gsap.fromTo(
        postsRef.current.children,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [loading, activeTab]);

  return (
    <>
      <div className="flex h-screen flex-row">
        <LeftSidebar />
        <div className="flex-1 flex flex-col items-center overflow-y-auto">
          <Mobilelogout />
          <ProfileAbout 
            userInfo={userInfo} 
            posts={posts} 
            handleEditProfile={handleEditProfile}
          />

          {/* Tabs */}
          <div className="w-full max-w-5xl border-t border-b py-2 border-gray-300 dark:border-gray-700">
            <div className="flex justify-center space-x-10 text-gray-500 dark:text-gray-400 py-2">
              <button
                onClick={() => handleTabChange("posts")}
                className={`hover:text-gray-800 dark:hover:text-gray-100 ${
                  activeTab === "posts"
                    ? "text-gray-800 dark:text-gray-100"
                    : ""
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => handleTabChange("tagged")}
                className={`hover:text-gray-800 dark:hover:text-gray-100 ${
                  activeTab === "tagged"
                    ? "text-gray-800 dark:text-gray-100"
                    : ""
                }`}
              >
                Tagged
              </button>
            </div>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center w-full h-64">
              <ProfilePostLoader />
            </div>
          ) : (
            // Posts Section
            <div
              className="w-full max-w-5xl grid grid-cols-3 gap-[5px] py-2 pb-16 justify-center"
              ref={postsRef}
            >
              {activeTab === "posts" && posts.length > 0 ? (
                [...posts].reverse().map((post, index) => (
                  <div
                    key={post._id || index}
                    className="aspect-square bg-gray-300 dark:bg-gray-700 overflow-hidden"
                  >
                    <img
                      onClick={() => {
                        console.log(`Navigating to post: ${post._id}`);
                      }}
                      src={post.image}
                      alt={post.body}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                    <p className="text-center text-sm mt-2 text-gray-800 dark:text-gray-100">
                      {post.body}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No posts to display.
                </p>
              )}
              {activeTab === "tagged" && (
                <p>Tagged content will be displayed here.</p>
              )}
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </>
  );
}

export default UserProfile;
