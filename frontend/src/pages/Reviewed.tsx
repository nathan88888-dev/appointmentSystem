import { useTranslation } from "react-i18next";
import { ClipboardList, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockReviews } from "@/data/mockData";

const verdictIcons = { approved: CheckCircle, supplement_requested: AlertCircle, rejected: XCircle };
const verdictColors = { approved: "text-emerald-600", supplement_requested: "text-amber-600", rejected: "text-destructive" };

export default function Reviewed() {
  const { t } = useTranslation();
  const reviewed = mockReviews.filter((r) => r.verdict);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t("nav.reviewed")}</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><ClipboardList className="h-5 w-5" />Completed Reviews ({reviewed.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>{t("student.school")}</TableHead>
                <TableHead>{t("student.program")}</TableHead>
                <TableHead>Verdict</TableHead>
                <TableHead>Review Date</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewed.map((r) => {
                const Icon = verdictIcons[r.verdict!];
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.studentName}</TableCell>
                    <TableCell>{r.school}</TableCell>
                    <TableCell>{r.program}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Icon className={`h-4 w-4 ${verdictColors[r.verdict!]}`} />
                        <span className="capitalize">{r.verdict?.replace("_", " ")}</span>
                      </div>
                    </TableCell>
                    <TableCell>{r.reviewDate}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{r.remarks}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
