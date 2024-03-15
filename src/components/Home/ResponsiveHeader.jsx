import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, List, ListItem, ListItemSuffix, Typography } from '@material-tailwind/react';
import Aside from '../Navbar/Aside';
import { ContextAPIContext } from '../Context/ContextAPIContext ';

const ResponsiveHeader = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const [ showResults, setShowResults ] = useState(false);
    const searchRef = useRef(null);

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

    return (
        <div className=''>
            <div className='flex justify-between items-center py-3'>
                <div className='flex items-center'>
                    <div className='mr-2 cursor-pointer' onClick={handleAsideToggle}><img src="/images/svgs/threeLines.svg" alt="" className='mx-3' /></div>
                    <div><img src="/images/svgs/reddit-icon.svg" alt="" className='cursor-pointer' onClick={() => { navigate("/") }} /></div>
                </div>
                <div className='flex items-center'>
                    <Button className=' p-3 clr-FF4500 rounded-2xl capitalize py-2 cursor-pointer'>Use app</Button>
                    <div onClick={handleSearchIconClick}><img src="/images/svgs/search.svg" alt="" className='mx-2 cursor-pointer' /></div>
                    <div><img src="/images/svgs/threeDots.svg" alt="" className='mx-2 cursor-pointer' /></div>
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
                        {searchResults &&showResults&& (
                            <div className="absolute top-28 z-10">
                                <Card className="w-[29rem]">
                                    <List className="overflow-y-scroll max-h-96">
                                        {searchResults.map((item, idx) => (
                                            <ListItem
                                                ripple={false}
                                                className="py-1 pr-1 pl-4 text-black"
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
                                                                src={item?.channel?.image}
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
                                                    <img src={item?.images[0]} width={130} alt="img" />
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
