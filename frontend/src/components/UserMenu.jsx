import { Avatar, Menu, MenuItem } from "@mui/material";
import React from "react";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { RiFileList3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import BackDrop from "./shared/Backdrop";
import { LogOutAccount } from "../store/action";
import { useDispatch } from "react-redux";

function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative z-30">
      <div
        className="sm:border-[1px] sm:border-indigo-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 p-1 bg-white"
        onClick={handleClick}
      >
        <Avatar
          alt="Menu"
          src=""
          className="transform transition-all duration-300 hover:scale-105"
        />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
            mt: 1.5,
            borderRadius: "0.75rem",
            width: 200,
            "& .MuiList-root": {
              padding: "0.5rem",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/profile">
          <MenuItem
            className="flex gap-3 items-center px-4 py-3 rounded-lg transition-colors hover:bg-gray-50"
            onClick={handleClose}
          >
            <BiUser className="text-xl text-indigo-600" />
            <span className="font-semibold text-gray-700">Profile</span>
          </MenuItem>
        </Link>

        <Link to="/order">
          <MenuItem
            className="flex gap-3 items-center px-4 py-3 rounded-lg transition-colors hover:bg-gray-50"
            onClick={handleClose}
          >
            <RiFileList3Line className="text-xl text-indigo-600" />
            <span className="font-semibold text-gray-700">My Orders</span>
          </MenuItem>
        </Link>

        <Link to="/cart">
          <MenuItem
            className="flex gap-3 items-center px-4 py-3 rounded-lg transition-colors hover:bg-gray-50"
            onClick={handleClose}
          >
            <FaShoppingCart className="text-xl text-indigo-600" />
            <span className="font-semibold text-gray-700">Cart</span>
          </MenuItem>
        </Link>

        <div className="px-1 py-2">
          <MenuItem
            className="mt-2 rounded-lg overflow-hidden"
            onClick={() => {
              dispatch(LogOutAccount(navigate));
              handleClose();
            }}
          >
            <div className="font-semibold w-full flex gap-3 items-center bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3 text-white rounded-lg transition duration-300 hover:shadow-lg">
              <IoExitOutline className="text-xl" />
              <span className="font-semibold">Logout</span>
            </div>
          </MenuItem>
        </div>
      </Menu>

      {open && <BackDrop />}
    </div>
  );
}

export default UserMenu;
