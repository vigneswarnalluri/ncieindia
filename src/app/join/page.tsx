"use client";

import React, { useState, useEffect } from "react";
import { User, Landmark, Building, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Info, FileText, Check, BookOpen } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";


const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Science & Humanities",
  "Business Administration",
  "Other"
];

const STREAMS = [
  "B.Tech / B.E.",
  "M.Tech / M.E.",
  "BCA",
  "MCA",
  "B.Sc",
  "M.Sc",
  "B.Com",
  "M.Com",
  "BBA",
  "MBA",
  "Ph.D.",
  "Other"
];

const YEARS_OF_STUDY = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "Postgraduate"
];

const COLLEGES = [
  "Indian Institute of Technology (IIT), Delhi",
  "Indian Institute of Technology (IIT), Bombay",
  "Indian Institute of Technology (IIT), Madras",
  "Indian Institute of Technology (IIT), Kharagpur",
  "Indian Institute of Technology (IIT), Kanpur",
  "Indian Institute of Technology (IIT), Roorkee",
  "Indian Institute of Technology (IIT), Guwahati",
  "Indian Institute of Technology (IIT), Hyderabad",
  "Indian Institute of Science (IISc), Bangalore",
  "Birla Institute of Technology and Science (BITS), Pilani",
  "Birla Institute of Technology and Science (BITS), Hyderabad",
  "Birla Institute of Technology and Science (BITS), Goa",
  "National Institute of Technology (NIT), Trichy",
  "National Institute of Technology (NIT), Surathkal",
  "National Institute of Technology (NIT), Warangal",
  "National Institute of Technology (NIT), Calicut",
  "National Institute of Technology (NIT), Rourkela",
  "Delhi Technological University (DTU), Delhi",
  "Netaji Subhas University of Technology (NSUT), Delhi",
  "Indian Institute of Information Technology (IIIT), Allahabad",
  "Indian Institute of Information Technology (IIIT), Gwalior",
  "International Institute of Information Technology (IIIT), Hyderabad",
  "International Institute of Information Technology (IIIT), Bangalore",
  "Anna University, Chennai",
  "College of Engineering, Guindy (CEG), Chennai",
  "PSG College of Technology, Coimbatore",
  "Vellore Institute of Technology (VIT), Vellore",
  "Vellore Institute of Technology (VIT), Chennai",
  "SRM Institute of Science and Technology, Chennai",
  "Amity University, Noida",
  "Manipal Academy of Higher Education, Manipal",
  "Jadavpur University, Kolkata",
  "Banaras Hindu University (BHU), Varanasi",
  "Aligarh Muslim University (AMU), Aligarh",
  "Jamia Millia Islamia, New Delhi",
  "University of Delhi (DU), Delhi",
  "Jawaharlal Nehru University (JNU), New Delhi",
  "Savitribai Phule Pune University, Pune",
  "College of Engineering, Pune (COEP), Pune",
  "Veermata Jijabai Technological Institute (VJTI), Mumbai",
  "University of Mumbai, Mumbai",
  "Thapar Institute of Engineering and Technology, Patiala",
  "Pec University of Technology, Chandigarh",
  "Panjab University, Chandigarh",
  "Harcourt Butler Technical University (HBTU), Kanpur",
  "Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur",
  "Motilal Nehru National Institute of Technology (MNNIT), Allahabad",
  "Indian Institute of Engineering Science and Technology (IIEST), Shibpur",
  "Heritage Institute of Technology, Kolkata",
  "KIIT University, Bhubaneswar",
  "Siksha 'O' Anusandhan (SOA) University, Bhubaneswar",
  "Amrita Vishwa Vidyapeetham, Coimbatore",
  "Cochin University of Science and Technology (CUSAT), Kochi",
  "Visvesvaraya Technological University (VTU), Belagavi",
  "R.V. College of Engineering (RVCE), Bengaluru",
  "M.S. Ramaiah Institute of Technology (MSRIT), Bengaluru",
  "BMS College of Engineering (BMSCE), Bengaluru",
  "University Visvesvaraya College of Engineering (UVCE), Bengaluru",
  "Osmania University, Hyderabad",
  "Jawaharlal Nehru Technological University (JNTU), Hyderabad",
  "Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad",
  "Andhra University, Visakhapatnam",
  "Lovely Professional University (LPU), Phagwara",
  "SRM University, Sonepat",
  "Nirma University, Ahmedabad",
  "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT), Gandhinagar",
  "Pandit Deendayal Energy University (PDEU), Gandhinagar",
  "Symbiosis International University, Pune",
  "Vellore Institute of Technology (VIT), Andhra Pradesh",
  "KKR & KSR Institute of Technology & Sciences (KITS), Guntur",
  "Vasireddy Venkatadri Institute of Technology (VVIT), Guntur",
  "RVR & JC College of Engineering, Guntur",
  "Gokaraju Rangaraju Institute of Engineering and Technology (GRIET), Hyderabad",
  "VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET), Hyderabad",
  "Maturi Venkata Subba Rao (MVSR) Engineering College, Hyderabad",
  "Vasavi College of Engineering (VCE), Hyderabad",
  "PES University, Bengaluru",
  "Nitte Meenakshi Institute of Technology (NMIT), Bengaluru",
  "Sri Sivasubramaniya Nadar (SSN) College of Engineering, Chennai",
  "Sathyabama Institute of Science and Technology, Chennai",
  "PSG College of Technology, Coimbatore",
  "COEP Technological University, Pune",
  "Veermata Jijabai Technological Institute (VJTI), Mumbai",
  "K. J. Somaiya College of Engineering, Mumbai",
  "Thadomal Shahani Engineering College, Mumbai",
  "L.D. College of Engineering, Ahmedabad",
  "Dharmsinh Desai University, Nadiad",
  "Other"
];

