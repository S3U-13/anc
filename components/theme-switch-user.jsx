"use client";
import { Moon, Sun } from "@deemlol/next-icons";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { useTheme } from "next-themes";

export const ThemeSwitchUser = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  if (isSSR) return null;

  const isLight = theme === "light";

  const handleChange = () => {
    setTheme(isLight ? "dark" : "light"); // เปลี่ยน theme จริง ๆ
  };

  return (
    <div onClick={handleChange} className={clsx(" w-full", className)}>
      {isLight ? (
        <div className="flex justify-none gap-2 items-center w-full">
          <Moon size={20} className="text-default-500 dark:text-white" />{" "}
          <span>Dark</span>
        </div>
      ) : (
        <div className="flex justify-none gap-2 items-center w-full">
          <Sun size={20} className="text-default-500 dark:text-white" />
          <span> Light</span>
        </div>
      )}
    </div>
  );
};
