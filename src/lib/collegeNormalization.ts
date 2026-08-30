/**
 * Canonicalizes and normalizes college / institution names so that variations
 * in casing, typos, punctuation, and abbreviations are seamlessly unified into a single clean institution name.
 */
export function normalizeCollegeName(rawName?: string | null): string {
  if (!rawName) return "Other / Unspecified Institution";
  const trimmed = rawName.trim();
  const lower = trimmed.toLowerCase();

  // 1. KITS Akshar Institute of Technology
  if (lower.includes("akshar") && (lower.includes("kits") || lower.includes("technology") || lower.includes("institute"))) {
    return "KITS Akshar Institute of Technology";
  }

  // 2. KKR & KSR Institute of Technology and Sciences (all variants)
  if (
    !lower.includes("akshar") &&
    (
      (lower.includes("kkr") && (lower.includes("ksr") || lower.includes("&") || lower.includes("and") || lower.includes("tech") || lower.includes("guntur"))) ||
      (lower.includes("kits") && (lower.includes("guntur") || lower.includes("vinjanampadu") || lower.includes("kkr") || lower.includes("ksr") || !lower.includes("akshar"))) ||
      lower.includes("kkr & ksr") ||
      lower.includes("kkr and ksr")
    )
  ) {
    // If it specifically contains another known institute name, skip KKR
    if (!lower.includes("akshar") && !lower.includes("singapuram") && !lower.includes("ramtek") && !lower.includes("kakatiya")) {
      return "KKR & KSR Institute of Technology & Sciences (KITS), Guntur";
    }
  }

  // 2. D. Y. Patil Deemed to be University
  if (
    lower.includes("patil") ||
    lower.includes("d y patil") ||
    lower.includes("d.y. patil") ||
    lower.includes("d.y patil")
  ) {
    return "D Y Patil Deemed to be University, Department of Biotechnology & Bioinformatics, Navi Mumbai";
  }

  // 3. K.S.R.M. College of Engineering
  if (
    lower.includes("ksrm") ||
    lower.includes("k.s.r.m") ||
    (lower.includes("ksr") && (lower.includes("kadapa") || lower.includes("engineering")))
  ) {
    return "K.S.R.M. College of Engineering (Autonomous), Kadapa";
  }

  // 4. S.R.K. Institute of Technology
  if (
    lower.includes("srk") ||
    lower.includes("s.r.k") ||
    (lower.includes("srk") && lower.includes("technology"))
  ) {
    return "S.R.K. Institute of Technology, Vijayawada";
  }

  // 5. SRM Business School / University
  if (lower.includes("srm") || lower.includes("s.r.m")) {
    if (lower.includes("business")) {
      return "S.R.M. Business School, Lucknow";
    }
    return "SRM Institute of Science and Technology";
  }

  // 6. Sri Sivani College of Engineering
  if (lower.includes("sivani") || lower.includes("shivani")) {
    return "Sri Sivani College of Engineering, Srikakulam";
  }

  // 7. Srinivasa Ramanujan Institute of Technology
  if (lower.includes("srinivasa ramanujan") || lower.includes("srit")) {
    return "Srinivasa Ramanujan Institute of Technology (SRIT), Anantapur";
  }

  // 8. Vidya Niketan College of Engineering
  if (lower.includes("vidya niketan")) {
    return "Vidya Niketan College of Engineering";
  }

  // Generic formatting for other colleges:
  if (trimmed === trimmed.toUpperCase() || trimmed === trimmed.toLowerCase()) {
    const acronyms = new Set(["IIT", "NIT", "IIIT", "AIIMS", "BITS", "KITS", "SRIT", "KSRM", "SRK", "SRM", "CSE", "ECE", "EEE", "IT", "MBA", "BTECH", "MTECH"]);
    const words = trimmed.toLowerCase().split(/\s+/);
    return words
      .map((w) => {
        const upper = w.toUpperCase();
        if (acronyms.has(upper)) return upper;
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  return trimmed.replace(/\s+/g, " ");
}
