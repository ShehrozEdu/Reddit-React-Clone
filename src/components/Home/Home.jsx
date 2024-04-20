import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import Carousel from "./Carousel";
import MenuButtons from "./MenuButtons";
import Posts from "./Posts";
import PopularTrending from "./PopularTrending";
import { ContextAPIContext } from "../Context/ContextAPIContext ";
import axios from "axios";
import PostDetails from "./PostDetails";
import Demo from "../../Community/demo";
import CreateAPost from "../../Community/CreateAPost";
import CommunityPageDetails from "../../Community/CommunityPageDetails";
import ProfileOverview from "../../Community/Profile/ProfileOverview";
import AuthorProfile from "../../Community/Profile/AuthorProfile";

const Home = () => {
  const {
    posts,
    setPosts,
    popularPosts,
    setPopularPosts,
    popularCommunityChannel,
    setPopularCommunityChannel,
    setLoading,
    darkMode,
    checkUserLoggedIn,
  } = useContext(ContextAPIContext);
  // const { id } = useParams();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [showCountrySelect, setshowCountrySelect] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      let headers = {
        projectId: "t0v7xsdvt1j1"
      };
  
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
  
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post?limit=20&page=${page}`, {
        headers: headers,
      });
  
      if (Array.isArray(response.data.data)) {
        if (response.data.data.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
        }
      } else {
        console.error("Data fetched is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    if (hasMore) {
      fetchPosts();
    }
  }, [page, hasMore]);

  useEffect(() => {
    const sortedPosts = [...posts].sort((a, b) => b.likeCount - a.likeCount);
    setPopularPosts(sortedPosts);
  }, [posts]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handlePostClick = (postId) => {
    if (!checkUserLoggedIn()) {
      return;
    }
    navigate(`/post/${postId}`);
  };

  return (
    <div className={`xl:ml-[23rem] lg:ml-[23rem] ml-0 w-full ${location.pathname === '/submit' ? 'xl:ml-[15.6rem] lg:ml-[15.6rem] mt-0 h-screen w-screen ' + (darkMode ? 'bg-[#0B1416]' : 'bg-[#dae0e6]') : ''}`}>

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col relative">
              {/* {!isResponsive && <Carousel />} */}
              <MenuButtons showCountrySelect={true} />
              <div className={`flex relative`}>
                <Posts
                setPosts={setPosts}
                  posts={posts}
                  popularPosts={popularPosts}
                  handlePostClick={handlePostClick}
                  isPopular={false}
                  fetchPosts={fetchPosts}
                />
                {!isMobile && <PopularTrending trendingData={popularCommunityChannel} />}
              </div>
            </div>
          }
        />
        <Route
          path="/popular"
          element={
            <div className="flex flex-col relative">
                 {!isMobile && <Carousel />}

              <MenuButtons showCountrySelect={showCountrySelect} />
              <div className="flex relative">
                <Posts
                  posts={posts}
                  popularPosts={popularPosts}
                  handlePostClick={handlePostClick}
                  isPopular={true}
                  fetchPosts={fetchPosts}
                />
                                {/* {!isResponsive && <PopularTrending trendingData={popularCommunityChannel} />} */}

              </div>
            </div>
          }
        />
        <Route path="/post/:id" element={<PostDetails posts={posts} />} />
        <Route path="/test" element={<Demo />} />
        <Route path="/submit" element={<CreateAPost />} />
        <Route path="/community/:id" element={<CommunityPageDetails />} />
        <Route path="/user/:name/" element={<ProfileOverview />} />
        <Route path="/users/:authorName" element={<AuthorProfile posts={posts}/>} />
      </Routes>
    </div>
  );
};

export default Home;
