import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  HomeIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { IoGameControllerOutline, IoStarOutline } from "react-icons/io5";
import { MdCurrencyBitcoin, MdSportsBaseball } from "react-icons/md";
import { HiTrendingUp } from "react-icons/hi";
import { PiTelevisionSimple } from "react-icons/pi";
import { ContextAPIContext } from "../Context/ContextAPIContext ";
import CreateCommunity from "../../Community/CreateCommunity";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";

const Aside = () => {
  const [open, setOpen] = React.useState(0);
  const [subOpen, setSubOpen] = React.useState(0);
  const [width, setWidth] = useState("75%");
  const { clickedButton, data, popularCommunityChannel, recentCommunities, setRecentCommunities, darkMode, setCommId, handleClickToast, handleCommNav, setIsAsideOpen, handleCommunityDetails, handleAsideToggle } = useContext(ContextAPIContext);

  // Adjusts width based on current location path
  useEffect(() => {
    if (location.pathname === "/submit") {
      setWidth("100%");
    } else {
      setWidth("75%");
    }
  }, [location.pathname]);

  // Toggles main navigation menu
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    if (open !== value) {
      setSubOpen(0);
    }
  };

  // Toggles sub navigation menu
  const handleSubOpen = (value) => {
    setSubOpen(subOpen === value ? 0 : value);
  };

  // Navigates to the specified route
  const navigate = useNavigate();

  // Retrieves recent communities from session storage
  useEffect(() => {
    const storedCommunities = sessionStorage.getItem("recentCommunities");
    if (storedCommunities) {
      setRecentCommunities(JSON.parse(storedCommunities));
    }
  }, []);

  // Detects whether the device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Retrieves user info from local storage
  const userinfo = localStorage.getItem("userData");


  return (

    <Card className={`h-[calc(100vh-4.2rem)] w-full max-w-[21rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed top-16 left-0 z-10 ${darkMode ? 'bg-[#0B1416]' : ''}`}>

      <div className="">
        <Scrollbars autoHide style={{ height: "calc(100vh - 4.2rem)", width: isMobile ? "100%" : width }}>
          <List className="">
            <ListItem
              className="text-black dark:text-white py-2"
              onClick={() => {
                { navigate("/"); setIsAsideOpen(false) }
              }}
            >
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home
            </ListItem>
            <ListItem
              className="text-black dark:text-white py-2"
              onClick={() => {
                { navigate("/popular"); setIsAsideOpen(false) }

              }}
            >
              <ListItemPrefix>
                <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-popular.svg" : "/images/svgs/popular.svg"} alt="" />
              </ListItemPrefix>
              Popular
            </ListItem>
            <hr className=" py-2 border-blue-gray-50" />
            {userinfo && <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <Typography
                    color="black"
                    variant="small"
                    className={`mr-auto ${darkMode ? "custom-textSideNavDark" : "custom-textSideNav"} uppercase`}
                  >
                    Recent
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  {(recentCommunities.length > 0 ? recentCommunities.map((community, index) => (
                    <ListItem key={index} onClick={() => { handleCommunityDetails(community._id); handleAsideToggle() }}>
                      <div className="flex items-center dark:text-white">
                        <img
                          className="h-8 w-8 border rounded-full mr-2"
                          src={community.image ? community.image : "https://styles.redditmedia.com/t5_4u2xam/styles/communityIcon_ude638vcihsb1.png"}
                          alt="Avatar"
                        />
                        <div className="flex flex-col font-medium items-center dark:text-white">
                          <a
                            className="text-sm text-black no-underline leading-tight cursor-pointer hover:text-blue-gray-200 dark:text-white"
                          >
                            r/{community.name}
                          </a>
                        </div>
                      </div>
                    </ListItem>
                  )) : <ListItem>No recent Items</ListItem>)}


                </List>
              </AccordionBody>
            </Accordion>}
            {userinfo && <hr className=" py-2 border-blue-gray-50" />}
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              {!data ? (
                <>
                  <ListItem className="p-0" selected={open === 2}>
                    <AccordionHeader
                      onClick={() => handleClickToast()}
                      className="border-b-0 p-3"
                    >
                      <Typography
                        color="black"
                        variant="small"
                        className={`mr-auto ${darkMode ? "custom-textSideNavDark" : "custom-textSideNav"} uppercase`}
                      >
                        Topics
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {/* Nested Accordion */}
                      <>
                        {/* Nested Accordion 1: Games */}
                        <Accordion
                          open={open === 2 && subOpen === 1}
                          icon={
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`mx-auto h-4 w-4 transition-transform ${open === 2 && subOpen === 1 ? "rotate-180" : ""
                                }`}
                            />
                          }
                        >
                          <ListItem
                            className="p-0"
                            selected={open === 2 && subOpen === 1}
                          >
                            <AccordionHeader
                              onClick={() => handleSubOpen(1)}
                              className="border-b-0 p-3"
                            >
                              <Typography
                                color="black"
                                variant=""
                                className="mr-auto custom-textSideNav flex items-center "
                              >
                                <IoGameControllerOutline className="text-xl" />
                                <span className="text-[.9rem] ml-2">Gaming</span>
                              </Typography>
                            </AccordionHeader>
                          </ListItem>
                          <AccordionBody className="py-1">
                            <List className="p-0">
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix></ListItemPrefix>
                                Game Item 1
                              </ListItem>
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Game Item 2
                              </ListItem>
                            </List>
                          </AccordionBody>
                        </Accordion>

                        {/* Nested Accordion 2: Sports */}
                        <Accordion
                          open={open === 2 && subOpen === 2}
                          icon={
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`mx-auto h-4 w-4 transition-transform ${open === 2 && subOpen === 2 ? "rotate-180" : ""
                                }`}
                            />
                          }
                        >
                          <ListItem
                            className="p-0"
                            selected={open === 2 && subOpen === 2}
                          >
                            <AccordionHeader
                              onClick={() => handleSubOpen(2)}
                              className="border-b-0 p-3"
                            >
                              <Typography
                                color="black"
                                variant="small"
                                className="mr-auto custom-textSideNav flex items-center"
                              >
                                <MdSportsBaseball className="text-xl" />{" "}
                                <span className="text-[.9rem] ml-2">Sports</span>
                              </Typography>
                            </AccordionHeader>
                          </ListItem>
                          <AccordionBody className="py-1">
                            <List className="p-0">
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Sport Item 1
                              </ListItem>
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Sport Item 2
                              </ListItem>
                            </List>
                          </AccordionBody>
                        </Accordion>

                        {/* Nested Accordion 3: Business */}
                        <Accordion
                          open={open === 2 && subOpen === 3}
                          icon={
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`mx-auto h-4 w-4 transition-transform ${open === 2 && subOpen === 3 ? "rotate-180" : ""
                                }`}
                            />
                          }
                        >
                          <ListItem
                            className="p-0"
                            selected={open === 2 && subOpen === 3}
                          >
                            <AccordionHeader
                              onClick={() => handleSubOpen(3)}
                              className="border-b-0 p-3"
                            >
                              <Typography
                                color="black"
                                variant="small"
                                className="mr-auto custom-textSideNav flex items-center"
                              >
                                <HiTrendingUp className="text-xl" />{" "}
                                <span className="text-[.9rem] ml-2">
                                  Business
                                </span>
                              </Typography>
                            </AccordionHeader>
                          </ListItem>
                          <AccordionBody className="py-1">
                            <List className="p-0">
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Business Item 1
                              </ListItem>
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Business Item 2
                              </ListItem>
                            </List>
                          </AccordionBody>
                        </Accordion>

                        {/* Nested Accordion 4: Technology */}
                        <Accordion
                          open={open === 2 && subOpen === 4}
                          icon={
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`mx-auto h-4 w-4 transition-transform ${open === 2 && subOpen === 4 ? "rotate-180" : ""
                                }`}
                            />
                          }
                        >
                          <ListItem
                            className="p-0"
                            selected={open === 2 && subOpen === 4}
                          >
                            <AccordionHeader
                              onClick={() => handleSubOpen(4)}
                              className="border-b-0 p-3"
                            >
                              <Typography
                                color="black"
                                variant="small"
                                className="mr-auto custom-textSideNav flex items-center "
                              >
                                <MdCurrencyBitcoin className="text-xl" />{" "}
                                <span className="text-[.9rem] ml-2">Crypto</span>
                              </Typography>
                            </AccordionHeader>
                          </ListItem>
                          <AccordionBody className="py-1">
                            <List className="p-0">
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Technology Item 1
                              </ListItem>
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Technology Item 2
                              </ListItem>
                            </List>
                          </AccordionBody>
                        </Accordion>

                        {/* Nested Accordion 5: Education */}
                        <Accordion
                          open={open === 2 && subOpen === 5}
                          icon={
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`mx-auto h-4 w-4 transition-transform ${open === 2 && subOpen === 5 ? "rotate-180" : ""
                                }`}
                            />
                          }
                        >
                          <ListItem
                            className="p-0"
                            selected={open === 2 && subOpen === 5}
                          >
                            <AccordionHeader
                              onClick={() => handleSubOpen(5)}
                              className="border-b-0 p-3"
                            >
                              <Typography
                                color="black"
                                variant="small"
                                className="mr-auto custom-textSideNav flex items-center "
                              >
                                <PiTelevisionSimple className="text-xl" />{" "}
                                <span className="text-[.9rem] ml-2">
                                  Television
                                </span>
                              </Typography>
                            </AccordionHeader>
                          </ListItem>
                          <AccordionBody className="py-1">
                            <List className="p-0">
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Education Item 1
                              </ListItem>
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Education Item 2
                              </ListItem>
                            </List>
                          </AccordionBody>
                        </Accordion>

                        {/* Nested Accordion 6: Health */}
                        <Accordion
                          open={open === 2 && subOpen === 6}
                          icon={
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`mx-auto h-4 w-4 transition-transform ${open === 2 && subOpen === 6 ? "rotate-180" : ""
                                }`}
                            />
                          }
                        >
                          <ListItem
                            className="p-0"
                            selected={open === 2 && subOpen === 6}
                          >
                            <AccordionHeader
                              onClick={() => handleSubOpen(6)}
                              className="border-b-0 p-3"
                            >
                              <Typography
                                color="black"
                                variant="small"
                                className="mr-auto custom-textSideNav flex items-center "
                              >
                                <IoStarOutline className="text-xl" />{" "}
                                <span className="text-[.9rem] ml-2">
                                  Celebrity
                                </span>
                              </Typography>
                            </AccordionHeader>
                          </ListItem>
                          <AccordionBody className="py-1">
                            <List className="p-0">
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Health Item 1
                              </ListItem>
                              <ListItem className="custom-textSideNav">
                                <ListItemPrefix>
                                  <ChevronRightIcon
                                    strokeWidth={3}
                                    className="h-3 w-5"
                                  />
                                </ListItemPrefix>
                                Health Item 2
                              </ListItem>
                            </List>
                          </AccordionBody>
                        </Accordion>
                      </>
                    </List>
                  </AccordionBody>
                </>
              ) : (
                <>
                  <ListItem className="p-0" selected={open === 2}>
                    <AccordionHeader
                      onClick={() => handleOpen(2)}
                      className="border-b-0 p-3"
                    >
                      <Typography
                        color="black"
                        variant="small"
                        className={`mr-auto ${darkMode ? "custom-textSideNavDark" : "custom-textSideNav"} uppercase`}
                      >
                        Communities
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="flex flex-col">
                      <ListItem className="pl-0 py-1 flex items-center">
                        <CreateCommunity />
                      </ListItem>
                      {popularCommunityChannel.slice(0, 3).map((item, idx) => {
                        return (
                          <ListItem className="pl-0 py-1 flex items-center" key={idx} onClick={() => { handleCommunityDetails(item._id); handleAsideToggle() }}>
                            <span className="mr-3">
                              <img
                                src={item.image ? item.image : "https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png"}
                                className="rounded-full w-5 h-5"
                                alt=""
                              />
                            </span>
                            <div className="flex justify-between items-center w-full">
                              <span className="text-black dark:text-white"> r/{item.name}</span>
                              <span className="" onClick={handleClickToast}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                  />
                                </svg>
                              </span>
                            </div>
                          </ListItem>
                        )
                      })}

                    </List>
                  </AccordionBody>
                </>
              )}
            </Accordion>
            <hr className=" py-2 border-blue-gray-50" />

            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 3}>
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="border-b-0 p-3"
                >
                  <Typography
                    color="black"
                    variant="small"
                    className={`mr-auto ${darkMode ? "custom-textSideNavDark" : "custom-textSideNav"} uppercase`}
                  >
                    Resources
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem onClick={() => navigate("/work-under-progress")}>
                    <ListItemPrefix >
                      <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-aboutReddit.svg" : "/images/svgs/resourcesTab/aboutReddit.svg"} alt="" />
                    </ListItemPrefix>
                    <h5  className="dark:text-white">About Reddit</h5>
                  </ListItem>
                  <ListItem onClick={() => navigate("/work-under-progress")}>
                    <ListItemPrefix>
                      <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-advertise.svg" : "/images/svgs/resourcesTab/advertise.svg"} alt="" />
                    </ListItemPrefix>
                   <h5 className="dark:text-white"> Advertise</h5>
                  </ListItem >
                  <ListItem onClick={() => navigate("/work-under-progress")}>
                    <ListItemPrefix>
                      <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-resourcesTab.svg" : "/images/svgs/resourcesTab/help.svg"} alt="" />
                    </ListItemPrefix>
                    <h5 className="dark:text-white">Resources</h5>
                  </ListItem>

                  <ListItem onClick={() => navigate("/work-under-progress")}>
                    <ListItemPrefix>
                      <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-blog.svg" : "/images/svgs/resourcesTab/bolg.svg"} alt="" />
                    </ListItemPrefix>
                  <h5 className="dark:text-white">  Blog</h5>
                  </ListItem>



                </List>
              </AccordionBody>
            </Accordion>
            <hr className=" py-2 border-blue-gray-50" />


          </List>
        </Scrollbars>
      </div>
    </Card>
  );
};

export default Aside;
