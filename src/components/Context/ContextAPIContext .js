import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

export const ContextAPIContext = createContext(); // Export ContextAPIContext

export const useContextAPI = () => {
  return useContext(ContextAPIContext);
};

export const ContextAPIProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [popularCommunityChannel, setPopularCommunityChannel] = useState([]);
  const [clickedButton, setClickedButton] = useState("posts");
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [comments, setComments] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Top");
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [commId, setCommId] = useState(false);
  const [recentCommunities, setRecentCommunities] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [likeCountMaintain, setLikeCountMaintain] = useState(false);
  const[otherLike,setOtherLike]=useState([])
  const handleClickToast = () => {
    toast.warning('Work Under Progress');
  };
  

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const data = JSON.parse(localStorage.getItem("userData"));

  const handleClick = (button) => {
    setClickedButton(button);
  };
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const handleAsideToggle = () => {
    setIsAsideOpen(!isAsideOpen);
  };
  const handleUpClick = async (postData) => {
    try {
      if(data){

        setIsUpvoted(!isUpvoted);
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/like/${postData}`,
        {
          method: isUpvoted ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "t0v7xsdvt1j1",
          },
        }
      );
      if (response.ok) {
        console.log("Upvoted");
        toast.success("Upvoted")
      } else {

        console.error("Upvote failed");
        toast.error("Check if you are logged in")

      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownClick = async (postData) => {
    try {
      if(data){
      setIsDownvoted(!isDownvoted);
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/dislike/${postData}`,
        {
          method: isDownvoted ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "t0v7xsdvt1j1",
          },
        }
      );
      if (response.ok) {
        console.log("Downvoted");
        toast.error("Downvoted")

      } else {
        console.error("Downvote failed");
        toast.error("Check if you are logged in")
      }
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };
  const fetchLikedPost = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post/${id}`, {
        headers: {
          projectId: "t0v7xsdvt1j1",
          Authorization: `Bearer ${token}`
        },
      });

      setOtherLike(response.data.data);
      if (response.data.data.isLiked) {
        setIsUpvoted(true)

      }
      if (response.data.data.isDisliked) setIsDownvoted(true);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <ContextAPIContext.Provider
      value={{
        handleClickToast,
        fetchLikedPost,
        handleDownClick,
        handleUpClick,
        posts,
        setPosts,
        setPopularPosts,
        popularPosts,
        clickedButton,
        setClickedButton,
        handleClick,
        popularCommunityChannel,
        setPopularCommunityChannel,
        isSignIn,
        setIsSignIn,
        loading,
        setLoading,
        userData,
        setUserData,
        comments,
        setComments,
        data,
        selectedItem,
        setSelectedItem,
        isUpvoted,
        setIsUpvoted,
        isDownvoted,
        setIsDownvoted,
        commId,
        setCommId,
        recentCommunities,
        setRecentCommunities,
        isAsideOpen,
        setIsAsideOpen,
        handleAsideToggle,
        showResults,
        setShowResults,
        setDarkMode,
        darkMode,
        likeCountMaintain,
        setLikeCountMaintain,
        otherLike,
      }}
    >
      {children}
    </ContextAPIContext.Provider>
  );
};