const CITIES_BY_STATE: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool", "Rajahmundry", "Kakinada", "Kadapa", "Anantapur", "Other"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang", "Pasighat", "Ziro", "Other"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Tezpur", "Jorhat", "Nagaon", "Tinsukia", "Other"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Other"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Other"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Other"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh", "Anand", "Other"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Rohtak", "Hisar", "Sonipat", "Panchkula", "Other"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Baddi", "Other"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Other"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Tumakuru", "Shivamogga", "Other"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Alappuzha", "Kannur", "Palakkad", "Kottayam", "Other"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Other"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Navi Mumbai", "Solapur", "Kolhapur", "Amravati", "Other"],
  "Manipur": ["Imphal", "Thoubal", "Kakching", "Other"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Other"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Other"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Other"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri", "Balasore", "Other"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Other"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Other"],
  "Sikkim": ["Gangtok", "Namchi", "Geyzing", "Other"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Other"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Other"],
  "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Other"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Jhansi", "Gorakhpur", "Other"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Rudrapur", "Other"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol", "Durgapur", "Kharagpur", "Haldia", "Other"],
  "Andaman and Nicobar Islands": ["Port Blair", "Other"],
  "Chandigarh": ["Chandigarh", "Other"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa", "Other"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi", "Other"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Other"],
  "Ladakh": ["Leh", "Kargil", "Other"],
  "Lakshadweep": ["Kavaratti", "Other"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam", "Other"]
};

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

const SPECIALIZATIONS: Record<string, string[]> = {
  "Computer Science & Engineering": [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cyber Security",
    "Software Engineering",
    "Cloud Computing",
    "Internet of Things (IoT)",
    "Blockchain",
    "Other"
  ],
  "Information Technology": [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cyber Security",
    "Software Engineering",
    "Cloud Computing",
    "Internet of Things (IoT)",
    "Blockchain",
    "Other"
  ],
  "Electronics & Communication Engineering": [
    "VLSI Design",
    "Embedded Systems",
    "Robotics & Automation",
    "Signal Processing",
    "Communication Systems",
    "Other"
  ],
  "Electrical & Electronics Engineering": [
    "Power Electronics",
    "Robotics & Automation",
    "Smart Grid Technologies",
    "Renewable Energy Systems",
    "Control Systems",
    "Other"
  ],
  "Mechanical Engineering": [
    "Robotics & Automation",
    "CAD/CAM & Design",
    "Thermal Engineering",
    "Manufacturing Technologies",
    "Mechatronics",
    "Automotive Engineering",
    "Other"
  ],
  "Civil Engineering": [
    "Structural Engineering",
    "Geotechnical Engineering",
    "Transportation Engineering",
    "Environmental Engineering",
    "Construction Management",
    "Other"
  ],
  "Chemical Engineering": [
    "Nanotechnology",
    "Process Control & Safety",
    "Environmental Chemical Engineering",
    "Biochemical Engineering",
    "Other"
  ],
  "Biotechnology": [
    "Bioinformatics",
    "Genetic Engineering",
    "Bioprocess Technology",
    "Nanotechnology",
    "Other"
  ],
  "Science & Humanities": [
    "Physics / Materials Science",
    "Applied Mathematics",
    "Computational Chemistry",
    "Technical Writing / Communication",
    "Other"
  ],
  "Business Administration": [
    "Finance & Investment",
    "Marketing & Analytics",
    "Human Resource Management",
    "Operations & Supply Chain",
    "Entrepreneurship & Innovation",
    "Other"
  ],
  "Other": [
    "General Innovation",
    "Core Engineering",
    "Pure Sciences",
    "Social Entrepreneurship",
    "Other"
  ]
};

interface SearchableSelectProps {
  name: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  name,
  value,
  placeholder,
  options,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch(value);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value]);

  const filteredOptions = options.filter((opt) => {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    return normalize(opt).includes(normalize(search));
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    onChange(name, val);
    setIsOpen(true);
  };

  const handleOptionSelect = (opt: string) => {
    setSearch(opt);
    onChange(name, opt);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const isSearchLongEnough = search.trim().length >= 3;

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (!disabled) setIsOpen(true);
          }}
          disabled={disabled}
          className={`w-full px-3 py-2 pr-8 text-xs border border-zinc-350 rounded focus:outline-none focus:border-primary bg-zinc-50/50 disabled:opacity-50 disabled:cursor-not-allowed ${
            value ? "text-primary font-bold" : "text-zinc-800"
          }`}
          placeholder={placeholder}
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-zinc-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-55 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-zinc-200 rounded shadow-md text-xs">
          {!isSearchLongEnough ? (
            <div className="px-3 py-2 text-zinc-400 italic select-none">
              Please type at least 3 characters to search...
            </div>
          ) : (
            <>
              {filteredOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => handleOptionSelect(opt)}
                  className="px-3 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
                >
                  {opt}
                </div>
              ))}
              <div
                onClick={() => handleOptionSelect(search)}
                className="px-3 py-2 border-t border-zinc-150 cursor-pointer hover:bg-[#0D6B4F] hover:text-white transition-colors text-primary font-bold"
              >
                + Use "{search}" as custom name
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default function JoinPage() {
  const [step, setStep] = useState<"select" | "form" | "success">("select");
  const [role, setRole] = useState<"student" | "chapter" | "partner" | "internship">("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orgName: "",
    state: "",
    city: "",
    proposal: "",
    designation: "",
    mobile: "",
    department: "",
    specialization: "",
    stream: "",
    yearOfStudy: "",
    instType: "",
    accreditationCode: "",
    partnerCategory: "",
    regNumber: "",
    websiteUrl: "",
    selectedCourse: "",
    txnRef: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const [existingSubmission, setExistingSubmission] = useState<{
    email: string;
    orgName: string;
    regId: string;
  } | null>(null);
  const [regId, setRegId] = useState<string>("");

  const [files, setFiles] = useState<{
    consentForm: File | null;
    idCard: File | null;
    proposalRoster: File | null;
  }>({
    consentForm: null,
    idCard: null,
    proposalRoster: null,
  });

  const [collegesCache, setCollegesCache] = useState<Record<string, string[]>>({});
  const loadingLetters = React.useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (!formData.orgName) return;
    const firstChar = formData.orgName.trim().charAt(0).toLowerCase();
    const letter = (firstChar >= "a" && firstChar <= "z") ? firstChar : "other";

    if (collegesCache[letter] || loadingLetters.current[letter]) return;

    loadingLetters.current[letter] = true;
    fetch(`/colleges/${letter}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then((data: string[]) => {
        if (Array.isArray(data)) {
          setCollegesCache((prev) => ({ ...prev, [letter]: data }));
        }
      })
      .catch((err) => {
        console.error(`Failed to load colleges for letter ${letter}:`, err);
      })
      .finally(() => {
        loadingLetters.current[letter] = false;
      });
  }, [formData.orgName, collegesCache]);

  const collegeSearchLetter = formData.orgName ? formData.orgName.trim().charAt(0).toLowerCase() : "";
  const currentLetterColleges = (collegeSearchLetter >= "a" && collegeSearchLetter <= "z")
    ? collegesCache[collegeSearchLetter] || []
    : (collegeSearchLetter ? collegesCache["other"] || [] : []);

  const displayedColleges = Array.from(new Set([...COLLEGES, ...currentLetterColleges])).sort();

  useEffect(() => {
    const savedSubmission = localStorage.getItem("ncie_submission_details");
    if (savedSubmission) {
      try {
        setExistingSubmission(JSON.parse(savedSubmission));
      } catch (err) {
        localStorage.removeItem("ncie_submission_details");
      }
    }
  }, []);

  const handleRoleSelect = (selectedRole: "student" | "chapter" | "partner" | "internship") => {
    setRole(selectedRole);
    setStep("form");
    setValidationError(null);
    setFiles({ consentForm: null, idCard: null, proposalRoster: null });
    setFormData({
      fullName: "",
      email: "",
      orgName: "",
      state: "",
      city: "",
      proposal: "",
      designation: "",
      mobile: "",
      department: "",
      specialization: "",
      stream: "",
      yearOfStudy: "",
      instType: "",
      accreditationCode: "",
      partnerCategory: "",
      regNumber: "",
      websiteUrl: "",
      selectedCourse: "",
      txnRef: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get("role");
      if (roleParam === "internship") {
        handleRoleSelect("internship");
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Security: basic sanitization to strip script tags
    let sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    
    if (name === "mobile") {
      // Strip all non-digits
      sanitizedValue = sanitizedValue.replace(/\D/g, "");
      // Limit to 10 characters max
      sanitizedValue = sanitizedValue.slice(0, 10);
    }

    if (name === "department") {
      setFormData((prev) => ({ ...prev, department: sanitizedValue, specialization: "" }));
    } else if (name === "state") {
      setFormData((prev) => ({ ...prev, state: sanitizedValue, city: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    }
  };

  const handleDropdownChange = (name: string, value: string) => {
    let sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileKey: "consentForm" | "idCard" | "proposalRoster",
    allowedTypes: string[],
    maxSizeMB: number
  ) => {
    setValidationError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setFiles((prev) => ({ ...prev, [fileKey]: null }));
      return;
    }

    // 1. Enforce file size limits
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setValidationError(`Security Limit: File "${file.name}" exceeds the maximum allowance of ${maxSizeMB}MB.`);
      e.target.value = ""; // Reset file input
      setFiles((prev) => ({ ...prev, [fileKey]: null }));
      return;
    }

    // 2. Strict client-side extension check
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    const isAllowedExtension = allowedTypes.includes(extension);
    
    if (!isAllowedExtension) {
      setValidationError(`Security Alert: File type not permitted. Allowed formats: ${allowedTypes.join(", ")}`);
      e.target.value = ""; // Reset file input
      setFiles((prev) => ({ ...prev, [fileKey]: null }));
      return;
    }

    setFiles((prev) => ({ ...prev, [fileKey]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check: ensure files are selected
    if (role === "internship") {
      if (!files.proposalRoster) {
        setValidationError("Security Verification: Please upload your Resume / CV.");
        return;
      }
    } else {
      if (!files.consentForm || !files.idCard || !files.proposalRoster) {
        setValidationError("Security Verification: All required files must be uploaded before submitting.");
        return;
      }
    }

    // Security: mobile validation double-check
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(formData.mobile)) {
      setValidationError("Validation Error: Please enter a valid 10-digit mobile number.");
      return;
    }

    // Validate that city and orgName are not empty
    if (!formData.city.trim()) {
      setValidationError("Validation Error: Please specify your city.");
      return;
    }
    if ((role === "student" || role === "internship" || role === "chapter") && !formData.orgName.trim()) {
      setValidationError("Validation Error: Please specify your college or university name.");
      return;
    }
    if ((role === "student" || role === "internship") && !formData.regNumber.trim()) {
      setValidationError("Validation Error: Please specify your Roll Number / Student ID.");
      return;
    }
    if (role === "internship" && !formData.selectedCourse) {
      setValidationError("Validation Error: Please select an internship course.");
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      const generatedId = `REG-2026-${Math.floor(Math.random() * 9000) + 1000}`;

      let finalProposal = formData.proposal;
      if (role === "internship") {
        finalProposal = `Course: ${formData.selectedCourse} | SOP: ${formData.proposal}`;
      }

      // Insert registration record into Supabase
      const { error } = await supabase
        .from("registrations")
        .insert([{
          reg_id: generatedId,
          role,
          full_name: formData.fullName,
          email: formData.email,
          org_name: formData.orgName,
          state: formData.state,
          city: formData.city,
          proposal: finalProposal,
          designation: formData.designation,
          mobile: formData.mobile,
          department: formData.department,
          specialization: formData.specialization,
          stream: formData.stream,
          year_of_study: formData.yearOfStudy,
          inst_type: formData.instType,
          accreditation_code: formData.accreditationCode,
          partner_category: formData.partnerCategory,
          reg_number: formData.regNumber,
          website_url: formData.websiteUrl,
          status: "pending",
          submitted_at: new Date().toISOString(),
        }]);

      if (error) {
        // Handle duplicate email gracefully
        if (error.code === "23505") {
          setValidationError("A registration with this email already exists. Please check your inbox for the confirmation email.");
        } else {
          setValidationError(`Submission failed: ${error.message}`);
        }
        setIsSubmitting(false);
        return;
      }

      setRegId(generatedId);

      // Real-time sync to Google Sheets Webhook in background
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reg_id: generatedId,
            submitted_at: new Date().toISOString(),
            role,
            full_name: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            org_name: formData.orgName,
            reg_number: formData.regNumber,
            state: formData.state,
            city: formData.city,
            department: formData.department,
            specialization: formData.specialization,
            stream: formData.stream,
            year_of_study: formData.yearOfStudy,
            proposal: finalProposal,
            status: "pending",
          }),
          mode: "no-cors",
        }).catch((err) => console.error("Google Sheets sync failed:", err));
      }

      const submissionDetails = {
        email: formData.email,
        orgName: formData.orgName,
        regId: generatedId,
      };
      localStorage.setItem("ncie_submission_details", JSON.stringify(submissionDetails));
      setExistingSubmission(submissionDetails);
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setValidationError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex-1 bg-[#F8FAFC] py-12 md:py-16 border-t border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Progress Stepper (Government Portal Style) */}
        <div className="bg-white border border-zinc-200 rounded shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === "select" 
                  ? "bg-primary text-white" 
                  : "bg-emerald-50 text-primary border border-primary/20"
              }`}>
                {step !== "select" ? <Check className="w-3.5 h-3.5" /> : "1"}
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Step 1</p>
                <p className={`text-xs ${step === "select" ? "text-primary font-bold" : "text-zinc-650"}`}>Select Onboarding Pathway</p>
              </div>
            </div>

            <div className="hidden sm:block flex-1 h-px bg-zinc-200" />

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === "form" 
                  ? "bg-primary text-white" 
                  : step === "success" 
                    ? "bg-emerald-50 text-primary border border-primary/20" 
                    : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}>
                {step === "success" ? <Check className="w-3.5 h-3.5" /> : "2"}
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Step 2</p>
                <p className={`text-xs ${step === "form" ? "text-primary font-bold" : "text-zinc-650"}`}>Application Submission</p>
              </div>
            </div>

            <div className="hidden sm:block flex-1 h-px bg-zinc-200" />

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === "success" 
                  ? "bg-primary text-white" 
                  : "bg-zinc-100 text-zinc-400 border border-zinc-200"
              }`}>
                3
              </span>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Step 3</p>
                <p className={`text-xs ${step === "success" ? "text-primary font-bold" : "text-zinc-650"}`}>Application Verification</p>
              </div>
            </div>

          </div>
        </div>

        {/* Client-side Duplicate Block (Active Registration Warning) */}
        {existingSubmission && step !== "success" && (
          <div className="max-w-xl mx-auto text-center space-y-6 py-12 bg-white border border-zinc-200 rounded p-8 shadow-sm relative overflow-hidden animate-slide-down mb-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9A24B]" />
            
            <div className="w-12 h-12 rounded-full bg-amber-50 text-[#A68034] flex items-center justify-center mx-auto border border-accent/20 shadow-sm mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-wider">Active Registration Found</h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
                An active onboarding registration application for <span className="font-semibold text-zinc-800">{existingSubmission.orgName}</span> has already been submitted from this device under credentials:
              </p>
              <div className="pt-2">
                <span className="font-mono font-bold text-accent-dark bg-amber-50 px-4 py-1.5 rounded text-xs border border-accent/20 select-all shadow-sm">
                  {existingSubmission.regId}
                </span>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded p-4 text-left flex gap-3 text-xs text-zinc-650 leading-relaxed">
              <Info className="w-5 h-5 text-accent-dark shrink-0 mt-0.5" />
              <span>
                <strong>Submission Lock:</strong> To prevent multiple registration conflicts, resubmission under the same session is restricted. Verification updates have been queued for <strong className="text-primary">{existingSubmission.email}</strong>.
              </span>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 rounded font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-sm text-zinc-700"
                onClick={() => {
                  if (window.confirm("Warning: Resetting will clear your active local session details. Proceed?")) {
                    localStorage.removeItem("ncie_submission_details");
                    setExistingSubmission(null);
                    setRegId("");
                    setFormData({
                      fullName: "",
                      email: "",
                      orgName: "",
                      state: "",
                      city: "",
                      proposal: "",
                      designation: "",
                      mobile: "",
                      department: "",
                      specialization: "",
                      stream: "",
                      yearOfStudy: "",
                      instType: "",
                      accreditationCode: "",
                      partnerCategory: "",
                      regNumber: "",
                      websiteUrl: "",
                      selectedCourse: "",
                      txnRef: "",
                    });
                    setFiles({ consentForm: null, idCard: null, proposalRoster: null });
                    setStep("select");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                Reset &amp; Start New Registration
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Select Role */}
        {step === "select" && !existingSubmission && (
          <div className="space-y-8 animate-slide-down">
            {/* Government Seal & Official Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="flex justify-center items-center gap-1.5 text-xs font-bold tracking-widest text-[#0D6B4F] uppercase">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>National Innovation Registry</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 uppercase tracking-tight">
                Ecosystem Node Registration Portal
              </h1>
              
              <div className="h-0.5 w-24 bg-accent mx-auto" />
              
              <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                Affiliate your credentials under the National Council framework. Please choose the appropriate registry pathway below to submit your organizational details.
              </p>
            </div>

            {/* Four Pathway Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Student Innovator */}
              <div className="bg-white border border-zinc-200 border-t-4 border-t-primary rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-50 text-primary flex items-center justify-center rounded border border-primary/10">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-zinc-800 uppercase tracking-wider">
                      Student Innovator
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Registry for students seeking prototyping support, micro-grants, and pre-seed capital.
                  </p>
                  
                  <div className="pt-2 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Registry Features:</p>
                    <ul className="space-y-1.5 text-xs text-zinc-650">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Log raw research prototypes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Match with certified mentors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Apply for pre-seed grants</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                  <button
                    onClick={() => handleRoleSelect("student")}
                    className="w-full bg-primary hover:bg-[#08533d] text-white font-bold text-xs uppercase py-2.5 rounded shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Open Registry Form
                  </button>
                </div>
              </div>

              {/* Course Internship */}
              <div className="bg-white border border-zinc-200 border-t-4 border-t-[#C9A24B] rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full animate-pulse-once">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-50 text-accent-dark flex items-center justify-center rounded border border-[#C9A24B]/20">
                      <BookOpen className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-zinc-800 uppercase tracking-wider">
                      Internship Student
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Registrations for course-integrated internships under the engineering &amp; technology domain.
                  </p>
                  
                  <div className="pt-2 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Internship Features:</p>
                    <ul className="space-y-1.5 text-xs text-zinc-650">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>Select specialized course track</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>One-time registration (₹700)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>Direct placement certificate</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                  <button
                    onClick={() => handleRoleSelect("internship")}
                    className="w-full bg-[#0D6B4F] hover:bg-[#074733] text-white font-bold text-xs uppercase py-2.5 rounded shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Open Course Form
                  </button>
                </div>
              </div>

              {/* College Chapter */}
              <div className="bg-white border border-zinc-200 border-t-4 border-t-accent rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-50 text-accent-dark flex items-center justify-center rounded border border-accent/20">
                      <Landmark className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-zinc-800 uppercase tracking-wider">
                      Academic Chapter
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Official registry for university deans or college cell administrators looking to affiliate.
                  </p>
                  
                  <div className="pt-2 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Chapters Portal Access:</p>
                    <ul className="space-y-1.5 text-xs text-zinc-650">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>Establish campus Innovation Cell</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>Apply for Makerspace funding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-0.5" />
                        <span>State coordinator board voting</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                  <button
                    onClick={() => handleRoleSelect("chapter")}
                    className="w-full bg-[#111827] hover:bg-black text-white font-bold text-xs uppercase py-2.5 rounded shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Apply for Affiliation
                  </button>
                </div>
              </div>

              {/* Ecosystem Partner */}
              <div className="bg-white border border-zinc-200 border-t-4 border-t-purple-750 rounded shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-50 text-purple-700 flex items-center justify-center rounded border border-purple-100">
                      <Building className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm font-extrabold text-zinc-800 uppercase tracking-wider">
                      Ecosystem Partner
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Affiliation for corporate sponsors, venture partners, accelerators, or makerspaces.
                  </p>
                  
                  <div className="pt-2 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Partner Desktop Access:</p>
                    <ul className="space-y-1.5 text-xs text-zinc-650">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                        <span>Host national student programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                        <span>Deploy CSR sponsored briefs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                        <span>Access national innovation pool</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                  <button
                    onClick={() => handleRoleSelect("partner")}
                    className="w-full bg-[#111827] hover:bg-black text-white font-bold text-xs uppercase py-2.5 rounded shadow-sm transition-colors text-center cursor-pointer"
                  >
                    Open Partner Registry
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === "form" && (
          <div className="space-y-6 animate-slide-down">
            <button
              onClick={() => {
                setStep("select");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-600 hover:text-primary transition-colors cursor-pointer bg-white border border-zinc-200 rounded"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Registry List</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Form Details */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
                  
                  {/* Form Header */}
                  <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
                    <span className="text-[10px] font-bold text-accent-dark tracking-wider uppercase bg-white border border-zinc-200 px-2 py-0.5 rounded shadow-sm">
                      {role === "student" ? "Innovator Application" : role === "internship" ? "Course Internship Application" : role === "chapter" ? "Chapter Affiliation" : "Partner Liaison"}
                    </span>
                    <h2 className="text-base font-extrabold text-zinc-800 mt-2 uppercase tracking-wide">Nomination Entry Form</h2>
                  </div>

                  {validationError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-xs text-red-700 font-semibold mx-6 mt-4 rounded flex items-center gap-2">
                      <span className="font-bold">Error:</span>
                      <span>{validationError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    {/* Row 1: Representative Name & Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                          {role === "student" || role === "internship" ? "Full Legal Name" : role === "chapter" ? "Name of Institutional Head" : "Authorized Liaison Name"}
                        </label>
                        <input
                          name="fullName"
                          type="text"
                          maxLength={100}
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                          placeholder={role === "student" || role === "internship" ? "e.g. Sneha Sen" : role === "chapter" ? "e.g. Dr. A. K. Sharma" : "e.g. Rajesh Kumar"}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Designation / Role</label>
                        <input
                          name="designation"
                          type="text"
                          maxLength={100}
                          value={formData.designation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                          placeholder={role === "student" ? "e.g. Student Lead, Team Representative" : role === "internship" ? "e.g. Student, Graduate" : role === "chapter" ? "e.g. Principal, Dean of R&D, Registrar" : "e.g. CSR Head, Partnerships Lead"}
                          required
                        />
                      </div>
                    </div>

                    {/* Row 2: Contact Details (Email & Phone) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                          {role === "student" || role === "internship" ? "Official Email Address" : role === "chapter" ? "Official Institutional Email" : "Official Corporate Email"}
                        </label>
                        <input
                          name="email"
                          type="email"
                          maxLength={100}
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                          placeholder={role === "student" || role === "internship" ? "e.g. sneha@institute.edu.in" : role === "chapter" ? "e.g. principal@institute.edu.in" : "e.g. partnerships@corporation.com"}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">10-Digit Mobile Number</label>
                        <input
                          name="mobile"
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-xs border border-zinc-355 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                          placeholder="e.g. 9876543210"
                          required
                        />
                      </div>
                    </div>

                    {/* Row 3: Organization / Entity Details */}
                    {role === "student" || role === "internship" ? (
                      <div className="space-y-4">
                        {role === "internship" && (
                          <div className="space-y-1.5 bg-amber-50/45 border border-[#C9A24B]/20 p-4 mb-4 rounded animate-slide-down">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#A68034] block font-sans">
                              Select Internship Course <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="selectedCourse"
                              value={formData.selectedCourse}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-white text-primary font-bold cursor-pointer"
                              required
                            >
                              <option value="" className="text-zinc-500 font-sans">-- Select Course (Fee: ₹700) --</option>
                              <option value="Innovational & Technology Management" className="text-zinc-800 font-sans">
                                Innovational &amp; Technology Management (Fee: ₹700)
                              </option>
                              <option value="AI Business & Startup Innovation" className="text-zinc-800 font-sans">
                                AI Business &amp; Startup Innovation (Fee: ₹700)
                              </option>
                            </select>
                            <p className="text-[10px] text-zinc-450 leading-normal mt-1 font-sans">
                              Please select the specialized course track you want to register for in your remote internship.
                            </p>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                              College or University Name
                            </label>
                            <SearchableSelect
                              name="orgName"
                              value={formData.orgName}
                              placeholder="Type to search or enter College / University..."
                              options={displayedColleges}
                              onChange={handleDropdownChange}
                            />
                          </div>
                          <div className="space-y-1.5 sm:col-span-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                              Roll Number / Student ID
                            </label>
                            <input
                              name="regNumber"
                              type="text"
                              maxLength={50}
                              value={formData.regNumber}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                              placeholder="e.g. 21CS001"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Stream / Branch</label>
                            <select
                              name="stream"
                              value={formData.stream}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50 cursor-pointer ${
                                formData.stream ? "text-primary font-bold" : "text-zinc-500"
                              }`}
                              required
                            >
                              <option value="" className="text-zinc-500">Select Stream</option>
                              {STREAMS.map((str) => (
                                <option key={str} value={str} className="text-zinc-800">{str}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Year of Study</label>
                            <select
                              name="yearOfStudy"
                              value={formData.yearOfStudy}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50 cursor-pointer ${
                                formData.yearOfStudy ? "text-primary font-bold" : "text-zinc-500"
                              }`}
                              required
                            >
                              <option value="" className="text-zinc-500">Select Year</option>
                              {YEARS_OF_STUDY.map((year) => (
                                <option key={year} value={year} className="text-zinc-800">{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Department</label>
                            <select
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50 cursor-pointer ${
                                formData.department ? "text-primary font-bold" : "text-zinc-500"
                              }`}
                              required
                            >
                              <option value="" className="text-zinc-500">Select Department</option>
                              {DEPARTMENTS.map((dept) => (
                                <option key={dept} value={dept} className="text-zinc-800">{dept}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Specialization</label>
                            <select
                              name="specialization"
                              value={formData.specialization}
                              onChange={handleInputChange}
                              className={`w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50 cursor-pointer ${
                                formData.specialization ? "text-primary font-bold" : "text-zinc-500"
                              }`}
                              required
                            >
                              <option value="" className="text-zinc-500">Select Specialization</option>
                              {formData.department && SPECIALIZATIONS[formData.department] ? (
                                SPECIALIZATIONS[formData.department].map((spec) => (
                                  <option key={spec} value={spec} className="text-zinc-800">{spec}</option>
                                ))
                              ) : (
                                <option value="" disabled className="text-zinc-400">Please select a Department first</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                            {role === "chapter" ? "College/University Name" : "Corporation / Venture Legal Entity"}
                          </label>
                          {role === "chapter" ? (
                            <SearchableSelect
                              name="orgName"
                              value={formData.orgName}
                              placeholder="Type to search or enter College / University..."
                              options={displayedColleges}
                              onChange={handleDropdownChange}
                            />
                          ) : (
                            <input
                              name="orgName"
                              type="text"
                              maxLength={200}
                              value={formData.orgName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                              placeholder="e.g. Peak Founders or Tata Trusts"
                              required
                            />
                          )}
                        </div>
                        <div className="space-y-1.5">
                          {role === "chapter" && (
                            <>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Institution Type</label>
                              <input
                                name="instType"
                                type="text"
                                maxLength={100}
                                value={formData.instType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                                placeholder="e.g. Engineering College, State University, R&D Hub"
                                required
                              />
                            </>
                          )}
                          {role === "partner" && (
                            <>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Partner Category / Sector</label>
                              <input
                                name="partnerCategory"
                                type="text"
                                maxLength={100}
                                value={formData.partnerCategory}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                                placeholder="e.g. Venture Capital, Incubator, Accelerator, CSR Sponsor"
                                required
                              />
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Row 4: Custom specific ID / Info */}
                    {(role === "chapter" || role === "partner") && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {role === "chapter" && (
                          <div className="space-y-1.5 col-span-2 sm:col-span-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">AICTE / UGC / NAAC Code</label>
                            <input
                              name="accreditationCode"
                              type="text"
                              maxLength={100}
                              value={formData.accreditationCode}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                              placeholder="e.g. AICTE-1-12345678 or NAAC-A++"
                              required
                            />
                          </div>
                        )}
                        {role === "partner" && (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Corporate Registration (CIN / GSTIN / PAN)</label>
                              <input
                                name="regNumber"
                                type="text"
                                maxLength={100}
                                value={formData.regNumber}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                                placeholder="e.g. 27AAAAA1111A1Z1 or CIN/PAN"
                                required
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Corporate Website URL</label>
                              <input
                                name="websiteUrl"
                                type="url"
                                maxLength={150}
                                value={formData.websiteUrl}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50"
                                placeholder="e.g. https://www.corporation.com"
                                required
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* State & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">State</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50 cursor-pointer ${
                            formData.state ? "text-primary font-bold" : "text-zinc-500"
                          }`}
                          required
                        >
                          <option value="" className="text-zinc-500">Select State</option>
                          {STATES.map((st) => (
                            <option key={st} value={st} className="text-zinc-800">{st}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">City</label>
                        <SearchableSelect
                          name="city"
                          value={formData.city}
                          placeholder={formData.state ? "Type to search or enter City..." : "Please select a State first"}
                          options={formData.state ? CITIES_BY_STATE[formData.state] || [] : []}
                          onChange={handleDropdownChange}
                          disabled={!formData.state}
                        />
                      </div>
                    </div>

                    {/* Proposal / Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                        {role === "student" 
                          ? "Project Title & Abstract" 
                          : role === "internship"
                            ? "Statement of Purpose (SOP) & Learning Goals"
                            : role === "chapter" 
                              ? "Chapter Objectives & Planned Student Scope" 
                              : "Resource Support & Proposed Partnership Program"}
                      </label>
                      <textarea
                        name="proposal"
                        rows={4}
                        maxLength={2000}
                        value={formData.proposal}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-zinc-300 rounded focus:outline-none focus:border-primary bg-zinc-50/50 resize-y"
                        placeholder={
                          role === "student"
                            ? "Provide a detailed title and abstract of your innovation, prototype, or start-up concept..."
                            : role === "internship"
                              ? "Explain why you want to enroll in this internship course, your technical interests, and what you hope to achieve during the 8 weeks..."
                              : role === "chapter"
                                ? "Describe the objectives, planned student events, and laboratory/makerspace infrastructure you plan to allocate for the proposed chapter..."
                                : "Describe the resources, funding allocation, mentoring programs, or incubation physical access you plan to align with the NCIE ecosystem..."
                        }
                        required
                      />
                      <div className="flex justify-end text-[10px] text-zinc-400 font-bold select-none font-mono">
                        <span>{formData.proposal.length} / 2,000 characters</span>
                      </div>
                    </div>

                    {/* Verification Documents Upload */}
                    <div className="border-t border-zinc-200 pt-5 mt-5 space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Required Verification Documents</p>
                      
                      <div className={`grid grid-cols-1 ${role === "internship" ? "sm:grid-cols-1" : "sm:grid-cols-3"} gap-4`}>
                        
                        {/* File 1: Consent Form */}
                        {role !== "internship" && (
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#0D6B4F] block min-h-[30px]">
                              {role === "student"
                                ? "HOD Consent / Support Letter" 
                                : role === "chapter" 
                                  ? "Institutional Consent Form" 
                                  : "Partnership Intent Letter"}{"\u00A0"}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="file"
                              accept=".pdf"
                              required
                              onChange={(e) => handleFileChange(e, "consentForm", [".pdf"], 2)}
                              className="w-full text-xs text-zinc-550 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-zinc-300 file:text-[10px] file:font-semibold file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-150 cursor-pointer border border-zinc-300 bg-white p-1 rounded"
                            />
                            <span className="text-[9px] text-zinc-400 block font-medium">
                              {role === "student"
                                ? "Signed PDF by HOD (Max 2MB)" 
                                : role === "chapter" 
                                  ? "Signed & Sealed PDF by Dean/Principal (Max 2MB)" 
                                  : "Signed PDF on Corporate Letterhead (Max 2MB)"}
                            </span>
                          </div>
                        )}

                        {/* File 2: ID Card */}
                        {role !== "internship" && (
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#0D6B4F] block min-h-[30px]">
                              {role === "student"
                                ? "Student ID Card" 
                                : role === "chapter" 
                                  ? "Institutional Accreditation Certificate" 
                                  : "Certificate of Incorporation / GST"}{"\u00A0"}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              required
                              onChange={(e) => handleFileChange(
                                e, 
                                "idCard", 
                                [".jpg", ".jpeg", ".png", ".pdf"], 
                                2
                              )}
                              className="w-full text-xs text-zinc-550 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-zinc-300 file:text-[10px] file:font-semibold file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-150 cursor-pointer border border-zinc-300 bg-white p-1 rounded"
                            />
                            <span className="text-[9px] text-zinc-400 block font-medium">
                              {role === "student"
                                ? "JPEG, PNG, or PDF (Max 2MB)" 
                                : role === "chapter" 
                                  ? "PDF or Image Certificate (Max 2MB)" 
                                  : "PDF or Image Document (Max 2MB)"}
                            </span>
                          </div>
                        )}

                        {/* File 3: Proposal Roster */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#0D6B4F] block min-h-[30px]">
                            {role === "student" 
                              ? "Team Members List" 
                              : role === "internship"
                                ? "Latest Resume / CV"
                                : role === "chapter" 
                                  ? "Coordinators List" 
                                  : "Corporate Program Overview"}{"\u00A0"}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            accept={role === "partner" ? ".pdf" : ".pdf,.docx,.doc"}
                            required
                            onChange={(e) => handleFileChange(
                              e, 
                              "proposalRoster", 
                              role === "partner" ? [".pdf"] : [".pdf", ".docx", ".doc"], 
                              2
                            )}
                            className="w-full text-xs text-zinc-550 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-zinc-300 file:text-[10px] file:font-semibold file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-150 cursor-pointer border border-zinc-300 bg-white p-1 rounded"
                          />
                          <span className="text-[9px] text-zinc-400 block font-medium">
                            {role === "student" 
                              ? "PDF or DOCX (Max 2MB)" 
                              : role === "internship"
                                ? "PDF or DOCX format Resume / CV (Max 2MB)"
                                : role === "chapter" 
                                  ? "PDF or DOCX list of coordinators (Max 2MB)" 
                                  : "PDF Brochure (Max 2MB)"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Official Declaration Tick box */}
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded flex gap-2.5 items-start text-[11px] text-zinc-650">
                      <input type="checkbox" required className="mt-0.5 focus:ring-primary h-4 w-4 border-zinc-300 rounded shrink-0 cursor-pointer accent-primary" />
                      <span>
                        <strong>Under Section 4 Guidelines:</strong> I hereby declare that all details entered in this application are true, legal, and represent coordinates authorized by my affiliated academic or corporate entity.
                      </span>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full bg-[#0D6B4F] hover:bg-[#08533d] text-white font-bold text-xs uppercase py-3 rounded shadow transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                          <span>Processing Application...</span>
                        </>
                      ) : (
                        <span>Submit Nomination Form</span>
                      )}
                    </button>

                  </form>
                </div>
              </div>

              {/* Right Column: Required Documents Checklist */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Official Note */}
                <div className="bg-white border border-zinc-200 rounded p-5 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                  <div className="flex items-center gap-1.5 text-primary">
                    <Info className="w-4 h-4 shrink-0" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Onboarding Process</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Submissions are cataloged under the state registry desk. The review process takes approximately 3-5 business days. Once verified, chapter deans will receive credential keys via official mail.
                  </p>
                </div>

                {/* Required Documents */}
                <div className="bg-white border border-zinc-200 rounded p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-1.5 text-zinc-800 pb-2 border-b border-zinc-150">
                    <FileText className="w-4 h-4 text-accent-dark" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Required Documentation</h3>
                  </div>
                  <div className="space-y-3">
                    {role !== "internship" && (
                      <>
                        <div className="flex items-start gap-3 p-3 bg-zinc-50/50 border border-zinc-200/60 rounded">
                          <div className="w-7 h-7 bg-emerald-50 text-primary flex items-center justify-center shrink-0 mt-0.5 rounded border border-primary/10">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-800">
                              {role === "student" 
                                ? "HOD Consent / Support Letter" 
                                : role === "chapter" 
                                  ? "Institutional Consent Form" 
                                  : "Partnership Intent Letter"}
                            </p>
                            <span className="text-[10px] text-zinc-400 font-medium">Signed PDF</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-zinc-50/50 border border-zinc-200/60 rounded">
                          <div className="w-7 h-7 bg-amber-50 text-accent-dark flex items-center justify-center shrink-0 mt-0.5 rounded border border-accent/20">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-800">
                              {role === "student" 
                                ? "Student ID Card" 
                                : role === "chapter" 
                                  ? "Institutional Accreditation Certificate" 
                                  : "Certificate of Incorporation / GST"}
                            </p>
                            <span className="text-[10px] text-zinc-400 font-medium">
                              {role === "student" ? "JPEG / PNG / PDF" : "PDF / Image"}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 border border-zinc-200/60 rounded">
                      <div className="w-7 h-7 bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 rounded border border-purple-100">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-800">
                          {role === "student" 
                            ? "Team Members List" 
                            : role === "internship"
                              ? "Latest Resume / CV"
                              : role === "chapter" 
                                ? "Coordinators List" 
                                : "Corporate Program Overview"}
                        </p>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          {role === "partner" ? "PDF Only" : "PDF / DOCX"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === "success" && (
          <div className="max-w-xl mx-auto text-center space-y-6 py-12 bg-white border border-zinc-200 rounded p-8 shadow-sm relative overflow-hidden animate-slide-down">
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
            
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-sm mb-2">
              <CheckCircle className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-wider">Application Submitted Successfully</h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-bold text-primary">{formData.fullName}</span>. Your registration details for <span className="font-semibold text-zinc-800">{formData.orgName}</span> have been logged under registry credentials below:
              </p>
              <div className="pt-2">
                <span className="font-mono font-bold text-accent-dark bg-amber-50 px-4 py-1.5 rounded text-xs border border-accent/20 select-all shadow-sm">
                  {regId || (existingSubmission ? existingSubmission.regId : "")}
                </span>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded p-4 text-left flex gap-3 text-xs text-zinc-650 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Next Step:</strong> Our regional chapter liaison desk has received your application and uploaded verification documents. A verification confirmation reference will be sent to <strong className="text-primary">{formData.email}</strong>. The review process will take 3-5 business days, and credentials will be issued once approved.
              </span>
            </div>

            <div className="pt-4">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary hover:bg-emerald-50 rounded font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer shadow-sm"
                onClick={() => {
                  if (window.confirm("Warning: Resetting will clear your active local session details. Proceed?")) {
                    localStorage.removeItem("ncie_submission_details");
                    setExistingSubmission(null);
                    setRegId("");
                    setFormData({
                      fullName: "",
                      email: "",
                      orgName: "",
                      state: "",
                      city: "",
                      proposal: "",
                      designation: "",
                      mobile: "",
                      department: "",
                      specialization: "",
                      stream: "",
                      yearOfStudy: "",
                      instType: "",
                      accreditationCode: "",
                      partnerCategory: "",
                      regNumber: "",
                      websiteUrl: "",
                      selectedCourse: "",
                      txnRef: "",
                    });
                    setFiles({ consentForm: null, idCard: null, proposalRoster: null });
                    setStep("select");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                Start New Registration
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
