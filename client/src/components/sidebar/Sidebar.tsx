import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate } from "react-router-dom";
// import logo from '../../assets/svg/logo.svg';
import { motion } from "framer-motion";
import {
  adminSidebarConfig,
  doctorSidebarConfig,
  userSidebarConfig,
} from "./SidebarConfig";
import { ArrowLeftIcon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RootState } from "@/redux/store";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const userRole = useSelector((state: RootState) => state.auth.user);
  const role = userRole?.role?.includes("admin")
    ? "admin"
    : userRole?.role?.includes("doctor")
    ? "doctor"
    : "user";
  const sidebarConfig = useMemo(() => {
    console.log(role);
    switch (role) {
      case "admin":
        return adminSidebarConfig;
      case "doctor":
        return doctorSidebarConfig;
      case "user":
        return userSidebarConfig;
      default:
        return [];
    }
  }, [role]);

  const isTab = useMediaQuery({ query: "(max-width:768px)" });

  const sidebarVariants = isTab
    ? {
        closed: {
          x: -250,
          width: 0,
        },
        visible: {
          x: 0,
          width: "16rem",
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.5,
          },
        },
      }
    : {
        closed: {
          width: "4rem",
        },
        visible: {
          x: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.5,
          },
        },
      };
  const IconsVariants = {
    closed: {
      rotate: 180,
    },
    visible: {
      rotate: 0,
    },
  };
  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab, setIsOpen]);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <motion.div
        variants={sidebarVariants}
        animate={isOpen ? "closed" : "visible"}
        className=" shadow-xl z-20 md:bg-inherit bg-background  border-r md:p-3 lg:px-1  w-[14rem]  mx-w-[14rem] h-screen md:relative overflow-hidden fixed"
      >
        <div className="flex flex-col md:justify-between gap-28 md:gap-0 h-screen items-center  ">
          <div className="logo flex flex-col border-b w-full items-center py-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <ul className="cursor-pointer flex flex-col px-2 overflow-x-hidden gap-1 w-full">
            {sidebarConfig.map((item) => (
              <li key={item.path} className="rounded-md">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex gap-2 px-2 py-2 rounded-md items-center ${
                      isActive ? "bg-secondary" : "text-muted-foreground"
                    }`
                  }
                >
                  {item.icon}
                  {isOpen || <span className="text-xs">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col pb-8  cursor-pointer border-t w-full items-center justify-center py-2">
            <LogOut
              strokeWidth={1.5}
              size={20}
              className="min-w-max"
              onClick={Logout}
            />
          </div>
        </div>
        {/* sidebar-open/close btn using framer*/}
        <motion.div
          variants={IconsVariants}
          animate={isOpen ? "closed" : "visible"}
          className="absolute w-fit h-fit z-50 right-0 top-10 p-5 mt-4 "
        >
          <ArrowLeftIcon
            width={24}
            height={24}
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl cursor-pointer  p-1  shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
