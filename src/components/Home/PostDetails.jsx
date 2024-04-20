import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import MenuButtons from "./MenuButtons";
import { ContextAPIContext } from "../Context/ContextAPIContext ";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const PostDetails = ({ posts }) => {
  const { setComments,comments, data, handleClickToast,handlePostClick, checkUserLoggedIn} = useContext(ContextAPIContext);
  const params = useParams();
  const timePost = posts?.find((post) => post?._id === params?.id);
  // console.log(timePost.createdAt)
  const [post, setPostD] = useState({})
  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");

  if (!post) {
    return <div>Post not found</div>;
  }
  const commBookmarks = [
    {
      id: 1,
      name: "🤝 Volunteer With Us",
      title: "Post Title 1",
      upvotes: 123,
      commentsCount: 45,
    },
    {
      id: 2,
      name: "✍🏽 Wiki",
      title: "Post Title 2",
      upvotes: 456,
      commentsCount: 78,
    },
    {
      id: 3,
      name: "💼 Job Board",
      title: "Post Title 3",
      upvotes: 789,
      commentsCount: 12,
    },
    {
      id: 4,
      name: "🎙️ AMAs",
      title: "Post Title 3",
      upvotes: 789,
      commentsCount: 12,
    },
    {
      id: 5,
      name: "🧵 Must Read Threads",
      title: "Post Title 3",
      upvotes: 789,
      commentsCount: 12,
    },
  ];

// createComment: Allows a user to create a comment on a specific post. Checks if user is logged in and sends a POST request to server with comment content.
  const createComment = async () => {
    if (!data) {
      toast.error("User is not logged in");
      return;
    }
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${post._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "t0v7xsdvt1j1",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Response was not ok");
      }

      const data = await response.json();
      setComment(prevComments => [...prevComments, { content: comment, ...data }]);
      fetchComments();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // handlePostDetails: Fetches details of a specific post based on the provided post ID. Sends a GET request to the server and updates state with retrieved post data.
  const handlePostDetails = async () => {
    if (!checkUserLoggedIn()) {
      toast.error("User is not logged in");
      return;
    }
    if (!data) {
      toast.error("User is not logged in");
      return;
    }
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/post/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "t0v7xsdvt1j1",
        },
      });

      if (!response.ok) {
        throw new Error("Response was not ok");
      }

      const responseData = await response.json();
      const { status, data } = responseData;
      setPostD(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // fetchComments: Retrieves comments for a specific post. Sends a GET request to the server and updates state with retrieved comments.
  const fetchComments = async () => {
    const token=localStorage.getItem("token")
    try {
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post/${params.id}/comments`, {
        headers: {
          projectId: "t0v7xsdvt1j1",
          authorization: `Bearer ${token}`
        },
      });
      setComments(response.data.data);
      // console.log(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlePostDetails()
  }, [])
  useEffect(() => {
    fetchComments();
  }, []);


  useEffect(() => {
    handlePostDetails()
  }, [handlePostClick])
// handleUpClick: Allows a user to upvote a post. Toggles upvote status and sends appropriate request (POST/DELETE) to server.
 
  const handleUpClick = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User is not logged in.");
      return;
    }
    try {
      const response = await axios({
        method: post.isLiked === true ? "DELETE" : "POST",
        url: `https://academics.newtonschool.co/api/v1/reddit/like/${postId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          projectId: "t0v7xsdvt1j1",
        },
      });

      if (response.data.status === "success") {
        toast.success(post.isLiked ? "Upvote removed" : "Upvoted");

        // Adjust likeCount and dislikeCount
        if (post.isLiked) {
          post.likeCount -= 1; // Remove upvote
        } else {
          post.likeCount += 1; // Add upvote
          if (post.isDisliked) {
            post.dislikeCount -= 1; // Remove downvote if switching from downvote to upvote
          }
        }

        // Toggle isLiked and isDisliked states
        post.isLiked = !post.isLiked;

        handlePostDetails();
      }
    } catch (error) {
      console.error("Upvote operation failed:", error);

    }
  };
