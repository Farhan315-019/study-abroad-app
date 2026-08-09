export type UserRole = "student" | "parent" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  /** Optional profile photo URL. Absent until the backend provides one;
   *  the UI falls back to an initials avatar. */
  avatar_url?: string | null;
  /** Optional explicit role. Derived from `is_admin` when not provided. */
  role?: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface StudentProfile {
  id: number;
  user_id: number;
  current_country: string | null;
  nationality: string | null;
  highest_education: string | null;
  gpa: number | null;
  ielts: number | null;
  pte: number | null;
  budget_per_year_usd: number | null;
  preferred_countries: string | null;
  preferred_degrees: string | null;
  target_intake: string | null;
  goal: string | null;
  completed: boolean;
  updated_at: string | null;
}

export type VerifyStatus = "verified" | "approx" | "manual";

export interface DestinationUniBrief {
  name: string;
  city: string | null;
  rank_world: number | null;
  ielts_min: number | null;
  tuition_min_usd: number | null;
  status: string;
}

export interface DestinationStats {
  slug: string;
  name: string;
  university_count: number;
  verified_count: number;
  approx_count: number;
  tuition_min_usd: number | null;
  tuition_max_usd: number | null;
  intakes: string[];
  top_universities: DestinationUniBrief[];
}

export interface University {
  id: number;
  name: string;
  country: string;
  city: string | null;
  rank_world: number | null;
  intake_seasons: string | null;
  ielts_min: number | null;
  pte_min: number | null;
  toefl_min: number | null;
  gpa_requirement: string | null;
  tuition_fees: string | null;
  tuition_min_usd: number | null;
  tuition_max_usd: number | null;
  application_fee: string | null;
  documents_required: string | null;
  deadlines: string | null;
  official_website: string | null;
  admissions_page: string | null;
  notes: string | null;
  status: VerifyStatus;
  verified_at: string | null;
  saved: boolean;
}

export interface Paginated<T> {
  total: number;
  items: T[];
}

export interface Scholarship {
  id: number;
  name: string;
  country: string | null;
  university_id: number | null;
  eligibility: string | null;
  coverage: string | null;
  amount_per_year_usd: number | null;
  deadline: string | null;
  link: string | null;
  notes: string | null;
  status: VerifyStatus;
  verified_at: string | null;
}

export interface RecommendationUniversity {
  university: {
    id: number;
    name: string;
    country: string;
    city: string | null;
    rank_world: number | null;
    tuition_min_usd: number | null;
    ielts_min: number | null;
    status: VerifyStatus;
  };
  score: number;
  reasons: string[];
}

export interface CountryRecommendation {
  country: string;
  score: number;
  universities: number;
  avg_tuition_min_usd: number | null;
  scholarships: number;
  top_reasons: string[];
}

export interface RecommendationResult {
  profile_summary: {
    ielts: number | null;
    pte: number | null;
    gpa: number | null;
    budget_per_year_usd: number | null;
    preferred_countries: string | null;
  };
  countries: CountryRecommendation[];
  universities: RecommendationUniversity[];
}

export type ApplicationStatus =
  | "drafted"
  | "in_progress"
  | "submitted"
  | "offered"
  | "rejected"
  | "withdrawn";

export interface Application {
  id: number;
  university: {
    id: number;
    name: string;
    country: string;
    city: string | null;
    rank_world: number | null;
    tuition_min_usd: number | null;
    ielts_min: number | null;
    status: VerifyStatus;
    admissions_page: string | null;
    official_website: string | null;
  };
  status: ApplicationStatus;
  sop_draft: string | null;
  email_draft: string | null;
  checklist: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ApplicationPackage {
  user: { name: string; email: string };
  profile: { goal: string | null; ielts: number | null; gpa: number | null };
  applications: Application[];
}
