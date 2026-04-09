export type ApplicationStatus = "draft" | "submitted" | "under_review" | "accepted" | "rejected" | "waitlisted";
export type DocumentType = "transcript" | "recommendation" | "personal_statement" | "resume" | "test_scores" | "other";
export type DocumentStatus = "pending" | "uploaded" | "approved" | "rejected";
export type ReviewVerdict = "approved" | "supplement_requested" | "rejected";

export interface Application {
  id: string;
  studentId: string;
  school: string;
  program: string;
  status: ApplicationStatus;
  submissionDate: string;
  deadline: string;
  intake: string;
  progress: number;
  notes: string;
}

export interface Document {
  id: string;
  applicationId: string;
  studentId: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  uploadDate: string;
  size: string;
  remarks: string;
}

export interface ActivityEvent {
  id: string;
  applicationId: string;
  text: string;
  date: string;
  type: "status_change" | "document" | "review" | "message";
}

export interface MockStudent {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  completionPct: number;
  applicationCount: number;
}

export interface Review {
  id: string;
  studentId: string;
  studentName: string;
  applicationId: string;
  school: string;
  program: string;
  submissionDate: string;
  verdict?: ReviewVerdict;
  remarks: string;
  reviewDate?: string;
  documents: { name: string; type: DocumentType; status: DocumentStatus; verdict?: ReviewVerdict; remarks: string }[];
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: "all" | "students" | "counselors";
  status: "draft" | "published";
  createdDate: string;
  expirationDate: string;
}

export interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
}

// ── Mock Applications ──
export const mockApplications: Application[] = [
  { id: "app-1", studentId: "d1a1f1a1-1111-4111-a111-111111111111", school: "MIT", program: "Computer Science", status: "submitted", submissionDate: "2025-12-01", deadline: "2026-01-15", intake: "Fall 2026", progress: 75, notes: "Strong application" },
  { id: "app-2", studentId: "d1a1f1a1-1111-4111-a111-111111111111", school: "Stanford University", program: "Electrical Engineering", status: "under_review", submissionDate: "2025-11-15", deadline: "2026-01-01", intake: "Fall 2026", progress: 90, notes: "" },
  { id: "app-3", studentId: "d1a1f1a1-1111-4111-a111-111111111111", school: "Harvard University", program: "Applied Mathematics", status: "accepted", submissionDate: "2025-10-20", deadline: "2025-12-01", intake: "Fall 2026", progress: 100, notes: "Scholarship offered" },
  { id: "app-4", studentId: "d1a1f1a1-1111-4111-a111-111111111111", school: "UC Berkeley", program: "Data Science", status: "draft", submissionDate: "", deadline: "2026-03-01", intake: "Fall 2026", progress: 30, notes: "Need to finish essays" },
  { id: "app-5", studentId: "d1a1f1a1-1111-4111-a111-111111111111", school: "Caltech", program: "Physics", status: "rejected", submissionDate: "2025-09-15", deadline: "2025-11-01", intake: "Spring 2026", progress: 100, notes: "" },
  { id: "app-6", studentId: "d1a1f1a1-1111-4111-a111-111111111111", school: "Columbia University", program: "Computer Science", status: "waitlisted", submissionDate: "2025-11-30", deadline: "2026-01-15", intake: "Fall 2026", progress: 100, notes: "Waitlisted — check status" },
  { id: "app-7", studentId: "d1a1f1a1-1111-4111-a111-111111111111", school: "Princeton University", program: "Mathematics", status: "submitted", submissionDate: "2025-12-10", deadline: "2026-01-01", intake: "Fall 2026", progress: 80, notes: "" },
  { id: "app-8", studentId: "d1a1f1a1-1111-4111-a111-111111111111", school: "Yale University", program: "Economics", status: "under_review", submissionDate: "2025-11-25", deadline: "2026-01-01", intake: "Fall 2026", progress: 95, notes: "Interview scheduled" },
];

