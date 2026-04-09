import { useTranslation } from "react-i18next";
import { Users, ClipboardCheck, ClipboardList, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CounselorDashboard() {
  const { t } = useTranslation();

  const stats = [
    { label: t("nav.students"), value: 42, icon: Users, color: "text-primary" },
    { label: t("nav.pendingReview"), value: 12, icon: ClipboardCheck, color: "text-amber-500" },
    { label: t("nav.reviewed"), value: 30, icon: ClipboardList, color: "text-emerald-500" },
    { label: t("nav.reports"), value: 5, icon: BarChart3, color: "text-blue-500" },
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
