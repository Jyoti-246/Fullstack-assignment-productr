import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { TbShoppingBag } from "react-icons/tb";
import Logo from "../images/Logo.png";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-[#1D222B] p-4 flex flex-col justify-between">
      <div>
        <img
          src={Logo}
          alt="Product Logo"
          className="h-16 w-40 object-contain"
        />

        <input
          type="text"
          name=""
          id=""
          className="mt-4 p-2 bg-[#2F343D] text-white"
          placeholder="Search"
        />

        <ul className="mt-4 mx-2">
          <li className="py-2 ">
            <NavLink
              to="/"
              className={({
                isActive,
              }) => `flex gap-2 items-center  text-sm font-medium text-[#98A2B3] ${
                isActive
                  ? "text-white font-semibold"
                  : "hover:text-white hover:font-semibold"
              }
          `}
            >
              <GoHome className="text-[18px]" />
              Home
            </NavLink>
          </li>

          <li className="flex gap-2 items-center py-2 text-sm font-medium text-[#98A2B3] hover:text-white hover:font-semibold">
            <NavLink
              to="/products"
              className={({
                isActive,
              }) => `flex gap-2 items-center  text-sm font-medium text-[#98A2B3] ${
                isActive
                  ? "text-white font-semibold"
                  : "hover:text-white hover:font-semibold"
              }
            `}
            >
              <TbShoppingBag className="text-[16px]" />
              Products
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="">
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
