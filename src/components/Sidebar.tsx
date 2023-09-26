"use client";
import { MdOutlineDashboardCustomize, MdLeaderboard } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import SideBarItems from "./SideBarItems";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { useSidebarContext } from "@/context/SidebarContext";
import { useSession } from "next-auth/react";

export default function SideBar() {
  const { isOpenAside, setIsOpenAside } = useSidebarContext();
  const { data: session } = useSession();

  return (
    <aside
      className={`h-screen duration-500 ${
        isOpenAside
          ? "md:w-60 w-44 translate-x-0 md:relative"
          : "md:relative md:translate-x-0 -translate-x-20 w-12 md:w-18"
      }  dark:bg-zinc-950 md:float-left z-10 bg-zinc-100 dark:text-white flex flex-col gap-8 px-2 absolute`}
    >
      <div
        className={`flex relative text-center mb-6 mt-3 items-center ${
          isOpenAside ? "justify-between" : "justify-center"
        } text-2xl`}
      >
        <h2 className={`${isOpenAside ? "sticky" : "hidden"} text-xl`}>
          Logoipsum
        </h2>

        <button
          className="text-3xl"
          onClick={() => setIsOpenAside(!isOpenAside)}
        >
          {isOpenAside ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
        </button>
      </div>
      <ul className="flex gap-8 flex-col duration-500">
        <SideBarItems
          icon={<MdOutlineDashboardCustomize />}
          pathName={"/dashboard"}
          name={"dashboard"}
          isOpen={isOpenAside}
        />
        <SideBarItems
          icon={<MdLeaderboard size={20} />}
          pathName={"/dashboard"}
          name={"statistics"}
          isOpen={isOpenAside}
        />
        <SideBarItems
          icon={<BiUserCircle />}
          pathName={"/dashboard"}
          name={"user"}
          isOpen={isOpenAside}
        />
        <SideBarItems
          icon={<FaMoneyBillTransfer />}
          pathName={"/dashboard"}
          name={"transactions"}
          isOpen={isOpenAside}
        />
      </ul>
      <div className="md:hidden flex absolute bottom-0 z-10">
        {session?.user.name && (
          <div className="flex gap-2 items-center mb-2">
            <span className="uppercase p-2 rounded text-xs text-center bg-purple-600 dark:text-white">
              {session.user.name.substring(0, 2)}
            </span>
            <div>
              <h3 className="capitalize font-semibold text-xs">{session?.user.name}</h3>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
