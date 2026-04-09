import { useTranslation } from "react-i18next";
import { FileText, TrendingUp, Megaphone, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const { t } = useTranslation();

  const stats = [
    { label: t("admissions.totalApplications"), value: 234, icon: FileText, color: "text-primary" },
    { label: t("admissions.acceptanceRate"), value: "68%", icon: TrendingUp, color: "text-emerald-500" },
    { label: t("nav.announcements"), value: 7, icon: Megaphone, color: "text-amber-500" },
    { label: t("nav.students"), value: 180, icon: Users, color: "text-blue-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t("nav.dashboard")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
