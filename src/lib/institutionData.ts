import { Student } from "@/app/dashboard/institution/components/VerifyTab";
import { Project } from "@/app/dashboard/institution/components/InnovationsTab";
import { Grant } from "@/app/dashboard/institution/components/GrantsTab";

export interface InstitutionActivity {
  id: string;
  title: string;
  type: string;
  date: string;
  attendees: number;
  status: "approved" | "pending";
}

/**
 * Returns clean empty default data structures for institutional panels.
 * All actual data is loaded live from the Supabase database.
 */
export function getInstitutionSeedData(rawOrg: string, aishe?: string): {
  students: Student[];
  projects: Project[];
  grants: Grant[];
  activities: InstitutionActivity[];
} {
  return {
    students: [],
    projects: [],
    grants: [],
    activities: [],
  };
}