// ── Mock Documents ──
export const mockDocuments: Document[] = [
  { id: "doc-1", applicationId: "app-1", studentId: "d1a1f1a1-1111-4111-a111-111111111111", name: "Official Transcript 2025.pdf", type: "transcript", status: "uploaded", uploadDate: "2025-11-28", size: "2.4 MB", remarks: "" },
  { id: "doc-2", applicationId: "app-1", studentId: "d1a1f1a1-1111-4111-a111-111111111111", name: "Dr. Smith Recommendation.pdf", type: "recommendation", status: "approved", uploadDate: "2025-11-20", size: "1.1 MB", remarks: "Strong letter" },
  { id: "doc-3", applicationId: "app-1", studentId: "d1a1f1a1-1111-4111-a111-111111111111", name: "Personal Statement - MIT.docx", type: "personal_statement", status: "uploaded", uploadDate: "2025-11-29", size: "45 KB", remarks: "" },
  { id: "doc-4", applicationId: "app-2", studentId: "d1a1f1a1-1111-4111-a111-111111111111", name: "Transcript Stanford.pdf", type: "transcript", status: "approved", uploadDate: "2025-11-10", size: "2.4 MB", remarks: "" },
  { id: "doc-5", applicationId: "app-2", studentId: "d1a1f1a1-1111-4111-a111-111111111111", name: "Resume_AlexChen.pdf", type: "resume", status: "uploaded", uploadDate: "2025-11-12", size: "320 KB", remarks: "" },
  { id: "doc-6", applicationId: "app-3", studentId: "d1a1f1a1-1111-4111-a111-111111111111", name: "SAT Scores.pdf", type: "test_scores", status: "approved", uploadDate: "2025-10-15", size: "180 KB", remarks: "" },
  { id: "doc-7", applicationId: "app-2", studentId: "d1a1f1a1-1111-4111-a111-111111111111", name: "Prof. Johnson Letter.pdf", type: "recommendation", status: "pending", uploadDate: "", size: "", remarks: "Awaiting professor" },
];

// ── Activity Events ──
export const mockActivities: ActivityEvent[] = [
  { id: "evt-1", applicationId: "app-1", text: "Application to MIT — Computer Science submitted", date: "2025-12-01T10:30:00", type: "status_change" },
  { id: "evt-2", applicationId: "app-2", text: "Stanford application moved to Under Review", date: "2025-11-20T14:00:00", type: "status_change" },
  { id: "evt-3", applicationId: "app-1", text: "Transcript uploaded for MIT application", date: "2025-11-28T09:15:00", type: "document" },
  { id: "evt-4", applicationId: "app-3", text: "Harvard — Accepted with scholarship offer!", date: "2025-12-05T16:00:00", type: "status_change" },
  { id: "evt-5", applicationId: "app-1", text: "Recommendation letter received from Dr. Smith", date: "2025-11-20T11:00:00", type: "document" },
  { id: "evt-6", applicationId: "app-5", text: "Caltech — Application rejected", date: "2025-11-15T08:00:00", type: "status_change" },
  { id: "evt-7", applicationId: "app-8", text: "Yale — Interview scheduled for Jan 10", date: "2025-12-08T10:00:00", type: "review" },
  { id: "evt-8", applicationId: "app-6", text: "Columbia — Placed on waitlist", date: "2025-12-12T13:00:00", type: "status_change" },
];

// ── Mock Students (for counselor) ──
export const mockStudents: MockStudent[] = [
  { id: "d1a1f1a1-1111-4111-a111-111111111111", name: "Alex Chen", email: "alex.chen@school.edu", grade: "12", class: "12-A", completionPct: 78, applicationCount: 8 },
  { id: "s2", name: "Maria Garcia", email: "maria.garcia@school.edu", grade: "12", class: "12-A", completionPct: 95, applicationCount: 5 },
  { id: "s3", name: "James Johnson", email: "james.j@school.edu", grade: "12", class: "12-B", completionPct: 60, applicationCount: 3 },
  { id: "s4", name: "Yuki Tanaka", email: "yuki.t@school.edu", grade: "12", class: "12-A", completionPct: 100, applicationCount: 6 },
  { id: "s5", name: "Priya Patel", email: "priya.p@school.edu", grade: "11", class: "11-A", completionPct: 45, applicationCount: 2 },
  { id: "s6", name: "Lucas Mueller", email: "lucas.m@school.edu", grade: "12", class: "12-B", completionPct: 88, applicationCount: 7 },
  { id: "s7", name: "Fatima Al-Rashid", email: "fatima.a@school.edu", grade: "12", class: "12-A", completionPct: 70, applicationCount: 4 },
  { id: "s8", name: "David Kim", email: "david.k@school.edu", grade: "11", class: "11-B", completionPct: 30, applicationCount: 1 },
];

