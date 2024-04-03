import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Input, List, ListItem, ListItemPrefix, ListItemSuffix, Popover, PopoverContent, PopoverHandler, Switch, Typography } from '@material-tailwind/react';
import Aside from '../Navbar/Aside';
import { ContextAPIContext } from '../Context/ContextAPIContext ';

const ResponsiveHeader = () => {
    const{setDarkMode, darkMode,data,handleClickToast} = useContext(ContextAPIContext)
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
  const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
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
        if (showInput && searchQuery.trim() !== '') {
            const delayDebounceFn = setTimeout(() => {
                fetchSearchResults();
            }, 300); // Throttle time: 300 milliseconds
            return () => clearTimeout(delayDebounceFn);
        }
    }, [searchQuery, showInput]); // Include showInput in the dependency array

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post?search={"content":"${searchQuery}"}`, {
                headers: {
                    'projectId': "t0v7xsdvt1j1",
                }
            });
            setSearchResults(response.data.data);
            setShowResults(true);

        } catch (error) {
            console.error('Error fetching search results:', error);
        }

    }

    const handleAsideToggle = () => {
        setIsAsideOpen(!isAsideOpen);
    }

    const handleSearchIconClick = () => {
        setShowInput(true);
        // setShowResults(true); 
    }

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
        setSearchQuery("")
        setShowResults(false);
        setShowInput(false);

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
        <div className=''>
            <div className='flex justify-between items-center py-3'>
                <div className='flex items-center'>
                    <div className='mr-2 cursor-pointer' onClick={handleAsideToggle}><img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-threeLines.svg" : "/images/svgs/threeLines.svg"}`} alt="" className='mx-3' /></div>
                    <div><img src="/images/svgs/reddit-icon.svg" alt="" className='cursor-pointer' onClick={() => { navigate("/") }} /></div>
                </div>
                <div className='flex items-center'>
                    <Button className=' p-3 clr-FF4500 rounded-2xl capitalize py-2 cursor-pointer'>Use app</Button>
                    <div onClick={handleSearchIconClick}><img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-search.svg" : "/images/svgs/search.svg"}`} alt="" className='mx-2 cursor-pointer' /></div>
                    <div>
                    <Popover
                  open={openPop}
                  placement="top"
                  handler={handleTogglePop}
                  anchorEl={anchorEl}
                >
                  <PopoverHandler>
                  <img src={`${darkMode ? "/images/svgs/darkModeSvgs/dark-threeDots.svg" : "/images/svgs/threeDots.svg"}`} alt="" className='mx-2 cursor-pointer' />
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
                      <ListItem className="rounded-none pt-5 text-sm font-normal text-blue-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600  hover:text-black focus:bg-gray-200 focus:text-black dark:text-white" onClick={() => navigate("/premium")}>
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
            </div>
            <div>
                {isAsideOpen && <Aside />}
            </div>
            <hr />

            {showInput && (
                <div className="flex items-center gap-2" ref={searchRef}>
                    <div className="p-2">
                        <Input
                            type="text"
                            placeholder="Search Reddit"
                            className="w-[28.6rem]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchResults && showResults && (
                            <div className="absolute top-28 z-10">
                                <Card className="w-[26rem]">
                                    <List className="overflow-y-scroll max-h-96">
                                        {searchResults.map((item, idx) => (
                                            <ListItem
                                                ripple={false}
                                                className="py-1 pr-1 text-black"
                                                key={idx}
                                                onClick={() => handlePostClick(item?._id)}
                                            >
                                                <div className="flex">
                                                    <div className="flex flex-col justify-start">
                                                        <Typography variant="small">Heading</Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="black"
                                                            className="mr-2 font-medium"
                                                        >
                                                            {item?.content?.slice(0, 40)}
                                                        </Typography>
                                                        <div className="flex items-center justify-start">
                                                            <img
                                                                src={item?.channel?.image||"/images/svgs/defaultProfile.svg"}
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
                                                <img src={item.images && item.images[0]?.startsWith("https:") ? item.images[0] : ""} width={130} />


                                                </ListItemSuffix>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Card>
                            </div>)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResponsiveHeader;
