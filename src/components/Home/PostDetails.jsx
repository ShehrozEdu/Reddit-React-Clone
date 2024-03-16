// PostDetails.js
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import MenuButtons from "./MenuButtons";
import { Scrollbars } from "react-custom-scrollbars-2";
import { ContextAPIContext } from "../Context/ContextAPIContext ";
import { Input } from "@material-tailwind/react";

const PostDetails = ({ posts }) => {
  const { setComments, data } = useContext(ContextAPIContext)
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  // Find the post with the matching id
  const post = posts.find((post) => post._id === id);
  // Check if post is found
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
  const [showMore, setShowMore] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const createdAt = new Date(post.createdAt);
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
  }, [post.createdAt]);

  const [comment, setComment] = useState("");
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/reddit/post/${post._Id}/comments`,
        {
          headers: {
            projectId: "t0v7xsdvt1j1",
          },
        }
      );
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchComments();
  },[])
  const createComment = async () => {
    if (!data) {
      alert("User is not logged in");
      return;
    }
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${post._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "t0v7xsdvt1j1",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: comment,
          }),
        }
      );

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



  return (
    <div className="flex relative">
      <div className="flex flex-col bg-white dark:bg-[#0B1416] rounded-lg xl:w-[75%] lg:w-[75%] w-[100%] p-6">
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
                <p className="ml-1"> {timeAgo}</p>
              </div>
              <p className="text-xs">{post.author?.name}</p>
            </div>
          </div>
        </div>
        <p className="font-bold text-lg text-black dark:text-white">
          {post.content?.slice(0, 40)}
        </p>
        <p className="text-xs text-black-300 mt-2 bg-yellow-500 rounded-xl w-32 py-1 font-bold p-2">
          Foreign Relations
        </p>
        <div className="flex flex-col xl:w-[75%] lg:w-[75%] w-[100%]">          <p className="text-black my-5 dark:text-white">{post?.content}</p>
          <img src={post?.images[0]} alt="img" className="rounded-2xl" />
        </div>
        {/* Post Actions */}
        <div className="inline-flex items-center my-1 py-3">
          <div className="flex justify-between hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl items-center">
            <button className="text-xs">
              <svg
                className="w-5 fill-current text-grey"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
              </svg>
            </button>
            <span className="text-xs font-normal my-1">{post?.likeCount}</span>
            <button className="text-xs">
              <svg
                className="w-5 fill-current text-grey"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10V2h6v8h5l-8 8-8-8h5z" />
              </svg>
            </button>
          </div>
          <div className="flex hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl ml-2 items-center">
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
              {post?.commentCount}
            </span>
          </div>
          {/* Share */}
          <div className="flex hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl ml-2 items-center">
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
              className="flex justify-start border border-gray-400 p-3 cursor-pointer xl:w-[43rem] lg:w-[43rem] w-[27rem] rounded-3xl items-center"
              onClick={() => setIsOpen(true)}
            >
              <span className="dark:text-white">Add a comment</span>
            </div>
          ) : (
            ""
          )}

          {isOpen && (data ? (
            <div className="mt-4 border border-gray-400 rounded-lg p-3 xl:w-[43rem] lg:w-[43rem] w-[27rem]">
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
                  <button className="border border-gray-400 rounded-full p-1">
                    <img src="/images/svgs/newFile.svg" alt="" />
                  </button>
                  <button className="border border-gray-400 rounded-full p-1">
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
            <div className="flex justify-start border border-gray-400 p-3 cursor-pointer xl:w-[43rem] lg:w-[43rem] w-[27rem] rounded-3xl items-center dark:text-white">Please Login to Comment</div>
          ))}

        </div>
        <Comments postId={id} />
      </div>
      <div className="fixed right-40 w-72 bg-gray-100 dark:bg-[#0B1416] dark:border dark: border-white dark:rounded-2xl">
        {" "}
        <div className="p-4 rounded-xl mb-5 xl:block lg:block hidden">
          <div className="border-b pb-2 mb-4 flex">
            <h1 className="text-md font-bold mr-3 dark:text-white">r/{post.channel?.name}</h1>
            <button className="bg-[#0045AC] text-white px-3 rounded-2xl text-xs">
              Join
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-md font-bold dark:text-white">{post.channel?.name} Hub</h2>
            <p className="text-[14px] dark:text-white">
              {showMore ? post?.content : `${post?.content.slice(0, 40)}...`}
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
              <div key={post?.id} className="mb-6 p-2 text-sm xl:block lg:block hidden">
                <div className="flex items-center justify-center bg-[#eaedef] text-black dark:bg-[#4f4a79] p-2 rounded-2xl dark:text-white">
                  <h3>{post?.name}</h3>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default PostDetails;
