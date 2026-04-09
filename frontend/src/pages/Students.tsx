import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Download, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockStudents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Students() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  const filtered = mockStudents.filter((s) => {
    const matchSearch = `${s.name} ${s.email}`.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === "all" || s.grade === gradeFilter;
    return matchSearch && matchGrade;
  });

  const grades = [...new Set(mockStudents.map((s) => s.grade))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">{t("nav.students")}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: t("counselor.importData"), description: "Mock import" })}>
            <Upload className="h-4 w-4 mr-2" />{t("counselor.importData")}
          </Button>
          <Button variant="outline" onClick={() => toast({ title: t("counselor.exportData"), description: "Mock export" })}>
            <Download className="h-4 w-4 mr-2" />{t("counselor.exportData")}
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("common.search")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            {grades.map((g) => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Users className="h-5 w-5" />{t("nav.students")} ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>{t("counselor.completion")}</TableHead>
                <TableHead>Applications</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.class}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={s.completionPct} className="h-2 w-20" />
                      <span className="text-sm">{s.completionPct}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{s.applicationCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
