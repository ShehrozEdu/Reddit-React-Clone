import React, { useState } from "react";

const TrendingItem = ({ subreddit, members, avatar }) => {
  return (
    <div className="pb-1">
      <div className="px-3 py-2">
        <div className="flex">
          <img
            className="h-8 w-8 border rounded-full mr-2"
            src={avatar}
            alt="Avatar"
          />
          <div className="flex flex-col font-medium">
            <a
              href="#"
              className="text-sm text-black-alt no-underline leading-tight"
            >
              {subreddit}
            </a>
            <span className="text-[.76rem]">{members} members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularTrending = ({ trendingData }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="absolute right-40 top-6 rounded bg-white mb-4 border"
      style={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}
    >
      <div className="p-3 text-xxs font-semibold w-full">
        TRENDING COMMUNITIES
      </div>
      {trendingData
        .slice(0, showMore ? trendingData.length : 4)
        .map((item, index) => (
          <TrendingItem key={index} {...item} />
        ))}
      {!showMore && trendingData.length > 4 && (
        <div
          className="p-3 text-black hover:bg-gray-500 text-[.789rem] cursor-pointer"
          onClick={() => setShowMore(true)}
        >
          See More
        </div>
      )}
      {showMore && (
        <div
          className="p-3 px-5 text-center text-black hover:bg-gray-500 text-sm cursor-pointer"
          onClick={() => setShowMore(false)}
        >
          See Less
        </div>
      )}
    </div>
  );
};

export default PopularTrending;
