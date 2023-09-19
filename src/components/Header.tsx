"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { useSession } from "next-auth/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiMenuUnfoldLine } from "react-icons/ri";
import ToggleTheme from "./Theme";

export default function Header() {
  const { data: session } = useSession();
  const { isOpenAside, setIsOpenAside } = useSidebarContext();

  return (
    <header className="duration-500 w-fulll flex items-center dark:bg-zinc-700 bg-zinc-100 h-14 justify-between px-2">
      <button
        className="text-3xl md:hidden sticky"
        onClick={() => setIsOpenAside(!isOpenAside)}
      >
        {!isOpenAside && <RiMenuUnfoldLine />}
      </button>
      <div className="md:flex hidden gap-2">
        {session?.user.name && (
          <div className="md:flex gap-2 items-center ml-4">
            <span className="uppercase p-1  rounded-md text-center bg-purple-600 dark:text-white">
              {session.user.name.substring(0, 2)}
            </span>

            <p>{`Olá, ${session?.user.name}!`}</p>
          </div>
        )}
      </div>
        <ToggleTheme />
      <button className="flex items-center gap-2 dark:border-2 rounded p-1 dark:bg-white dark:text-purple-600 bg-purple-600 text-white">
        {" "}
        {<AiOutlinePlusCircle />} Nova transação
      </button>
    </header>
  );
}
