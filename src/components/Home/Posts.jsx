import React, { useState, useEffect, useContext } from "react";
import { ContextAPIContext } from "../Context/ContextAPIContext ";
import { Button, Card, Input, List, ListItem, Popover, PopoverContent, PopoverHandler, Spinner } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import axios from "axios";
import axiosInstance from "../Auth/axiosConfig";



const Post2 = ({ postData, handlePostClick, data }) => {
  const [timeAgo, setTimeAgo] = useState("");
  const [joinedStatus, setJoinedStatus] = useState(false);
  const [editToggled, setEditToggled] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState(postData?.title || "");
  const [newPostData, setNewPostData] = useState(postData?.content || '');
  const [newImagesData, setNewImagesData] = useState(postData?.images[0] || null);
  const { setIsUpvoted, setIsDownvoted, setCommId, token, darkMode, handleClickToast } = useContext(ContextAPIContext)
  const [singlePost, setSinglePost] = useState([])


  //conversion of time with createdAt as a base
  useEffect(() => {

    const createdAt = new Date(postData.createdAt);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let timeAgoString = "";
    if (days > 0) {
      timeAgoString = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      timeAgoString = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      timeAgoString = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    setTimeAgo(timeAgoString);
  }, [postData.createdAt]);

  //Fetches a single post
  const fetchLikedPost = async () => {
    try {
      if (!data) {
        return;
      }
      const response = await axiosInstance.get(`/post/${postData._id}`);

      setSinglePost(response.data.data);
      if (response.data.data.isLiked) {
        setIsUpvoted(true)
      }
      if (response.data.data.isDisliked) {
        setIsDownvoted(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetches the post data when this component mounts, and adds it to the global state.
  useEffect(() => {
    fetchLikedPost();
  }, [handleUpClick, handleDownClick])

  const handleUpClick = async (postId) => {
    if (!token) {
      toast.error("User is not logged in.");
      return;
    }

    try {
      // Optimistically update UI
      setSinglePost(prevState => ({
        ...prevState,
        likeCount: prevState.likeCount + (prevState.isLiked ? -1 : 1),
        isLiked: !prevState.isLiked,
      }));

      const method = singlePost.isLiked ? "DELETE" : "POST";
      const response = await axiosInstance({
        method: method,
        url: `/like/${postId}`,
      });

      if (response.data.status === "success") {
        setIsDownvoted(false);
        fetchLikedPost();
      } else {
        // Revert UI update if the request fails
        setSinglePost(prevState => ({
          ...prevState,
          likeCount: prevState.likeCount - (prevState.isLiked ? -1 : 1),
          isLiked: !prevState.isLiked,
        }));
      }
    } catch (error) {
      // Revert UI update if there's an error
      console.error("Upvote operation failed:", error);
      setSinglePost(prevState => ({
        ...prevState,
        likeCount: prevState.likeCount - (prevState.isLiked ? -1 : 1),
        isLiked: !prevState.isLiked,
      }));
    }
  };

  const handleDownClick = async (postId) => {
    if (!token) {
      toast.error("User is not logged in.");
      return;
    }

    try {
      // Optimistically update UI
      setSinglePost(prevState => ({
        ...prevState,
        dislikeCount: prevState.dislikeCount + (prevState.isDisliked ? -1 : 1),
        isDisliked: !prevState.isDisliked,
      }));

      const method = singlePost.isDisliked ? "DELETE" : "POST";
      const response = await axiosInstance({
        method: method,
        url: `/dislike/${postId}`,
      });

      if (response.data.status === "success") {
        setIsUpvoted(false);
        fetchLikedPost();
      } else {
        // Revert UI update if the request fails
        setSinglePost(prevState => ({
          ...prevState,
          dislikeCount: prevState.dislikeCount - (prevState.isDisliked ? -1 : 1),
          isDisliked: !prevState.isDisliked,
        }));
      }
    } catch (error) {
      // Revert UI update if there's an error
      console.error("Downvote operation failed:", error);
      setSinglePost(prevState => ({
        ...prevState,
        dislikeCount: prevState.dislikeCount - (prevState.isDisliked ? -1 : 1),
        isDisliked: !prevState.isDisliked,
      }));
    }
  };





  const deletePost = async (postId) => {
    try {
      const response = await axiosInstance.delete(`/post/${postId}`);

      if (response.status === 200) {
        toast.success("Post deleted successfully");
        setTimeout(() => {
          location.href = "/";
        }, 1200);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };





  const toggleFollow = async (id) => {
    try {
      let url = '';
      let method = '';
      if (joinedStatus) {
        // Unfollow
        url = `https://academics.newtonschool.co/api/v1/quora/follow/${id}`;
        method = 'delete';
      } else {
        // Follow
        url = `https://academics.newtonschool.co/api/v1/quora/follow/${id}`;
        method = 'post';
      }

      const response = await axios({
        method: method,
        url: url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectId': "t0v7xsdvt1j1"
        }
      });

      if (joinedStatus) {
        toast.success("Unfollowed successfully");
      } else {
        toast.success("Followed successfully");
      }
      setJoinedStatus(!joinedStatus);
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Already followed");
      } else {
        console.log(error);
      }
    }
  }


  useEffect(() => {
    const status = localStorage.getItem('joinedStatus');
    if (status) {
      setJoinedStatus(status === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('joinedStatus', joinedStatus);
  }, [joinedStatus]);
  // console.log("before",newImagesData)



  const handleEditPostSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('title', newPostTitle);

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = newPostData;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";

      formData.append('content', plainText);

      // Handle file input separately
      if (newImagesData) {
        formData.append('images', newImagesData);
      }

      const response = await axiosInstance.patch(`/post/${postData._id}`, formData);

      if (response.status === 200) {
        toast.success("Post edited Successfully!");
        setTimeout(() => {
          location.href = "/";
        }, 1300);
      } else {
        toast.error("Can't edit this Post, please retry");
      }
    } catch (error) {
      console.error("Error editing post:", error);
      toast.error("Can't edit this Post, please retry");
    }
  };




  const handleEditToggle = (curr) => {
    setEditToggled(!curr);
  };
  const handleCommunityDetails = (id) => {
    setCommId(id);
    // addToLocalStorage(item);
    navigate(`/community/${id}`)
  }
  const navigate = useNavigate();
  return (
    <>
      {postData.author.name != "ash" && (

        <>

          <div className={`xl:w-10/12  lg:w-10/12 w-full hover:border-grey rounded ${darkMode ? "bg-[#0B1416]" : "bg-white"} cursor-pointer`}>
            <hr />
            <div className="pt-2">
              <div className="flex items-center xl:text-xs lg:text-xs text-[0.7rem] mb-2 justify-between">
                <div className="flex items-center">
                  <a

                    className="font-semibold no-underline hover:underline text-black flex items-center"
                  >
                    <img
                      className="rounded-full border h-5 w-5 bg-blue-gray-200"
                      src={postData.author.profileImage || "/images/svgs/defaultProfile.svg"}
                      alt="Avatar"
                    />
                    {postData.channel?.name ? <span className="ml-2 text-black dark:text-white" onClick={postData.channel ? () => handleCommunityDetails(postData.channel._id) : () => toast.error("Channel not found")}>
                      r/{postData.channel?.name}
                    </span> : <a className="text-grey mx-1 no-underline hover:underline dark:text-white" onClick={() => navigate(`/users/${(postData.author?.name)}/`)}>

                      u/{(postData.author?.name)}
                    </a>}

                  </a>
                  <span className="text-grey-light mx-1 text-xxs dark:text-white">•</span>
                  <span className="text-grey dark:text-white">Posted by</span>
                  <a className="text-grey mx-1 no-underline hover:underline dark:text-white" onClick={() => navigate(`/users/${(postData.author?.name)}/`)}>

                    {(postData.author?.name)}
                  </a>
                  <span className="text-grey dark:text-white ml-2">{timeAgo}</span>
                </div>

                <div className="flex items-center">
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-threeDots.svg" : "/images/svgs/threeDots.svg"} alt="" />
                    </PopoverHandler>
                    <PopoverContent className="dark:bg-black">

                      <List className="w-52">
                        <ListItem >
                          {data ? (
                            <div
                              className="text-black dark:text-white dark:bg-black p-2 rounded-full"
                              onClick={() => toggleFollow(postData.author._id)}
                            >
                              {joinedStatus ? "Unfollow" : "Follow User"}
                            </div>
                          ) : <ListItem onClick={() => toast.success("Reported")}> Report</ListItem>}
                        </ListItem>
                        {data?._id === postData.author._id && (
                          <>
                            <ListItem>
                              <div
                                className="text-black dark:text-white dark:bg-black p-2 rounded-full"
                                onClick={() => deletePost(postData?._id)}
                              >
                                Delete
                              </div>
                            </ListItem>
                            <ListItem>
                              <div
                                className="text-black dark:text-white dark:bg-black p-2 rounded-full"
                                onClick={() => handleEditToggle(editToggled)}
                              >
                                Edit post
                              </div>
                            </ListItem>
                          </>
                        )}
                      </List>


                      {data?._id === postData.author._id && (
                        <div className="flex items-center">


                        </div>
                      )}
                    </PopoverContent>
                  </Popover>

                </div>
              </div>
              {!editToggled ? <> <div className="flex flex-col" onClick={() => {
                if (localStorage.getItem('token')) {
                  handlePostClick(postData._id)
                } else {
                  toast.error("Login please")
                }
              }}>
                <h2 className={`text-lg font-normal mb-1 dark:text-white ${postData.title ? "font-semibold" : ""}`}>
                  {postData?.title || (postData.content && postData.content.length > 150
                    ? postData.content.slice(0, 150) + "..."
                    : postData.content)}
                </h2>
                <h2 className="text-lg font-normal mb-1 dark:text-white">
                  {postData?.title && (postData.content && postData.content.length > 150
                    ? postData.content.slice(0, 150) + "..."
                    : postData.content)}
                </h2>

                {postData.images.length > 0 ? (
                  <div>
                    <div className="max-w-96">

                      <img src={postData?.images[0]} alt="avatar" className="w-full" />
                    </div>
                  </div>) : ""
                }
              </div>
                <div className="inline-flex items-center my-1">
                  <div className="flex justify-between hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl items-center">
                    <button className="text-xs" onClick={() => handleUpClick(postData._id)}>
                      {!singlePost.isLiked ? (
                        <svg
                          rpl=""
                          fill="currentColor"
                          height="16"
                          icon-name="upvote-outline"
                          viewBox="0 0 20 20"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path>
                        </svg>
                      ) : (
                        <svg
                          rpl=""
                          fill="currentColor"
                          height="16"
                          icon-name="upvote-fill"
                          viewBox="0 0 20 20"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.706 8.953 10.834.372A1.123 1.123 0 0 0 10 0a1.128 1.128 0 0 0-.833.368L1.29 8.957a1.249 1.249 0 0 0-.171 1.343 1.114 1.114 0 0 0 1.007.7H6v6.877A1.125 1.125 0 0 0 7.123 19h5.754A1.125 1.125 0 0 0 14 17.877V11h3.877a1.114 1.114 0 0 0 1.005-.7 1.251 1.251 0 0 0-.176-1.347Z"></path>{" "}
                        </svg>
                      )}
                    </button>
                    <span className="text-xs font-normal my-1">
                      {data ? [singlePost.likeCount, singlePost.dislikeCount].reduce((a, b) => a - b) : [postData.likeCount, postData.dislikeCount].reduce((a, b) => a - b)}
                    </span>


                    <button className="text-xs" onClick={() => handleDownClick(postData._id)}>
                      {!singlePost.isDisliked ? (
                        <svg
                          rpl=""
                          fill="currentColor"
                          height="16"
                          icon-name="downvote-outline"
                          viewBox="0 0 20 20"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z"></path>
                        </svg>
                      ) : (
                        <svg
                          rpl=""
                          fill="currentColor"
                          height="16"
                          icon-name="downvote-fill"
                          viewBox="0 0 20 20"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.88 9.7a1.114 1.114 0 0 0-1.006-.7H14V2.123A1.125 1.125 0 0 0 12.877 1H7.123A1.125 1.125 0 0 0 6 2.123V9H2.123a1.114 1.114 0 0 0-1.005.7 1.25 1.25 0 0 0 .176 1.348l7.872 8.581a1.124 1.124 0 0 0 1.667.003l7.876-8.589A1.248 1.248 0 0 0 18.88 9.7Z"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="flex hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl ml-2 items-center" onClick={() => handlePostClick(postData._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                    <span className="ml-1 text-xs font-normal text-grey">
                      {postData?.commentCount}
                    </span>
                  </div>
                  <div className="flex hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl ml-2 items-center" onClick={() => handleClickToast()}>
                    <svg
                      rpl=""
                      aria-hidden="true"
                      className="icon-share"
                      fill="currentColor"
                      height="20"
                      icon-name="share-ios-outline"
                      viewBox="0 0 20 20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 11v5.378A2.625 2.625 0 0 1 16.378 19H3.622A2.625 2.625 0 0 1 1 16.378V11h1.25v5.378a1.373 1.373 0 0 0 1.372 1.372h12.756a1.373 1.373 0 0 0 1.372-1.372V11H19ZM9.375 3.009V14h1.25V3.009l2.933 2.933.884-.884-4-4a.624.624 0 0 0-.884 0l-4 4 .884.884 2.933-2.933Z"></path>{" "}
                    </svg>
                    <span className="ml-2 text-xs font-normal text-grey">Share</span>
                  </div>
                </div></> : <>
                <div>
                  <Input type="text" placeholder='Title' className='text-black' value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
                  <ReactQuill
                    value={newPostData}
                    onChange={(value) => setNewPostData(value)}
                    className="w\-full border border-gray-300 rounded-md p-2 mb-2 mt-2 dark:text-white"
                  />
                  <input
                    type="file"
                    id='images'
                    onChange={(e) => setNewImagesData(e.target.files[0])}
                    className="mb-2 mt-5"
                  />
                  <button onClick={handleEditPostSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                </div>
              </>}
            </div>
          </div>
        </>
      )}
    </>
  );
};



const Posts = ({ posts, error, popularPosts, fetchPosts, handlePostClick }) => {

  // Importing necessary context and hooks
  const { selectedItem, loading, data, darkMode } = useContext(ContextAPIContext);

  // Getting current location
  const location = useLocation();

  // Defining data to display based on the current path
  let dataToDisplay;
  if (location.pathname === "/popular") {
    // If on the "/popular" path, display popular posts
    dataToDisplay = popularPosts;
  } else {
    // Otherwise, display regular posts
    dataToDisplay = posts;
  }

  // Sorting posts based on the selected item
  if (selectedItem === "Hot") {
    // Sorting posts by a custom formula for "Hot" posts
    posts.sort(
      (a, b) =>
        Math.abs(1 - a.likeCount / a.dislikeCount) -
        Math.abs(1 - b.likeCount / b.dislikeCount)
    );

  } else if (selectedItem === "Best") {
    // Sorting posts by the ratio of likes to dislikes for "Best" posts
    posts.sort(
      (a, b) => b.likeCount / b.dislikeCount - a.likeCount / a.dislikeCount
    );

  } else if (selectedItem === "New") {
    // Sorting posts by creation date for "New" posts
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  } else if (selectedItem === "Top") {
    // Sorting posts by like count for "Top" posts
    posts.sort((a, b) => b.likeCount - a.likeCount);

  } else if (selectedItem === "Rising") {
    // Sorting posts by a combination of like count and comment count for "Rising" posts
    posts.sort(
      (a, b) => b.likeCount + b.commentCount - (a.likeCount + a.commentCount)
    );

  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="xl:w-[70%] lg:w-[70%] md-[80%] w-[100%] p-2">
      <div className="flex">
        {/* Main Content */}
        <div className={`${darkMode ? 'bg-[#0B1416]' : ''}`}>
          {/* Mapping over the dataToDisplay array to render Post2 components */}
          {dataToDisplay.map((postData, index) => (
            <React.Fragment key={index}>

              {/* Rendering Post2 component for each post data */}
              {postData ? <Post2 postData={postData} handlePostClick={handlePostClick} fetchPosts={fetchPosts} data={data} /> : <div className="text-red-500">Error: Failed to load post</div>}
              {/* Alternative way of rendering Post2 component */}
              {/* <Post2 postData={postData} /> */}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/* Displaying a spinner if loading is true */}
        {loading && <Spinner className="w-16 text-gray-900/50 dark:text-white h-[100vh]" />}
      </div>
    </div>

  );
};

export default Posts;
