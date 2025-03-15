import { ref, watchEffect } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(localStorage.getItem("theme") === "dark");

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle("dark", isDarkMode.value);
    localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  };

  // Ensure theme persists across reloads
  watchEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  });

  return { isDarkMode, toggleDarkMode };
}
