// ProtectedRoute.js
import { ReactNode } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { reloadUserData } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { setDoctor } from "@/redux/doctorSlice";
import axios from "axios";
interface PrivateRouteProps {
  children: ReactNode;
}
interface User {
  user: {
    username: string;
    email: string;
    id: string;
    age: number;
    role: [string];
    profileImage: string;
    bio: string;
    seenNotifications: [string];
    unseenNotifications: [string];
  };
  reloadUser: boolean;
}
const ProtectedRoute = (props: PrivateRouteProps) => {
  const navigate = useNavigate();
  const user = useSelector((state: User) => state.user);
  const reloadUser = useSelector((state: User) => state.reloadUser);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const user = await axios.post(
        "http://localhost:3000/get-user",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const doctorResponse = await axios.get(
        "http://localhost:3000/get-doctor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (user.data.userData) {
        dispatch(setUser(user.data.userData));
        dispatch(reloadUserData(false));
      }
      if (doctorResponse.data.doctorData) {
        dispatch(setDoctor(doctorResponse.data.doctorData));
        console.log(doctorResponse.data.doctorData);
        dispatch(reloadUserData(false));
      }
      console.log(user.data.userData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user || reloadUser) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, reloadUser]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    navigate("/login");
  }
};

export default ProtectedRoute;
