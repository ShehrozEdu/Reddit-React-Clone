import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  List,
  ListItem,
  Card,
  Popover,
  PopoverHandler,
  PopoverContent,
  ListItemPrefix,
  ListItemSuffix,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Switch,
} from "@material-tailwind/react";
import {
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  QrCodeIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ContextAPIContext } from "../Context/ContextAPIContext ";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import { toast } from "react-toastify";
import Scrollbars from "react-custom-scrollbars-2";

const useThrottle = (callback, delay) => {
  const [lastCall, setLastCall] = useState(0);

  return (...args) => {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }

    setLastCall(now);
    callback(...args);
  };
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();




  const { posts, data, setShowResults, showResults, setDarkMode, darkMode, handleClickToast,handlePostClick } = useContext(ContextAPIContext);
  const searchRef = useRef(null);

  const throttledFilterData = useThrottle(filterData, 500);

  function filterData() {
    const filteredResults = posts.filter(
      (item) =>
        item?.content &&
        item?.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }

  useEffect(() => {
    if (showResults) {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowResults(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showResults]);

  useEffect(() => {
    throttledFilterData();
  }, [searchQuery, throttledFilterData]);
 

  // console.log(data)
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [openPop, setOpenPop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTogglePop = (event) => {
    if (openPop) {
      // Close the popover
      setOpenPop(false);
    } else {
      // Open the popover
      setAnchorEl(event.currentTarget);
      setOpenPop(true);
    }
  };
  return (
    <div className="sticky top-0 z-50">
      <Navbar
        variant="color"
        color={darkMode ? "gray" : "white"}
        fullWidth={true}
        className={`w-full p-0 px-8 border-b-1 border-b-gray-300 shadow-none ${darkMode ? 'bg-[#0B1416]' : ''}`}
      >
        <div className="flex items-center justify-between text-white w-full">
          {/* Logo on the left */}
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => navigate("/")}
          >
            <img src="/images/svgs/reddit-icon.svg" alt="" />
            <img
              src="/images/svgs/reddit-name.svg"
              alt=""
              className="fill-FF4500 h-[22px]"
            />
          </div>

          {/* Search bar in the middle */}
          <div className="flex items-center gap-2 ">
            <div className="p-2" ref={searchRef}>
              <Input
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                label="Search Reddit"
                className={darkMode ? "dark-customInp" : "customInp focus:border-0"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowResults(true)}
                // onClick={()=>handleNavigate()}
              />
              {/* Render search results */}
              {showResults && (
                <div className="absolute top-12">
                  <Card className="w-[37rem]">
                    <Scrollbars autoHide style={{ "height": "26rem" }}>
                      <List className={` ${darkMode ? 'clr-dark-head' : ''} `}>
                        {searchResults.map((item, idx) => (
                          <>
                          <ListItem
                            ripple={false}
                            className="py-0 pr-1 pl-1 text-black dark:text-white "
                            key={idx}
                            onClick={() => handlePostClick(item?._id)}
                          >
                            <div className="flex">
                              <div className="flex flex-col justify-start">

                                <Typography
                                  variant="small"
                                  color={darkMode ? "white" : "black"}
                                  className="mr-2 font-medium"
                                >
                                  {item?.content?.slice(0, 40)}
                                </Typography>
                                <div className="flex items-center justify-start">
                                  <img
                                    src={(item.channel?.image)?.startsWith("https") ? (item?.channel?.image) : "/images/svgs/defaultProfile.svg"}
                                    alt="smallImg"
                                    className="w-5 rounded-full mr-1"
                                  />
                                  <Typography className="text-xs">
                                    r/{item?.channel?.name.toLowerCase()} and more
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          

                            <ListItemSuffix>
                              {item?.images[0]?.startsWith("https") && <img src={item.images[0]} width={130} alt="img" />}
                            </ListItemSuffix>

                          </ListItem>
                          <hr />
                          </>
                        ))}
                      </List>
                    </Scrollbars>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Buttons on the right */}
          {!data ? (
            <div className="flex items-center gap-1">
              
              <div className="flex items-center justify-center bg-gray-300 p-1 rounded-3xl">
                <IconButton variant="text" color="black">
                  <QrCodeIcon className="h-6 w-6" />
                </IconButton>
                <Typography
                  variant="small"
                  color="black"
                  className="mr-2 font-medium"
                  onClick={() => handleClickToast()}
                >
                  Get App
                </Typography>
              </div>
              {!data ? (
                <Login />
              ) : (
                <Button className="text-white rounded-2xl clr-FF4500">
                  {data?.name}
                </Button>
              )}
              {/* <EllipsisHorizontalIcon className="h-8 w-8 text-black" />) */}
            </div>
          ) : (
            <div className="flex items-center  justify-center gap-1">
              <div className="rounded-3xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600   p-2">
                <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-mouse-cursor.svg" : "/images/svgs/mouse-cursor.svg"} alt="" onClick={handleClickToast} />
              </div>
              <div className=" cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600  p-2">
                <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-comment.svg" : "/images/svgs/comment.svg"} alt="" onClick={handleClickToast} />
              </div>
              <div className=" flex items-center hover:bg-gray-200 dark:hover:bg-gray-600  rounded-3xl p-3 cursor-pointer" onClick={() => navigate("/submit")}>
                <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-plus.svg" : "/images/svgs/plus.svg"} alt="Add" /> <span className="text-black dark:text-white ml-2"> Create</span>
              </div>
              <div onClick={handleClickToast} className="rounded-3xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600  p-2">
                <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-notif.svg" : "/images/svgs/notification.svg"} alt="" />
              </div>
              <div className="">
                <Popover
                  open={openPop}
                  placement="top"
                  handler={handleTogglePop}
                  anchorEl={anchorEl}
                >
                  <PopoverHandler>
                    <span
                      rpl=""
                      class="w-[2rem] h-[2rem] inline-block rounded-full relative cursor-pointer"
                    >
                      <img
                        src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
                        alt="User Avatar"
                        className="max-w-full rounded-full"
                      />
                    </span>
                  </PopoverHandler>
                  <PopoverContent className={`${darkMode ? "bg-[#0B1416]" : ""}`}>
                    <List className={`my-2 p-0 `}>
                      <ListItem className="group rounded-none py-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black" onClick={() => { handleTogglePop(); navigate(`/user/${data?.name.toLowerCase()}/`) }}>
                        <ListItemPrefix>
                          <img
                            src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
                            alt="User Avatar"
                            class="max-w-full rounded-full"
                            width={25}
                          />
                        </ListItemPrefix>
                        <div className="flex flex-col justify-start">
                          {" "}
                          <p className="text-sm dark:text-white">View Profile</p>
                          <p className="text-xs text-blue-gray-300 dark:text-white">
                            u/{data?.name}
                          </p>
                        </div>
                      </ListItem>
                      <ListItem className="rounded-none py-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white"
                        onClick={() => { handleTogglePop(); handleClickToast() }}
                      >
                        <ListItemPrefix>
                          <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-shirt.svg" : "/images/svgs/shirt.svg"} alt="" />
                        </ListItemPrefix>
                        Edit Avatar
                      </ListItem>

                      <ListItem className="rounded-none py-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white" onClick={() => { handleTogglePop(); handleClickToast() }}>
                        <ListItemPrefix>
                          <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-trophy.svg" : "/images/svgs/trophy.svg"} alt="" />
                        </ListItemPrefix>
                        <div className="flex flex-col justify-start">
                          {" "}
                          <p> Achievements</p>
                          <p className="text-sm text-blue-gray-300">
                            3 unlocked
                          </p>
                        </div>
                      </ListItem>

                      <ListItem className="rounded-none py-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white" onClick={() => { handleTogglePop(); handleClickToast() }}>
                        <ListItemPrefix>
                          <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-wallet.svg" : "/images/svgs/wallet.svg"} alt="" />
                        </ListItemPrefix>
                        <div className="flex flex-col justify-start">
                          {" "}
                          <p className="text-sm">Contributer</p>
                          <p className="text-xs text-blue-gray-300 flex items-center">
                            <span>
                              <img
                                src="/images/svgs/upArrow.svg"
                                className="mr-1"
                                alt=""
                              />
                            </span>
                            <span className="text-sm">0</span>
                          </p>
                        </div>
                      </ListItem>
                      <ListItem className="rounded-none py-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white" onClick={() => { handleTogglePop(); }}>
                        <ListItemPrefix>
                          <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-moon.svg" : "/images/svgs/moon.svg"} alt="" />
                        </ListItemPrefix>
                        <div className="flex items-center">
                          <p className="mr-3">Dark Mode</p>
                          <Switch
                            id="custom-switch-component"
                            ripple={false}
                            className="h-full w-full checked:bg-[#0043A7]"
                            containerProps={{
                              className: "w-11 h-6",
                            }}
                            circleProps={{
                              className: "before:hidden left-0.5 border-none",
                            }}
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                          />
                        </div>
                      </ListItem>
                      <ListItem
                        className="rounded-none py-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white"
                        onClick={handleOpen}
                      >
                        <ListItemPrefix>
                          <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-logout.svg" : "/images/svgs/logout.svg"} alt="" />
                        </ListItemPrefix>
                        <div onClick={handleOpen} variant="gradient">
                          Logout
                        </div>
                        <Dialog open={open} handler={handleOpen} size="sm">
                          <DialogHeader>Logout</DialogHeader>
                          <DialogBody>
                            Are you Sure? You want to log out from your account
                            ?
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="text"
                              color="red"
                              onClick={handleOpen}
                              className="mr-1"
                            >
                              <span>Cancel</span>
                            </Button>
                            <Button
                              variant="gradient"
                              color="green"
                              onClick={() => handleLogout()}
                            >
                              <span>Confirm</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </ListItem>
                      <hr />

                      <ListItem className="rounded-none py-5 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white" onClick={() => { handleTogglePop(); handleClickToast() }}>
                        <ListItemPrefix>
                          <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-mouse-cursor.svg" : "/images/svgs/mouse-cursor.svg"} alt="" />
                        </ListItemPrefix>
                        Advertise on Reddit
                      </ListItem>
                      <hr />

                      <ListItem className="rounded-none py-5 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white" onClick={() => { handleTogglePop(); handleClickToast() }}>
                        <ListItemPrefix>
                          <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-settings.svg" : "/images/svgs/settings.svg"} alt="" />
                        </ListItemPrefix>
                        Settings
                      </ListItem>
                      <hr />
                      <ListItem className="rounded-none pt-5 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white" onClick={() => {handleTogglePop(); navigate("/premium")}}>
                        <ListItemPrefix>
                          <img src={darkMode ? "/images/svgs/darkModeSvgs/dark-shield.svg" : "/images/svgs/shield.svg"} alt="" />
                        </ListItemPrefix>
                        Premium
                      </ListItem>
                    </List>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
};
export default Header;
