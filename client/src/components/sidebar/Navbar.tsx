import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlignLeft, Bell, LogOut } from "lucide-react";
import { RootState } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const Navbar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const userData = useSelector((state: RootState) => state.auth.user);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const Navigate = useNavigate();

  return (
    <nav className="  h-[3rem] sm:h-15 flex items-center   border-b ">
      <div className="flex items-center  justify-between px-4 w-full py-1">
        <div className=" md:hidden">
          <AlignLeft
            strokeWidth={1.5}
            size={23}
            className="min-w-max cursor-pointer"
            onClick={handleToggleSidebar}
          />
        </div>
        <div className="hidden md:block flex-shrink-0 items-center justify-center">
          <span className=" text-lg font-medium">
            Welcome, {userData?.username}
          </span>
        </div>
        <div className=" flex justify-center items-center h-full  gap-7 ">
          <div className=" flex items-center justify-center relative cursor-pointer">
            <Badge className="absolute top-0 right-0 px-1 py-0  font-normal">
              {userData?.UnseenNotifications.length}
            </Badge>

            <Popover>
              <PopoverTrigger>
                <Bell
                  size={28}
                  className=" text-muted-foreground hover:text-foreground"
                />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className=" text-sm text-gray-500">
                  <ul className="flex flex-col gap-3">
                    {userData?.UnseenNotifications.map(
                      (notification, index) => (
                        <li
                          key={index}
                          className="w-full hover:bg-secondary rounded-md cursor-pointer py-2 px-2  transition-all duration-200 ease-in-out"
                        >
                          <a
                            className=" hover:underline"
                            href={notification.onClickPath}
                          >
                            {notification.message}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 py-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/profile/user-profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={"/profile/settings"}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex gap-2">
                  <LogOut size={18} strokeWidth={1.5} />
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      Navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
