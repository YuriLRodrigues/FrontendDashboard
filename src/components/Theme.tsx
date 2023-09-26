"use client"
import { useTheme } from "next-themes";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? <BsFillSunFill /> : <BsMoonStarsFill />}
    </button>
  );
}
