import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Shield, Bell, Smartphone, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();

  const initials = user?.fullName?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U";

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">{t("nav.profile")}</h1>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><User className="h-5 w-5" />Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{user?.fullName}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" />{user?.email}</p>
              <Badge className="mt-1 capitalize">{user?.role}</Badge>
            </div>
          </div>
          <Button variant="outline" onClick={() => toast({ title: "Avatar updated (mock)" })}>Change Avatar</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Shield className="h-5 w-5" />Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button onClick={() => toast({ title: "Password changed (mock)" })}>
            <Key className="h-4 w-4 mr-2" />Update Password
          </Button>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Switch onCheckedChange={() => toast({ title: "2FA toggled (mock)" })} />
          </div>

          <Separator />

          <div>
            <p className="font-medium mb-2 flex items-center gap-1"><Smartphone className="h-4 w-4" />Login Devices</p>
            <div className="space-y-2">
              {["Chrome on MacOS — Current session", "Safari on iPhone — 2 days ago", "Firefox on Windows — 5 days ago"].map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">{d}</span>
                  {i > 0 && <Button size="sm" variant="ghost" className="text-destructive">Revoke</Button>}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Bell className="h-5 w-5" />Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email notifications", desc: "Receive updates via email" },
            { label: "In-app notifications", desc: "Show notifications in the app" },
            { label: "Application status changes", desc: "Get notified when status updates" },
            { label: "New messages", desc: "Notify on new messages" },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{pref.label}</p>
                <p className="text-xs text-muted-foreground">{pref.desc}</p>
              </div>
              <Switch defaultChecked={i < 3} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