// ── Reviews (for counselor) ──
export const mockReviews: Review[] = [
  {
    id: "rev-1", studentId: "d1a1f1a1-1111-4111-a111-111111111111", studentName: "Alex Chen", applicationId: "app-1", school: "MIT", program: "Computer Science", submissionDate: "2025-12-01", remarks: "",
    documents: [
      { name: "Official Transcript 2025.pdf", type: "transcript", status: "uploaded", remarks: "" },
      { name: "Dr. Smith Recommendation.pdf", type: "recommendation", status: "approved", verdict: "approved", remarks: "Excellent letter" },
      { name: "Personal Statement - MIT.docx", type: "personal_statement", status: "uploaded", remarks: "" },
    ],
  },
  {
    id: "rev-2", studentId: "s2", studentName: "Maria Garcia", applicationId: "app-m1", school: "Stanford University", program: "Biology", submissionDate: "2025-11-20", remarks: "",
    documents: [
      { name: "Transcript_Maria.pdf", type: "transcript", status: "approved", verdict: "approved", remarks: "GPA 3.9" },
      { name: "Research_Paper.pdf", type: "other", status: "uploaded", remarks: "" },
    ],
  },
  {
    id: "rev-3", studentId: "s3", studentName: "James Johnson", applicationId: "app-j1", school: "UC Berkeley", program: "Economics", submissionDate: "2025-12-05", remarks: "",
    documents: [
      { name: "Transcript_James.pdf", type: "transcript", status: "uploaded", remarks: "" },
      { name: "Personal_Statement_James.docx", type: "personal_statement", status: "pending", remarks: "Not yet submitted" },
    ],
  },
  {
    id: "rev-4", studentId: "s6", studentName: "Lucas Mueller", applicationId: "app-l1", school: "ETH Zurich", program: "Mechanical Engineering", submissionDate: "2025-11-10", verdict: "approved", reviewDate: "2025-11-15", remarks: "Outstanding application",
    documents: [
      { name: "Transcript_Lucas.pdf", type: "transcript", status: "approved", verdict: "approved", remarks: "" },
      { name: "Recommendation_Lucas.pdf", type: "recommendation", status: "approved", verdict: "approved", remarks: "" },
    ],
  },
  {
    id: "rev-5", studentId: "s4", studentName: "Yuki Tanaka", applicationId: "app-y1", school: "University of Tokyo", program: "Computer Science", submissionDate: "2025-10-30", verdict: "approved", reviewDate: "2025-11-05", remarks: "Excellent candidate",
    documents: [
      { name: "Transcript_Yuki.pdf", type: "transcript", status: "approved", verdict: "approved", remarks: "" },
      { name: "Portfolio_Yuki.pdf", type: "other", status: "approved", verdict: "approved", remarks: "Impressive projects" },
    ],
  },
];

// ── Announcements (for admissions) ──
export const mockAnnouncements: Announcement[] = [
  { id: "ann-1", title: "Fall 2026 Application Deadline Extended", body: "Due to high demand, we are extending the application deadline for Fall 2026 to March 15, 2026.", audience: "all", status: "published", createdDate: "2025-12-01", expirationDate: "2026-03-15" },
  { id: "ann-2", title: "New Scholarship Opportunities", body: "We are pleased to announce three new merit-based scholarships for incoming freshmen.", audience: "students", status: "published", createdDate: "2025-11-15", expirationDate: "2026-06-01" },
  { id: "ann-3", title: "Counselor Training Workshop", body: "Annual counselor training workshop scheduled for January 20, 2026. All counselors are required to attend.", audience: "counselors", status: "published", createdDate: "2025-12-10", expirationDate: "2026-01-20" },
  { id: "ann-4", title: "Updated Document Requirements", body: "Starting Spring 2026, all applications must include standardized test scores.", audience: "all", status: "draft", createdDate: "2025-12-15", expirationDate: "2026-06-01" },
];

// ── Messages ──
export const mockMessages: Message[] = [
  { id: "msg-1", from: "Dr. Sarah Miller", subject: "Your MIT Application Review", preview: "I've reviewed your MIT application materials and have some feedback...", date: "2025-12-08T10:30:00", read: false },
  { id: "msg-2", from: "Admissions Office", subject: "Application Deadline Reminder", preview: "This is a reminder that the Stanford application deadline is approaching...", date: "2025-12-07T14:00:00", read: false },
  { id: "msg-3", from: "System", subject: "Document Upload Confirmed", preview: "Your transcript has been successfully uploaded and is pending review.", date: "2025-12-06T09:00:00", read: true },
  { id: "msg-4", from: "James Wilson", subject: "Scholarship Information", preview: "Congratulations! You may be eligible for the Merit Excellence Scholarship...", date: "2025-12-05T16:00:00", read: true },
  { id: "msg-5", from: "Dr. Smith", subject: "Recommendation Letter Submitted", preview: "I've submitted my recommendation letter for your MIT application...", date: "2025-12-04T11:00:00", read: true },
];

// ── Status helpers ──
export const statusColors: Record<ApplicationStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  submitted: "bg-primary/10 text-primary",
  under_review: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  accepted: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  rejected: "bg-destructive/10 text-destructive",
  waitlisted: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
};

export const statusLabels: Record<ApplicationStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under Review",
  accepted: "Accepted",
  rejected: "Rejected",
  waitlisted: "Waitlisted",
};

export const docTypeLabels: Record<DocumentType, string> = {
  transcript: "Transcript",
  recommendation: "Recommendation",
  personal_statement: "Personal Statement",
  resume: "Resume/CV",
  test_scores: "Test Scores",
  other: "Other",
};
