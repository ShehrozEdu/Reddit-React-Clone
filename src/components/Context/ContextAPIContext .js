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
  const [upvotes, setUpvotes] = useState({});
  const [downvotes, setDownvotes] = useState({});
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
  const handleUpClick = async (postId) => {
    const token = localStorage.getItem("token");
  
    // Check if token is available
    if (!token) {
      toast.error("User is not logged in.");
      return;
    }
  
    // Check if the post has already been upvoted
    const alreadyUpvoted = upvotes[postId];
  
    try {
      const response = await axios({
        method: alreadyUpvoted ? "DELETE" : "POST",
        url: `https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          projectId: "t0v7xsdvt1j1",
        },
      });
     
      
      if (response.data.status === "success") {
        toast.success(alreadyUpvoted ? "Upvote removed" : "Upvoted");
  
        // Update likeCount locally
        setLikeCount(likeCount + (alreadyUpvoted ? -1 : 1));
  
        // Update the upvotes state to reflect the toggle
        setUpvotes({ ...upvotes, [postId]: !alreadyUpvoted });
        setIsUpvoted(true);
        setIsDownvoted(false)
        } else {      
        // If the post was previously downvoted, remove the downvote
        if (downvotes[postId]) {
          setDownvotes({ ...downvotes, [postId]: false });
        }
      }
     
    } catch (error) {
      console.error("Upvote operation failed:", error);
      toast.error("You already liked this post")
      setIsUpvoted(true)
      
    }
  };
  
  const handleDownClick = async (postId) => {
    const token = localStorage.getItem("token");

    // Check if token is available
    if (!token) {
        toast.error("User is not logged in.");
        return;
    }

    // Check if the post has already been downvoted
    const alreadyDownvoted = downvotes[postId];
    const alreadyUpvoted = upvotes[postId]; // Check if already upvoted

    try {
        const response = await axios({
            method: alreadyDownvoted ? "DELETE" : "POST",
            url: `https://academics.newtonschool.co/api/v1/reddit/dislike/${postId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                projectId: "t0v7xsdvt1j1",
            },
        });

        if (response.data.status === "success") {
            toast.success(alreadyDownvoted ? "Downvote removed" : "Downvoted");

            // Update the dislikeCountMaintain state
            setDislikeCountMaintain(!alreadyDownvoted);

            // Update the downvotes state to reflect the toggle
            setDownvotes({ ...downvotes, [postId]: !alreadyDownvoted });
            setIsDownvoted(true)

            // If the post was previously upvoted, remove the upvote and update like count
            if (alreadyUpvoted) {
                setUpvotes({ ...upvotes, [postId]: false });
                // Update like count locally
                setLikeCount(likeCount - 1);
            }
        }
    } catch (error) {
        console.error("Downvote operation failed:", error);
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 


    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

 
  return (
    <ContextAPIContext.Provider
      value={{
        isMobile, setIsMobile,handleResize,
        upvotes, setUpvotes,downvotes, setDownvotes,
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
