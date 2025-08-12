"use client";

import { useEffect, useState } from "react";

// Breakpoint constants (you can adjust these to match your design system)
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1360,
} as const;

export type ScreenSize = "mobile" | "tablet" | "desktop";

interface UseScreenWidthReturn {
  width: number;
  screenSize: ScreenSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useScreenWidth = (): UseScreenWidthReturn => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Function to get current screen width
    const getScreenWidth = (): number => {
      if (typeof window !== "undefined") {
        return window.innerWidth;
      }
      return 0;
    };

    // Set initial width
    setWidth(getScreenWidth());

    // Handle resize events
    const handleResize = () => {
      setWidth(getScreenWidth());
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Handle orientation change for mobile devices
    window.addEventListener("orientationchange", () => {
      // Small delay to ensure the viewport has updated
      setTimeout(() => {
        setWidth(getScreenWidth());
      }, 100);
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Determine screen size category
  const getScreenSize = (width: number): ScreenSize => {
    if (width < BREAKPOINTS.mobile) return "mobile";
    if (width < BREAKPOINTS.tablet) return "tablet";
    return "desktop";
  };

  const screenSize = getScreenSize(width);

  return {
    width,
    screenSize,
    isMobile: screenSize === "mobile",
    isTablet: screenSize === "tablet",
    isDesktop: screenSize === "desktop",
  };
};

// Alternative hook for just getting the width
export const useWindowWidth = (): number => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return width;
};

// Utility function for server-side rendering compatibility
export const getScreenWidth = (): number => {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0;
};
