import React, { createContext, useState, useContext, useEffect } from "react";

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
  const [selectedItem, setSelectedItem] = useState("Hot");
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [commId, setCommId] = useState(false);
  const [recentCommunities, setRecentCommunities] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const data = JSON.parse(localStorage.getItem("userData"));

  const handleClick = (button) => {
    setClickedButton(button);
  };
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const handleAsideToggle = () => {
    setIsAsideOpen(!isAsideOpen);
  };
  return (
    <ContextAPIContext.Provider
      value={{
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
        showResults,setShowResults,setDarkMode,darkMode,
      }}
    >
      {children}
    </ContextAPIContext.Provider>
  );
};
