import { useTranslation } from "react-i18next";
import { FileText, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const summaryStats = [
  { key: "admissions.totalApplications", value: 234, icon: FileText, color: "text-primary" },
  { key: "admissions.acceptanceRate", value: "68%", icon: TrendingUp, color: "text-emerald-500" },
  { key: "nav.students", value: 180, icon: Users, color: "text-blue-500" },
  { key: "student.accepted", value: 159, icon: CheckCircle, color: "text-emerald-600" },
];

const statusPie = [
  { name: "Submitted", value: 45 },
  { name: "Under Review", value: 32 },
  { name: "Accepted", value: 102 },
  { name: "Rejected", value: 30 },
  { name: "Waitlisted", value: 25 },
];

const programBar = [
  { name: "Computer Science", count: 65 },
  { name: "Engineering", count: 42 },
  { name: "Business", count: 38 },
  { name: "Biology", count: 31 },
  { name: "Mathematics", count: 28 },
  { name: "Economics", count: 30 },
];

const COLORS = ["hsl(217,71%,45%)", "hsl(45,93%,47%)", "hsl(160,40%,45%)", "hsl(0,72%,51%)", "hsl(280,60%,50%)"];

export default function DataDashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t("nav.dataBoard")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <Card key={s.key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t(s.key)}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent><div className="text-3xl font-bold">{s.value}</div></CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t("admissions.statusDistribution")}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusPie} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {statusPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">{t("admissions.programDistribution")}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={programBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-20} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(217,71%,45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
