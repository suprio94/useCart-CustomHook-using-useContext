import { useState, createContext, useContext } from "react";

export const darkTheme = {
  color: "white",
  backgroundColor: "black"
};

export const lightTheme = {
  color: "black",
  backgroundColor: "white"
};

export const themeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  function ChangeTheme(selectedTheme) {
    if (selectedTheme === "dark") {
      setTheme(darkTheme);
    }
    if (selectedTheme === "light") {
      setTheme(lightTheme);
    }
  }
  return (
    <themeContext.Provider value={{ theme, ChangeTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  return useContext(themeContext);
}
