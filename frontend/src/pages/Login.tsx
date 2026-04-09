import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, User, BookOpen, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";

const DEMO_ACCOUNTS: { label: string; email: string; password: string; role: UserRole; icon: typeof User }[] = [
  { label: "Student", email: "student@demo.com", password: "demo123", role: "student", icon: User },
  { label: "Counselor", email: "counselor@demo.com", password: "demo123", role: "counselor", icon: BookOpen },
  { label: "Admissions", email: "admin@demo.com", password: "demo123", role: "admissions", icon: Building2 },
];

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, role);
      navigate("/");
    } catch {
      toast.error("Invalid credentials. For demo accounts use password: demo123");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demo: (typeof DEMO_ACCOUNTS)[number]) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setRole(demo.role);
    setLoading(true);
    try {
      await login(demo.email, demo.password, demo.role);
      toast.success(`Logged in as ${demo.label}`);
      navigate("/");
    } catch {
      toast.error("Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("app.name")}</h1>
          <p className="text-sm text-muted-foreground">{t("app.tagline")}</p>
        </div>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl">{t("auth.login")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student">{t("auth.student")}</TabsTrigger>
              <TabsTrigger value="counselor">{t("auth.counselor")}</TabsTrigger>
              <TabsTrigger value="admissions">{t("auth.admissions")}</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("common.loading") : t("auth.login")}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3 font-medium uppercase tracking-wide">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((demo) => (
                <Button
                  key={demo.role}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin(demo)}
                  disabled={loading}
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <demo.icon className="h-4 w-4" />
                  <span className="text-xs">{demo.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {t("auth.noAccount")}{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              {t("auth.register")}
            </Link>
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:underline">{t("auth.privacyPolicy")}</a>
            <a href="#" className="hover:underline">{t("auth.termsOfService")}</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
