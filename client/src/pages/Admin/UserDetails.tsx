import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/applications/user/${userId}`
        );
        setUserDetails(response.data); // Directly use response.data
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);
  const handleApprove = async () => {
    try {
      await axios.put(
        `http://localhost:3000/applications/user/${userId}/approve`
      );
        toast({
            title: "User Approved",
            description: "User has been approved successfully",
            duration: 3000,
        });
      navigate("/application");
    } catch (error) {
      console.error("Failed to approve user:", error);
      // Show an error message
    }
  };
  const handleReject = async () => {
    try {
      await axios.put(
        `http://localhost:3000/applications/user/${userId}/reject`
      );
      toast({
        title: "User Rejected",
        description: "User has been rejected successfully",
        duration: 3000,
      });
      navigate("/application");
    } catch (error) {
      console.error("Failed to reject user:", error);
      // Show an error message
    }
  };
  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-5">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={userDetails?.doctor?.profilePicture}
            alt="Profile"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Username: {userDetails?.doctor?.username}
          </div>
          <a href={userDetails.doctor.website} className="">
            Website:
            {userDetails.doctor.website}
          </a>
          <p className="mt-2 text-gray-500">
            Experience: {userDetails.doctor.experience} years
          </p>
          <p className="mt-2 text-gray-500">
            Rating: {userDetails.doctor.rating}
          </p>
          <p className="mt-2 text-gray-500">
            Description: {userDetails.doctor.description || "N/A"}
          </p>
          <p className="mt-2 text-gray-500">
            Address: {userDetails.doctor.address}, {userDetails.doctor.city}
          </p>
          <p className="mt-2 text-gray-500">
            Status: {userDetails.doctor.status}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={handleApprove}>Approve</Button>
        <Button variant={"destructive"} onClick={handleReject}>
          Reject
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
