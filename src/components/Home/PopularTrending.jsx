import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextAPIContext } from "../Context/ContextAPIContext ";

const TrendingItem = ({ item, addToLocalStorage }) => {
  // Access properties of item using dot notation
  const { name, image, _id } = item;

  const navigate = useNavigate();
  const { setCommId,darkMode } = useContext(ContextAPIContext)

  const handleCommunityDetails = (id) => {
    setCommId(id);
    addToLocalStorage(item);
    navigate(`/community/${id}`)
  }
  
  return (
    <div className="pb-1">
      <div className="px-3 py-2">
        <div className="flex">
          <img
            className="h-8 w-8 border rounded-full mr-2"
            src={image ? image : "https://styles.redditmedia.com/t5_4u2xam/styles/communityIcon_ude638vcihsb1.png"}
            alt="Avatar"
          />
          <div className="flex flex-col font-medium ">
            <a
              onClick={(e) => handleCommunityDetails(_id)}
              className="text-sm text-black-alt no-underline leading-tight cursor-pointer hover:text-blue-gray-200 dark:text-white"
            >
              r/{name}
            </a>
            <span className="text-[.76rem] font-light dark:text-white">10,00,000 members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularTrending = ({ trendingData }) => {
  const [showMore, setShowMore] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const{recentCommunities,setRecentCommunities,darkMode }=useContext(ContextAPIContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsFixed(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const addToLocalStorage = (community) => {
    const newRecentCommunities = [community, ...recentCommunities.filter((c) => c && c._id !== community._id)];
    setRecentCommunities(newRecentCommunities);
    sessionStorage.setItem("recentCommunities", JSON.stringify(newRecentCommunities));
};


  return (
    <div
    className={`rounded-xl mb-4 border ${darkMode ? "bg-[#0B1416]" : "bg-gray-100"} w-64 ${
      isFixed
        ? "md:right-10 fixed right-20 top-90"
        : "md:right-10 fixed top-32 right-20"
    }`}
      style={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}
    >
      <div className="p-5 text-xs font-semibold w-full text-[#627c95]">
        POPULAR COMMUNITIES
      </div>
      {trendingData
        ?.slice(0, showMore ? trendingData.length : 4)
        .map((item, index) => (
          <TrendingItem key={index} item={item} addToLocalStorage={addToLocalStorage}/>
        ))}
      {!showMore && trendingData.length > 4 && (
        <div
          className="p-3 text-black hover:bg-gray-500 text-[.789rem] cursor-pointer hover:bg-inherit dark:text-white"
          onClick={() => setShowMore(true)}
        >
          See More
        </div>
      )}
      {showMore && (
        <div
          className="p-3 text-black hover:bg-gray-500 text-[.789rem] cursor-pointer hover:bg-inherit dark:text-white"
          onClick={() => setShowMore(false)}
        >
          See Less
        </div>
      )}
    </div>
  );
};

export default PopularTrending;
