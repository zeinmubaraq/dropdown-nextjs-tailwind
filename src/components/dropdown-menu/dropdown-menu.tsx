"use client";

import { useEffect, useRef, useState } from "react";
import MenuItem from "./menu-item";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(!isOpen);
      }
    };

    if (!isOpen) {
      const delay = setTimeout(() => {
        setShouldHide(true);
      }, 75);
      return () => clearTimeout(delay);
    }

    const listener = (e: any) => {
      handleClickOutside(e);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center bg-white gap-x-1.5 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
        aria-expanded="true"
        aria-haspopup="true"
      >
        Dropdown
        <svg
          className="-mr-1 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={`${
          isOpen
            ? "transition ease-out duration-100 transform opacity-100 scale-100"
            : "transition ease-in duration-75 transform opacity-0 scale-95"
        } absolute right-0 z-10 bg-white origin-top-right mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className={`${shouldHide ? "block" : "hidden"} py-1`}>
          <MenuItem href="#">Account settings</MenuItem>
          <MenuItem href="#">Support</MenuItem>
          <MenuItem href="#">License</MenuItem>
          <MenuItem href="#">Sign out</MenuItem>
        </div>
      </div>
    </div>
  );
}
