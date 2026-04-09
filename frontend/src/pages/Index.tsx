import { useAuth } from "@/contexts/AuthContext";
import StudentDashboard from "./StudentDashboard";
import CounselorDashboard from "./CounselorDashboard";
import AdminDashboard from "./AdminDashboard";

const Index = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "counselor":
      return <CounselorDashboard />;
    case "admissions":
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
};

export default Index;
