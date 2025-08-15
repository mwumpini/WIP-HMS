"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Download, Printer, Eye, Plus, Users } from "lucide-react"
import Link from "next/link"

interface StaffData {
  id?: string
  surname: string
  firstName: string
  otherNames: string
  position: string
  jobTitle: string
  department: string
  basicSalary: number
  allowances: number
  otherBenefits: Array<{ name: string; amount: number }>
  ssnit: string
  tier2: string
  tier3: string
  dateJoined: string
  isActive: boolean
  serialNumber?: number
}

interface PayrollData {
  serNo: number
  staffNo: string
  tinGhCardNo: string
  nameOfEmployee: string
  position: string
  jobTitle: string
  rank: string
  nationality: string
  residency: string
  basicSalary: string
  allowance: string
  otherBenefits: string
  grossIncome: string
  secondaryEmployment: string
  employeeSSNITContribution: string
  tier2Contribution: string
  tier3EEContribution: string
  incomeTaxPayable: string
  totalDeductions: string
  netPay: string
}

interface CompanyInfo {
  name: string
  address: string
  city: string
  region: string
  postalCode: string
  phone: string
  email: string
  taxId: string
  registrationNumber: string
  logo?: string
}

interface Authoriser {
  id: string
  name: string
  position: string
  email: string
  signature?: string
  isActive: boolean
}

