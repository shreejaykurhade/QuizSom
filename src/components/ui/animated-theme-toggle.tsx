'use client';

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { motion } from "framer-motion";

export const AnimatedThemeToggle = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState<string>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isDark = theme === 'dark';

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 rounded-xl border border-slate-200 bg-white", className)} />
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      className={cn(
        "relative h-9 w-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700 dark:text-amber-400 dark:hover:bg-slate-700 transition-all cursor-pointer flex items-center justify-center p-0",
        className
      )}
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
    >
      <SolarSwitch isDark={isDark} />
    </Button>
  );
};

const SolarSwitch = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none">
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: isDark ? 40 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
      >
        {/* Sun Center Body */}
        <motion.circle
          cx="12.4058"
          cy="12.7625"
          r="4.5"
          stroke="currentColor"
          strokeWidth="2"
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.25 }}
        />

        {/* 8 Sun Rays with smooth staggered pop in/out */}
        {[
          "M12.4058 1.76251V3.76251",
          "M12.4058 21.7625V23.7625",
          "M4.62598 4.98248L6.04598 6.40248",
          "M18.7656 19.1225L20.1856 20.5425",
          "M1.40576 12.7625H3.40576",
          "M21.4058 12.7625H23.4058",
          "M4.62598 20.5425L6.04598 19.1225",
          "M18.7656 6.40248L20.1856 4.98248",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              scale: isDark ? 0 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{
              duration: 0.2,
              delay: isDark ? 0 : i * 0.02,
            }}
          />
        ))}

        {/* Crescent Moon Morph */}
        <motion.path
          d="M21.1918 13.2013C21.0345 14.9035 20.3957 16.5257 19.35 17.8781C18.3044 19.2305 16.8953 20.2571 15.2875 20.8379C13.6797 21.4186 11.9398 21.5294 10.2713 21.1574C8.60281 20.7854 7.07479 19.9459 5.86602 18.7371C4.65725 17.5283 3.81774 16.0003 3.4457 14.3318C3.07367 12.6633 3.18451 10.9234 3.76526 9.31561C4.346 7.70783 5.37263 6.29868 6.72501 5.25307C8.07739 4.20746 9.69959 3.56862 11.4018 3.41132C10.4052 4.75958 9.92564 6.42077 10.0503 8.09273C10.175 9.76469 10.8957 11.3364 12.0812 12.5219C13.2667 13.7075 14.8384 14.4281 16.5104 14.5528C18.1823 14.6775 19.8435 14.1979 21.1918 13.2013Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedThemeToggle;
