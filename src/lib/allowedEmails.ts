/**
 * allowedEmails.ts
 * Exports the list of emails permitted to log into the NCIE portal.
 */
export const ALLOWED_OFFICIAL_EMAILS = [
  "admin@ncieindia.org",
  "ceo@ncieindia.org",
  "officer@ncie.gov.in",
  "ncie.ap.gov@gmail.com",
  "vigneswarnalluri10@gmail.com"
];

export const ALLOWED_INSTITUTION_EMAILS = [
  "spoc@institution.ac.in",
  "ceo@ncieindia.org",
  "ncie.ap.gov@gmail.com",
  "vigneswarnalluri10@gmail.com"
];

export const ALLOWED_EMAILS = [
  ...ALLOWED_OFFICIAL_EMAILS,
  ...ALLOWED_INSTITUTION_EMAILS
];


