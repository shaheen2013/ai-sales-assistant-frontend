"use client";

import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-[rgb(192,192,192)] text-white p-2 rounded hover:bg-[#9b9b9b]transition duration-300"
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M12.1801 22.065L18.0001 16.245L23.8201 22.065C24.4051 22.65 25.3501 22.65 25.9351 22.065C26.5201 21.48 26.5201 20.535 25.9351 19.95L19.0501 13.065C18.4651 12.48 17.5201 12.48 16.9351 13.065L10.0501 19.95C9.46508 20.535 9.46508 21.48 10.0501 22.065C10.6351 22.635 11.5951 22.65 12.1801 22.065Z"
          fill="#101010"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
