import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      className="inline-flex items-center justify-center rounded-lg border bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-800 w-9 h-9 text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:dark:bg-neutral-700 transition"
      aria-label="Tema değiştir (Koyu/Açık)"
      onClick={() => setDark(v => !v)}
      type="button"
    >
      {dark ? (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z"/></svg>
      ) : (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M5 12H3m16.95 6.95-1.414-1.414M6.343 6.343 4.93 4.93m14.142 0-1.414 1.414M6.343 17.657l-1.414 1.414"/></svg>
      )}
    </button>
  );
}
