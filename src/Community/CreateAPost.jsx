import React, { useContext, useEffect, useState } from 'react';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Input
} from "@material-tailwind/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ContextAPIContext } from '../components/Context/ContextAPIContext ';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateAPost = () => {
    const { data, darkMode, setSelectedItem } = useContext(ContextAPIContext);
    const [activeTab, setActiveTab] = useState("post");
    const [postData, setPostData] = useState("");
    const [imageData, setImageData] = useState(null);
    const [linkData, setLinkData] = useState("");
    const [selectedChannelID, setSelectedChannelID] = useState(null);
    const [postTitle, setPostTitle] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [popularCommunityChannel, setPopularCommunityChannel] = useState([]);
    const [isCommunitySelected, setIsCommunitySelected] = useState(false);

    useEffect(() => {
        const fetchPopularCommunity = async () => {
            try {
                const response = await axios.get(
                    "https://academics.newtonschool.co/api/v1/reddit/channel",
                    {
                        headers: {
                            projectId: "t0v7xsdvt1j1",
                        },
                    }
                );
                setPopularCommunityChannel(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPopularCommunity();
    }, []);


    const handleCommunityChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        setIsCommunitySelected(value !== ""); // Set isCommunitySelected based on whether a community is selected

        const selectedChannel = popularCommunityChannel.find(channel => `r/${channel.name}` === value);
        if (selectedChannel) {
            setSelectedChannelID(selectedChannel._id);
        } else {
            setSelectedChannelID(null);
        }
    }
    const handlePostSubmit = async () => {
        const token = localStorage.getItem("token");
        try {
            if (!token) {
                toast.error("User is not logged in. Please Login");
                return;
            }
            if (selectedOption === "") {
                toast.error("Please select a community before submitting");
                return;
            }
            if (!postTitle || !postData ) {
                toast.error("Please fill all the fields before submitting");
                return;
            }
            // if (postTitle==="abcd") {
            //     toast.error("This is not a good way to post");
            //     return;
            // }

            const formData = new FormData();
            formData.append('title', postTitle);

            // Convert the postData from HTML to plain text
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = postData;
            const plainText = tempDiv.textContent || tempDiv.innerText || "";

            formData.append('content', plainText);
            formData.append('images', imageData);
            formData.append('appType', "reddit");

            if (selectedChannelID) {
                formData.append('channelId', selectedChannelID);
            }

            const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/post/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectId': 't0v7xsdvt1j1',
                },
                body: formData,
            });

            const data = await response.json();
            console.log(data)
            toast.success("Post created Successfully!");
            setSelectedItem("New");
            setTimeout(() => {
                location.href = "/";
            }, 2000);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };



    const dataTab = [
        {
            label: "Post",
            value: "post",
            render: (
                <div>
                    <Input
                        type="text"
                        placeholder='Title'
                        className='text-black'
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <ReactQuill
                        value={postData}
                        onChange={(value) => setPostData(value)}
                        placeholder="Write your post here..."
                        className="w-full border border-gray-300 rounded-md p-2 mb-2 mt-2 dark:text-white"
                    />
                    <button
                        onClick={handlePostSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        
                    >
                        Submit
                    </button>
                </div>
            )
        },
        {
            label: "Images/Video",
            value: "images/video",
            render: (
                <div>
                    <Input
                        type="text"
                        placeholder='Title'
                        className='text-black'
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        id='images'
                        onChange={(e) => setImageData(e.target.files[0])}
                        className="mb-2 mt-5"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={handlePostSubmit}
                     
                    >
                        Submit
                    </button>
                </div>
            )
        },
        {
            label: "Link",
            value: "link",
            render: (
                <div>
                    <input
                        type="text"
                        value={linkData}
                        onChange={(e) => setLinkData(e.target.value)}
                        placeholder="Enter link URL..."
                        className="w-full border border-gray-300 rounded-md p-2 mb-2"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={handlePostSubmit}
                      
                    >
                        Submit
                    </button>
                </div>
            )
        },
    
    ];

    return (
        <div className='p-10'>
        <div className='font-medium flex justify-between pb-3'>
            <p className='dark:text-white'>Create a Post</p>
            <p className='uppercase text-xs text-blue-400'>Drafts</p>
        </div>
        <hr />
        <div className='mt-5'>
            <select
                className='bg-white dark:bg-black dark:text-white text-black p-3 rounded-xl w-full sm:w-40'
                value={selectedOption}
                onChange={handleCommunityChange}
            >
                <option value="">Choose a community</option>
                <option value={`u/${data.name}`}>u/{data.name}</option>
                {
                    popularCommunityChannel
                        .filter(channel => data._id === channel.owner._id)
                        .map((channel, idx) => (
                            <option key={idx} value={`r/${channel.name}`}>
                                r/{channel.name}
                            </option>
                        ))
                }
            </select>
        </div>

        <div className={`border mt-5 ${darkMode ? "bg-[#0B1416]" : "bg-white "}rounded-xl`}>
            <Tabs value={activeTab}>
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent pb-0 "
                    indicatorProps={{
                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                    }}
                >
                    {dataTab.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={`${activeTab === value ? "text-gray-900 border-r" : ""} dark:text-white`}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {dataTab.map(({ value, render }) => (
                        <TabPanel key={value} value={value}>
                            {render}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    </div>
    );
}

export default CreateAPost;
