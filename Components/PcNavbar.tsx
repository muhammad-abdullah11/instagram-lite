import React from "react";
import { RiHomeHeartLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { LuMessageCircleHeart } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";

type NavLink = {
  name: string;
  icon: React.ElementType;
};

const PcNavbar = () => {
  const navLinks: NavLink[] = [
    { name: "", icon: FaInstagram },
    { name: "Home", icon: RiHomeHeartLine },
    { name: "Reels", icon: BiSolidVideos },
    { name: "Messages", icon: LuMessageCircleHeart },
    { name: "New Post", icon: CiSquarePlus },
    { name: "Explore", icon: MdOutlineExplore },
  ];

  return (
    <nav className="flex items-center justify-between w-full p-4 md:flex-col md:items-start md:gap-4 md:p-6">
      {navLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <div
            key={link.name || index}
            className="flex items-center gap-4 transition-all duration-200 cursor-pointer hover:bg-foreground/10 p-2 rounded-lg md:w-full group relative"
          >
            <Icon size={24} className="shrink-0 transition-transform group-hover:scale-105" />
            {link.name && (
              <span className="hidden font-normal text-sm md:group-hover:block md:absolute md:left-full md:ml-4 md:bg-white md:text-black md:dark:bg-zinc-900 md:dark:text-white md:px-3 md:py-2 md:rounded-md md:shadow-xl md:z-50 lg:static lg:ml-0 lg:p-0 lg:shadow-none lg:bg-transparent lg:dark:bg-transparent">
                {link.name}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default PcNavbar;

