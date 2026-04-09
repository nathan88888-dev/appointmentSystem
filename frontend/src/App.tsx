import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";
import Documents from "./pages/Documents";
import Messages from "./pages/Messages";
import Help from "./pages/Help";
import Students from "./pages/Students";
import PendingReview from "./pages/PendingReview";
import Reviewed from "./pages/Reviewed";
import Reports from "./pages/Reports";
import Announcements from "./pages/Announcements";
import DataDashboard from "./pages/DataDashboard";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function ProtectedPage({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: ("student" | "counselor" | "admissions")[] }) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Dashboard */}
            <Route path="/" element={<ProtectedPage><Index /></ProtectedPage>} />

            {/* Student routes */}
            <Route path="/applications" element={<ProtectedPage allowedRoles={["student"]}><Applications /></ProtectedPage>} />
            <Route path="/documents" element={<ProtectedPage allowedRoles={["student"]}><Documents /></ProtectedPage>} />

            {/* Counselor routes */}
            <Route path="/students" element={<ProtectedPage allowedRoles={["counselor"]}><Students /></ProtectedPage>} />
            <Route path="/pending" element={<ProtectedPage allowedRoles={["counselor"]}><PendingReview /></ProtectedPage>} />
            <Route path="/reviewed" element={<ProtectedPage allowedRoles={["counselor"]}><Reviewed /></ProtectedPage>} />
            <Route path="/reports" element={<ProtectedPage allowedRoles={["counselor"]}><Reports /></ProtectedPage>} />

            {/* Admissions routes */}
            <Route path="/announcements" element={<ProtectedPage allowedRoles={["admissions"]}><Announcements /></ProtectedPage>} />
            <Route path="/data-dashboard" element={<ProtectedPage allowedRoles={["admissions"]}><DataDashboard /></ProtectedPage>} />
            <Route path="/tracking" element={<ProtectedPage allowedRoles={["admissions"]}><Tracking /></ProtectedPage>} />

            {/* Shared routes */}
            <Route path="/messages" element={<ProtectedPage><Messages /></ProtectedPage>} />
            <Route path="/help" element={<ProtectedPage><Help /></ProtectedPage>} />
            <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
