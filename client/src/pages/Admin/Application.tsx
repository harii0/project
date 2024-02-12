import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { DataTable } from "./Task/data-table";
import { columns } from "./Task/column";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate();
  const UnseenNotifications = useSelector(
    (state: RootState) => state.auth.user?.UnseenNotifications
  );

  const data =
    UnseenNotifications?.map((notification) => ({
      id: notification.data.doctorId,
      doctorName: notification.data.doctorName,
      message: notification.message,
      status: notification.status || "Unread",
      // You might add a static status or derive it from notification properties
    })) || []; // Provide an empty array as fallback

  const handleRowClick = (userId) => {
    navigate(`/applications/user/${userId}`); // Adjust the path as needed
    
  };
  async function markAsRead() {}

  return (
    <div className="w-full h-screen">
      <div className="w-full px-2 py-2">
        <div className="flex justify-between px-2">
          <h6>Applications</h6>
          <div>
            {/* Button functionality to mark all as read could be implemented here */}
            <Button className="text-sm" onClick={markAsRead}>
              Mark all as read
            </Button>
          </div>
        </div>
        <div className="py-3">
          {/* Pass the prepared data array to the DataTable */}
          <DataTable
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Application;
