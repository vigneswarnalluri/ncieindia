/**
 * allowedEmails.ts
 * Exports the list of emails permitted to log into the NCIE portal.
 */
export const SUPER_ADMIN_EMAILS = [
  "ncie.ap.gov@gmail.com",
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
  "vigneswarnalluri10@gmail.com",
];

export const ALLOWED_INSTITUTION_EMAILS = [
  "ncie.ap.gov@gmail.com",
  "spoc@institution.ac.in",
  "ceo@ncieindia.org",
  "vigneswarnalluri10@gmail.com",
];

export const ALLOWED_EMAILS = [
  ...ALLOWED_OFFICIAL_EMAILS,
  ...ALLOWED_INSTITUTION_EMAILS,
];


