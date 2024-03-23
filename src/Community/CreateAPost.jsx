import React, { useContext, useState } from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ContextAPIContext } from '../components/Context/ContextAPIContext ';
import { toast } from 'react-toastify';



const CreateAPost = () => {
    const [activeTab, setActiveTab] = React.useState("post");
    const [postData, setPostData] = React.useState("");
    const [imageData, setImageData] = React.useState(null);
    const [linkData, setLinkData] = React.useState("");
    const [postTitle, setPostTitle] = useState("");
    const { data ,darkMode} = useContext(ContextAPIContext)

    const handlePostSubmit = async () => {
        // e.preventDefault()
        const token = localStorage.getItem("token");
        try {
            if (!token) {
                toast.error("User is not logged in. Please Login");
                return;
            }
    
            const formData = new FormData();
    
            formData.append('title', postTitle);
    
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = postData;
            const plainText = tempDiv.textContent || tempDiv.innerText || "";
    
            formData.append('content', plainText);
            formData.append('images', imageData);
            formData.append('appType', "reddit");
            const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/post/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectId': 't0v7xsdvt1j1',
                },
                body: formData,
            });
            const data = await response.json();
            // console.log("Post created:", data);
            toast.success("Post created Successfully!");
            setTimeout(() => {
                location.href="/"
                
            }, 3000);
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
                    <Input type="text" placeholder='Title' className='text-black' onChange={(e) => setPostTitle(e.target.value)} />
                    <ReactQuill
                        value={postData}
                        onChange={(value) => setPostData(value)}
                        placeholder="Write your post here..."
                        className="w-full border border-gray-300 rounded-md p-2 mb-2 mt-2 dark:text-white"
                    />
                    <button onClick={handlePostSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        Submit
                    </button>
                </div>
            )
        },
        {
            label: "Images/Video",
            value: "images/video",
            render: (
                <>
                    <div>
                        <Input type="text" placeholder='Title' className='text-black' onChange={(e) => setPostTitle(e.target.value)} />

                        <input
                            type="file"
                            id='images'
                            onChange={(e) => setImageData(e.target.files[0])}
                            className="mb-2 mt-5"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handlePostSubmit}>
                            Submit
                        </button>
                    </div>
                </>
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
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        Submit
                    </button>
                </div>
            )
        },
        {
            label: "Poll",
            value: "poll",
            render: (
                <div>
                    <input
                        type="text"
                        value={linkData}
                        onChange={(e) => setLinkData(e.target.value)}
                        placeholder="Enter link URL..."
                        className="w-full border border-gray-300 rounded-md p-2 mb-2"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        Submit
                    </button>
                </div>
            )
        },
    ];

    return (
        <>
            <div className='w-[50vw] p-10 pl-40'>
                <div className='font-medium flex justify-between pb-3'>
                    <p className='dark:text-white'>Create a Post</p>
                    <p className='uppercase text-xs text-blue-400'>Drafts</p>
                </div>
                <hr />
                <div className='w-40 mt-5'>
                    <Select label="Select Channel" className='bg-white dark:bg-black dark:text-white text-black'>
                        <Option>u/{data.name}</Option>
                    </Select>
                </div>
                <div className={`border mt-5 ${darkMode?"bg-[#0B1416]":"bg-white "}rounded-xl`}>
                    <Tabs value={activeTab}>
                        <TabsHeader
                            className="rounded-none border-b border-blue-gray-50 bg-transparent pb-0 "
                            indicatorProps={{
                                className:
                                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                            }}
                        >
                            {dataTab.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => setActiveTab(value)}
                                    className={`${activeTab === value ? "text-gray-900 border-r" : ""} dark:text-white` }
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
        </>);
}

export default CreateAPost;
