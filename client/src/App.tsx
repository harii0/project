import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { ThemeProvider } from "./components/theme-provider";
import Landing from "./pages/landing/landingPage";
import Layout from "../layout/Layout";
import Dashboard from "@/pages/Dashboard";
import PublicRoute from "./components/Route/PublicRoute";
import PrivateRoute from "./components/Route/PrivateRoute";
import ProfileLayout from "../layout/ProfileLayout";
import UserProfile from "./pages/Profile/UserProfile";
import UserSettings from "./pages/Profile/UserSettings";
import Forgot from "@/auth/Forgot";
import Reset from "@/auth/Reset";
import Mentor from "./pages/Mentor";
import Application from "./pages/Admin/Application";
import Doctor from "./pages/Doctor/Doctor";
//Admin Routes
import Analytics from "@/pages/Admin/Analytics";
import { RootState } from "./redux/store";
import UserDetails from "./pages/Admin/UserDetails";
function App() {
  const userRole = useSelector((state: RootState) => state?.auth?.user?.role);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Layout showSidebar={false} showNavbar={false}>
                  <Login />
                </Layout>
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Layout showSidebar={false} showNavbar={false}>
                  <SignUp />
                </Layout>
              </PublicRoute>
            }
          />
          <Route
            path="/forgetpassword"
            element={
              <PublicRoute>
                <Layout showSidebar={false} showNavbar={false}>
                  <Forgot />
                </Layout>
              </PublicRoute>
            }
          />
          <Route
            path="/resetpassword/:token"
            element={
              <PublicRoute>
                <Layout showSidebar={false} showNavbar={false}>
                  <Reset />
                </Layout>
              </PublicRoute>
            }
          />
          <Route
            path="/solace"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          {/*PRIVATE ROUTES */}

          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  {userRole?.includes("admin") ? <Analytics /> : <Dashboard />}
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  <Doctor />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/user-profile"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  <ProfileLayout>
                    <UserProfile />
                  </ProfileLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/user-profile"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  <ProfileLayout>
                    <UserProfile />
                  </ProfileLayout>
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/profile/settings"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  <ProfileLayout>
                    <UserSettings />
                  </ProfileLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  <ProfileLayout>
                    <UserSettings />
                  </ProfileLayout>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/apply-mentor"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  <Mentor />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  <Application />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/applications/user/:userId"
            element={
              <PrivateRoute>
                <Layout showSidebar={true} showNavbar={true}>
                  <UserDetails />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
