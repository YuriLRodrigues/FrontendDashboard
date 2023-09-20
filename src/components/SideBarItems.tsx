import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type ItemsSideProps = {
  pathName: string;
  name: string;
  isOpen: boolean;
  icon: ReactNode;
};

export default function SideBarItems({
  icon,
  pathName,
  name,
  isOpen,
}: ItemsSideProps) {
  const pathname = usePathname();

  return (
    <li
      className={`${
        pathname.includes(name) && "dark:text-purple-600 text-violet-700"
      } list-none capitalize items-center group relative`}
    >
      <Link href={pathName} className="flex gap-1">
        <p className="text-2xl flex items-center justify-center">{icon}</p>
        <h3 className={`duration-500 ${isOpen ? " ml-3 w-auto" : "text-[0px]"}`}>
          {name}
        </h3>
      </Link>
      {!isOpen && (
        <div className="absolute z-[1000] left-full rounded-md px-2 py-1 ml-6 dark:bg-white bg-zinc-200 text-purple-600 text-sm invisible opacity-20 top-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 font-semibold">
          {name}
        </div>
      )}
    </li>
  );
}
