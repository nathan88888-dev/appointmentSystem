import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, LayoutGrid, List, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockApplications, mockDocuments, mockActivities, statusColors, statusLabels, type Application } from "@/data/mockData";

export default function Applications() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [newAppOpen, setNewAppOpen] = useState(false);

  const filtered = mockApplications.filter((a) => {
    const matchSearch = `${a.school} ${a.program}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const appDocs = selectedApp ? mockDocuments.filter((d) => d.applicationId === selectedApp.id) : [];
  const appEvents = selectedApp ? mockActivities.filter((e) => e.applicationId === selectedApp.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">{t("nav.applications")}</h1>
        <Button onClick={() => setNewAppOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t("student.newApplication")}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("common.search")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder={t("common.filter")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(statusLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-1 border rounded-md p-1">
          <Button variant={viewMode === "card" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("card")}><LayoutGrid className="h-4 w-4" /></Button>
          <Button variant={viewMode === "table" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("table")}><List className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Card View */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((app) => (
            <Card key={app.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedApp(app)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{app.school}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{app.program}</p>
                  </div>
                  <Badge className={statusColors[app.status]}>{statusLabels[app.status]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("student.intake")}</span>
                  <span>{app.intake}</span>
                </div>
                {app.submissionDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("student.submissionDate")}</span>
                    <span>{app.submissionDate}</span>
                  </div>
                )}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("student.school")}</TableHead>
                  <TableHead>{t("student.program")}</TableHead>
                  <TableHead>{t("student.status")}</TableHead>
                  <TableHead>{t("student.submissionDate")}</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((app) => (
                  <TableRow key={app.id} className="cursor-pointer" onClick={() => setSelectedApp(app)}>
                    <TableCell className="font-medium">{app.school}</TableCell>
                    <TableCell>{app.program}</TableCell>
                    <TableCell><Badge className={statusColors[app.status]}>{statusLabels[app.status]}</Badge></TableCell>
                    <TableCell>{app.submissionDate || "—"}</TableCell>
                    <TableCell><div className="flex items-center gap-2"><Progress value={app.progress} className="h-2 w-20" /><span className="text-sm">{app.progress}%</span></div></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Detail Side Panel */}
      <Sheet open={!!selectedApp} onOpenChange={(o) => !o && setSelectedApp(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedApp && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedApp.school}</SheetTitle>
                <p className="text-sm text-muted-foreground">{selectedApp.program}</p>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-muted-foreground">{t("student.status")}</p><Badge className={`mt-1 ${statusColors[selectedApp.status]}`}>{statusLabels[selectedApp.status]}</Badge></div>
                  <div><p className="text-xs text-muted-foreground">{t("student.intake")}</p><p className="mt-1 text-sm font-medium">{selectedApp.intake}</p></div>
                  <div><p className="text-xs text-muted-foreground">Deadline</p><p className="mt-1 text-sm font-medium">{selectedApp.deadline}</p></div>
                  <div><p className="text-xs text-muted-foreground">Progress</p><div className="mt-1 flex items-center gap-2"><Progress value={selectedApp.progress} className="h-2 flex-1" /><span className="text-sm">{selectedApp.progress}%</span></div></div>
                </div>
                {selectedApp.notes && <div><p className="text-xs text-muted-foreground">{t("student.notes")}</p><p className="mt-1 text-sm">{selectedApp.notes}</p></div>}

                {/* Documents */}
                <div>
                  <h3 className="font-semibold mb-3">{t("nav.documents")}</h3>
                  {appDocs.length > 0 ? (
                    <div className="space-y-2">
                      {appDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.size} • {doc.uploadDate || "Not uploaded"}</p>
                          </div>
                          <Badge variant={doc.status === "approved" ? "default" : doc.status === "pending" ? "secondary" : "outline"}>{doc.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-muted-foreground">{t("common.noData")}</p>}
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-semibold mb-3">{t("student.recentActivity")}</h3>
                  <div className="space-y-3">
                    {appEvents.map((evt) => (
                      <div key={evt.id} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <div>
                          <p className="text-sm">{evt.text}</p>
                          <p className="text-xs text-muted-foreground">{new Date(evt.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                    {appEvents.length === 0 && <p className="text-sm text-muted-foreground">{t("common.noData")}</p>}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* New Application Dialog */}
      <Dialog open={newAppOpen} onOpenChange={setNewAppOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("student.newApplication")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>{t("student.school")}</Label><Input placeholder="e.g. MIT" /></div>
            <div><Label>{t("student.program")}</Label><Input placeholder="e.g. Computer Science" /></div>
            <div><Label>{t("student.intake")}</Label><Input placeholder="e.g. Fall 2026" /></div>
            <div><Label>Deadline</Label><Input type="date" /></div>
            <div><Label>{t("student.notes")}</Label><Textarea placeholder="Additional notes..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAppOpen(false)}>{t("common.cancel")}</Button>
            <Button onClick={() => setNewAppOpen(false)}>{t("common.submit")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
