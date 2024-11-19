"use client";
import { useMemo, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SubMenuItem from "./SubItem";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const SidebarItem = ({ item }: { item: ISidebarItem }) => {
  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // current path

  const onClick = () => {
    if (items && items.length > 0) {
      // Toggle expansion if there are sub-items
      setExpanded(!expanded);
    } else {
      // navigate to the item's path
      router.push(`/settings${path}`);
    }
  };

  // active menu item
  const isActive = useMemo(() => {
    // checking sub-item
    if (items && items.length > 0) {
      return items.some((subItem) => pathname.includes(subItem.path));
    }
    return pathname.includes(path);
  }, [items, path, pathname]);

  return (
    <>
      <div
        className={`flex items-center p-3  hover:bg-sidebar-background cursor-pointer hover:text-sidebar-active justify-between
          ${isActive ? "bg-[#1565D8] text-white" : "text-[#62618F]"}
        `}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          <Icon size={20} />
          <p className="text-sm ">{name} </p>
        </div>
        {items && items.length > 0 && <ChevronDown size={18} />}
      </div>
      {expanded && items && items.length > 0 && (
        <div className="flex flex-col space-y-1 ml-10">
          {items.map((item) => (
            <SubMenuItem key={item.path} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarItem;
