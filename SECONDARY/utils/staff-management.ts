export interface Staff {
  id: string
  staffNo: string

  // Personal Identification
  idType: string
  idNumber: string
  passportNumber: string
  driverLicenseNumber: string
  voterIdNumber: string
  socialSecurityNumber: string

  // Personal Information
  surname: string
  middleName: string
  firstName: string
  preferredName: string
  nationality: string
  secondNationality: string
  gender: string
  bloodGroup: string
  religion: string
  placeOfBirth: string
  countryOfBirth: string
  dateOfIssueID: string
  dateOfExpiryID: string
  digitalAddress: string
  homeAddress: string
  postalAddress: string

  // Employment Information
  rank: string
  position: string
  jobTitle: string
  department: string
  division: string
  unit: string
  residency: string
  reportingManager: string
  employmentType: string
  employmentStatus: string
  jobGrade: string
  payGrade: string
  workSchedule: string
  workLocation: string
  confirmationDate: string
  probationEndDate: string
  lastPromotionDate: string
  nextReviewDate: string
  annualLeaveEntitlementDays: number
  sickLeaveEntitlementDays: number
  maternityLeaveEntitlementDays: number
  paternityLeaveEntitlementDays: number
  studyLeaveEntitlementDays: number
  previousEmploymentHistory: string

  // Compensation & Benefits
  basicSalary: number
  allowance: number
  housingAllowance: number
  transportAllowance: number
  mealAllowance: number
  overtimeRate: number
  bonusEligible: string
  commissionEligible: string
  secondaryEmployment: string
  ssnit: string
  tier2: string
  tier3: string
  healthInsurance: string
  lifeInsurance: string

  // Employment Dates
  dateOfEmployment: string
  dateOfRetirement: string
  contractStartDate: string
  contractEndDate: string

  // Financial Information
  bankName: string
  bankAccountNumber: string
  bankBranch: string
  bankSortCode: string
  mobileMoneyProvider: string
  mobileMoneyNumber: string
  tin: string
  vatNumber: string

  // Education & Qualifications
  educationLevel: string
  majorSubject: string
  institution: string
  graduationYear: string
  professionalCertifications: string
  licenses: string
  keySkills: string
  languages: string

  // Company Assets & Resources
  companyLaptopId: string
  companyLaptopBrand: string
  companyMobileNumber: string
  companyEmailAddress: string
  companyCarDetails: string
  companyCarRegistration: string
  officeLocation: string
  deskNumber: string
  accessCardNumber: string
  uniformSize: string

  // Health & Safety
  medicalConditions: string
  allergies: string
  medications: string
  emergencyMedicalInfo: string
  bloodDonor: string
  organDonor: string

  // Personal Details
  dob: string
  age: number
  mobileNumber: string
  alternativePhone: string
  email: string
  personalEmailAddress: string
  locationAddress: string
  permanentAddress: string
  maritalStatus: string
  spouseName: string
  spouseOccupation: string
  spouseContact: string
  numberOfChildren: number
  childrenDetails: string

  // Emergency Contacts
  emergencyContact1Name: string
  emergencyContact1Relationship: string
  emergencyContact1Contact: string
  emergencyContact1Address: string
  emergencyContact2Name: string
  emergencyContact2Relationship: string
  emergencyContact2Contact: string
  emergencyContact2Address: string
  emergencyContact3Name: string
  emergencyContact3Relationship: string
  emergencyContact3Contact: string
  emergencyContact3Address: string

  // Next of Kin
  numberOfNextOfKin: number
  nextOfKin: Array<{
    id: string
    name: string
    relationship: string
    contactNumber: string
    alternativeContact: string
    address: string
    occupation: string
    employer: string
  }>

  // Performance & Development
  performanceRating: string
  lastAppraisalDate: string
  nextAppraisalDate: string
  trainingNeeds: string
  careerGoals: string
  developmentPlan: string

  // Legal & Compliance
  workPermitNumber: string
  workPermitExpiry: string
  criminalRecord: string
  references: string
  backgroundCheckDate: string

  // Additional Information
  hobbies: string
  specialSkills: string
  volunteerWork: string
  awards: string
  disciplinaryActions: string
  notes: string

  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export const initialFormData = {
  staffNo: "",
  idType: "GH. CARD NO.",
  idNumber: "",
  passportNumber: "",
  driverLicenseNumber: "",
  voterIdNumber: "",
  socialSecurityNumber: "",
  surname: "",
  middleName: "",
  firstName: "",
  preferredName: "",
  nationality: "Ghanaian",
  secondNationality: "",
  gender: "",
  bloodGroup: "",
  religion: "",
  placeOfBirth: "",
  countryOfBirth: "",
  dateOfIssueID: "",
  dateOfExpiryID: "",
  digitalAddress: "",
  homeAddress: "",
  postalAddress: "",
  rank: "",
  position: "",
  jobTitle: "",
  department: "",
  division: "",
  unit: "",
  residency: "",
  reportingManager: "",
  employmentType: "",
  employmentStatus: "",
  jobGrade: "",
  payGrade: "",
  workSchedule: "",
  workLocation: "",
  confirmationDate: "",
  probationEndDate: "",
  lastPromotionDate: "",
  nextReviewDate: "",
  annualLeaveEntitlementDays: 0,
  sickLeaveEntitlementDays: 0,
  maternityLeaveEntitlementDays: 0,
  paternityLeaveEntitlementDays: 0,
  studyLeaveEntitlementDays: 0,
  previousEmploymentHistory: "",
  basicSalary: 0,
  allowance: 0,
  housingAllowance: 0,
  transportAllowance: 0,
  mealAllowance: 0,
  overtimeRate: 0,
  bonusEligible: "NO",
  commissionEligible: "NO",
  secondaryEmployment: "NO",
  ssnit: "NO",
  tier2: "NO",
  tier3: "NO",
  healthInsurance: "NO",
  lifeInsurance: "NO",
  dateOfEmployment: "",
  dateOfRetirement: "",
  contractStartDate: "",
  contractEndDate: "",
  bankName: "",
  bankAccountNumber: "",
  bankBranch: "",
  bankSortCode: "",
  mobileMoneyProvider: "",
  mobileMoneyNumber: "",
  tin: "",
  vatNumber: "",
  educationLevel: "",
  majorSubject: "",
  institution: "",
  graduationYear: "",
  professionalCertifications: "",
  licenses: "",
  keySkills: "",
  languages: "",
  companyLaptopId: "",
  companyLaptopBrand: "",
  companyMobileNumber: "",
  companyEmailAddress: "",
  companyCarDetails: "",
  companyCarRegistration: "",
  officeLocation: "",
  deskNumber: "",
  accessCardNumber: "",
  uniformSize: "",
  medicalConditions: "",
  allergies: "",
  medications: "",
  emergencyMedicalInfo: "",
  bloodDonor: "NO",
  organDonor: "NO",
  dob: "",
  age: 0,
  mobileNumber: "",
  alternativePhone: "",
  email: "",
  personalEmailAddress: "",
  locationAddress: "",
  permanentAddress: "",
  maritalStatus: "Single",
  spouseName: "",
  spouseOccupation: "",
  spouseContact: "",
  numberOfChildren: 0,
  childrenDetails: "",
  emergencyContact1Name: "",
  emergencyContact1Relationship: "",
  emergencyContact1Contact: "",
  emergencyContact1Address: "",
  emergencyContact2Name: "",
  emergencyContact2Relationship: "",
  emergencyContact2Contact: "",
  emergencyContact2Address: "",
  emergencyContact3Name: "",
  emergencyContact3Relationship: "",
  emergencyContact3Contact: "",
  emergencyContact3Address: "",
  numberOfNextOfKin: 1,
  performanceRating: "",
  lastAppraisalDate: "",
  nextAppraisalDate: "",
  trainingNeeds: "",
  careerGoals: "",
  developmentPlan: "",
  workPermitNumber: "",
  workPermitExpiry: "",
  criminalRecord: "",
  references: "",
  backgroundCheckDate: "",
  hobbies: "",
  specialSkills: "",
  volunteerWork: "",
  awards: "",
  disciplinaryActions: "",
  notes: "",
}

export interface CSVColumn {
  key: string
  label: string
  format?: (value: any) => string
}

export function buildCSV<T extends Record<string, any>>(data: T[], columns: CSVColumn[]): string {
  if (data.length === 0) {
    return ""
  }

  const header = columns.map((col) => col.label).join(",")
  const rows = data.map((row) => {
    return columns
      .map((col) => {
        let value = row[col.key]
        if (col.format) {
          value = col.format(value)
        }
        // Basic CSV escape for commas and quotes
        if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
          value = `"${value.replace(/"/g, '""')}"`
        }
        return value
      })
      .join(",")
  })

  return [header, ...rows].join("\n")
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  if (link.download !== undefined) {
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    // Fallback for older browsers
    window.open(`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`)
  }
}

export function generateFilename(baseName: string): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  const day = now.getDate().toString().padStart(2, "0")
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  return `${baseName}-${year}${month}${day}-${hours}${minutes}.csv`
}

// Additional utility constants
export const idTypes = ["GH. CARD NO.", "PASSPORT", "DRIVER'S LICENSE", "VOTER ID", "OTHER"]
export const ranks = ["MANAGEMENT", "SENIOR STAFF", "JUNIOR STAFF", "EXPATRIATE", "OTHER"]
export const residencyOptions = ["Resident-Full-Time", "Resident-Part-Time", "Resident-Casual", "Non-Resident"]
export const yesNoOptions = ["YES", "NO"]
export const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"]
export const genderOptions = ["Male", "Female", "Other", "Prefer not to say"]
export const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"]
export const educationLevels = ["High School", "Diploma", "Bachelors", "Masters", "PhD", "Other"]
export const employmentTypes = ["Permanent", "Contract", "Temporary", "Intern", "Volunteer"]
