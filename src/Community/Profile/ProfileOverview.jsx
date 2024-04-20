import React, { useContext, useEffect, useState } from 'react'
import { ContextAPIContext } from '../../components/Context/ContextAPIContext ';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileOverview = () => {
  const navigate=useNavigate()
  const [activeTab, setActiveTab] = useState('Overview');
  const { data,handleClickToast,darkMode,isMobile,handleResize } = useContext(ContextAPIContext);


  useEffect(()=>{
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  },[])
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [dataProf, setDataProf] = useState(null);

  const { name } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://academics.newtonschool.co/api/v1/reddit/post',
        {
          params: {
            search: JSON.stringify({ "author.name": name })
          },
          headers: {
            'projectid': 't0v7xsdvt1j1'
          }
        }
      );

      setDataProf(result.data.data);
    };
    fetchData();
  }, [name]);

  console.log(dataProf)
  return (
    <div className='py-3 flex h-[100vh]'>
      <div className='xl:w-[48rem] lg:w-[48rem] w-[25rem] '>
        <div className='flex items-center'>
          <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png" alt="" className='rounded-full w-16 h-16' />
          <div className='ml-2'>
            <h5 className='font-bold text-2xl dark:text-white'>{data.name}</h5>
            <p className="dark:text-white">u/{data.name}</p>
          </div>
        </div>
        <div className='flex justify-around xl:flex-row lg:flex-row flex-col mt-6 dark:text-white'>
          <div className={`cursor-pointer bg-${activeTab === 'Overview' ? '[#D2DADD]' : 'transparent'} rounded-3xl px-4 py-2`} onClick={() => handleTabClick('Overview')}>
            Overview
          </div>
          <div className={`cursor-pointer bg-${activeTab === 'Posts' ? '[#D2DADD]' : 'transparent'} rounded-3xl px-4 py-2`} onClick={() => handleTabClick('Posts')}>
            Posts
          </div>
          <div className={`cursor-pointer bg-${activeTab === 'Comments' ? '[#D2DADD]' : 'transparent'} rounded-3xl px-4 py-2`} onClick={() => handleTabClick('Comments')}>
            Comments
          </div>
          <div className={`cursor-pointer bg-${activeTab === 'Saved' ? '[#D2DADD]' : 'transparent'} rounded-3xl px-4 py-2`} onClick={() => handleTabClick('Saved')}>
            Saved
          </div>
          <div className={`cursor-pointer bg-${activeTab === 'Hidden' ? '[#D2DADD]' : 'transparent'} rounded-3xl px-4 py-2`} onClick={() => handleTabClick('Hidden')}>
            Hidden
          </div>
          <div className={`cursor-pointer bg-${activeTab === 'Upvoted' ? '[#D2DADD]' : 'transparent'} rounded-3xl px-4 py-2`} onClick={() => handleTabClick('Upvoted')}>
            Upvoted
          </div>
          <div className={`cursor-pointer bg-${activeTab === 'Downvoted' ? '[#D2DADD]' : 'transparent'} rounded-3xl px-4 py-2`} onClick={() => handleTabClick('Downvoted')}>
            Downvoted
          </div>

        </div>
        <div className=" flex items-center hover:bg-gray-200 rounded-3xl p-3 cursor-pointer border border-black dark:border-white w-40 mt-4" >
        <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-plus.svg" : "/images/svgs/plus.svg"} alt="Plus" /> <span className="text-black ml-2 font-medium dark:text-white" onClick={()=>navigate("/submit")}> Create a Post</span>
        </div>
        <hr />
        {(!dataProf?.title || !dataProf?.content) ?
         <>
          {dataProf?.map((item, index) => {
            return (
              <div>
                <div className='flex items-center gap-2 py-5' key={index}>
                  <img src="/images/svgs/defaultProfile.svg" className='w-6 h-6 rounded-full bg-blue-gray-100' alt="" />
                  <h5 className="text-sm dark:text-white">{item.author?.name}</h5>
                  <span class="px-2xs"> • </span>
                  <h6 className='text-xs underline dark:text-white'>{item?.title}</h6>

                </div>

                <div className='flex flex-col'>
                  {item.title && <div className='font-bold pb-2 dark:text-white'>{item?.title}</div>}
                  <div className="dark:text-white">{item.content}</div>
                  <div><img src={item?.images[0]} alt="postImg" /></div>

                </div>

                <div className='py-3'><hr /></div>
              </div>
            )
          })}
        </> 
        :
         <>
          <div className='flex justify-center'>
          <img src="https://www.redditstatic.com/shreddit/assets/hmm-snoo.png" className='w-[60px]' alt="" />
        </div>
          <div className='flex justify-center'>
            <h3 className='text-xs text-gray-600'> <strong>u/{dataProf[0]?.author.name} hasn't posted yet</strong></h3>
          </div > 
          </>}

      </div>
    {!isMobile&&  <div className="fixed right-20 w-[20rem] rounded-2xl bg-gray-50  dark:bg-gray-500 ">
        <div className='relative'>
          <div className="grad-cover w-80 h-36 rounded-2xl "></div>
          <div className='w-8 h-8 top-24 right-4 flex items-center justify-center bg-white absolute rounded-full' onClick={handleClickToast}>
            <svg rpl="" aria-hidden="true" fill="currentColor" height="16" icon-name="add-media-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.376 3.032h-2.355L13.8 1.446A1.155 1.155 0 0 0 12.892 1h-5.74a1.17 1.17 0 0 0-.923.454L5.014 3.031H2.625A2.629 2.629 0 0 0 0 5.656v9.719A2.63 2.63 0 0 0 2.625 18h14.75A2.63 2.63 0 0 0 20 15.375V5.657a2.627 2.627 0 0 0-2.624-2.625Zm1.374 12.343a1.377 1.377 0 0 1-1.375 1.375H2.625a1.377 1.377 0 0 1-1.375-1.375V5.656a1.377 1.377 0 0 1 1.375-1.375h3L7.152 2.25l5.657-.041 1.6 2.072h2.971a1.375 1.375 0 0 1 1.37 1.376v9.718Zm-8.125-6H14v1.25h-3.375V14h-1.25v-3.375H6v-1.25h3.375V6h1.25v3.375Z">

              </path>
            </svg>
          </div>
          <div className='p-3'>
            <h3 className='font-bold py-2'>{data.name}</h3>

            <div className={` bg-[#E2E7E9] rounded-3xl p-2 w-24 flex items-center font-medium cursor-pointer`} onClick={handleClickToast}>
              <span className='mr-2'><img src="/images/svgs/share-arrow.svg" alt="" /></span>Share
            </div>
            <div className="grid grid-cols-2 gap-4 py-5">
              <div className="">
                <p className="text-sm text-black font-bold">0</p>
                <p className="text-xs  text-gray-600">Post Karma</p>
              </div>
              <div className="">
                <p className="text-sm text-black font-bold">0</p>
                <p className="text-xs  text-gray-600">Comment Karma</p>
              </div>
              <div className="">
                <p className="text-sm text-black font-bold">Cake day</p>
                <p className="text-xs  text-gray-600">Feb 18, 2024</p>
              </div>
              <div className="">
                <p className="text-sm text-black font-bold">0</p>
                <p className="text-xs  text-gray-600">Gold Received</p>
              </div>
            </div>
            <hr />
            <div>
              <p className='text-sm uppercase font-medium py-5'>Settings</p>
              <div className='flex flex-col'>
                <div className='flex justify-between py-3'>
                  <div className='flex items-center space-x-2'>
                    <div>
                      <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png" className='w-8 rounded-full' alt="avatar" />
                    </div>
                    <div>
                      <div className='text-sm'>Profile</div>
                      <div className='text-sm'>Customise</div>
                    </div>
                  </div>
                  <div className='bg-[#E2E7E9] rounded-3xl p-2 text-sm font-medium cursor-pointer' onClick={handleClickToast}>Edit profile</div>
                </div>
                <div className='flex justify-between py-3'>
                  <div className='flex items-center space-x-2'>
                    <div>
                      <img src="/images/svgs/shirt-outline.svg" className='w-6 rounded-full' alt="avatar" />
                    </div>
                    <div>
                      <div className='text-sm cursor-pointer' onClick={handleClickToast}>Avatar</div>
                      <div className='text-sm cursor-pointer' onClick={handleClickToast}>Customise</div>
                    </div>
                  </div>
                  <div className='bg-[#E2E7E9] rounded-3xl p-2 text-sm font-medium cursor-pointer' onClick={handleClickToast}>Style Avatar</div>
                </div>
                <div className='flex justify-between py-3'>
                  <div className='flex items-center space-x-2'>
                    <div>
                      <img src="/images/svgs/mod.svg" className='w-6 rounded-full' alt="avatar" />
                    </div>
                    <div>
                      <div className='text-sm cursor-pointer' onClick={handleClickToast}>Moderation</div>
                      <div className='text-sm cursor-pointer' onClick={handleClickToast}>Moderation Tools</div>
                    </div>
                  </div>
                  <div className='bg-[#E2E7E9] rounded-3xl p-2 text-sm font-medium cursor-pointer' onClick={handleClickToast}>Mod Settings</div>
                </div>
              </div>
              <hr />
              <div className='py-4'>
                <div className='uppercase text-sm mb-4'>Links</div>
                <div className={`cursor-pointer bg-[#E2E7E9] rounded-3xl p-2 w-[10rem] flex items-center`} onClick={handleClickToast}>
                  <span className='mr-2'><img src="/images/svgs/plus.svg" alt="" /></span>Add Social Link
                </div>
              </div>
            </div>

          </div>

        </div>


      </div>}
    </div>
  )
}

export default ProfileOverview