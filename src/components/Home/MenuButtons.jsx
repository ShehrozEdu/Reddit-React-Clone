import React, { useContext } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import Scrollbars from "react-custom-scrollbars-2";
import { ContextAPIContext } from "../Context/ContextAPIContext ";

const MenuItemList = ({ items, selectedItem, setSelectedItem }) => {
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <MenuList className="min-w-[6rem] max-h-72">
      {items.map((item, index) => (
        <MenuItem
          key={index}
          className=" text-black hover:bg-transparent"
          onClick={() => handleMenuItemClick(item)}
        >
          {item}
        </MenuItem>
      ))}
    </MenuList>
  );
};

const MenuButtons = ({ showCountrySelect }) => {
  const { setSelectedItem, selectedItem } = useContext(ContextAPIContext);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenuCountry, setOpenMenuCountry] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState("India");

  return (
    <div className="flex">
      <Menu open={openMenu} handler={setOpenMenu} className="mr-1 ">
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-1 font-normal capitalize tracking-normal text-sm dark:text-white"
          >
            {selectedItem}
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuItemList
          items={["Best", "Hot", "New", "Top", "Rising"]}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          className="dark:bg-black"
          
        />
      </Menu>
      {showCountrySelect && (
        <Menu open={openMenuCountry} handler={setOpenMenuCountry} className="  ">
          <MenuHandler>
            <Button
              variant="text"
              className="flex items-center gap-3 font-normal capitalize tracking-normal text-sm dark:text-white"
            >
              {selectedCountry}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  openMenuCountry ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuItemList
            items={[
              "Everywhere",
              "United States",
              "Argentina",
              "Australia",
              "Bulgaria",
              "Canada",
              "Chile",
              "Colombia",
              "Croatia",
              "Czech Republic",
              "Finland",
              "France",
              "Germany",
              "Greece",
              "Hungary",
              "Iceland",
              "India",
              "Ireland",
              "Italy",
              "Japan",
              "Malaysia",
              "Mexico",
              "New Zealand",
              "Philippines",
              "Poland",
              "Portugal",
              "Puerto Rico",
              "Romania",
              "Serbia",
              "Singapore",
              "Spain",
              "Sweden",
              "Taiwan",
            ]}
            selectedItem={selectedCountry}
            setSelectedItem={setSelectedCountry}
            className="dark:bg-black"
          />
        </Menu>
      )}
    </div>
  );
};

export default MenuButtons;
