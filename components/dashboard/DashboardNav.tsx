"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Derive page title from the current pathname
  const pageTitle = useMemo(() => {
    const currentPath = pathname?.split("/")[2] || "Feed";
    return currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
  }, [pathname]);

  return (
    <nav className="w-full bg-white text-[#151B32] shadow-sm">
      <div className="w-full flex items-center justify-between py-4 px-6">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Logo */}
          <div className="text-lg font-bold">
            <Link href="/dashboard">
              <Image
                width={70}
                height={38}
                className="h-10 w-fit rounded-lg"
                src="/images/logo-black.png"
                alt="Logo black"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-sm items-center">
            {[
              "Feed",
              "Chats",
              "Jobs",
              "Events",
              "Articles",
              "People",
              "Notifications",
            ].map((navItem) => (
              <li key={navItem} className="hover:text-[#1565D8]">
                <Link href={`/dashboard/${navItem.toLowerCase()}`}>
                  {navItem}
                </Link>
              </li>
            ))}

            {/* profile */}
            <li className="pl-2">
              <Link href="/">
                <Image
                  width={70}
                  height={38}
                  className="h-10 w-fit rounded-lg"
                  src="/images/profile.png"
                  alt="profile"
                />
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile View */}
        <div className="flex w-full md:hidden items-center justify-between">
          <button onClick={handleMenuToggle} className="text-gray-700">
            <Menu size={24} />
          </button>

          {/* Page Title */}
          <div className="text-center text-lg font-bold">{pageTitle}</div>

          {/* Profile Icon */}
          <Link href="/">
            <Image
              width={70}
              height={38}
              className="h-10 w-fit rounded-lg"
              src="/images/profile.png"
              alt="profile"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1565D814] p-4">
          <ul className="space-y-4">
            {[
              "Feed",
              "Chats",
              "Jobs",
              "Events",
              "Articles",
              "People",
              "Notifications",
            ].map((navItem) => (
              <li
                key={navItem}
                className="hover:text-[#1565D8]"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <Link href={`/dashboard/${navItem.toLowerCase()}`}>
                  {navItem}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
