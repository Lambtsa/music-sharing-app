import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface ThemeContextShape {
  isLight: boolean;
  setIsLight: Dispatch<SetStateAction<boolean>>;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const LightOrDarkThemeContext = createContext<ThemeContextShape | undefined>(
  undefined,
);

const LightOrDarkThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isLight, setIsLight] = useState(false);

  const toggle = {
    isLight,
    setIsLight,
  };

  return (
    <LightOrDarkThemeContext.Provider value={toggle}>
      {children}
    </LightOrDarkThemeContext.Provider>
  );
};

export { LightOrDarkThemeContext, LightOrDarkThemeProvider };

export function useLightOrDarkTheme(): ThemeContextShape {
  const context = useContext(LightOrDarkThemeContext);
  if (context === undefined) {
    throw new Error("useLightOrDarkTheme must be used within a ToastProvider");
  }
  return context;
}
