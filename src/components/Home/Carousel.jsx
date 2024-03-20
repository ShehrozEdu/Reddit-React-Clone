import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextAPIContext } from "../Context/ContextAPIContext ";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  const [posts, setPosts] = useState([]);
  const navigate=useNavigate();
  const {darkMode}=useContext(ContextAPIContext)
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://academics.newtonschool.co/api/v1/reddit/post",
          {
            headers: {
              projectId: "t0v7xsdvt1j1",
            },
          }
        );
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <Slider {...settings} className={`w-[65rem] ${darkMode?"bg-[#0B1416]":""}`}>
      {posts.map((post) => (
        <Card
          key={post._id}
          shadow={false}
          className={`relative grid h-[13rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center cursor-pointer ${darkMode?"bg-[#0B1416]":""}`}
          onClick={()=>{handlePostClick(post._id)}}
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className={`absolute inset-0 m-0 h-full w-full rounded-xl bg-cover bg-center card-main-control`}
            style={{
              backgroundImage:
                post.images.length > 0 ? `url(${post.images[0]})` : "none",
            }}
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
          </CardHeader>
          <CardBody className="relative py-36 px-0">
            <Typography variant="h5" color="white" className="flex px-4 text-xl">
            {post?.title && post.title.length > 16
    ? post.title.slice(0, 16) + "..."
    : post.title || (post.content && post.content.length > 16
        ? post.content.slice(0, 16) + "..."
        : post.content)}
<img src="" alt="" />
            </Typography>
            <div className="flex items-center px-4">
              <img src={post.author.profileImage|| "/images/svgs/defaultProfile.svg"} alt=""  className="rounded-full w-6 h-6 bg-gray-100" />
            <Typography  className="text-gray-400 text-xs text-left ml-1">
              r/{post.author.name} and more
            </Typography></div>
          </CardBody>
        </Card>
      ))}
    </Slider>
  );
};

export default Carousel;
