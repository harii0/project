import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
const Doctor = () => {
  const doctor = useSelector((state: RootState) => state.doctor.doctor);
  return (
    <div>
      <h1>Doctor</h1>
      <p>{doctor?.username}</p>
    </div>
  );
};

export default Doctor;
