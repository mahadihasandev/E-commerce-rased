import React, { FC } from "react";
import Logo from "./Logo";
import { headerData } from "@/constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutSideClick } from "@/hooks";
import { FaWindowClose } from "react-icons/fa";
interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
const SideMenu: FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sideBarRef = useOutSideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed text-white/80 inset-y-0 h-screen left-0 z-50 w-full bg-black/75 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"} hoverEffect`}
    >
      <div className=" min-w-56 max-w-80 bg-black/85 h-screen p-10 border-r-2 border-blue-700 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button
            onClick={onClose}
            className="text-red-300 hover:text-red-600 hoverEffect"
          >
            <FaWindowClose size={20} />
          </button>
        </div>
        <div
          ref={sideBarRef}
          className="flex flex-col space-y-7 font-semibold tracking-wide"
        >
          {headerData?.map((item) => (
            <Link
              key={item?.href}
              href={item?.href}
              className={`hover:text-blue-300 hoverEffect ${pathname == item?.href && "text-blue-300"}`}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia className="" iconClassName="" toolTipClassName="" />
      </div>
    </div>
  );
};

export default SideMenu;
