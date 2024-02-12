// Layout component for the client side.
import { useState } from "react";
import Sidebar from "../src/components/sidebar/Sidebar";
import Navbar from "../src/components/sidebar/Navbar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showNavbar?: boolean;
}

const Layout = ({
  showSidebar = true,
  showNavbar = true,
  children,
}: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(true); // Initialize the state in Layout

  return (
    <div className=" w-full flex h-screen overflow-hidden">
      {showSidebar && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className="flex flex-col w-full gap-1 ">
        {showNavbar && <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />}
        <main className="w-full  h-full overflow-y-scroll no-scrollbar">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
