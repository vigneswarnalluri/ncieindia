/**
 * institutionMailbox.ts
 * Manages institution-specific mailbox generation, storage, and cross-session synchronization.
 */

export interface MailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  senderRole: string;
  senderAvatarBg: string;
  recipient: string;
  subject: string;
  snippet: string;
  body: string;
  category: "primary" | "directives" | "updates" | "grants";
  date: string;
  fullDate: string;
  read: boolean;
  starred: boolean;
  important: boolean;
  folder: "inbox" | "starred" | "snoozed" | "sent" | "drafts" | "trash";
  refNumber?: string;
  attachments?: { name: string; size: string; type: "pdf" | "doc" | "zip" }[];
}

export interface InstitutionProfile {
  name: string;
  shortName: string;
  email: string;
  spoc: string;
  aishe: string;
  city: string;
  state: string;
  grantAmount?: string;
  candidateCount?: number;
}

export const KNOWN_INSTITUTIONS: InstitutionProfile[] = [
  {
    name: "KKR & KSR Institute of Technology & Sciences (KITS), Guntur",
    shortName: "KITS Guntur",
    email: "principal@kitsguntur.ac.in",
    spoc: "Dr. P. Babu (Principal & SPOC)",
    aishe: "1-2076261",
    city: "Guntur",
    state: "Andhra Pradesh",
    grantAmount: "₹8.00 Lakhs",
  },
  {
    name: "Indian Institute of Technology Madras",
    shortName: "IIT Madras",
    email: "spoc@iitmadras.ac.in",
    spoc: "Prof. V. K. Prasad (Dean of Innovation)",
    aishe: "AISHE-U-0456",
    city: "Chennai",
    state: "Tamil Nadu",
    grantAmount: "₹10.00 Lakhs",
  },
  {
    name: "Anna University",
    shortName: "Anna University",
    email: "spoc.innovation@annauniv.edu",
    spoc: "Dr. Ananya Sharma (Chapter Coordinator)",
    aishe: "AISHE-U-0435",
    city: "Chennai",
    state: "Tamil Nadu",
    grantAmount: "₹8.50 Lakhs",
  },
  {
    name: "Birla Institute of Technology and Science, Pilani",
    shortName: "BITS Pilani",
    email: "spoc@pilani.bits-pilani.ac.in",
    spoc: "Prof. S. Chakraborthy (Head, TBI)",
    aishe: "AISHE-U-0373",
    city: "Pilani",
    state: "Rajasthan",
    grantAmount: "₹12.00 Lakhs",
  },
  {
    name: "COEP Technological University",
    shortName: "COEP Pune",
    email: "spoc@coep.ac.in",
    spoc: "Dr. Sanjay Patil (Director of Incubation)",
    aishe: "AISHE-U-0306",
    city: "Pune",
    state: "Maharashtra",
    grantAmount: "₹7.00 Lakhs",
  },
  {
    name: "National Institute of Technology Tiruchirappalli",
    shortName: "NIT Trichy",
    email: "spoc@nitt.edu",
    spoc: "Dr. M. Jayakumar (Faculty SPOC)",
    aishe: "AISHE-U-0467",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    grantAmount: "₹9.00 Lakhs",
  },
  {
    name: "Delhi Skill & Entrepreneurship University",
    shortName: "DSEU Delhi",
    email: "spoc@dseu.ac.in",
    spoc: "Prof. Ritu Grover (Dean of Entrepreneurship)",
    aishe: "AISHE-U-1154",
    city: "New Delhi",
    state: "Delhi",
    grantAmount: "₹6.00 Lakhs",
  },
  {
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    email: "spoc@iitb.ac.in",
    spoc: "Prof. Rajesh Kumar (SINE Incubation Head)",
    aishe: "AISHE-U-0305",
    city: "Mumbai",
    state: "Maharashtra",
    grantAmount: "₹15.00 Lakhs",
  },
  {
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    email: "spoc@iitd.ac.in",
    spoc: "Dr. Alok Verma (FITT Coordinator)",
    aishe: "AISHE-U-0092",
    city: "New Delhi",
    state: "Delhi",
    grantAmount: "₹14.00 Lakhs",
  },
  {
    name: "Jawaharlal Nehru Technological University Kakinada",
    shortName: "JNTU Kakinada",
    email: "spoc@jntuk.edu.in",
    spoc: "Dr. K. Srinivas (R&D Director)",
    aishe: "AISHE-U-0017",
    city: "Kakinada",
    state: "Andhra Pradesh",
    grantAmount: "₹8.00 Lakhs",
  },
];

