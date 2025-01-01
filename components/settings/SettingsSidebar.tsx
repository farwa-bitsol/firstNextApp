import {
  BadgeDollarSign,
  CircleUserRound,
  LayoutDashboard,
  LucideIcon,
  SquareChartGantt,
  WalletCards,
} from "lucide-react";
import SidebarItem from "./Item";
import Image from "next/image";
import LogoutMenuItem from "./LogoutMenuItem";
import MobileWrapper from "./MobileWrapper";
import SettingsUserInfo from "./SettingsUserInfo";

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

const items: ISidebarItem[] = [
  {
    name: "General",
    path: "/general",
    icon: LayoutDashboard,
  },
  {
    name: "Security",
    path: "/security",
    icon: CircleUserRound,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: WalletCards,
  },
  {
    name: "Billing",
    path: "/billing",
    icon: BadgeDollarSign,
  },

  {
    name: "Analytics",
    path: "/analytics",
    icon: SquareChartGantt,
  },
];

const SettingsSidebar = () => {
  return (
    <MobileWrapper>
      <div className="flex flex-col space-y-10 w-full">
        <div className="flex items-center mx-auto space-x-4 mt-4">
          <Image
            width={55}
            height={55}
            className="h-10 w-fit rounded-lg"
            src="/images/profile.png"
            alt="Logo"
          />
          <div className="flex flex-col  w-full">
            <SettingsUserInfo />
          </div>
        </div>
        <div className="flex flex-col space-y-2 px-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>

      <LogoutMenuItem />
    </MobileWrapper>
  );
};

export default SettingsSidebar;
