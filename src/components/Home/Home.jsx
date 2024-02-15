import React from "react";
import Carousel from "./Carousel";
import MenuButtons from "./MenuButtons";
import Posts from "./Posts";
import PopularTrending from "./PopularTrending";

const Home = () => {
  const postsData = [
    {
      username: "u/TestUser",
      subreddit: "r/tailwind",
      time: "2 hours ago",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.",
      avatar: "https://avatars0.githubusercontent.com/u/30317862?s=200&v=4",
      image: "https://docs.material-tailwind.com/img/face-2.jpg",
      upvotes: 20,
      comments: 222,
    },
    {
      username: "u/TestUser",
      subreddit: "r/tailwind",
      time: "2 hours ago",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.",
      avatar: "https://avatars0.githubusercontent.com/u/30317862?s=200&v=4",
      image: "https://docs.material-tailwind.com/img/face-2.jpg",
      upvotes: 20,
      comments: 222,
    },
    {
      username: "u/TestUser",
      subreddit: "r/tailwind",
      time: "2 hours ago",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.",
      avatar: "https://avatars0.githubusercontent.com/u/30317862?s=200&v=4",
      image: "https://docs.material-tailwind.com/img/face-2.jpg",
      upvotes: 20,
      comments: 222,
    },
    {
      username: "u/TestUser",
      subreddit: "r/tailwind",
      time: "2 hours ago",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.",
      avatar: "https://avatars0.githubusercontent.com/u/30317862?s=200&v=4",
      image: "https://docs.material-tailwind.com/img/face-2.jpg",
      upvotes: 20,
      comments: 222,
    },
    {
      username: "u/TestUser",
      subreddit: "r/tailwind",
      time: "2 hours ago",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.",
      avatar: "https://avatars0.githubusercontent.com/u/30317862?s=200&v=4",
      image: "https://docs.material-tailwind.com/img/face-2.jpg",
      upvotes: 20,
      comments: 222,
    },
    {
      username: "u/TestUser",
      subreddit: "r/tailwind",
      time: "2 hours ago",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.",
      avatar: "https://avatars0.githubusercontent.com/u/30317862?s=200&v=4",
      image: "https://docs.material-tailwind.com/img/face-2.jpg",
      upvotes: 20,
      comments: 222,
    },
  ];
  const trendingData = [
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    {
      subreddit: 'r/tailwind',
      members: '45,00,000',
      avatar: 'https://avatars0.githubusercontent.com/u/30317862?s=200&v=4',
    },
    // Add more trending data objects here as needed
  ];
  return (
    <div className="ml-12 my-3 ms-[36rem]">
      <Carousel />
      <MenuButtons />
      <hr className=" py-2 border-blue-gray-50 " />
      <div className="flex relative">
        <Posts posts={postsData} />
        <PopularTrending trendingData={trendingData}/>
        
      </div>
    </div>
  );
};

export default Home;
