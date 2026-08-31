/**
 * allowedEmails.ts
 * Exports the list of emails permitted to log into the NCIE portal.
 */
export const SUPER_ADMIN_EMAILS = [
  "vigneswarnalluri10@gmail.com",
  "admin@ncieindia.org",
  "ceo@ncieindia.org",
];

export const isSuperAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const lower = email.trim().toLowerCase();
  return SUPER_ADMIN_EMAILS.some((e) => e.toLowerCase() === lower);
};

export const ALLOWED_OFFICIAL_EMAILS = [
  "ncie.ap.gov@gmail.com",
  "admin@ncieindia.org",
  "ceo@ncieindia.org",
  "officer@ncie.gov.in",
  "directorate@ncie.gov.in",
  "vigneswarnalluri10@gmail.com",
];

export const ALLOWED_INSTITUTION_EMAILS = [
  // 7 Approved Institutional Chapter SPOCs
  "riperatp@gmail.com",
  "principal@acem.ac.in",
  "srrandcvr@gmail.com",
  "srcptapcell@gmail.com",
  "principal@srit.ac.in",
  "principal@swarnandhra.ac.in",
  "principal@kitsguntur.ac.in",

  // Master / Super Admin
  "ceo@ncieindia.org",
  "admin@ncieindia.org",
  "vigneswarnalluri10@gmail.com",
];

export const isAllowedInstitutionEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const lower = email.trim().toLowerCase();
  
  // Explicitly deny official/governmental desk accounts from accessing the institutional portal
  if (
    lower === "ncie.ap.gov@gmail.com" ||
    lower === "officer@ncie.gov.in" ||
    lower === "directorate@ncie.gov.in"
  ) {
    return false;
  }

  if (isSuperAdminEmail(lower)) return true;
  return ALLOWED_INSTITUTION_EMAILS.some((e) => e.toLowerCase() === lower);
};

export const ALLOWED_EMAILS = [
  ...ALLOWED_OFFICIAL_EMAILS,
  ...ALLOWED_INSTITUTION_EMAILS,
];
