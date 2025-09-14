export interface Student {
  id: string;
  name: string;
  rollNo: string;
  phoneNo: string;
  branch: string;
  year: string;
  resume: string;
  email: string;
  linkedin: string;
  github: string;
  previousWork: string;
  selectedPortfolios: string[];
  portfolio1: string | null;
  portfolio2: string | null;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  data: Student[];
}