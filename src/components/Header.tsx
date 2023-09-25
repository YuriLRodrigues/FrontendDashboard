"use client";
import { useSidebarContext } from "@/context/SidebarContext";
import { signOut, useSession } from "next-auth/react";
import { RiMenuUnfoldLine } from "react-icons/ri";
import ToggleTheme from "./Theme";
import { TransactionModalButton } from "./TransactionModalButton";
import { MdOutlineNotifications } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

export default function Header() {
  const { data: session } = useSession();
  const { isOpenAside, setIsOpenAside } = useSidebarContext();

  return (
    <header className="duration-500 w-fulll flex items-center   h-14 justify-between px-2">
      <button
        className="text-3xl md:hidden sticky"
        onClick={() => setIsOpenAside(!isOpenAside)}
      >
        {!isOpenAside && <RiMenuUnfoldLine />}
      </button>
      <div className="md:flex hidden gap-2">
        {session?.user.name && (
          <div className="md:flex gap-2 items-center ml-4">
            <span className="uppercase border w-[30px] h-[30px] rounded-full flex items-center justify-center bg-purple-600 text-white border-purple-600">
              {session.user.name.substring(0, 2)}
            </span>

            <p>{`Olá, ${session?.user.name}!`}</p>
          </div>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => signOut()}
          className="text-xl font-semibold rounded-full cursor-pointer p-1 hover:bg-zinc-400/10"
        >
          <PiSignOutBold />
        </button>
        <span className="text-xl font-semibold rounded-full cursor-pointer p-1 hover:bg-zinc-400/10">
          <MdOutlineNotifications />
        </span>
        <ToggleTheme />
        <TransactionModalButton />
      </div>
    </header>
  );
}
