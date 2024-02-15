import React from "react";
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
import { IoGameControllerOutline,IoStarOutline  } from "react-icons/io5";
import { MdCurrencyBitcoin, MdSportsBaseball } from "react-icons/md";
import { HiTrendingUp } from "react-icons/hi";
import { PiTelevisionSimple } from "react-icons/pi";

const Aside = () => {
  const [open, setOpen] = React.useState(0);
  const [subOpen, setSubOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    // Ensure nested accordion is closed when parent accordion is closed
    if (open !== value) {
      setSubOpen(0);
    }
  };

  const handleSubOpen = (value) => {
    setSubOpen(subOpen === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[27rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed top-16 left-0 z-10">
      <div className="flex justify-end">
        <List className="">
          <ListItem className="text-black py-2">
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem className="text-black py-2">
            <ListItemPrefix>
              <ArrowTrendingUpIcon className="h-5 w-5" />
            </ListItemPrefix>
            Popular
          </ListItem>
          <hr className=" py-2 border-blue-gray-50" />
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
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
                  className="mr-auto custom-textSideNav uppercase"
                >
                  Recent
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Analytics
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Reporting
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Projects
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className=" py-2 border-blue-gray-50" />
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <Typography
                  color="black"
                  variant="small"
                  className="mr-auto custom-textSideNav uppercase"
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
                        className={`mx-auto h-4 w-4 transition-transform ${
                          open === 2 && subOpen === 1 ? "rotate-180" : ""
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
                        className={`mx-auto h-4 w-4 transition-transform ${
                          open === 2 && subOpen === 2 ? "rotate-180" : ""
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
                        <MdSportsBaseball className="text-xl"/>   <span className="text-[.9rem] ml-2">Sports</span>
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
                        className={`mx-auto h-4 w-4 transition-transform ${
                          open === 2 && subOpen === 3 ? "rotate-180" : ""
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
                          <HiTrendingUp className="text-xl"/>   <span className="text-[.9rem] ml-2">Business</span>
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
                        className={`mx-auto h-4 w-4 transition-transform ${
                          open === 2 && subOpen === 4 ? "rotate-180" : ""
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
                          <MdCurrencyBitcoin  className="text-xl"/>   <span className="text-[.9rem] ml-2">Crypto</span>
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
                        className={`mx-auto h-4 w-4 transition-transform ${
                          open === 2 && subOpen === 5 ? "rotate-180" : ""
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
                          <PiTelevisionSimple   className="text-xl"/>   <span className="text-[.9rem] ml-2">Television</span>
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
                        className={`mx-auto h-4 w-4 transition-transform ${
                          open === 2 && subOpen === 6 ? "rotate-180" : ""
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
                          <IoStarOutline   className="text-xl"/>   <span className="text-[.9rem] ml-2">Celebrity</span>
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
          </Accordion>
          <hr className=" py-2 border-blue-gray-50" />

          <Accordion
            open={open === 3}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 3 ? "rotate-180" : ""
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
                  className="mr-auto custom-textSideNav uppercase"
                >
                  Resources
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className=" py-2 border-blue-gray-50" />

          <Accordion
            open={open === 4}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 4 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 4}>
              <AccordionHeader
                onClick={() => handleOpen(4)}
                className="border-b-0 p-3"
              >
                <Typography
                  color="black"
                  variant="small"
                  className="mr-auto custom-textSideNav uppercase"
                >
                  Popular Posts
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
        </List>
      </div>
    </Card>
  );
};

export default Aside;
