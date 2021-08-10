import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaSignOutAlt,
  FaWindows,
  FaStore,
  FaTimes,
  FaCogs,
} from "react-icons/fa";
import { MdAccountBalanceWallet, MdKeyboardArrowDown } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { FaWarehouse } from "react-icons/fa";
import { Image, Center } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import dashboard from "../../assets/dashboard.svg";
import contestants from "../../assets/contestants.svg";
import evicted from "../../assets/evicted.svg";
import upForEviction from "../../assets/up-for-eviction.svg";
import { BsWallet } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux";

export const LeftSidebar: React.FC = (): JSX.Element => {
  return (
    <aside className="sidebar bg-primary padding-horizontal-sm">
      <Center>
        <Image src={logo} alt="ParaPay Logo" className="logo" />
      </Center>
      <SidebarItem
        link="/dashboard"
        svg={dashboard}
        text="dashboard"
        exact={true}
      />
      <SidebarItem
        link="/dashboard/contestants"
        svg={contestants}
        text="contestants"
      />
      <SidebarItem
        link="/dashboard/up-for-eviction"
        svg={upForEviction}
        text="up for eviction"
      />
      <SidebarItem link="/dashboard/evicted" svg={evicted} text="evicted" />

      <SidebarItem link="/dashboard/wallet" icon={BsWallet} text="Wallet" />
      <SidebarItem
        link="/dashboard/vote-settings"
        icon={FaCogs}
        text="Vote Settings"
      />
      <Logout />
    </aside>
  );
};

const SidebarItem = ({ svg, icon: Icon, text, link, ...rest }: any) => {
  return (
    <li>
      <NavLink
        {...rest}
        to={link}
        activeClassName="active"
        className="d-flex align-items-center color-white sidebar-item padding-vertical-sm margin-bottom-sm padding-horizontal-md"
      >
        {svg && <Image src={svg} className="icon margin-right-sm" />}
        {Icon && <Icon className="color-white margin-right-sm" size={20} />}
        <span className="font-sm capitalize font-weight-500 font-style-normal">
          {text}
        </span>
      </NavLink>
    </li>
  );
};

const Logout = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <li>
      <Box
        as="button"
        onClick={() => dispatch(logout())}
        className="d-flex align-items-center color-white sidebar-item padding-vertical-sm margin-bottom-sm padding-horizontal-md"
      >
        <BiLogOutCircle className="color-white margin-right-sm" size={20} />
        <span className="font-sm capitalize font-weight-500 font-style-normal">
          Logout
        </span>
      </Box>
    </li>
  );
};
