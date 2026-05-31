import { TbShoppingBag } from "react-icons/tb";
import { VscSearch } from "react-icons/vsc";
import profile from "../images/profile.jpg";
import { MdKeyboardArrowDown } from "react-icons/md";
import Logout from "./Logout";

const Nav = ({ search, setSearch }) => {
  return (
    <div className="bg-[#FFE8E6] w-full p-4 flex justify-between">
      <div className="flex gap-2 items-center font-medium text-sm text-[#344054]">
        <TbShoppingBag className="text-[16px]" />
        Products
      </div>

      <div className="flex items-center">
        <div className="bg-[#F3F4F6] w-full  flex items-center p-2 gap-2 text-[#6B7180]">
          <VscSearch />
          <input
            type="text"
            value={search}
            placeholder="Search Services, Products"
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm font-normal outline-none"
          />
        </div>

        <div className="flex gap-1.5 items-center">
          <img
            src={profile}
            alt=""
            className="h-6 w-6 rounded-full ml-[54px]"
          />
          <MdKeyboardArrowDown className="mr-[30px]" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
