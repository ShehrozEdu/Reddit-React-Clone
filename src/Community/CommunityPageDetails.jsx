import React, { useContext, useEffect, useState } from 'react';
import MenuButtons from '../components/Home/MenuButtons';
import Posts from '../components/Home/Posts';
import { ContextAPIContext } from '../components/Context/ContextAPIContext ';
import axios from 'axios';
import moment from 'moment';

const CommunityPageDetails = () => {
    const [channelData, setChannelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { commId, darkMode } = useContext(ContextAPIContext);

    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel/${commId}`, {
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

        fetchChannelData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='my-0 xl:w-[62rem] lg:w-[62rem] h-[100vh]'>
            <div className={`${darkMode ? "bg-[#0B1416]" : "bg-gray-50"}`}>
                <div className='w-full rounded-xl relative'>
                    <img src={channelData?.owner?.profileImage || "https://styles.redditmedia.com/t5_2dfnk0/styles/bannerBackgroundImage_w5zgsr59xx0b1.png"} alt="" className=' rounded-xl h-[8rem] object-cover xl:w-[62rem] lg:w-[62rem]' />

                    <div className='flex  top-20 left-9 justify-between'>
                        <div className='flex -mt-12'>
                            <img src={channelData?.owner?.profileImage || "https://styles.redditmedia.com/t5_2dfnk0/styles/communityIcon_uli9r9wy5lba1.png"} className="rounded-full w-[88px] h-[88px] " alt="" />
                            <h1 className='flex items-center font-bold text-32 mb-0 mt-14 dark:text-white'>r/{channelData.name}</h1>
                        </div>
                        <div className='flex p-2 justify-around w-96'>
                            <div className=" flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 rounded-3xl  p-3 cursor-pointer border border-black dark:border-white" >
                                <img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-plus.svg" : "/images/svgs/plus.svg"}`} alt="" /> <span className="text-black dark:text-white ml-2 font-medium"> Create a Post</span>
                            </div>
                            <div className='rounded-full w-12 h-12 hover:bg-gray-200 border border-black flex items-center justify-center dark:border-white'>
                                <img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-notif.svg" : "/images/svgs/notification.svg"}`} className='cursor-pointer' alt="bell" />
                            </div>
                            <div className='rounded-2xl p-2 hover:bg-gray-200 border border-black flex items-center justify-center font-medium dark:text-white dark:border-white'>
                                Joined
                            </div>
                            <div className='rounded-full w-12 h-12 hover:bg-gray-200 border border-black flex items-center justify-center dark:border-white'>
                                <img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-threeDots.svg" : "/images/svgs/threeDots.svg"}`} className='' alt="bell" />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-[40rem]'>
                            <div className='flex justify-end'>
                                <MenuButtons showCountrySelect={false} />
                            </div>
                            <div className="py-2">
                                <div className={`w-full hover:border-grey rounded ${darkMode ? "bg-[#0B1416]" : "bg-white"}cursor-pointer`}>
                                    <div className="pt-2">
                                        <div className="flex items-center text-xs mb-2">
                                            <a href="#" className="font-semibold no-underline hover:underline text-black flex items-center">
                                                <img
                                                    className="rounded-full border h-5 w-5"
                                                    src={channelData?.owner?.profileImage || ""}
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
                                            {channelData.image && (
                                                <img
                                                    src={channelData.image}
                                                    alt="avatar"
                                                />
                                            )}
                                        </div>
                                        <div className="inline-flex items-center my-1">
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
                                                <span className="text-xs font-normal my-1">{channelData.likeCount}</span>
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
                                                <span className="ml-2 text-xs font-normal text-grey">{channelData.commentCount}</span>
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
                        <div className={`fixed right-60 w-[19rem] mt-14 ${darkMode ? "bg-[#0B1416]" : "bg-gray-300"} dark:border dark:border-white p-3`}>
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
                            <div>
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
                                        <h5 className='ml-3 text-12 text-[#645caf]'>LAMEASF</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityPageDetails;
