import { Avatar } from "@material-tailwind/react";
import React from "react";

const Post = ({ postData }) => {
  return (
    
    <div className="py-2">
        
      <div className="w-full hover:border-grey rounded bg-white cursor-pointer">
        {/* Vote Buttons */}

        {/* Post Content */}
        <div className=" pt-2">
          {/* Post Header */}
          <div className="flex items-center text-xs mb-2">
            <a
              href="#"
              className="font-semibold no-underline hover:underline text-black flex items-center"
            >
              <img
                className="rounded-full border h-5 w-5"
                src={postData.avatar}
                alt="Avatar"
              />
              <span className="ml-2">{postData.subreddit}</span>
            </a>
            <span className="text-grey-light mx-1 text-xxs">•</span>
            <span className="text-grey">Posted by</span>
            <a
              href="#"
              className="text-grey mx-1 no-underline hover:underline"
            >
              {postData.username}
            </a>
            <span className="text-grey">{postData.time}</span>
          </div>
          {/* Post Title */}
          <div className="flex justify-between ">
            <h2 className="text-lg font-medium mb-1">{postData.title}</h2>
            <img
              src={postData.image}
              width={120}
              height={100}
              alt="avatar"
            />
          </div>
          {/* Post Actions */}
          <div className="inline-flex items-center my-1 ">
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
              <span className="text-xs font-normal my-1">{postData.upvotes}</span>
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
                {postData.comments}
              </span>
            </div>
            {/* Share */}
            <div className="flex hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl ml-2 items-center">
              <svg
                rpl=""
                aria-hidden="true"
                class="icon-share"
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
      </div>
    </div>
  );
};

const Posts = ({ posts }) => {
  return (
    <div className="w-[60%]">
        
      <div className="flex ">
        {/* Main Content */}
        <div className="">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
                <hr />
              <Post postData={post} />
              
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
