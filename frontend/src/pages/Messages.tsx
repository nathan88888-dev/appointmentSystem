import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MailOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMessages } from "@/data/mockData";

export default function Messages() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const msg = mockMessages.find((m) => m.id === selected);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t("nav.messages")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Inbox */}
        <div className="lg:col-span-1 space-y-2">
          {mockMessages.map((m) => (
            <Card
              key={m.id}
              className={`cursor-pointer transition-colors ${selected === m.id ? "border-primary" : ""} ${!m.read ? "bg-primary/5" : ""}`}
              onClick={() => setSelected(m.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {m.read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                    <span className={`text-sm ${!m.read ? "font-semibold" : ""}`}>{m.from}</span>
                  </div>
                  {!m.read && <Badge variant="default" className="text-xs">New</Badge>}
                </div>
                <p className={`text-sm mt-1 ${!m.read ? "font-medium" : "text-muted-foreground"}`}>{m.subject}</p>
                <p className="text-xs text-muted-foreground mt-1 truncate">{m.preview}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(m.date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Detail */}
        <div className="lg:col-span-2">
          {msg ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">{msg.subject}</h2>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <span>From: {msg.from}</span>
                  <span>•</span>
                  <span>{new Date(msg.date).toLocaleString()}</span>
                </div>
                <div className="mt-6 text-sm leading-relaxed">
                  <p>{msg.preview}</p>
                  <p className="mt-4 text-muted-foreground">This is a mock message preview. In a production environment, the full message content would be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Select a message to read</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
