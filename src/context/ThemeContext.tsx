"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import { useCookie } from "react-use";

interface ThemeContextShape {
  isLight: boolean;
  setIsLight: Dispatch<SetStateAction<boolean>>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextShape | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isLight, setIsLight] = useState(false);
  const [cookie, updateCookie] = useCookie("theme");

  const toggle = {
    isLight,
    setIsLight,
  };

  useEffect(() => {
    if (cookie && cookie === `${isLight}`) {
      return;
    }
    updateCookie(`${isLight}`, {
      expires: 31536000,
    });
  }, [cookie, isLight, updateCookie]);

  return (
    <ThemeContext.Provider value={toggle}>
      <main className={`grid grid-rows-[60px_1fr_60px] h-full overflow-x-hidden min-w-full max-w-screen ${isLight ? "bg-ivory" : "bg-eerie-black"}`}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

export function useTheme(): ThemeContextShape {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
