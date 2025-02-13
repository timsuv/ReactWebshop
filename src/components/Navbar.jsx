import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="border-b-2 border-gray-200 h-16 bg-gray-500">
        <ul className="flex items-center justify-between p-4 ml-20 mr-20 text-lg text-white">
          <NavLink className="hover:text-gray-900" to="/ReactWebshop/">
            Home
          </NavLink>
          <NavLink
            className="hover:text-gray-900 flex items-center gap-3 group"
            to="/ReactWebshop/Cart"
          >
            Cart <box-icon name="cart" class="group-hover:fill-gray-900" color="currentColor"></box-icon>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
