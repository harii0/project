// SidebarConfig.js

import {
  LayoutPanelLeft,
  BookOpenText,
  MessageSquareMore,
  UserCog,
  Users,
  UserPlus,
  ActivitySquare,
} from "lucide-react";
const adminSidebarConfig = [
  {
    path: "/dashboard",
    icon: <LayoutPanelLeft size={20} strokeWidth={1.5} />,
    label: "Dashboard",
  },
  {
    path: "/applications",
    icon: <UserPlus size={20} strokeWidth={1.5} />,
    label: "Chat",
  },
  {
    path: "/resource",
    icon: <BookOpenText size={20} strokeWidth={1.5} />,
    label: "Resources",
  },
  {
    path: "/doctor",
    icon: <Users size={20} strokeWidth={1.5} />,
    label: "Psychiatrist",
  },
  {
    path: "/profile/user-profile",
    icon: <UserCog size={20} strokeWidth={1.5} />,
    label: "Profile",
  },
];

const doctorSidebarConfig = [
  {
    path: "/dashboard",
    icon: <LayoutPanelLeft size={20} strokeWidth={1.5} />,
    label: "Dashboard",
  },
  {
    path: "/chat",
    icon: <MessageSquareMore size={20} strokeWidth={1.5} />,
    label: "Chat",
  },
  {
    path: "/resource",
    icon: <BookOpenText size={20} strokeWidth={1.5} />,
    label: "Resources",
  },
  {
    path: "/profile/user-profile",
    icon: <UserCog size={20} strokeWidth={1.5} />,
    label: "Profile",
  },
];

const userSidebarConfig = [
  {
    path: "/dashboard",
    icon: <LayoutPanelLeft size={20} strokeWidth={1.5} />,
    label: "Dashboard",
  },
  {
    path: "/resource",
    icon: <BookOpenText size={20} strokeWidth={1.5} />,
    label: "Resources",
  },
  {
    path: "/chat",
    icon: <MessageSquareMore size={20} strokeWidth={1.5} />,
    label: "Chat",
  },
  {
    path: "/apply-mentor",
    icon: <UserPlus size={20} strokeWidth={1.5} />,
    label: "Apply ",
  },
  {
    path: "/doctor",
    icon: <ActivitySquare size={20} strokeWidth={1.5} />,
    label: "Psychiatrist",
  },
  {
    path: "/profile/user-profile",
    icon: <UserCog size={20} strokeWidth={1.5} />,
    label: "Profile",
  },
];

export { adminSidebarConfig, doctorSidebarConfig, userSidebarConfig };
