import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { ContextAPIContext } from "../Context/ContextAPIContext ";

// Dummy onDeleteComment function
const onDeleteComment = (comment) => {
  console.log("Deleting comment:", comment.id);
  // Implement your delete comment logic here
};

const Comments = ({ postId }) => {
  const{comments,setComments,data}=useContext(ContextAPIContext)
  const [expandedReplies, setExpandedReplies] = useState({});
  const [count, setCount] = useState(5);

  const toggleReplies = (commentId) => {
    setCount(count + 3);
    setExpandedReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
 
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments`,
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
    useEffect(() => {
    fetchComments();

  }, [postId]);
  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token"); 
  
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/reddit/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': "t0v7xsdvt1j1"
        }
      });
  
      if (!response.ok) {
        throw new Error('Response was not ok');
      }
  
      fetchComments();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment,index) => (
        <>
          <div key={index} className="p-4 pb-0 rounded-lg xl:w-[42rem] lg:w-[42rem] w-full">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div slot="commentAvatar" className="mr-2">
                  <faceplate-hovercard
                    enter-delay="500"
                    leave-delay="150"
                    position="bottom-start"
                    data-id="user-hover-card"
                    close-on-track=""
                    aria-label="Mr_-_Avocado"
                    appearance="neutral"
                  >
                    <div className="flex flex-row items-center">
                      <faceplate-tracker
                        source="post_detail"
                        action="click"
                        noun="comment_author_avatar"
                        className="flex items-center"
                      >
                        <a
                          href=""
                          className="flex items-center my-2xs mr-xs xs:mr-sm"
                          aria-label=""
                          aria-haspopup="dialog"
                          aria-expanded="false"
                        >
                          <div className="flex items-center justify-center w-lg h-lg xs:w-xl xs:h-xl">
                            <span
                              className="inline-flex items-center justify-center"
                              rpl=""
                            >
                              <span className="inline-flex relative w-[2rem] h-[2rem]">
                                <div
                                  className="absolute h-full w-full"
                                  style={{ transform: "translateY(-7%)" }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 64 64"
                                    fill="none"
                                  >
                                    <path
                                      d="M29 1.73205C30.8564 0.660254 33.1436 0.660254 35 1.73205L56.7128 14.2679C58.5692 15.3397 59.7128 17.3205 59.7128 19.4641V44.5359C59.7128 46.6795 58.5692 48.6603 56.7128 49.7321L35 62.2679C33.1436 63.3397 30.8564 63.3397 29 62.2679L7.28719 49.7321C5.43078 48.6603 4.28719 46.6795 4.28719 44.5359V19.4641C4.28719 17.3205 5.43078 15.3397 7.28719 14.2679L29 1.73205Z"
                                      fill="url(#paint0_diamond_26026_173944)"
                                    ></path>
                                    <path
                                      d="M29 1.73205C30.8564 0.660254 33.1436 0.660254 35 1.73205L56.7128 14.2679C58.5692 15.3397 59.7128 17.3205 59.7128 19.4641V44.5359C59.7128 46.6795 58.5692 48.6603 56.7128 49.7321L35 62.2679C33.1436 63.3397 30.8564 63.3397 29 62.2679L7.28719 49.7321C5.43078 48.6603 4.28719 46.6795 4.28719 44.5359V19.4641C4.28719 17.3205 5.43078 15.3397 7.28719 14.2679L29 1.73205Z"
                                      fill="url(#paint1_linear_26026_173944)"
                                    ></path>
                                    <defs>
                                      <radialGradient
                                        id="paint0_diamond_26026_173944"
                                        cx="0"
                                        cy="0"
                                        r="1"
                                        gradientUnits="userSpaceOnUse"
                                        gradientTransform="translate(-6.59974 23.1999) rotate(15.9097) scale(44.5051 21406.7)"
                                      >
                                        <stop stop-color="#1185B5"></stop>
                                        <stop
                                          offset="0.29452"
                                          stop-color="#D7F7FF"
                                        ></stop>
                                        <stop
                                          offset="0.526042"
                                          stop-color="#5EF6D8"
                                        ></stop>
                                        <stop
                                          offset="0.838434"
                                          stop-color="#5EF6D8"
                                        ></stop>
                                        <stop
                                          offset="0.867246"
                                          stop-color="#1990B9"
                                        ></stop>
                                        <stop
                                          offset="1"
                                          stop-color="#3F9FC6"
                                        ></stop>
                                      </radialGradient>
                                      <linearGradient
                                        id="paint1_linear_26026_173944"
                                        x1="23.5687"
                                        y1="22.7061"
                                        x2="44.1183"
                                        y2="53.4817"
                                        gradientUnits="userSpaceOnUse"
                                      >
                                        <stop stop-color="#004E5F"></stop>
                                        <stop
                                          offset="1"
                                          stop-color="#727CD8"
                                          stop-opacity="0.81"
                                        ></stop>
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </div>
                                <span className="absolute h-full w-full left-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 72 72"
                                    fill="none"
                                  >
                                    <path
                                      d="M34 3.4641C35.2376 2.74957 36.7624 2.74957 38 3.4641L63.1769 18C64.4145 18.7145 65.1769 20.035 65.1769 21.4641V50.5359C65.1769 51.965 64.4145 53.2855 63.1769 54L38 68.5359C36.7624 69.2504 35.2376 69.2504 34 68.5359L8.82309 54C7.58548 53.2855 6.82309 51.965 6.82309 50.5359V21.4641C6.82309 20.035 7.58548 18.7145 8.82309 18L34 3.4641Z"
                                      stroke="url(#paint0_diamond_26526_186798)"
                                      stroke-width="4"
                                      stroke-linejoin="round"
                                    ></path>
                                    <defs>
                                      <radialGradient
                                        id="paint0_diamond_26526_186798"
                                        cx="0"
                                        cy="0"
                                        r="1"
                                        gradientUnits="userSpaceOnUse"
                                        gradientTransform="translate(-7.4247 26.0998) rotate(15.9097) scale(50.0682 24082.5)"
                                      >
                                        <stop stop-color="#1185B5"></stop>
                                        <stop
                                          offset="0.29452"
                                          stop-color="#D7F7FF"
                                        ></stop>
                                        <stop
                                          offset="0.526042"
                                          stop-color="#5EF6D8"
                                        ></stop>
                                        <stop
                                          offset="0.838434"
                                          stop-color="#5EF6D8"
                                        ></stop>
                                        <stop
                                          offset="0.867246"
                                          stop-color="#1990B9"
                                        ></stop>
                                        <stop
                                          offset="1"
                                          stop-color="#3F9FC6"
                                        ></stop>
                                      </radialGradient>
                                    </defs>
                                  </svg>
                                </span>
                                <div
                                  className="absolute h-full w-full"
                                  style={{ transform: "translateY(-7%)" }}
                                >
                                  <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 120 120"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="overflow-hidden"
                                  >
                                    <defs>
                                      <clipPath id="7843d97e87783">
                                        <path
                                          d="M120 0H0V96H22.0602C22.5169 98.2109 23.896 100.155 25.8949 101.309L56
          118.691C58.4752 120.12 61.5248 120.12 64 118.691L94.1051 101.309C96.104 100.155 97.4831
          98.2109 97.9398 96H120V0Z"
                                        ></path>
                                      </clipPath>
                                    </defs>
                                    <image
                                      href="https://styles.redditmedia.com/t5_31wxb9/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfNDY2YTMzMDg4N2JkZjYyZDUzZjk2OGVhODI0NzkzMTUwZjA3NzYyZV82MTEzOTE_rare_573f6c0f-8896-4bf9-b485-8bf4b269d136-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;s=0f4a5ba1668df72e1e0486c6c8b875ffa1eb1167"
                                      alt="User Avatar"
                                      clip-path="url(#7843d97e87783)"
                                      height="100%"
                                      width="100%"
                                    ></image>
                                  </svg>
                                </div>
                              </span>
                            </span>
                          </div>
                        </a>
                      </faceplate-tracker>
                    </div>
                  </faceplate-hovercard>
                </div>
                <strong className="mr-3 text-sm">{data?._id===comment.author? 'You': comment.author}</strong>
                *&nbsp;{" "}
                <p className="text-sm">{moment(comment.createdAt).fromNow()}</p>
           
              </div>
              {comment.author ===data?._id?  <button className="text-red-500 text-end" onClick={() => deleteComment(comment?._id)}>Delete</button>:""}
            </div>
            <div className="p-3 pt-0 mt-2 flex flex-col justify-between hover:bg-grey-lighter rounded-xl border-l">
              <div className="flex justify-between items-center ml-4">
                <p className=" text-gray-500">{comment.content}</p>

                {/* Post Actions */}
              </div>
              <div className="inline-flex items-center my-1 ">
                <div className="flex justify-between hover:bg-grey-lighter p-2  rounded-xl items-center">
                  <button className="text-xs">
                    <svg
                      className="w-5 fill-current text-grey"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
                    </svg>
                  </button>
                  <span className="text-xs font-normal my-1">20k</span>
                  <button className="text-xs">
                    <svg
                      className="w-5 fill-current text-grey"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 10V2h6v8h5l-8 8-8-8h5z" />
                    </svg>
                  </button>
                  {/* Comments */}
                </div>
                <div className="flex hover:bg-grey-lighter p-2  rounded-xl ml-2 items-center">
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

                  <span className="ml-2 text-xs font-normal text-grey">2</span>
                </div>
                {/* Share */}
                <div className="flex hover:bg-grey-lighter p-2  rounded-xl ml-2 items-center">
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
                  <span className="ml-2 text-xs font-normal text-grey">
                    Share
                  </span>
                </div>
              </div>
            </div>
            <div className="text-black p-4 pt-0 border-l  h-2 ">
              <p
                className="p-1 cursor-pointer text-xs text-gray-500"
                onClick={() => toggleReplies(comment?._id)}
              >
                <span className="border p-1 rounded-full">+</span>{" "}
                {expandedReplies[comment.id] ? "Hide" : "Show more"} replies
              </p>
            </div>
            {/* Conditionally render additional replies */}
            {expandedReplies[comment?._id] && (
              <div className="p-4 pb-0 rounded-lg">
                {/* Render additional replies here */}
                {comment.replies.map((reply) => (
                  <div key={reply.id} className={`ml-[${count}rem]`}>
                    {/* Render each reply */}
                    <div>
                      <div className="flex items-center">
                        <div slot="commentAvatar" className="mr-2">
                          <faceplate-hovercard
                            enter-delay="500"
                            leave-delay="150"
                            position="bottom-start"
                            data-id="user-hover-card"
                            close-on-track=""
                            aria-label="Mr_-_Avocado"
                            appearance="neutral"
                          >
                            <div className="flex flex-row items-center">
                              <faceplate-tracker
                                source="post_detail"
                                action="click"
                                noun="comment_author_avatar"
                                className="flex items-center"
                              >
                                <a
                                  href=""
                                  className="flex items-center my-2xs mr-xs xs:mr-sm"
                                  aria-label=""
                                  aria-haspopup="dialog"
                                  aria-expanded="false"
                                >
                                  <div className="flex items-center justify-center w-lg h-lg xs:w-xl xs:h-xl">
                                    <span
                                      className="inline-flex items-center justify-center"
                                      rpl=""
                                    >
                                      <span className="inline-flex relative w-[2rem] h-[2rem]">
                                        <div
                                          className="absolute h-full w-full"
                                          style={{
                                            transform: "translateY(-7%)",
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="100%"
                                            height="100%"
                                            viewBox="0 0 64 64"
                                            fill="none"
                                          >
                                            <path
                                              d="M29 1.73205C30.8564 0.660254 33.1436 0.660254 35 1.73205L56.7128 14.2679C58.5692 15.3397 59.7128 17.3205 59.7128 19.4641V44.5359C59.7128 46.6795 58.5692 48.6603 56.7128 49.7321L35 62.2679C33.1436 63.3397 30.8564 63.3397 29 62.2679L7.28719 49.7321C5.43078 48.6603 4.28719 46.6795 4.28719 44.5359V19.4641C4.28719 17.3205 5.43078 15.3397 7.28719 14.2679L29 1.73205Z"
                                              fill="url(#paint0_diamond_26026_173944)"
                                            ></path>
                                            <path
                                              d="M29 1.73205C30.8564 0.660254 33.1436 0.660254 35 1.73205L56.7128 14.2679C58.5692 15.3397 59.7128 17.3205 59.7128 19.4641V44.5359C59.7128 46.6795 58.5692 48.6603 56.7128 49.7321L35 62.2679C33.1436 63.3397 30.8564 63.3397 29 62.2679L7.28719 49.7321C5.43078 48.6603 4.28719 46.6795 4.28719 44.5359V19.4641C4.28719 17.3205 5.43078 15.3397 7.28719 14.2679L29 1.73205Z"
                                              fill="url(#paint1_linear_26026_173944)"
                                            ></path>
                                            <defs>
                                              <radialGradient
                                                id="paint0_diamond_26026_173944"
                                                cx="0"
                                                cy="0"
                                                r="1"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(-6.59974 23.1999) rotate(15.9097) scale(44.5051 21406.7)"
                                              >
                                                <stop stop-color="#1185B5"></stop>
                                                <stop
                                                  offset="0.29452"
                                                  stop-color="#D7F7FF"
                                                ></stop>
                                                <stop
                                                  offset="0.526042"
                                                  stop-color="#5EF6D8"
                                                ></stop>
                                                <stop
                                                  offset="0.838434"
                                                  stop-color="#5EF6D8"
                                                ></stop>
                                                <stop
                                                  offset="0.867246"
                                                  stop-color="#1990B9"
                                                ></stop>
                                                <stop
                                                  offset="1"
                                                  stop-color="#3F9FC6"
                                                ></stop>
                                              </radialGradient>
                                              <linearGradient
                                                id="paint1_linear_26026_173944"
                                                x1="23.5687"
                                                y1="22.7061"
                                                x2="44.1183"
                                                y2="53.4817"
                                                gradientUnits="userSpaceOnUse"
                                              >
                                                <stop stop-color="#004E5F"></stop>
                                                <stop
                                                  offset="1"
                                                  stop-color="#727CD8"
                                                  stop-opacity="0.81"
                                                ></stop>
                                              </linearGradient>
                                            </defs>
                                          </svg>
                                        </div>
                                        <span className="absolute h-full w-full left-0">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="100%"
                                            height="100%"
                                            viewBox="0 0 72 72"
                                            fill="none"
                                          >
                                            <path
                                              d="M34 3.4641C35.2376 2.74957 36.7624 2.74957 38 3.4641L63.1769 18C64.4145 18.7145 65.1769 20.035 65.1769 21.4641V50.5359C65.1769 51.965 64.4145 53.2855 63.1769 54L38 68.5359C36.7624 69.2504 35.2376 69.2504 34 68.5359L8.82309 54C7.58548 53.2855 6.82309 51.965 6.82309 50.5359V21.4641C6.82309 20.035 7.58548 18.7145 8.82309 18L34 3.4641Z"
                                              stroke="url(#paint0_diamond_26526_186798)"
                                              stroke-width="4"
                                              stroke-linejoin="round"
                                            ></path>
                                            <defs>
                                              <radialGradient
                                                id="paint0_diamond_26526_186798"
                                                cx="0"
                                                cy="0"
                                                r="1"
                                                gradientUnits="userSpaceOnUse"
                                                gradientTransform="translate(-7.4247 26.0998) rotate(15.9097) scale(50.0682 24082.5)"
                                              >
                                                <stop stop-color="#1185B5"></stop>
                                                <stop
                                                  offset="0.29452"
                                                  stop-color="#D7F7FF"
                                                ></stop>
                                                <stop
                                                  offset="0.526042"
                                                  stop-color="#5EF6D8"
                                                ></stop>
                                                <stop
                                                  offset="0.838434"
                                                  stop-color="#5EF6D8"
                                                ></stop>
                                                <stop
                                                  offset="0.867246"
                                                  stop-color="#1990B9"
                                                ></stop>
                                                <stop
                                                  offset="1"
                                                  stop-color="#3F9FC6"
                                                ></stop>
                                              </radialGradient>
                                            </defs>
                                          </svg>
                                        </span>
                                        <div
                                          className="absolute h-full w-full"
                                          style={{
                                            transform: "translateY(-7%)",
                                          }}
                                        >
                                          <svg
                                            width="100%"
                                            height="100%"
                                            viewBox="0 0 120 120"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="overflow-hidden"
                                          >
                                            <defs>
                                              <clipPath id="7843d97e87783">
                                                <path
                                                  d="M120 0H0V96H22.0602C22.5169 98.2109 23.896 100.155 25.8949 101.309L56
          118.691C58.4752 120.12 61.5248 120.12 64 118.691L94.1051 101.309C96.104 100.155 97.4831
          98.2109 97.9398 96H120V0Z"
                                                ></path>
                                              </clipPath>
                                            </defs>
                                            <image
                                              href="https://styles.redditmedia.com/t5_31wxb9/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfNDY2YTMzMDg4N2JkZjYyZDUzZjk2OGVhODI0NzkzMTUwZjA3NzYyZV82MTEzOTE_rare_573f6c0f-8896-4bf9-b485-8bf4b269d136-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;s=0f4a5ba1668df72e1e0486c6c8b875ffa1eb1167"
                                              alt="User Avatar"
                                              clip-path="url(#7843d97e87783)"
                                              height="100%"
                                              width="100%"
                                            ></image>
                                          </svg>
                                        </div>
                                      </span>
                                    </span>
                                  </div>
                                </a>
                              </faceplate-tracker>
                            </div>
                          </faceplate-hovercard>
                        </div>
                        <strong className="mr-3 text-sm">{reply.name}</strong>
                        *&nbsp; <p className=" text-sm">10PM</p>
                      </div>
                    </div>
                    <div className="p-3 pt-0 mt-2 flex flex-col justify-between hover:bg-grey-lighter rounded-xl border-l">
                      <div className="flex justify-between items-center ml-4">
                        <p className=" text-gray-500">
                          {comment.creatorDisplayName}
                        </p>

                        {/* Post Actions */}
                      </div>
                      <div className="inline-flex items-center my-1 ">
                        <div className="flex justify-between hover:bg-grey-lighter p-2  rounded-xl items-center">
                          <button className="text-xs">
                            <svg
                              className="w-5 fill-current text-grey"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
                            </svg>
                          </button>
                          <span className="text-xs font-normal my-1">20k</span>
                          <button className="text-xs">
                            <svg
                              className="w-5 fill-current text-grey"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M7 10V2h6v8h5l-8 8-8-8h5z" />
                            </svg>
                          </button>
                          {/* Comments */}
                        </div>
                        <div className="flex hover:bg-grey-lighter p-2  rounded-xl ml-2 items-center">
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
                            2
                          </span>
                        </div>
                        {/* Share */}
                        <div className="flex hover:bg-grey-lighter p-2  rounded-xl ml-2 items-center">
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
                          <span className="ml-2 text-xs font-normal text-grey">
                            Share
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-black p-4 pt-0 border-l  h-2 ">
                      <p
                        className="p-1 cursor-pointer text-xs text-gray-500"
                        onClick={() => toggleReplies(comment.id)}
                      >
                        <span className="border p-1 rounded-full">+</span>{" "}
                        {expandedReplies[comment.id] ? "Hide" : "Show"} more
                        replies
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <div className=" h-24"></div> */}
        </>
      ))}
    </div>
  );
};

export default Comments;
