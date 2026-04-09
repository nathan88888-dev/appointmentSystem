import { useTranslation } from "react-i18next";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { key: "student.totalApps", value: 8, icon: FileText, color: "text-primary" },
  { key: "student.pending", value: 3, icon: Clock, color: "text-amber-500" },
  { key: "student.accepted", value: 4, icon: CheckCircle, color: "text-emerald-500" },
  { key: "student.rejected", value: 1, icon: XCircle, color: "text-destructive" },
];

export default function StudentDashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t("nav.dashboard")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t(s.key)}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("student.recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { text: "Application to MIT — Computer Science submitted", time: "2 hours ago" },
              { text: "Transcript uploaded for Stanford application", time: "1 day ago" },
              { text: "Recommendation letter received from Dr. Smith", time: "3 days ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm text-foreground">{item.text}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
