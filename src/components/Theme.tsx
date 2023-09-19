
import { useTheme } from "next-themes";
import { BsMoonStarsFill, BsFillSunFill  } from "react-icons/bs";
import { GrSystem } from "react-icons/gr";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="text-center text-xl">
      
        <button onClick={()=> setTheme(theme === 'light' ? "dark" : theme === "dark" ? "light" : "light")} className="cursor-pointer text-purple-600">
          {theme === 'light' ? <BsFillSunFill /> : theme === "dark" ? <BsMoonStarsFill /> : <GrSystem />}
        </button>
      
    </div>
  );
}
