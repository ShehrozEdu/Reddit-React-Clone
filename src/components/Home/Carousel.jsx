import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Card,
  CardHeader,
  CardBody,
  Typography, Button,
  Avatar, CardFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextAPIContext } from "../Context/ContextAPIContext ";
import Skeleton from 'react-loading-skeleton';
import { toast } from "react-toastify";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,

        }
      }
    ]
  };
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(ContextAPIContext)
  const handlePostClick = (postId) => {

    navigate(`/post/${postId}`);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {

        setLoading(true); // Set loading to true at the start of the API call
        const response = await axios.get(
          "https://academics.newtonschool.co/api/v1/reddit/post?page=2",
          {
            headers: {
              projectId: "t0v7xsdvt1j1",
            },
          }
        );
        setPosts(response.data.data);
        setLoading(false); // Set loading to false after the API call is complete
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchPosts();
  }, []);
  return (
    <Slider {...settings} className={`responsiveWidth ${darkMode ? "bg-[#0B1416]" : ""}`}>
      {(posts.map((post) => (
        post.author.name!="ash"&&
        <Card
          key={post._id}
          shadow={false}
          className={`relative grid h-[13rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center cursor-pointer ${darkMode ? "bg-[#0B1416]" : ""}`}
          onClick={() => {
            if (localStorage.getItem('token')) {
              handlePostClick(post._id)
            } else {
              toast.error("Login please")
            }
          }}
        >
          {
            loading ? <>
              <Card className="animate-pulse">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="relative grid h-56 place-items-center bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-12 w-12 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </CardHeader>


              </Card>
            </> : <>
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
                <Typography variant="h6" color="white" className="flex px-4 text-lg">
                  {post?.title && post.title.length > 16
                    ? post.title.slice(0, 16) + "..."
                    : post.title || (post.content && post.content.length > 16
                      ? post.content.slice(0, 16) + "..."
                      : post.content)}
                  <img src="" alt="" />
                </Typography>
                <div className="flex items-center px-4">
                  <img src={post.author.profileImage || "/images/svgs/defaultProfile.svg"} alt="" className="rounded-full w-6 h-6 bg-gray-100" />
                  <Typography className="text-gray-400 text-xs text-left ml-1">
                    r/{post.author.name} and more
                  </Typography></div>
              </CardBody>
            </>
          }

        </Card>
      )))}
    </Slider>
  );
};

export default Carousel;
