import React from "react";
import { FaClock, FaBell, FaBars, FaPlus } from "react-icons/fa";

const Navbar = ({
  notifications = 0,
  setIsDialogOpen,
}: {
  notifications?: number;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center space-x-6">
      <FaPlus className="text-xl cursor-pointer" title="Add" onClick={() => setIsDialogOpen(true)}/>
        <FaClock className="text-xl" />
        <div className="relative">
          <FaBell className="text-xl" />
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>
        <FaBars className="text-xl" />
      </div>
    </nav>
  );
};

export default Navbar;
