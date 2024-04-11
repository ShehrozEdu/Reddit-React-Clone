import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import MenuButtons from '../components/Home/MenuButtons';
import Posts from '../components/Home/Posts';
import { ContextAPIContext } from '../components/Context/ContextAPIContext ';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const CommunityPageDetails = () => {
    const [channelData, setChannelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { commId, darkMode,handleCommunityDetails, handleClickToast, data } = useContext(ContextAPIContext);
    const [isJoined, setIsJoined] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
  const params = useParams();
  const fetchChannelData = async () => {
    try {
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel/${params.id}`, {
            headers: {
                projectId: "t0v7xsdvt1j1",
            },
        });
        setChannelData(response.data.data);
        setLoading(false);
    } catch (error) {
        setError(error);
        setLoading(false);
    }
};
useEffect(() => {


    fetchChannelData();
}, []);
useEffect(() => {
    fetchChannelData()
}, [handleCommunityDetails])

    const handleClick = () => {
        if (!isJoined) {
            toast.success("Joined the community");
        } else {
            toast.warning("Left the community");
        }
        setIsJoined(!isJoined);
    };

    // useEffect(() => {
    //     fetchLikedPost();


    //   }, [])
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const handleUpvoteClick = () => {
        if (isUpvoted) {
          toast.success("Upvote removed");
          setLikeCount(prevCount => Math.max(0, prevCount - 1)); // decrease likeCount but not below 0
        } else {
          toast.success("Upvoted");
          if (isDownvoted) {
            setLikeCount(prevCount => prevCount + 2); // increase likeCount by 2 if it was previously downvoted
          } else {
            setLikeCount(prevCount => prevCount + 1); // increase likeCount by 1 if it was not previously downvoted
          }
        }
        setIsUpvoted(!isUpvoted);
        setIsDownvoted(false);
      };
      useEffect(() => {
        if (channelData && channelData.likeCount) {
          setLikeCount(channelData.likeCount);
        }
      }, [channelData]);
      const handleDownvoteClick = () => {
        if (isDownvoted) {
          toast.success("Downvote removed");
          setLikeCount(prevCount => prevCount + 1); // increase likeCount
        } else {
          toast.success("Downvoted");
          if (isUpvoted) {
            setLikeCount(prevCount => Math.max(0, prevCount - 2)); // decrease likeCount by 2 if it was previously upvoted
          } else {
            setLikeCount(prevCount => Math.max(0, prevCount - 1)); // decrease likeCount by 1 if it was not previously upvoted
          }
        }
        setIsDownvoted(!isDownvoted);
        setIsUpvoted(false);
      };
 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={`my-0 w-full h-[100vh] ${darkMode ? "bg-[#0B1416]" : "bg-gray-50"}`}>
            <div className={`${darkMode ? "bg-[#0B1416]" : "bg-gray-50"}`}>
                <div className='w-full rounded-xl relative'>
                    <img src={channelData?.owner?.profileImage || "https://picsum.photos/id/870/200/300?grayscale&blur=1"} alt="" className=' rounded-xl h-[8rem] object-cover xl:w-full lg:w-full' />

                    <div className='flex  top-20 left-9 justify-between'>
                        <div className='flex -mt-12'>
                            <img src={channelData?.owner?.profileImage || "https://www.redditstatic.com/avatars/avatar_default_02_A06A42.png"} className="rounded-full w-[88px] h-[88px] " alt="" />
                            <h1 className='flex items-center font-bold text-32 mb-0 mt-14 dark:text-white'>r/{channelData?.name}</h1>
                        </div>
                        <div className='flex p-2 justify-around w-96'>
                            <div className=" flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 rounded-3xl  p-3 cursor-pointer border border-black dark:border-white" onClick={handleClickToast}>
                                <img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-plus.svg" : "/images/svgs/plus.svg"}`} alt="" /> <span className="text-black dark:text-white ml-2 font-medium" > Create a Post</span>
                            </div>
                            <div className='rounded-full w-12 h-12 hover:bg-gray-200 border border-black flex items-center justify-center dark:border-white'>
                                <img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-notif.svg" : "/images/svgs/notification.svg"}`} className='cursor-pointer' alt="bell" onClick={() => handleClickToast()} />
                            </div>
                            <div
                                className={`rounded-2xl p-2 hover:bg-gray-200 border border-black flex items-center justify-center font-medium dark:text-white dark:border-white cursor-pointer`}
                                onClick={handleClick}
                            >
                                {isJoined ? 'Joined' : 'Join'}
                            </div>
                            <div className='rounded-full w-12 h-12 hover:bg-gray-200 border border-black flex items-center justify-center dark:border-white'>
                                <img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-threeDots.svg" : "/images/svgs/threeDots.svg"}`} className='' alt="bell" />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-full]'>
                            <div className='flex justify-start'>
                                <MenuButtons showCountrySelect={false} />
                            </div>
                            <div className="py-2">
                                <div className={`w-full hover:border-grey rounded ${darkMode ? "bg-[#0B1416]" : "bg-white"}cursor-pointer`}>
                                    <div className="pt-2">
                                        <div className="flex items-center text-xs mb-2">
                                            <a href="#" className="font-semibold no-underline hover:underline text-black flex items-center">
                                                <img
                                                    className="rounded-full border h-5 w-5"
                                                    src={channelData?.owner?.profileImage || "https://www.redditstatic.com/avatars/avatar_default_02_D4E815.png"}
                                                    alt="Avatar"
                                                />
                                                <span className="ml-2 dark:text-white">{channelData?.name}</span>
                                            </a>
                                            <span className="text-grey-light mx-1 text-xxs dark:text-white">•</span>
                                            <span className="text-grey dark:text-white">Posted by</span>
                                            <a href="#" className="text-grey mx-1 no-underline hover:underline dark:text-white">
                                                {channelData.owner?.name}
                                            </a>
                                            <span className="text-grey dark:text-white">
                                                {moment(channelData.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                            </span>

                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="text-lg font-normal mb-1 dark:text-white">{channelData?.description}</h2>

                                            <img
                                                src={channelData?.image || "https://picsum.photos/200/100"}
                                                alt="avatar"
                                                className='w-[30rem] h-[20rem]'
                                            />

                                        </div>
                                        <div className="inline-flex items-center my-1">
                                            <div className="flex justify-between hover:bg-grey-lighter p-2 bg-gray-300 rounded-xl items-center">
                                                <button className="text-xs" onClick={(handleUpvoteClick)}>
                                                    {!isUpvoted ? (
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
                                                <span className="text-xs font-normal my-1">{likeCount}</span>
                                                <button className="text-xs" onClick={handleDownvoteClick}>
                                                    {!isDownvoted ? (
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
                                                <span className="ml-2 text-xs font-normal text-grey">{channelData?.commentCount || 0}</span>
                                            </div>
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
                                                    <path d="M19 11v5.378A2.625 2.625 0 0 1 16.378 19H3.622A2.625 2.625 0 0 1 1 16.378V11h1.25v5.378a1.373 1.373 0 0 0 1.372 1.372h
12.756a1.373 1.373 0 0 0 1.372-1.372V11H19ZM9.375 3.009V14h1.25V3.009l2.933 2.933.884-.884-4-4a.624.624 0 0 0-.884 0l-4 4 .884.884 2.933-2.933Z"></path>{" "}
                                                </svg>
                                                <span className="ml-2 text-xs font-normal text-grey">Share</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`fixed right-20 w-[19rem] mt-14 ${darkMode ? "bg-[#0B1416]" : "bg-gray-200 rounded-xl"} dark:border dark:border-white p-3`}>
                            <div className="mb-6">
                                <h2 className="text-md font-bold dark:text-white">{channelData.name} Community</h2>
                                <p className="text-[14px] dark:text-white">
                                    {channelData.description}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mb-6 pb-4">
                                <div className="text-sm dark:text-white">
                                    <span className="font-bold text-sm dark:text-white">915K</span> Members
                                </div>
                                <div className="text-sm dark:text-white">
                                    <span className="font-bold text-sm dark:text-white">2.2K</span> Online
                                </div>
                            </div>
                            <hr />
                            {data && <div>
                                <div>
                                    <h5 className='text-12 text-[#645caf] py-3'>USER FLAIR</h5>
                                    <div className='flex items-center'>
                                        <span
                                            rpl=""
                                            class="w-[2rem] h-[2rem] inline-block rounded-full relative cursor-pointer"
                                        >
                                            <img
                                                src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
                                                alt="User Avatar"
                                                className="max-w-full rounded-full"
                                            />
                                        </span>
                                        <h5 className='ml-3 text-12 text-[#645caf]'>{data?.name}</h5>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityPageDetails;