/**
 * Generate initial mailbox messages personalized for a specific institution.
 */
export function generateInitialMailsForInstitution(
  orgName: string,
  spocName: string,
  userEmail: string,
  aisheCode?: string
): MailMessage[] {
  return [];
}

/**
 * Storage helpers to persist and retrieve mailbox data per institution
 */
export function getStorageKey(email: string): string {
  const sanitized = (email || "default_institution").toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
  return `ncie_mailbox_${sanitized}`;
}

export function loadInstitutionMails(
  userEmail: string,
  userOrg: string,
  userName: string,
  aisheCode?: string
): MailMessage[] {
  if (typeof window === "undefined") {
    return [];
  }

  const key = getStorageKey(userEmail);
  const stored = localStorage.getItem(key);

  let mails: MailMessage[] = [];
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Clean out legacy mock mail records, duplicates, and admin inquiry copies
      const seen = new Set<string>();
      mails = (Array.isArray(parsed) ? parsed : []).filter((m: MailMessage) => {
        if (!m || !m.id) return false;
        if (
          m.id.startsWith("MAIL-DIR-") ||
          m.id.startsWith("MAIL-VRF-") ||
          m.id.startsWith("MAIL-GRT-") ||
          m.id.startsWith("MAIL-HACK-") ||
          m.id.startsWith("MAIL-SENT-") ||
          m.id.startsWith("ADM-INQ-")
        ) {
          return false;
        }
        const uniqueKey = `${m.id}_${m.subject}_${m.folder}`;
        if (seen.has(uniqueKey)) return false;
        seen.add(uniqueKey);
        return true;
      });
    } catch {
      mails = [];
    }
  }

  // Synchronize any newly dispatched emails sent by Admin to this email
  try {
    const adminDispatchesRaw = localStorage.getItem("ncie_admin_dispatches");
    if (adminDispatchesRaw) {
      const adminDispatches = JSON.parse(adminDispatchesRaw);
      const matching = adminDispatches.filter((adm: any) => {
        const isSentByMe =
          (adm.senderEmail && userEmail && adm.senderEmail.toLowerCase() === userEmail.toLowerCase()) ||
          (adm.sender && userOrg && adm.sender.toLowerCase().includes(userOrg.toLowerCase()));
        if (isSentByMe) return false;

        return (
          adm.recipientEmail?.toLowerCase() === userEmail.toLowerCase() ||
          (adm.institutionName && userOrg.toLowerCase().includes(adm.institutionName.toLowerCase()))
        );
      });

      let addedCount = 0;
      matching.forEach((adm: any) => {
        if (!mails.some((m) => m.id === adm.id)) {
          mails.unshift({
            id: adm.id,
            sender: adm.sender || "NCIE Central Administrative Command",
            senderEmail: adm.senderEmail || "directorate@ncie.gov.in",
            senderRole: "Central Directorate Dispatch",
            senderAvatarBg: "bg-emerald-900",
            recipient: userEmail,
            subject: adm.subject,
            snippet: adm.snippet,
            body: adm.body,
            category: adm.category === "grants" ? "grants" : adm.category === "directives" ? "directives" : "primary",
            date: adm.date || "Just now",
            fullDate: adm.fullDate || "Today",
            read: false,
            starred: false,
            important: true,
            folder: "inbox",
            refNumber: adm.refNumber,
          });
          addedCount++;
        }
      });

      if (addedCount > 0) {
        localStorage.setItem(key, JSON.stringify(mails));
      }
    }
  } catch (err) {
    console.error("Error syncing admin dispatches to institution mailbox:", err);
  }

  // Ensure sent emails by this institution are never in inbox
  mails = mails.map((m) => {
    const isSentByMe =
      (m.senderEmail && userEmail && m.senderEmail.toLowerCase() === userEmail.toLowerCase()) ||
      (m.sender && userOrg && m.sender.toLowerCase().includes(userOrg.toLowerCase()));
    if (isSentByMe && m.folder === "inbox") {
      return { ...m, folder: "sent" as const };
    }
    return m;
  });

  return mails;
}

export function saveInstitutionMails(userEmail: string, mails: MailMessage[]): void {
  if (typeof window === "undefined") return;
  const key = getStorageKey(userEmail);
  localStorage.setItem(key, JSON.stringify(mails));
}