// Professional Payslip Modal Component
const PayslipModal = ({
  data,
  onClose,
  payslipDate,
}: { data: PayrollData; onClose: () => void; payslipDate: string }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [authorizers, setAuthorizers] = useState<Authoriser[]>([])

  useEffect(() => {
    // Load company info and authorizers
    const storedCompanyInfo = localStorage.getItem("companyInfo")
    if (storedCompanyInfo) {
      setCompanyInfo(JSON.parse(storedCompanyInfo))
    }

    const storedAuthorizers = localStorage.getItem("companyAuthorizers")
    if (storedAuthorizers) {
      setAuthorizers(JSON.parse(storedAuthorizers))
    }
  }, [])

  const printPayslip = () => {
    const printContent = document.getElementById("payslip-content")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Payslip - ${data.nameOfEmployee}</title>
              <style>
                body { 
                  font-family: 'Arial', sans-serif; 
                  margin: 0; 
                  padding: 20px; 
                  background: white;
                  color: #333;
                  font-size: 12px;
                  line-height: 1.4;
                }
                .payslip-container {
                  max-width: 800px;
                  margin: 0 auto;
                  background: white;
                  border: 1px solid #ddd;
                }
                .header {
                  background: #f8f9fa;
                  padding: 20px;
                  text-align: center;
                  border-bottom: 2px solid #dee2e6;
                }
                .company-logo {
                  width: 60px;
                  height: 60px;
                  object-fit: contain;
                  margin: 0 auto 10px;
                }
                .company-name {
                  font-size: 20px;
                  font-weight: bold;
                  margin-bottom: 5px;
                }
                .payslip-title {
                  font-size: 18px;
                  font-weight: bold;
                  margin-top: 15px;
                }
                .serial-number {
                  font-size: 14px;
                  font-weight: bold;
                  color: #666;
                  margin-top: 10px;
                }
                .content {
                  padding: 20px;
                }
                .employee-info {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin-bottom: 20px;
                }
                .info-section {
                  border: 1px solid #dee2e6;
                  padding: 15px;
                }
                .info-section h3 {
                  font-size: 14px;
                  font-weight: bold;
                  margin-bottom: 10px;
                  border-bottom: 1px solid #dee2e6;
                  padding-bottom: 5px;
                }
                .info-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 5px;
                }
                .info-label {
                  font-weight: 500;
                }
                .info-value {
                  font-weight: bold;
                }
                .earnings-deductions {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin-bottom: 20px;
                }
                .earnings-section, .deductions-section {
                  border: 1px solid #dee2e6;
                  padding: 15px;
                }
                .earnings-section h3 {
                  color: #28a745;
                  font-size: 14px;
                  font-weight: bold;
                  margin-bottom: 10px;
                  text-align: center;
                  border-bottom: 1px solid #28a745;
                  padding-bottom: 5px;
                }
                .deductions-section h3 {
                  color: #dc3545;
                  font-size: 14px;
                  font-weight: bold;
                  margin-bottom: 10px;
                  text-align: center;
                  border-bottom: 1px solid #dc3545;
                  padding-bottom: 5px;
                }
                .amount-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;
                  padding: 5px 0;
                  border-bottom: 1px dotted #ccc;
                }
                .amount-row:last-child {
                  border-bottom: 2px solid #333;
                  font-weight: bold;
                  margin-top: 10px;
                  padding-top: 10px;
                }
                .net-pay {
                  background: #f8f9fa;
                  border: 2px solid #333;
                  text-align: center;
                  padding: 15px;
                  margin: 20px 0;
                  font-size: 16px;
                  font-weight: bold;
                }
                .signatures {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 40px;
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #dee2e6;
                }
                .signature-box {
                  text-align: center;
                }
                .signature-line {
                  border-bottom: 1px solid #333;
                  height: 40px;
                  margin-bottom: 8px;
                  display: flex;
                  align-items: flex-end;
                  justify-content: center;
                  padding-bottom: 5px;
                }
                .signature-img {
                  max-height: 35px;
                  max-width: 120px;
                  object-fit: contain;
                }
                .footer {
                  background: #f8f9fa;
                  padding: 15px;
                  text-align: center;
                  font-size: 10px;
                  color: #666;
                  border-top: 1px solid #dee2e6;
                }
                @media print {
                  body { margin: 0; padding: 0; }
                  .payslip-container { border: none; }
                }
              </style>
            </head>
            <body>
              <div class="payslip-container">
                <div class="header">
                  ${companyInfo?.logo ? `<img src="${companyInfo.logo}" alt="Company Logo" class="company-logo">` : ""}
                  <div class="company-name">${companyInfo?.name || "Company Name"}</div>
                  <div>
                    ${companyInfo?.address || "Company Address"}<br>
                    ${companyInfo?.city || ""}, ${companyInfo?.region || ""} ${companyInfo?.postalCode || ""}<br>
                    Tel: ${companyInfo?.phone || "N/A"} | Email: ${companyInfo?.email || "N/A"}<br>
                    TIN: ${companyInfo?.taxId || "N/A"}
                  </div>
                  <div class="payslip-title">PAYSLIP</div>
                  <div class="serial-number">Serial No: ${data.serNo}</div>
                  <div>Pay Period: ${payslipDate}</div>
                </div>
                
                <div class="content">
                  <div class="employee-info">
                    <div class="info-section">
                      <h3>Employee Information</h3>
                      <div class="info-row">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${data.nameOfEmployee}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Staff No.:</span>
                        <span class="info-value">${data.staffNo}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">GH. Card No.:</span>
                        <span class="info-value">${data.tinGhCardNo}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Position:</span>
                        <span class="info-value">${data.position}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Job Title:</span>
                        <span class="info-value">${data.jobTitle}</span>
                      </div>
                    </div>
                    
                    <div class="info-section">
                      <h3>Employment Details</h3>
                      <div class="info-row">
                        <span class="info-label">Nationality:</span>
                        <span class="info-value">${data.nationality}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Residency:</span>
                        <span class="info-value">${data.residency}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Pay Period:</span>
                        <span class="info-value">${payslipDate}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Secondary Employment:</span>
                        <span class="info-value">${data.secondaryEmployment}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="earnings-deductions">
                    <div class="earnings-section">
                      <h3>EARNINGS</h3>
                      <div class="amount-row">
                        <span>Basic Salary:</span>
                        <span>GHS ${Number.parseFloat(data.basicSalary).toLocaleString()}</span>
                      </div>
                      <div class="amount-row">
                        <span>Allowance:</span>
                        <span>GHS ${Number.parseFloat(data.allowance).toLocaleString()}</span>
                      </div>
                      <div class="amount-row">
                        <span>Other Benefits:</span>
                        <span>GHS ${Number.parseFloat(data.otherBenefits).toLocaleString()}</span>
                      </div>
                      <div class="amount-row">
                        <span>GROSS INCOME:</span>
                        <span>GHS ${Number.parseFloat(data.grossIncome).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div class="deductions-section">
                      <h3>DEDUCTIONS</h3>
                      <div class="amount-row">
                        <span>Employee SSNIT (5.5%):</span>
                        <span>GHS ${Number.parseFloat(data.employeeSSNITContribution).toLocaleString()}</span>
                      </div>
                      <div class="amount-row">
                        <span>Tier 2 (5%):</span>
                        <span>GHS ${Number.parseFloat(data.tier2Contribution).toLocaleString()}</span>
                      </div>
                      <div class="amount-row">
                        <span>Employee Tier 3:</span>
                        <span>GHS ${Number.parseFloat(data.tier3EEContribution).toLocaleString()}</span>
                      </div>
                      <div class="amount-row">
                        <span>PAYE (Income Tax):</span>
                        <span>GHS ${Number.parseFloat(data.incomeTaxPayable).toLocaleString()}</span>
                      </div>
                      <div class="amount-row">
                        <span>TOTAL DEDUCTIONS:</span>
                        <span>GHS ${Number.parseFloat(data.totalDeductions).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="net-pay">
                    NET PAY: GHS ${Number.parseFloat(data.netPay).toLocaleString()}
                  </div>
                  
                  <div class="signatures">
                    <div class="signature-box">
                      <div class="signature-line"></div>
                      <div style="font-weight: bold; margin-bottom: 3px;">${data.nameOfEmployee}</div>
                      <div style="font-size: 10px;">Employee Signature & Date</div>
                    </div>
                    
                    <div class="signature-box">
                      <div class="signature-line">
                        ${
                          authorizers.find((auth) => auth.isActive)?.signature
                            ? `<img src="${authorizers.find((auth) => auth.isActive)?.signature}" alt="Signature" class="signature-img">`
                            : ""
                        }
                      </div>
                      <div style="font-weight: bold; margin-bottom: 3px;">
                        ${authorizers.find((auth) => auth.isActive)?.name || "Authorized Officer"}
                      </div>
                      <div style="font-size: 10px;">
                        ${authorizers.find((auth) => auth.isActive)?.position || "HR/Finance"} - Authorized Signature & Date
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="footer">
                  <div>This is a computer-generated payslip and does not require a signature.</div>
                  <div>For queries, please contact HR Department: ${companyInfo?.email || "hr@company.com"}</div>
                  <div style="margin-top: 5px; font-weight: bold;">Generated on: ${new Date().toLocaleString()}</div>
                </div>
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const activeAuthorizer = authorizers.find((auth) => auth.isActive) || authorizers[0]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div id="payslip-content" className="bg-white">
          {/* Professional Header */}
          <div className="bg-gray-50 p-6 border-b-2 border-gray-200">
            <div className="text-center">
              {companyInfo?.logo && (
                <div className="mb-4">
                  <img
                    src={companyInfo.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="h-16 w-16 mx-auto object-contain"
                  />
                </div>
              )}
              <h1 className="text-2xl font-bold mb-2">{companyInfo?.name || "Company Name"}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{companyInfo?.address || "Company Address"}</p>
                <p>
                  {companyInfo?.city && companyInfo?.region && `${companyInfo.city}, ${companyInfo.region}`}
                  {companyInfo?.postalCode && ` ${companyInfo.postalCode}`}
                </p>
                <p>
                  {companyInfo?.phone && `Tel: ${companyInfo.phone}`}
                  {companyInfo?.email && ` | Email: ${companyInfo.email}`}
                </p>
                {companyInfo?.taxId && <p>TIN: {companyInfo.taxId}</p>}
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold">PAYSLIP</h2>
                <p className="text-sm font-bold text-gray-700">Serial No: {data.serNo}</p>
                <p className="text-sm text-gray-600">Pay Period: {payslipDate}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Employee Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 p-4">
                <h3 className="text-sm font-bold mb-3 border-b border-gray-200 pb-2">Employee Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-semibold">{data.nameOfEmployee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Staff No.:</span>
                    <span className="font-semibold">{data.staffNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GH. Card No.:</span>
                    <span className="font-semibold">{data.tinGhCardNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Position:</span>
                    <span className="font-semibold">{data.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Job Title:</span>
                    <span className="font-semibold">{data.jobTitle}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 p-4">
                <h3 className="text-sm font-bold mb-3 border-b border-gray-200 pb-2">Employment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nationality:</span>
                    <span className="font-semibold">{data.nationality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Residency:</span>
                    <span className="font-semibold">{data.residency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pay Period:</span>
                    <span className="font-semibold">{payslipDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secondary Employment:</span>
                    <span className="font-semibold">{data.secondaryEmployment}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings and Deductions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-green-700 mb-3 text-center border-b border-green-200 pb-2">
                  EARNINGS
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Basic Salary:</span>
                    <span className="font-semibold">GHS {Number.parseFloat(data.basicSalary).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Allowance:</span>
                    <span className="font-semibold">GHS {Number.parseFloat(data.allowance).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Other Benefits:</span>
                    <span className="font-semibold">GHS {Number.parseFloat(data.otherBenefits).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t-2 border-green-400 font-bold text-green-700">
                    <span>GROSS INCOME:</span>
                    <span>GHS {Number.parseFloat(data.grossIncome).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-red-700 mb-3 text-center border-b border-red-200 pb-2">
                  DEDUCTIONS
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Employee SSNIT (5.5%):</span>
                    <span className="font-semibold">
                      GHS {Number.parseFloat(data.employeeSSNITContribution).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Tier 2 (5%):</span>
                    <span className="font-semibold">
                      GHS {Number.parseFloat(data.tier2Contribution).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Employee Tier 3:</span>
                    <span className="font-semibold">
                      GHS {Number.parseFloat(data.tier3EEContribution).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>PAYE (Income Tax):</span>
                    <span className="font-semibold">
                      GHS {Number.parseFloat(data.incomeTaxPayable).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-t-2 border-red-400 font-bold text-red-700">
                    <span>TOTAL DEDUCTIONS:</span>
                    <span>GHS {Number.parseFloat(data.totalDeductions).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="bg-gray-50 border-2 border-gray-300 p-4 text-center mb-6">
              <h3 className="text-lg font-bold">NET PAY: GHS {Number.parseFloat(data.netPay).toLocaleString()}</h3>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="border-b border-gray-400 mb-3 h-12 flex items-end justify-center pb-1">
                  <span className="text-gray-400 text-xs">Employee Signature</span>
                </div>
                <div className="font-semibold">{data.nameOfEmployee}</div>
                <div className="text-xs text-gray-600">Employee - Date: ________________</div>
              </div>

              <div className="text-center">
                <div className="border-b border-gray-400 mb-3 h-12 flex items-end justify-center pb-1">
                  {activeAuthorizer?.signature ? (
                    <img
                      src={activeAuthorizer.signature || "/placeholder.svg"}
                      alt="Signature"
                      className="max-h-10 max-w-24 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Authorized Signature</span>
                  )}
                </div>
                <div className="font-semibold">{activeAuthorizer?.name || "Authorized Officer"}</div>
                <div className="text-xs text-gray-600">
                  {activeAuthorizer?.position || "HR/Finance"} - Date: ________________
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-600 bg-gray-50 p-3">
              <p className="font-semibold">This is a computer-generated payslip and does not require a signature.</p>
              <p>For queries, please contact HR Department: {companyInfo?.email || "hr@company.com"}</p>
              <p className="mt-1 font-semibold">Generated on: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50">
          <Button onClick={printPayslip} className="bg-blue-600 hover:bg-blue-700">
            <Printer className="mr-2 h-4 w-4" />
            Print Payslip
          </Button>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function PayrollPage() {
  const [staffData, setStaffData] = useState<StaffData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "serNo", direction: "asc" })
  const [showPayslipModal, setShowPayslipModal] = useState(false)
  const [payslipData, setPayslipData] = useState<PayrollData | null>(null)

  useEffect(() => {
    // Load staff data from payrollStaff localStorage and assign serial numbers
    const storedStaff = JSON.parse(localStorage.getItem("payrollStaff") || "[]")
    const staffWithSerialNumbers = storedStaff.map((staff: StaffData, index: number) => ({
      ...staff,
      serialNumber: index + 1,
    }))
    setStaffData(staffWithSerialNumbers)
  }, [])

  const formatCurrency = (amount: number) => {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  }

  // Function to calculate Ghana PAYE Income Tax
  const calculateGhanaPAYE = (taxableIncome: number): number => {
    let tax = 0
    let remainingIncome = taxableIncome

    // Ghana PAYE Tax Bands for 2024 (Monthly)
    const bands = [
      { limit: 490.0, rate: 0.0 }, // First GHS 490 @ 0%
      { limit: 110.0, rate: 0.05 }, // Next GHS 110 @ 5%
      { limit: 130.0, rate: 0.1 }, // Next GHS 130 @ 10%
      { limit: 3166.67, rate: 0.175 }, // Next GHS 3,166.67 @ 17.5%
      { limit: 16000.0, rate: 0.25 }, // Next GHS 16,000 @ 25%
      { limit: 30520.0, rate: 0.3 }, // Next GHS 30,520 @ 30%
      { limit: Number.POSITIVE_INFINITY, rate: 0.35 }, // Exceeding @ 35%
    ]

    for (const band of bands) {
      if (remainingIncome <= 0) break
      const taxableAmountInBand = Math.min(remainingIncome, band.limit)
      tax += taxableAmountInBand * band.rate
      remainingIncome -= taxableAmountInBand
    }

    return tax
  }

  // Data for Payroll (PAYE) Report
  const getPAYEReportData = (): PayrollData[] => {
    return staffData.map((staff, index) => {
      const basicSalary = Number.parseFloat(staff.basicSalary?.toString()) || 0
      const allowance = Number.parseFloat(staff.allowances?.toString()) || 0
      const otherBenefitsTotal =
        staff.otherBenefits?.reduce((sum, benefit) => sum + (Number.parseFloat(benefit.amount?.toString()) || 0), 0) ||
        0
      const grossIncome = basicSalary + allowance + otherBenefitsTotal

      // Deductions before tax
      const employeeSSNITRate = 0.055 // 5.5% Employee Tier 1 SSNIT contribution
      const tier2Rate = 0.05 // 5% Tier 2 contribution

      const employeeSSNITContribution = staff.ssnit === "YES" ? basicSalary * employeeSSNITRate : 0
      const tier2Contribution = staff.tier2 === "YES" ? basicSalary * tier2Rate : 0
      const tier3EmployeeRate = staff.tier3 === "YES" ? 0.02 : 0 // 2% employee Tier 3 if enrolled
      const tier3EEContribution = basicSalary * tier3EmployeeRate

      const totalMandatoryDeductionsForTax = employeeSSNITContribution + tier2Contribution

      // Taxable income
      const taxableIncome = grossIncome - totalMandatoryDeductionsForTax
      const incomeTaxPayable = calculateGhanaPAYE(taxableIncome > 0 ? taxableIncome : 0)

      const totalDeductions = employeeSSNITContribution + tier2Contribution + tier3EEContribution + incomeTaxPayable
      const netPay = grossIncome - totalDeductions

      return {
        serNo: staff.serialNumber || index + 1,
        staffNo: `STAFF${String(staff.serialNumber || index + 1).padStart(3, "0")}`,
        tinGhCardNo: `GHA-${Math.random().toString().substr(2, 9)}`,
        nameOfEmployee: `${staff.surname || ""} ${staff.firstName || ""} ${staff.otherNames || ""}`.trim() || "Unknown",
        position: staff.position || "Unknown",
        jobTitle: staff.jobTitle || "Unknown",
        rank: staff.position || "Unknown",
        nationality: "Ghanaian",
        residency: "Resident",
        basicSalary: basicSalary.toFixed(2),
        allowance: allowance.toFixed(2),
        otherBenefits: otherBenefitsTotal.toFixed(2),
        grossIncome: grossIncome.toFixed(2),
        secondaryEmployment: "NO",
        employeeSSNITContribution: employeeSSNITContribution.toFixed(2),
        tier2Contribution: tier2Contribution.toFixed(2),
        tier3EEContribution: tier3EEContribution.toFixed(2),
        incomeTaxPayable: incomeTaxPayable.toFixed(2),
        totalDeductions: totalDeductions.toFixed(2),
        netPay: netPay.toFixed(2),
      }
    })
  }

  const handleSort = (key: string) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const payrollData = getPAYEReportData()
  const filteredData = payrollData.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortConfig.key as keyof PayrollData]
    const bVal = b[sortConfig.key as keyof PayrollData]

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  const generateCSV = () => {
    if (!sortedData || sortedData.length === 0) {
      alert("No data to export.")
      return
    }

    // Load company info for header
    const companyInfo = JSON.parse(localStorage.getItem("companyInfo") || "{}")

    // Create company header
    const companyHeader = [
      `"${companyInfo.name || "Company Name"}"`,
      `"${companyInfo.address || "Company Address"}"`,
      `"${companyInfo.city || ""}, ${companyInfo.region || ""} ${companyInfo.postalCode || ""}"`,
      `"Phone: ${companyInfo.phone || "N/A"} | Email: ${companyInfo.email || "N/A"}"`,
      `"TIN: ${companyInfo.taxId || "N/A"}"`,
      `"Payroll Report - Generated on: ${new Date().toLocaleString()}"`,
      "", // Empty line
    ].join("\n")

    const header = [
      "Ser. No",
      "Staff No.",
      "TIN / GH. CARD NO.",
      "Name Of Employee",
      "Position",
      "Job Title",
      "Nationality",
      "Residency",
      "Basic Salary (GHS)",
      "Allowance (GHS)",
      "Other Benefits (GHS)",
      "Gross Income (GHS)",
      "Secondary Employment (Y/N)",
      "Employee SSNIT (GHS)",
      "Tier 2 Contribution (GHS)",
      "Employee Tier 3 (GHS)",
      "Income Tax Payable (GHS)",
      "Total Deductions (GHS)",
      "Net Pay (GHS)",
    ].join(",")

    const rows = sortedData
      .map((row) =>
        [
          row.serNo,
          row.staffNo,
          row.tinGhCardNo,
          `"${row.nameOfEmployee}"`,
          row.position,
          row.jobTitle,
          row.nationality,
          row.residency,
          row.basicSalary,
          row.allowance,
          row.otherBenefits,
          row.grossIncome,
          row.secondaryEmployment,
          row.employeeSSNITContribution,
          row.tier2Contribution,
          row.tier3EEContribution,
          row.incomeTaxPayable,
          row.totalDeductions,
          row.netPay,
        ].join(","),
      )
      .join("\n")

    const csvContent = `${companyHeader}${header}\n${rows}`
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", `payroll_paye_report_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    window.print()
  }

  const handlePrintPayslip = (staffDetail: PayrollData) => {
    setPayslipData(staffDetail)
    setShowPayslipModal(true)
  }

  const totals = sortedData.reduce(
    (acc, item) => ({
      grossIncome: acc.grossIncome + Number.parseFloat(item.grossIncome),
      totalDeductions: acc.totalDeductions + Number.parseFloat(item.totalDeductions),
      netPay: acc.netPay + Number.parseFloat(item.netPay),
    }),
    {
      grossIncome: 0,
      totalDeductions: 0,
      netPay: 0,
    },
  )

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Payroll (PAYE)</h1>
            <p className="text-gray-600">Manage payroll and PAYE calculations</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/dashboard/payroll/staff-management">
              <Plus className="mr-2 h-4 w-4" />
              Add New Staff
            </Link>
          </Button>
        </div>
      </div>

      {/* Payroll Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <Link
            href="/dashboard/payroll"
            className="border-b-2 border-emerald-500 py-2 px-1 text-sm font-medium text-emerald-600"
          >
            Payroll (PAYE)
          </Link>
          <Link
            href="/dashboard/payroll/staff-management"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Staff Management
          </Link>
          <Link
            href="/dashboard/payroll/ssnit"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            SSNIT
          </Link>
          <Link
            href="/dashboard/payroll/income-tax"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Income Tax
          </Link>
          <Link
            href="/dashboard/payroll/tier2-3"
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Tier 2 & 3 Pensions
          </Link>
        </nav>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-emerald-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Gross Income</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totals.grossIncome)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-red-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Deductions</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totals.totalDeductions)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Net Pay</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totals.netPay)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Payroll (PAYE) Report</CardTitle>
              <CardDescription>
                {sortedData.length} employee{sortedData.length !== 1 ? "s" : ""} in payroll
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payroll..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" onClick={generateCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sortedData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>No staff members found for payroll.</p>
              <p className="text-sm mt-2">Add staff members to generate payroll reports.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 cursor-pointer hover:bg-gray-50" onClick={() => handleSort("serNo")}>
                      Ser. No {sortConfig.key === "serNo" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="text-left p-3">Staff No.</th>
                    <th className="text-left p-3">TIN / GH. CARD NO.</th>
                    <th
                      className="text-left p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("nameOfEmployee")}
                    >
                      Name Of Employee{" "}
                      {sortConfig.key === "nameOfEmployee" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="text-left p-3">Position</th>
                    <th className="text-left p-3">Job Title</th>
                    <th className="text-right p-3">Basic Salary</th>
                    <th className="text-right p-3">Allowance</th>
                    <th className="text-right p-3">Other Benefits</th>
                    <th className="text-right p-3">Gross Income</th>
                    <th className="text-right p-3">Total Deductions</th>
                    <th className="text-right p-3">Net Pay</th>
                    <th className="text-center p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item) => (
                    <tr key={item.serNo} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-bold">{item.serNo}</td>
                      <td className="p-3">{item.staffNo}</td>
                      <td className="p-3">{item.tinGhCardNo}</td>
                      <td className="p-3 font-medium">{item.nameOfEmployee}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {item.position}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="text-xs">
                          {item.jobTitle}
                        </Badge>
                      </td>
                      <td className="p-3 text-right font-medium">
                        {formatCurrency(Number.parseFloat(item.basicSalary))}
                      </td>
                      <td className="p-3 text-right font-medium">
                        {formatCurrency(Number.parseFloat(item.allowance))}
                      </td>
                      <td className="p-3 text-right font-medium">
                        {formatCurrency(Number.parseFloat(item.otherBenefits))}
                      </td>
                      <td className="p-3 text-right font-medium text-emerald-600">
                        {formatCurrency(Number.parseFloat(item.grossIncome))}
                      </td>
                      <td className="p-3 text-right font-bold text-red-600">
                        {formatCurrency(Number.parseFloat(item.totalDeductions))}
                      </td>
                      <td className="p-3 text-right font-bold text-blue-600">
                        {formatCurrency(Number.parseFloat(item.netPay))}
                      </td>
                      <td className="p-3 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePrintPayslip(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold">
                    <td className="p-3" colSpan={9}>
                      TOTALS
                    </td>
                    <td className="p-3 text-right text-emerald-600">{formatCurrency(totals.grossIncome)}</td>
                    <td className="p-3 text-right text-red-600">{formatCurrency(totals.totalDeductions)}</td>
                    <td className="p-3 text-right text-blue-600">{formatCurrency(totals.netPay)}</td>
                    <td className="p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payslip Modal */}
      {showPayslipModal && payslipData && (
        <PayslipModal
          data={payslipData}
          onClose={() => setShowPayslipModal(false)}
          payslipDate={new Date().toLocaleDateString("en-GH", { year: "numeric", month: "long" })}
        />
      )}
    </div>
  )
}
