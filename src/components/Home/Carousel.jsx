import React from "react";
import Slider from "react-slick";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  return (

      <Slider {...settings}  className="w-[65rem]">
          <Card
            shadow={false}
            className="relative grid h-[13rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-xl bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center card-main-control"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="p"
                color="white"
                className=""
              >
                How we design and code open-source projects?
              </Typography>
              <Typography variant="" className="mb-4 text-gray-400">
                Tania Andrew
              </Typography>
              
            </CardBody>
          </Card>
          <Card
            shadow={false}
            className="relative grid h-[13rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-xl bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center card-main-control"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="p"
                color="white"
                className=""
              >
                How we design and code open-source projects?
              </Typography>
              <Typography variant="" className="mb-4 text-gray-400">
                Tania Andrew
              </Typography>
              
            </CardBody>
          </Card>
          <Card
            shadow={false}
            className="relative grid h-[13rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-xl bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center card-main-control"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="p"
                color="white"
                className=""
              >
                How we design and code open-source projects?
              </Typography>
              <Typography variant="" className="mb-4 text-gray-400">
                Tania Andrew
              </Typography>
              
            </CardBody>
          </Card>
          <Card
            shadow={false}
            className="relative grid h-[13rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-xl bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center card-main-control"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="p"
                color="white"
                className=""
              >
                How we design and code open-source projects?
              </Typography>
              <Typography variant="" className="mb-4 text-gray-400">
                Tania Andrew
              </Typography>
              
            </CardBody>
          </Card>
          <Card
            shadow={false}
            className="relative grid h-[13rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-xl bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center card-main-control"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="p"
                color="white"
                className=""
              >
                How we design and code open-source projects?
              </Typography>
              <Typography variant="" className="mb-4 text-gray-400">
                Tania Andrew
              </Typography>
              
            </CardBody>
          </Card>
          <Card
            shadow={false}
            className="relative grid h-[13rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-xl bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center card-main-control"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="p"
                color="white"
                className=""
              >
                How we design and code open-source projects?
              </Typography>
              <Typography variant="" className="mb-4 text-gray-400">
                Tania Andrew
              </Typography>
              
            </CardBody>
          </Card>
         
      
      </Slider>
  
  );
};

export default Carousel;
