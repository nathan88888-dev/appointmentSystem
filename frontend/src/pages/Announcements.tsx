import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAnnouncements } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Announcements() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t("nav.announcements")}</h1>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />{t("admissions.publishAnnouncement")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Megaphone className="h-5 w-5" />All Announcements</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("admissions.title")}</TableHead>
                <TableHead>{t("admissions.audience")}</TableHead>
                <TableHead>{t("student.status")}</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>{t("admissions.expiration")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAnnouncements.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.title}</TableCell>
                  <TableCell className="capitalize">{a.audience}</TableCell>
                  <TableCell>
                    <Badge variant={a.status === "published" ? "default" : "secondary"}>{a.status}</Badge>
                  </TableCell>
                  <TableCell>{a.createdDate}</TableCell>
                  <TableCell>{a.expirationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("admissions.publishAnnouncement")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>{t("admissions.title")}</Label><Input placeholder="Announcement title" /></div>
            <div><Label>Content</Label><Textarea placeholder="Write announcement content..." rows={5} /></div>
            <div><Label>{t("admissions.audience")}</Label>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="counselors">Counselors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>{t("admissions.expiration")}</Label><Input type="date" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>{t("common.cancel")}</Button>
            <Button onClick={() => { setCreateOpen(false); toast({ title: "Announcement created (mock)" }); }}>{t("admissions.publishAnnouncement")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
