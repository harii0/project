// Layout component for the client side.
import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
interface ProfileLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showNavbar?: boolean;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className=" w-full flex">
      <ProfileSidebar />
      <main className="w-full px-2 py-2 overflow-hidden">{children}</main>
    </div>
  );
};

export default ProfileLayout;
