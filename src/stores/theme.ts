import { defineStore } from "pinia";
import { ref } from "vue";

type Theme = "light" | "dark" | null;

export const useThemeStore = defineStore("theme", () => {
  // State: currentTheme should be of type 'light' | 'dark' | null
  const currentTheme = ref<Theme>(null);

  // Set theme function, which expects a 'Theme' type parameter
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
    localStorage.setItem("theme", theme ?? "light"); // Default to 'light' if null
    document.body.className = theme ?? "light"; // Fallback to 'light' if null
  };

  // Toggle theme function, switching between 'light' and 'dark'
  const toggleTheme = () => {
    const newTheme: Theme = currentTheme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Initialize theme on store creation based on localStorage, defaulting to 'light'
  setTheme((localStorage.getItem("theme") as Theme) || "light");

  return { currentTheme, setTheme, toggleTheme };
});
