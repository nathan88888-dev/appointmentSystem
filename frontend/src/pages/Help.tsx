import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  { q: "How do I submit a new application?", a: "Navigate to the Applications page, click 'New Application', fill in the school, program, and deadline details, then click Submit." },
  { q: "What document formats are accepted?", a: "We accept PDF, DOCX, JPG, and PNG files up to 10 MB each." },
  { q: "How do I track my application status?", a: "Visit the Applications page to see color-coded status badges and progress bars for each application." },
  { q: "Can I edit an application after submitting?", a: "Draft applications can be edited freely. Submitted applications can only have documents added or updated." },
  { q: "How do I contact my counselor?", a: "Use the Messages section to send a message to your assigned counselor." },
  { q: "What do the status colors mean?", a: "Gray = Draft, Blue = Submitted, Amber = Under Review, Green = Accepted, Red = Rejected, Purple = Waitlisted." },
  { q: "How do I change my password?", a: "Go to Profile > Settings to update your password and security preferences." },
  { q: "Is my data secure?", a: "All data is encrypted in transit and at rest. We follow industry best practices for data security." },
];

export default function Help() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">{t("nav.help")}</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
