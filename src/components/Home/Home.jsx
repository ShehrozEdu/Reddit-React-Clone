import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import Carousel from "./Carousel";
import MenuButtons from "./MenuButtons";
import Posts from "./Posts";
import PopularTrending from "./PopularTrending";
import { ContextAPIContext } from "../Context/ContextAPIContext ";
import PostDetails from "./PostDetails";
import CreateAPost from "../../Community/CreateAPost";
import CommunityPageDetails from "../../Community/CommunityPageDetails";
import ProfileOverview from "../../Community/Profile/ProfileOverview";
import AuthorProfile from "../../Community/Profile/AuthorProfile";
import ProtectedRouting from "../Auth/ProtectedRouting";
import Error from "./Error";
import axiosInstance from "../Auth/axiosConfig";
import WorkUnderProgress from "./WorkUnderProgress";

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
  const [error, setError] = useState(null);




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
    try {
      const response = await axiosInstance.get(`/post?limit=20&page=${page}`);
  
      if (Array.isArray(response.data.data)) {
        if (response.data.data.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
          setError(null);
        }
      } else {
        console.error("Data fetched is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError('Failed to load data, please refresh');

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
        const response = await axiosInstance.get("/channel");
        setPopularCommunityChannel(response.data.data);
        setError(null);
      } catch (error) {
        console.error(error);
        // setError('Failed to load data, please refresh');
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
    <div className={`xl:ml-[23rem] lg:ml-[23rem] ml-0 w-full h-full ${location.pathname === '/submit' ? 'xl:ml-[15.6rem] lg:ml-[15.6rem] mt-0 h-screen w-screen ' + (darkMode ? 'bg-[#0B1416]' : 'bg-[#dae0e6]') : ''}`}>

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
                  error={error}
                />
                {!isMobile && <PopularTrending trendingData={popularCommunityChannel} error={error}/>}
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
                  error={error}

                />
                {/* {!isResponsive && <PopularTrending trendingData={popularCommunityChannel} />} */}

              </div>
            </div>
          }
        />
        <Route
          path="/post/:id"
          element={<ProtectedRouting element={<PostDetails posts={posts} />} />}
        />
        <Route
          path="/submit"
          element={<ProtectedRouting element={<CreateAPost />} />}
        />
        <Route
          path="/community/:id"
          element={<ProtectedRouting element={<CommunityPageDetails />} />}
        />
        <Route
          path="/user/:name/"
          element={<ProtectedRouting element={<ProfileOverview />} />}
        />
        <Route
          path="/users/:authorName"
          element={<ProtectedRouting element={<AuthorProfile posts={posts} />} />}
        />
        <Route
          path="/post/:id"
          element={<ProtectedRouting element={<PostDetails posts={posts} />} />}
        />
        <Route path={"*"} element={<Error />} />
        <Route path={"/work-under-progress"} element={<WorkUnderProgress />} />

      </Routes>
    </div>
  );
};

export default Home;
