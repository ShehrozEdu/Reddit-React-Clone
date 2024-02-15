import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";

const MenuItemList = ({ items, selectedItem, setSelectedItem }) => {
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <MenuList className="min-w-[6rem]">
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

const MenuButtons = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenuCountry, setOpenMenuCountry] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("Hot");
  const [selectedCountry, setSelectedCountry] = React.useState("India");

  return (
    <div className="flex">
      <Menu open={openMenu} handler={setOpenMenu} className="mr-1">
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-1 font-normal capitalize tracking-normal text-sm"
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
        />
      </Menu>
      <Menu open={openMenuCountry} handler={setOpenMenuCountry}>
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-3 font-normal capitalize tracking-normal text-sm"
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
        />
      </Menu>
    </div>
  );
};

export default MenuButtons;
