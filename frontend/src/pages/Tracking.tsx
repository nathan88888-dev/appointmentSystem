import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { mockApplications, statusColors, statusLabels, mockReviews, type Application } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Tracking() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selected, setSelected] = useState<Application | null>(null);
  const [resultFilter, setResultFilter] = useState("all");

  const allApps = mockApplications;
  const filtered = resultFilter === "all" ? allApps : allApps.filter((a) => a.status === resultFilter);
  const review = selected ? mockReviews.find((r) => r.applicationId === selected.id) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t("nav.tracking")}</h1>
        <Select value={resultFilter} onValueChange={setResultFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {Object.entries(statusLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5" />All Applications ({filtered.length})</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("student.school")}</TableHead>
                <TableHead>{t("student.program")}</TableHead>
                <TableHead>{t("student.status")}</TableHead>
                <TableHead>{t("student.submissionDate")}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.school}</TableCell>
                  <TableCell>{app.program}</TableCell>
                  <TableCell><Badge className={statusColors[app.status]}>{statusLabels[app.status]}</Badge></TableCell>
                  <TableCell>{app.submissionDate || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelected(app)}>
                        <Eye className="h-4 w-4 mr-1" />{t("common.view")}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast({ title: t("admissions.markResult"), description: `${app.school} — Draft` })}>
                        {t("admissions.draft")}
                      </Button>
                      <Button size="sm" onClick={() => toast({ title: t("admissions.markResult"), description: `${app.school} — Final` })}>
                        {t("admissions.final")}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <SheetHeader><SheetTitle>{selected.school} — {selected.program}</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-muted-foreground">{t("student.status")}</p><Badge className={`mt-1 ${statusColors[selected.status]}`}>{statusLabels[selected.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">{t("student.intake")}</p><p className="mt-1 text-sm font-medium">{selected.intake}</p></div>
                </div>
                {review && (
                  <div>
                    <h3 className="font-semibold mb-2">Counselor Feedback</h3>
                    <Card><CardContent className="p-4">
                      <p className="text-sm"><span className="font-medium">Verdict:</span> {review.verdict || "Pending"}</p>
                      {review.remarks && <p className="text-sm mt-1"><span className="font-medium">Remarks:</span> {review.remarks}</p>}
                      {review.reviewDate && <p className="text-xs text-muted-foreground mt-2">Reviewed: {review.reviewDate}</p>}
                    </CardContent></Card>
                  </div>
                )}
                {!review && <p className="text-sm text-muted-foreground">No counselor review on file.</p>}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
