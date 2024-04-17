import React, { useContext, useEffect, useState } from 'react'
import { ContextAPIContext } from '../../components/Context/ContextAPIContext ';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorProfile = ({ posts }) => {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('Posts');
    const { handleClickToast, setCommNameFetch } = useContext(ContextAPIContext);
    const { authorName } = useParams();
    // console.log(authorName)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'https://academics.newtonschool.co/api/v1/reddit/post',
                {
                    params: {
                        search: JSON.stringify({ "author.name": authorName })
                    },
                    headers: {
                        'projectid': 't0v7xsdvt1j1'
                    }
                }
            );

            setData(result.data.data);
            setCommNameFetch(result.data.data)
        };

        fetchData();
    }, [authorName]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
            //   setComments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className='py-3 flex h-[100vh]'>
            <div className='w-[48rem] '>
                <div className='flex items-center'>
                    <img src={(data[0].author.profileImage) ? (data[0].author.profileImage) : "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"} alt="" className='rounded-full w-16 h-16' />
                    <div className='ml-2'>
                        <h5 className='font-bold text-2xl dark:text-white'>{data[0].author.name}</h5>
                        <p className='dark:text-white'> u/{data[0].author.name}</p>
                    </div>
                </div>
                <div className='flex mt-6'>
                    <div className={`cursor-pointer dark:text-white ${activeTab === 'Overview' ? 'bg-[#D2DADD]' : 'bg-transparent'} rounded-3xl px-4 py-2`} onClick={() => {handleTabClick('Overview');handleClickToast();}}>
                        Overview
                    </div>
                    <div className={`cursor-pointer dark:text-white ${activeTab === 'Posts' ? 'bg-[#D2DADD]' : 'bg-transparent'} rounded-3xl px-4 py-2`} onClick={() => handleTabClick('Posts')}>
                        Posts
                    </div>
                    <div className={`cursor-pointer dark:text-white ${activeTab === 'Comments' ? 'bg-[#D2DADD]' : 'bg-transparent'} rounded-3xl px-4 py-2`} onClick={() => { handleTabClick('Comments'); handleClickToast(); }}>
    Comments
</div>
                </div>


                <hr />
                {(data[0].title || data[0].content) ? <>
                    {data.map((item, index) => {
                        return (
                            <div>
                                <div className='flex items-center gap-2 py-5' key={index}>
                                    <img src="/images/svgs/defaultProfile.svg" className='w-6 h-6 rounded-full bg-blue-gray-100' alt="" />
                                    <h5 className="text-sm dark:text-white">{item?.author?.name}</h5>
                                    <span class="px-2xs dark:text-white"> • </span>
                                    <h6 className='text-xs underline dark:text-white'>{item?.title}</h6>

                                </div>

                                <div className='flex flex-col'>
                                    {item.title && <div className='font-bold pb-2 dark:text-white'>{item?.title}</div>}
                                    <div className='dark:text-white'>{item.content}</div>
                                    <div><img src={item.images[0]} alt="postImg" /></div>

                                </div>

                                <div className='py-3'><hr /></div>
                            </div>
                        )
                    })}
                </> : <> <div className='flex justify-center'>
                    <img src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" className='w-[60px]' alt="" />
                </div>
                    <div className='flex justify-center'>
                        <h3 className='text-xs text-gray-600'> <strong>u/{data[0].author.name} hasn't posted yet</strong></h3>
                    </div > </>}

            </div>
        </div>
    )
}

export default AuthorProfile