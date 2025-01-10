import SidebarItem from "./Item";
import Image from "next/image";
import LogoutMenuItem from "./LogoutMenuItem";
import MobileWrapper from "./MobileWrapper";
import SettingsUserInfo from "./SettingsUserInfo";
import Link from "next/link";
import { Routes, sidebarItems } from "@/models/constants";

const SettingsSidebar = () => {
  return (
    <MobileWrapper>
      <div className="flex flex-col space-y-10 w-full">
        <div className="flex items-center mx-auto space-x-4 mt-4 w-full pl-2">
          <Link href={Routes.dashboard}>
            <Image
              width={55}
              height={55}
              className="h-55 w-55 rounded-lg object-cover"
              src="/images/profile.png"
              alt="Logo"
            />
          </Link>
          <div className="flex flex-col w-full">
            <SettingsUserInfo />
          </div>
        </div>
        <div className="flex flex-col space-y-2 px-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>

      <LogoutMenuItem />
    </MobileWrapper>
  );
};

export default SettingsSidebar;