// handleDownClick: Allows a user to downvote a post. Toggles downvote status and sends appropriate request (POST/DELETE) to server.
const handleDownClick = async (postId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("User is not logged in.");
    return;
  }

  try {
    const response = await axios({
      method: post.isDisliked === true ? "DELETE" : "POST",
      url: `https://academics.newtonschool.co/api/v1/reddit/dislike/${postId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        projectId: "t0v7xsdvt1j1",
      },
    });

    if (response.data.status === "success") {
      toast.success(post.isDisliked ? "Downvote removed" : "Downvoted");

      // Adjust likeCount and dislikeCount
      if (post.isDisliked) {
        post.dislikeCount -= 1; // Remove downvote
      } else {
        post.dislikeCount += 1; // Add downvote
        if (post.isLiked) {
          post.likeCount -= 1; // Remove upvote if switching from upvote to downvote
        }
      }

      // Toggle isDisliked and isLiked states
      post.isDisliked = !post.isDisliked;

      handlePostDetails();
    }
  } catch (error) {
    console.error("Downvote operation failed:", error);

  }
};
  return (
    <>
      <div className="flex relative  h-screen">
        <div className="flex flex-col bg-white dark:bg-[#0B1416] rounded-lg xl:w-[75%] lg:w-[75%] w-[100%] xl:p-6 lg:p-6 md:p-4 p-0">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 bg-gray-500 mr-2">
                <img src={post.channel?.image} className="rounded-full" alt="" />
              </div>
              <div>
                <div className="text-sm text-gray-600 flex justify-between">
                  <p className="mr-1 dark:text-white">r/{post.channel?.name}</p>
                  <span
                    id="time-ago-separator"
                    class="flex items-center w-2xs text-[#576F76] font-normal text-12"
                  >
                    •
                  </span>
                  <p className="ml-1 dark:text-white">{moment(timePost?.createdAt)?.fromNow()}</p>
                </div>
                <p className="text-xs dark:text-white">{post.author?.name}</p>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg text-black dark:text-white">
            {post?.title && post.title.length > 10
              ? post.title.slice(0, 15)
              : post.title || (post.content && post.content.length > 16
                ? post.content.slice(0, 16) + "..."
                : post.content)}
          </p>
          <p className="text-xs text-black-300 mt-2 bg-yellow-500 rounded-xl w-32 py-1 font-bold p-2">
            Foreign Relations
          </p>
          <div className="flex flex-col xl:w-[75%] lg:w-[75%] w-[100%]"> 
                   <p className="text-black my-5 dark:text-white">{(post?.content) ? (post?.content) : (post?.title)}</p>
            {(post.images)?.length>0&&<img src={post?.images} alt="img" className="rounded-2xl" />}
          </div>
          {/* Post Actions */}
          <div className="inline-flex items-center my-1 py-3">
            <div className={`flex justify-between hover:bg-grey-lighter p-2  rounded-xl items-center bg-gray-300`}>
              <button className="text-xs" onClick={()=>handleUpClick(post._id)}>
                {!post.isLiked ? (
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
                    <path d="M18.706 8.953 10.834.372A1.123 1.123 0 0 0 10 0a1.128 1.128 0 0 0-.833.368L1.29 8.957a1.249 1.249 0 0 0-.171 1.343 1.114 1.114 0 0 0 1.007.7H6v6.877A1.125 1.125 0 0 0 7.123 19h5.754A1.125 1.125 0 0 0 14 17.877V11h3.877a1.114 1.114 0 0 0 1.005-.7 1.251 1.251 0 0 0-.176-1.347Z"></path>
                  </svg>
                )}
              </button>
              <span className="text-xs font-normal my-1">{post.likeCount}</span>
              <button className="text-xs" onClick={()=>handleDownClick(post._id)}>
                {!post.isDisliked ? (
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
            <div className="flex hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl ml-2 items-center"  onClick={() => setIsOpen(!isOpen)}>
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
              <span className="ml-2 text-xs font-normal text-grey">
                {comments.length}
              </span>
            </div>
            {/* Share */}
            <div className="flex hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl ml-2 items-center" onClick={()=>handleClickToast()}>
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
          </div>
          <MenuButtons />
          <div>
            {!isOpen ? (
              <div
                className="flex justify-start border border-gray-400 p-3 cursor-pointer responsiveCommentWidth rounded-3xl items-center"
                onClick={() => setIsOpen(true)}
              >
                <span className="dark:text-white">Add a comment</span>
              </div>
            ) : (
              ""
            )}

            {isOpen && (data ? (
              <div className="mt-4 border border-gray-400 rounded-lg p-3 responsiveCommentWidth">
                <div className="flex items-center space-x-2">
                  <Input
                    className="flex-grow border-none focus:outline-none dark:text-white"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="flex justify-between mt-2 space-x-2">
                  <div>
                    <button className="border border-gray-400 rounded-full p-1" onClick={() => handleClickToast()}>
                      <img src="/images/svgs/newFile.svg" alt="" />
                    </button>
                    <button className="border border-gray-400 rounded-full p-1" onClick={() => handleClickToast()}>
                      <img src="/images/svgs/T.svg" alt="" />
                    </button>
                  </div>
                  <div>
                    <button className="border border-gray-400 rounded-full px-4 py-1 dark:text-white" onClick={() => setIsOpen(false)}>
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 dark:bg-[#4f4a79] text-white  px-4 py-1 rounded-xl"
                      onClick={async () => {
                        await createComment();
                        setComment("");
                        setIsOpen(false);
                      }}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-start border border-gray-400 p-3 cursor-pointer xl:w-[32rem] lg:w-[32rem] w-[25rem] rounded-3xl items-center dark:text-white">Please Login to Comment</div>
            ))}

          </div>
          <Comments postId={params.id} />
        </div>
        <div className="fixed xl:block lg:block hidden right-10 w-72 bg-gray-100 dark:bg-[#0B1416] dark:border dark: border-white dark:rounded-2xl">
          {" "}
          <div className="p-4 rounded-xl mb-5 xl:block lg:block hidden">
            <div className="border-b pb-2 mb-4 flex">
              <h1 className="text-md font-bold mr-3 dark:text-white">r/{post.channel?.name || "Channel"}</h1>
              <button className="bg-[#0045AC] text-white px-3 rounded-2xl text-xs" onClick={() => handleClickToast()}>
                Join
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-md font-bold dark:text-white">{post.channel?.name|| "Community "} Hub</h2>
              <p className="text-[14px] dark:text-white">
                {showMore ? post?.content : `${post?.content?.slice(0, 40)}...`}
              </p>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-blue-500 text-[14px] dark:text-white"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </div>

            <div className="flex justify-between items-center mb-6 pb-4">
              <div className="text-sm dark:text-white">
                <span className="font-bold text-sm dark:text-white">915K</span> Members
              </div>
              <div className="text-sm dark:text-white">
                <span className="font-bold text-sm dark:text-white">2.2K</span> Online
              </div>
            </div>
          </div>
          <hr />
          <div className="flex justify-start p-2 py-4">
            <div className="flex items-center space-x-2">
              <img src="/images/svgs/defaultProfile.svg" className="w-7 h-7 bg-gray-400 rounded-full" alt="" />
              <p className="dark:text-white"> {data?.name}</p>
            </div>
          </div>
          <div>
            <hr />
            {commBookmarks.map((post) => (
              <div key={post?.id} className="mb-6 p-2 text-sm xl:block lg:block hidden cursor-pointer" onClick={handleClickToast}>
                <div className="flex items-center justify-center bg-[#eaedef] text-black dark:bg-[#4f4a79] p-2 rounded-2xl dark:text-white">
                  <h3>{post?.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
