import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  QrCodeIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <Navbar
        variant="color"
        color="white"
        fullWidth={true}
        className="w-full p-0 px-8 border-b-1 border-b-gray-300 shadow-none "
      >
        <div className="flex items-center justify-between text-white w-full">
          {/* Logo on the left */}
          <div className="flex items-center gap-3">
            <img src="/images/svgs/reddit-icon.svg" alt="" />
            <img
              src="/images/svgs/reddit-name.svg"
              alt=""
              className="fill-FF4500 h-[22px]"
            />
          </div>

          {/* Search bar in the middle */}
          <div className="flex items-center gap-2 ">
            <div className="p-2">
              <Input
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                label="Search Reddit"
                className="customInp"
              />
            </div>
          </div>

          {/* Buttons on the right */}
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center bg-gray-300 p-1 rounded-3xl">
              <IconButton variant="text" color="black">
                <QrCodeIcon className="h-6 w-6" />
              </IconButton>
              <Typography
                variant="small"
                color="black"
                className="mr-2 font-medium"
              >
                Get App
              </Typography>
            </div>
            <Button className="rounded-3xl clr-FF4500">Log In</Button>
            <EllipsisHorizontalIcon className="h-8 w-8 text-black" />
          </div>
        </div>
      </Navbar>
    </div>
  );
};
export default Header;
