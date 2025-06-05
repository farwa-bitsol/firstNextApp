import { sidebarItems } from "@/models/constants";
import SidebarItem from "./Item";
import LogoutMenuItem from "./LogoutMenuItem";
import MobileWrapper from "./MobileWrapper";
import SettingsUserInfo from "./SettingsUserInfo";

const SettingsSidebar = () => {
  return (
    <MobileWrapper>
      <div className="flex flex-col space-y-10 w-full">
        <SettingsUserInfo />
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
