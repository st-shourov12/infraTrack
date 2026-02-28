import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState('dark'
  );
// () => localStorage.getItem("theme") || "light"
  useEffect(() => {
    const root = document.documentElement; // <-- this is the <html> tag
    if (theme === "dark") {
      root.classList.add("dark");       // Tailwind looks for this
    } else {
      root.classList.remove("dark");
    }
    // localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}