"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const pageTitle = useMemo(() => {
    const currentPath = pathname?.split("/")[2] || "Feed";
    return currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
  }, [pathname]);

  const notifications = [
    {
      id: 1,
      profileImage: "/images/profile.png",
      title: "John Doe commented on your post",
      time: "2 hours ago",
    },
    {
      id: 2,
      profileImage: "/images/profile.png",
      title: "Jane Smith liked your photo",
      time: "4 hours ago",
    },
    {
      id: 3,
      profileImage: "/images/profile.png",
      title: "Mike Johnson sent you a message",
      time: "1 day ago",
    },
  ];

  return (
    <nav className="w-full bg-white text-[#151B32] shadow-sm relative">
      <div className="w-full flex items-center justify-between py-4 px-6">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between w-full">
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
              <li
                key={navItem}
                className="hover:text-[#1565D8] relative"
                onClick={
                  navItem === "Notifications"
                    ? handleNotificationsToggle
                    : undefined
                }
              >
                {navItem === "Notifications" ? (
                  <span className="flex items-center gap-1 cursor-pointer">
                    {navItem}
                  </span>
                ) : (
                  <Link href={`/dashboard/${navItem.toLowerCase()}`}>
                    {navItem}
                  </Link>
                )}

                {navItem === "Notifications" && isNotificationsOpen && (
                  <div className="absolute top-8 right-0 w-72 bg-white shadow-lg border rounded-lg z-10">
                    <div className="text-right px-4 pt-4">
                      <Link
                        href="/dashboard/notifications"
                        className="text-[#1565D8] text-sm"
                      >
                        View All
                      </Link>
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex gap-3 items-start p-4 border-b last:border-none"
                      >
                        <Image
                          src={notification.profileImage}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
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

          <div className="text-center text-lg font-bold">{pageTitle}</div>

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
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-b border-t z-20">
          <ul className="p-4 space-y-4">
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
                className="hover:text-[#1565D8] cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
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
