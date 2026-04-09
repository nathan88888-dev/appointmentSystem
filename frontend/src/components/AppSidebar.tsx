import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, FolderOpen, MessageSquare, HelpCircle,
  Users, ClipboardCheck, ClipboardList, BarChart3, Megaphone, TrendingUp,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const menuByRole: Record<UserRole, { key: string; icon: any; path: string }[]> = {
  student: [
    { key: "nav.dashboard", icon: LayoutDashboard, path: "/" },
    { key: "nav.applications", icon: FileText, path: "/applications" },
    { key: "nav.documents", icon: FolderOpen, path: "/documents" },
    { key: "nav.messages", icon: MessageSquare, path: "/messages" },
    { key: "nav.help", icon: HelpCircle, path: "/help" },
  ],
  counselor: [
    { key: "nav.dashboard", icon: LayoutDashboard, path: "/" },
    { key: "nav.students", icon: Users, path: "/students" },
    { key: "nav.pendingReview", icon: ClipboardCheck, path: "/pending" },
    { key: "nav.reviewed", icon: ClipboardList, path: "/reviewed" },
    { key: "nav.reports", icon: BarChart3, path: "/reports" },
    { key: "nav.messages", icon: MessageSquare, path: "/messages" },
  ],
  admissions: [
    { key: "nav.dashboard", icon: LayoutDashboard, path: "/" },
    { key: "nav.announcements", icon: Megaphone, path: "/announcements" },
    { key: "nav.dataBoard", icon: BarChart3, path: "/data-dashboard" },
    { key: "nav.tracking", icon: TrendingUp, path: "/tracking" },
    { key: "nav.messages", icon: MessageSquare, path: "/messages" },
  ],
};

export function AppSidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const role = user?.role || "student";
  const items = menuByRole[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t(`auth.${role}`)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className="hover:bg-muted/50"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{t(item.key)}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
