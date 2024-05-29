import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.body.className = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light" || prevTheme == null ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
