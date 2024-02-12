import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = (props: PublicRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // If token exists, navigate to the dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  return props.children;
};

export default PublicRoute;
