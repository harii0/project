import dark from "../../assets/images/dark.svg";
import light from "../../assets/images/light.svg";
import system from "../../assets/images/system.svg";
import { useTheme } from "@/components/theme-provider";

const UserSettings = () => {
  const { setTheme, theme } = useTheme();

  const isThemeActive = (themeName: string) => theme === themeName;

  return (
    <div className="flex flex-col gap-5 px-1">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold">Appearance</h1>
        <p className="text-xs text-muted-foreground">
          Customize the appearance of the app. 
        </p>
        <hr className="mt-3 " />
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Theme</span>
          <span className="text-xs text-muted-foreground">
            Select the theme for the dashboard.
          </span>
        </div>
        <div className="flex flex-wrap mt-6 px-1 md:w-1/2 gap-2">
          <div
            className="rounded-md cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <img
              src={light}
              alt="light"
              className={`rounded-md outline  outline-secondary p-1 ${
                isThemeActive("light") ? "active-theme" : ""
              }`}
            />
            <p className="text-xs text-center py-1">Light</p>
          </div>
          <div
            className="rounded-md cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            <img
              src={dark}
              alt="dark"
              className={`rounded-md outline  outline-secondary p-1 ${
                isThemeActive("dark") ? "active-theme" : ""
              }`}
            />
            <p className="text-xs text-center py-1">Dark</p>
          </div>
          <div
            className="rounded-md cursor-pointer"
            onClick={() => setTheme("system")}
          >
            <img
              src={system}
              alt="system"
              className={`rounded-md outline  outline-secondary p-1 ${
                isThemeActive("system") ? "active-theme" : ""
              }`}
            />
            <p className="text-xs text-center py-1">System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
