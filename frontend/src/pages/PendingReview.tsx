import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ClipboardCheck, CheckCircle, AlertCircle, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { mockReviews, type Review } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function PendingReview() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const pending = mockReviews.filter((r) => !r.verdict);
  const [selected, setSelected] = useState<Review | null>(null);
  const [remarks, setRemarks] = useState("");
  const [notify, setNotify] = useState(true);

  const handleVerdict = (verdict: string) => {
    toast({ title: t("counselor.finalVerdict"), description: `Marked as ${verdict} (mock)` });
    setSelected(null);
    setRemarks("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t("nav.pendingReview")}</h1>
        <Button variant="outline" onClick={() => toast({ title: t("counselor.bulkApprove"), description: "Mock bulk action" })}>
          <CheckCircle className="h-4 w-4 mr-2" />{t("counselor.bulkApprove")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><ClipboardCheck className="h-5 w-5" />Pending ({pending.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>{t("student.school")}</TableHead>
                <TableHead>{t("student.program")}</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.studentName}</TableCell>
                  <TableCell>{r.school}</TableCell>
                  <TableCell>{r.program}</TableCell>
                  <TableCell>{r.submissionDate}</TableCell>
                  <TableCell><Badge variant="outline">{r.documents.length} files</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => { setSelected(r); setRemarks(""); }}>
                      <Eye className="h-4 w-4 mr-1" />Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Panel */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>Review: {selected.studentName}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Student Card */}
                <Card>
                  <CardContent className="p-4">
                    <p className="font-semibold">{selected.studentName}</p>
                    <p className="text-sm text-muted-foreground">{selected.school} — {selected.program}</p>
                    <p className="text-sm text-muted-foreground">Submitted: {selected.submissionDate}</p>
                  </CardContent>
                </Card>

                {/* Documents */}
                <div>
                  <h3 className="font-semibold mb-3">{t("nav.documents")}</h3>
                  <div className="space-y-3">
                    {selected.documents.map((doc, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">{doc.name}</p>
                            <Badge variant="outline">{doc.type}</Badge>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="default" onClick={() => toast({ title: "Approved", description: doc.name })}>
                              <CheckCircle className="h-3 w-3 mr-1" />{t("counselor.approve")}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => toast({ title: "Supplement Requested", description: doc.name })}>
                              <AlertCircle className="h-3 w-3 mr-1" />{t("counselor.requestSupplement")}
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => toast({ title: "Rejected", description: doc.name })}>
                              <XCircle className="h-3 w-3 mr-1" />{t("counselor.reject")}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Final Verdict */}
                <div className="space-y-3">
                  <h3 className="font-semibold">{t("counselor.finalVerdict")}</h3>
                  <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Review comments..." />
                  <div className="flex items-center gap-2">
                    <Checkbox id="notify" checked={notify} onCheckedChange={(c) => setNotify(!!c)} />
                    <Label htmlFor="notify">{t("counselor.notifyStudent")}</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleVerdict("approved")}><CheckCircle className="h-4 w-4 mr-1" />{t("counselor.approve")}</Button>
                    <Button variant="outline" onClick={() => handleVerdict("supplement_requested")}><AlertCircle className="h-4 w-4 mr-1" />{t("counselor.requestSupplement")}</Button>
                    <Button variant="destructive" onClick={() => handleVerdict("rejected")}><XCircle className="h-4 w-4 mr-1" />{t("counselor.reject")}</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
