import { Card } from "@/components/ui/card";
import { Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
const ProfileSidebar = () => {
  return (
    <Card className=" w-52  border-none h-screen overflow-hidden  rounded-none md:px-2 ">
      <h1 className="text-xl font-medium p-2">Settings</h1>
      <ul className=" w-full py-4 flex flex-col gap-2">
        <NavLink
          to={"/profile/user-profile"}
          className={({ isActive }) =>
            ` rounded-md  ${
              isActive ? "bg-secondary" : "text-muted-foreground"
            }`
          }
        >
          <div className=" flex  w-full py-1 items-center px-2 cursor-pointer ">
            <User size={18} />

            <li className=" px-2 py-2 text-xs">profile</li>
          </div>
        </NavLink>
        {/*settings */}
        <NavLink
          className={({ isActive }) =>
            ` rounded-md  ${
              isActive ? "bg-secondary" : " text-muted-foreground"
            }`
          }
          to={"/profile/settings"}
        >
          <div className=" flex  w-full py-1 items-center px-2 cursor-pointer ">
            <Settings size={18} />

            <li className=" px-2 py-2 text-xs">Appearance</li>
          </div>
        </NavLink>
      </ul>
    </Card>
  );
};

export default ProfileSidebar;
