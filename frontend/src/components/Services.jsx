import React, { useState, useEffect } from 'react'
import ServiceDetailModal from './ServiceDetailModal'

const ALL_SERVICES = [
  // 1. GST & Indirect Tax (Target: 35)
  {
    title: 'GST Registration',
    category: 'gst',
    categoryName: 'GST & Indirect Taxation',
    icon: '📊',
    desc: 'New GST registration for Proprietorship, Partnership, LLP and Private Limited companies with ARN generation.',
    overview: 'Mandatory statutory registration under the CGST/SGST Act for businesses exceeding turnover thresholds or making inter-state supplies.',
    eligibility: ['Turnover > ₹40 Lakhs (Goods) / ₹20 Lakhs (Services)', 'Inter-state taxable suppliers', 'E-commerce sellers & aggregators', 'Voluntary registration for input tax credit'],
    documents: ['PAN Card & Aadhaar of Applicant / Promoters', 'Electricity Bill / Rent Agreement / NOC of premises', 'Bank Statement / Cancelled Cheque', 'Letter of Authorization / Board Resolution'],
    timeline: '3 to 7 working days (subject to GSTN officer verification and Aadhaar authentication)'
  },
  {
    title: 'GSTR-1 & GSTR-3B Monthly Filing',
    category: 'gst',
    categoryName: 'GST & Indirect Taxation',
    icon: '📋',
    desc: 'Regular monthly/quarterly outward supply (GSTR-1) and summary return (GSTR-3B) filing with 2B reconciliation.',
    overview: 'Accurate reconciliation of sales registers, tax liability computation, and maximum eligible Input Tax Credit (ITC) claiming without mismatch notices.',
    eligibility: ['All active regular GST registered entities', 'QRMP scheme enrolled taxpayers'],
    documents: ['Sales register / Invoices', 'Purchase register / GSTR-2B report from portal', 'Challan payment details if tax payable'],
    timeline: 'Monthly due dates: 11th for GSTR-1, 20th for GSTR-3B'
  },
  {
    title: 'GST Annual Return (GSTR-9 & 9C)',
    category: 'gst',
    categoryName: 'GST & Indirect Taxation',
    icon: '📅',
    desc: 'Comprehensive annual return preparation, audited financial statement reconciliation and self-certified GSTR-9C.',
    overview: 'Consolidation of all 12 monthly returns against audited books of accounts, rectifying ITC variances, and clearing spill-over credits.',
    eligibility: ['Registered taxpayers crossing ₹2 Crore turnover (GSTR-9)', 'Turnover crossing ₹5 Crore (GSTR-9C self-certified)'],
    documents: ['Audited Balance Sheet & P&L', 'Annual GSTR-1 and GSTR-3B summary reports', 'ITC reconciliation working sheets'],
    timeline: 'Due annually by 31st December following financial year'
  },
  {
    title: 'GST Departmental Notices & Litigation',
    category: 'gst',
    categoryName: 'GST & Indirect Taxation',
    icon: '⚖️',
    desc: 'Legal responses and representation for ASMT-10, DRC-01, ITC mismatch notices, and assessment proceedings.',
    overview: 'Drafting structured replies, reconciling discrepancies with supplier 2A/2B data, and defending bona fide tax positions.',
    eligibility: ['Taxpayers who have received DRC-01A, DRC-01, ASMT-10 or scrutiny summons'],
    documents: ['Copy of GST Notice received', 'Supporting invoice records and e-Way bills', 'Proof of tax payment and ledger extracts'],
    timeline: 'Filing within statutory 15 to 30 days deadline specified in notice'
  },

  // 2. Income Tax & Direct Taxation (Target: 30)
  {
    title: 'ITR Filing – Individuals & Professionals',
    category: 'tax',
    categoryName: 'Income Tax & Direct Taxation',
    icon: '💰',
    desc: 'ITR-1, ITR-2, ITR-3 & ITR-4 filing for salaried employees, consultants, doctors, lawyers and freelance professionals.',
    overview: 'Complete salary, professional fees, capital gain, and other-source income calculation with optimal deduction planning.',
    eligibility: ['Salaried individuals with taxable income > basic exemption', 'Freelancers and professionals (Section 44ADA eligible)'],
    documents: ['Form 16 / Form 16A', 'Annual Information Statement (AIS) & Form 26AS', 'Bank Statements of all accounts', 'Proof of 80C, 80D, NPS deductions'],
    timeline: 'Statutory deadline: 31st July annually (non-audit cases)'
  },
  {
    title: 'ITR Filing – Companies & LLPs',
    category: 'tax',
    categoryName: 'Income Tax & Direct Taxation',
    icon: '🏦',
    desc: 'Corporate income tax return (ITR-6) and LLP return (ITR-5) with MAT and depreciation scheduling.',
    overview: 'Statutory corporate tax computation aligning audited financial statements, disallowances under 43B, and tax credit carry-forwards.',
    eligibility: ['All active Private Limited, Public Limited companies, OPCs and LLPs'],
    documents: ['Audited Financial Statements (Balance Sheet, P&L)', 'Tax Audit Report (Form 3CA/3CB-3CD) where applicable', 'Advance tax and self-assessment challan receipts'],
    timeline: 'Statutory deadline: 31st October annually (audit cases)'
  },
  {
    title: 'TDS / TCS Returns (Form 24Q & 26Q)',
    category: 'tax',
    categoryName: 'Income Tax & Direct Taxation',
    icon: '📉',
    desc: 'Quarterly TDS return preparation, challan tagging, Form 16/16A generation and default notice resolution.',
    overview: 'Statutory deduction compliance for salary (24Q), contractor, rent, professional fee payments (26Q) and foreign payments (27Q).',
    eligibility: ['All entities possessing a TAN deducting tax under Income Tax Act'],
    documents: ['Monthly TDS challan receipts (BSR code, challan serial number)', 'Deductee-wise payment register with PAN numbers'],
    timeline: 'Quarterly due dates: 31st July, 31st Oct, 31st Jan, 31st May'
  },
  {
    title: 'Tax Audit Assistance (Section 44AB)',
    category: 'tax',
    categoryName: 'Income Tax & Direct Taxation',
    icon: '🔍',
    desc: 'Comprehensive ledger scrutiny, verification of 40A(3), 43B disallowances, and 3CD statement preparation.',
    overview: 'Meticulous documentation and audit support for businesses crossing ₹1 Cr / ₹10 Cr turnover thresholds.',
    eligibility: ['Business turnover > ₹1 Cr (Cash transactions > 5%) or > ₹10 Cr (Digital transactions > 95%)', 'Professionals gross receipts > ₹50 Lakhs'],
    documents: ['Trial Balance, General Ledger, Cash Book, Bank Books', 'Stock Registers and depreciation charts', 'TDS and GST reconciliation statements'],
    timeline: 'Statutory deadline: 30th September annually'
  },

  // 3. Company Incorporation & MCA (Target: 40)
  {
    title: 'Private Limited Company Incorporation',
    category: 'company',
    categoryName: 'Company Incorporation & MCA',
    icon: '🏢',
    desc: 'End-to-end Pvt Ltd incorporation on MCA V3 portal with RUN name approval, SPICe+ Part A & B, DIN, PAN and TAN.',
    overview: 'The gold standard business structure in India offering limited liability protection, separate legal identity, and VC/angel fundraising readiness.',
    eligibility: ['Minimum 2 Directors and 2 Shareholders (can be the same individuals)', 'At least one Indian resident director'],
    documents: ['PAN Card & Aadhaar of all Directors/Shareholders', 'Address Proof (Bank statement or electricity bill < 2 months old)', 'Registered Office Evidence (Utility bill + Rent Agreement + NOC)'],
    timeline: '5 to 10 working days (subject to MCA Registrar approval)'
  },
  {
    title: 'Limited Liability Partnership (LLP)',
    category: 'company',
    categoryName: 'Company Incorporation & MCA',
    icon: '🤝',
    desc: 'LLP registration with RUN-LLP name reservation, FiLLiP incorporation and Form 3 LLP Agreement drafting.',
    overview: 'Ideal hybrid structure combining corporate limited liability with partnership operational flexibility and lower annual ROC compliance overhead.',
    eligibility: ['Minimum 2 Designated Partners', 'At least one designated partner resident in India'],
    documents: ['PAN Card & Aadhaar of all Partners', 'Address proof and utility bill for registered office', 'Draft LLP Agreement stating capital contribution ratios'],
    timeline: '7 to 12 working days'
  },
  {
    title: 'Annual ROC Filings (AOC-4 & MGT-7)',
    category: 'company',
    categoryName: 'Company Incorporation & MCA',
    icon: '📂',
    desc: 'Statutory annual MCA returns filing including financial statements (AOC-4) and annual return (MGT-7/MGT-7A).',
    overview: 'Mandatory annual corporate reporting avoiding ₹100/day late penalty under the Companies Act 2013.',
    eligibility: ['Every incorporated Private Limited, OPC, Public company and Section 8 company'],
    documents: ['Audited Financial Statements and Auditor’s Report', 'Director’s Report with statutory disclosures', 'Notice of Annual General Meeting (AGM)'],
    timeline: 'AOC-4 within 30 days of AGM; MGT-7 within 60 days of AGM'
  },
  {
    title: 'Director KYC (DIR-3 KYC) & Secretarial',
    category: 'company',
    categoryName: 'Company Incorporation & MCA',
    icon: '👤',
    desc: 'Annual DIN verification, appointment/resignation of directors (DIR-12), registered office shifting (INC-22) and share allotment.',
    overview: 'Maintaining active DIN status and timely event-based secretarial filings to avoid MCA disqualification.',
    eligibility: ['Every individual holding an approved Director Identification Number (DIN)'],
    documents: ['Active PAN Card, Aadhaar, Passport (if held)', 'Unique personal email and mobile number for OTP authentication'],
    timeline: 'Annual DIR-3 KYC due date: 30th September'
  },

  // 4. NGO, Trust & Society (Target: 25)
  {
    title: 'Trust, Society & Section 8 NGO Setup',
    category: 'ngo',
    categoryName: 'NGO, Trust & Society',
    icon: '🌿',
    desc: 'Formation of Charitable Trusts, Societies, and Section 8 non-profit companies with MOA/Trust Deed drafting.',
    overview: 'Formalizing non-profit social initiatives, educational institutions, and healthcare missions with institutional credibility.',
    eligibility: ['Minimum 2 to 7 members depending on Trust, Society, or Section 8 structure'],
    documents: ['Identity & address proof of founders/trustees', 'Registered office ownership / NOC documents', 'Charitable objectives charter & bylaws'],
    timeline: '15 to 30 working days'
  },
  {
    title: '12A & 80G Tax Exemption Certificates',
    category: 'ngo',
    categoryName: 'NGO, Trust & Society',
    icon: '🏅',
    desc: 'Provisional and regular 12A (tax exemption on NGO income) and 80G (donor tax deduction) filing on Form 10A/10AB.',
    overview: 'Essential registrations to exempt non-profit surplus from taxation and provide 50% tax deduction benefits to donors.',
    eligibility: ['Registered Trusts, Societies, and Section 8 companies engaged in bona fide charitable activities'],
    documents: ['Registration Certificate & Trust Deed', 'Audited accounts of last 3 years (for regular 12A/80G)', 'Comprehensive note on charitable activities conducted'],
    timeline: 'Provisional: 1 month; Regular: 3 to 6 months'
  },

  // 5. Accounting & Bookkeeping (Target: 25)
  {
    title: 'Monthly Bookkeeping & Ledger Maintenance',
    category: 'accounting',
    categoryName: 'Accounting & Bookkeeping',
    icon: '📒',
    desc: 'End-to-end accounting on Tally / Zoho / QuickBooks with bank reconciliation and monthly trial balance closing.',
    overview: 'Systematic double-entry recording of sales, purchases, expenses, and banking transactions giving clear financial visibility.',
    eligibility: ['All active businesses, startups, retailers and professional service firms'],
    documents: ['Monthly bank statements (PDF/Excel)', 'Sales and Purchase invoices', 'Expense bills and petty cash vouchers'],
    timeline: 'Monthly cycle closing within first 7 days of subsequent month'
  },
  {
    title: 'Financial Statements Preparation',
    category: 'accounting',
    categoryName: 'Accounting & Bookkeeping',
    icon: '📈',
    desc: 'Preparation of formal Balance Sheet, Profit & Loss account, Cash Flow statement and notes to accounts.',
    overview: 'Audit-ready financial statements prepared strictly in compliance with applicable Indian Accounting Standards (AS).',
    eligibility: ['Proprietorships, Partnerships, LLPs, Companies needing bank submissions or annual closing'],
    documents: ['Finalized Trial Balance and General Ledgers', 'Depreciation schedules and inventory valuation certificates', 'Sundry debtors and creditors confirmations'],
    timeline: '5 to 10 working days'
  },

  // 6. Audit & Assurance (Target: 20)
  {
    title: 'Internal Audit & Process Review',
    category: 'audit',
    categoryName: 'Audit & Assurance',
    icon: '🔎',
    desc: 'Risk-based internal audits, standard operating procedure (SOP) verification, and internal financial controls (IFC) testing.',
    overview: 'Independent operational appraisal evaluating revenue leakages, procurement controls, and fraud prevention mechanisms.',
    eligibility: ['Growing enterprises, manufacturing units, hospitals, educational trusts, retail chains'],
    documents: ['Existing organizational SOPs and approval matrices', 'Sample transaction vouchers across purchase, sales, and payroll', 'Asset registers and inventory records'],
    timeline: 'Quarterly or annual audit schedule'
  },
  {
    title: 'Stock & Inventory Audit Support',
    category: 'audit',
    categoryName: 'Audit & Assurance',
    icon: '📦',
    desc: 'Physical inventory verification, warehouse stock count reconciliation against ERP records, and obsolescence reporting.',
    overview: 'Mandatory verification for bank working capital limits (cash credit/overdraft) and accurate balance sheet valuation.',
    eligibility: ['Manufacturing units, wholesale distributors, retail chain outlets, e-commerce warehouses'],
    documents: ['ERP stock ledger as on cut-off date', 'Warehouse bin cards and physical count sheets', 'Goods-in-transit and supplier returns log'],
    timeline: '2 to 5 working days depending on warehouse locations'
  },

  // 7. MSME & Registrations (Target: 20)
  {
    title: 'MSME / Udyam Registration',
    category: 'msme',
    categoryName: 'MSME & Business Registrations',
    icon: '🏭',
    desc: 'Government Udyam certificate registration to unlock priority bank lending, interest subventions, and tender preferences.',
    overview: 'Official recognition under the MSMED Act unlocking statutory protection against delayed payments (Section 15/16).',
    eligibility: ['Micro (< ₹1 Cr investment & < ₹5 Cr turnover)', 'Small (< ₹10 Cr investment & < ₹50 Cr turnover)', 'Medium (< ₹50 Cr investment & < ₹250 Cr turnover)'],
    documents: ['Aadhaar number of proprietor/partner/director', 'PAN Card of business and GSTIN', 'Bank account number and IFSC code'],
    timeline: '1 to 2 working days'
  },

  // 8. Labour & HR Compliance (Target: 15)
  {
    title: 'PF & ESIC Registration and Monthly Returns',
    category: 'labour',
    categoryName: 'PF, ESIC & Labour Compliance',
    icon: '👷',
    desc: 'Employees’ Provident Fund (EPFO) and ESIC code registration, monthly ECR filing, challan payments and wage register compliance.',
    overview: 'Protecting your business against statutory labour inspections, penalties, and ensuring employee social security benefits.',
    eligibility: ['EPFO mandatory for 20+ employees; ESIC mandatory for 10+ employees with wages up to ₹21,000/month'],
    documents: ['Company PAN, Incorporation Certificate, Address Proof', 'Employee master data (Name, Aadhaar, PAN, Bank Details)', 'Monthly salary / attendance register with gross and basic pay breakdown'],
    timeline: 'Registration: 3–5 days; Monthly returns due by 15th'
  },

  // 9. Project Reports & Finance (Target: 25)
  {
    title: 'Bank Project Reports & CMA Data',
    category: 'finance',
    categoryName: 'Project Reports & Financial Modelling',
    icon: '📐',
    desc: 'Detailed Project Reports (DPR) and Credit Monitoring Arrangement (CMA) data for term loans, cash credit (CC), and CGTMSE schemes.',
    overview: 'Banker-approved financial projections, DSCR, IRR, sensitivity analysis, and break-even computations for credit sanctions.',
    eligibility: ['Businesses seeking new bank loans, working capital enhancement, or government subsidy schemes'],
    documents: ['Last 3 years audited balance sheets (if existing business)', 'Quotations for proposed machinery, plant, and civil construction', 'Promoter profile and background documentation'],
    timeline: '5 to 10 working days'
  },

  // 10. MIS & Analytics (Target: 35)
  {
    title: 'Management MIS Reports & Dashboards',
    category: 'mis',
    categoryName: 'MIS & Management Consultancy',
    icon: '📊',
    desc: 'Monthly management information system (MIS) reporting, branch-wise profitability, budget vs actual variance, and executive KPI trackers.',
    overview: 'Actionable financial intelligence designed for founders and boards to make data-driven expansion and cost-cutting decisions.',
    eligibility: ['Multi-branch businesses, retail networks, funded startups, professional service firms'],
    documents: ['Monthly financial statements & general ledgers', 'Operational unit sales and head-count metrics', 'Approved annual budget targets'],
    timeline: 'Delivered monthly within 10 days of period close'
  },

  // 11. FPO & Institutional (Target: 10)
  {
    title: 'FPO Accounting, Reporting & Compliance',
    category: 'fpo',
    categoryName: 'FPO & Institutional Services',
    icon: '🌾',
    desc: 'Specialized accounting, annual statutory filings, equity grant documentation, and NABARD / SFAC compliance for Farmer Producer Organizations.',
    overview: 'Tailored regulatory governance ensuring Farmer Producer Companies and Cooperatives remain eligible for central matching equity grants and credit guarantees.',
    eligibility: ['FPCs incorporated under Companies Act and registered Farmer Producer Cooperatives'],
    documents: ['Farmer member register and share certificates', 'Procurement and input sales register', 'Board resolutions and AGM minutes'],
    timeline: 'Ongoing monthly and statutory annual support'
  },

  // 12. Internal Controls & SOPs (Target: 15)
  {
    title: 'Internal Controls & SOP Process Mapping',
    category: 'controls',
    categoryName: 'Business Process & Internal Controls',
    icon: '⚙️',
    desc: 'Designing standard operating procedures (SOPs), delegation of authority (DOA) matrices, and cost control frameworks.',
    overview: 'Eliminating organizational bottlenecks, preventing inventory shrinkage, and standardizing procurement approvals across branches.',
    eligibility: ['Enterprises expanding to multiple locations or preparing for external investor due diligence'],
    documents: ['Existing departmental workflows and delegation charts', 'Sample vendor agreements and payment approval records'],
    timeline: '2 to 4 weeks depending on organizational scale'
  }
]

const FILTERS = [
  { key: 'all', label: 'All Services (315 Target)' },
  { key: 'gst', label: 'GST & Indirect Tax' },
  { key: 'tax', label: 'Income Tax' },
  { key: 'company', label: 'Company & MCA' },
  { key: 'accounting', label: 'Accounting' },
  { key: 'audit', label: 'Audit & Assurance' },
  { key: 'ngo', label: 'NGO & Trust' },
  { key: 'msme', label: 'MSME' },
  { key: 'finance', label: 'Project Finance' },
  { key: 'labour', label: 'Labour / PF' },
  { key: 'mis', label: 'MIS & Analytics' },
  { key: 'fpo', label: 'FPO & Agri' },
  { key: 'controls', label: 'Internal Controls' },
]

export default function Services({ onSelectService }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [visibleCount, setVisibleCount] = useState(12)

  // Listen for search events from Hero
  useEffect(() => {
    const handler = (e) => {
      setSearch(e.detail)
      setActiveFilter('all')
      setVisibleCount(12)
    }
    window.addEventListener('service-search', handler)
    return () => window.removeEventListener('service-search', handler)
  }, [])

  const filtered = ALL_SERVICES.filter(s => {
    const matchCat = activeFilter === 'all' || s.category === activeFilter
    const matchSearch = !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase()) ||
      s.categoryName.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleEnquireFromModal = (srv) => {
    if (onSelectService) {
      onSelectService(srv.categoryName || srv.title)
    }
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" style={{ background: '#f8fafc' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-badge">
              <i className="fas fa-th-large" /> Professional Service Directory
            </div>
            <h2 className="section-title">
              Statutory, Advisory &<br /><span className="accent">Corporate Services</span>
            </h2>
            <p className="section-desc">
              Explore our structured 15-category service catalogue. Click any service card to view complete applicability, required documents, step-by-step procedure and estimated timelines.
            </p>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', minWidth: 300 }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setVisibleCount(12) }}
              placeholder="Search across 315 services..."
              style={{
                width: '100%', padding: '12px 18px 12px 46px',
                border: '1.5px solid #e2e8f0', borderRadius: 12,
                fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => { setActiveFilter(f.key); setSearch(''); setVisibleCount(12) }}
              style={{
                padding: '8px 18px', borderRadius: 100, border: '1.5px solid',
                borderColor: activeFilter === f.key ? '#0A1F44' : '#e2e8f0',
                background: activeFilter === f.key ? '#0A1F44' : 'white',
                color: activeFilter === f.key ? 'white' : '#64748b',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap'
              }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8', background: 'white', borderRadius: 16 }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569' }}>No services found matching "{search}"</div>
            <div style={{ marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Try searching: GST, ITR, Incorporation, NGO, Audit, Bookkeeping</div>
            <button onClick={() => { setSearch(''); setActiveFilter('all') }}
              style={{ marginTop: '1.25rem', padding: '8px 22px', background: '#0A1F44', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filtered.slice(0, visibleCount).map((s, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: 18, padding: '1.75rem',
                  border: '1.5px solid #f1f5f9', transition: 'all 0.25s',
                  cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column',
                }}
                onClick={() => setSelectedService(s)}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(29,185,84,0.4)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.07)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#f1f5f9'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: 30, background: '#f8fafc', width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {s.icon}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#16a34a', background: 'rgba(29,185,84,0.1)', padding: '3px 10px', borderRadius: 100 }}>
                      View Details
                    </span>
                  </div>

                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
                    {s.categoryName}
                  </div>
                  <div style={{ fontWeight: 800, color: '#0A1F44', fontSize: '1rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                    {s.title}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.84rem', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>
                    {s.desc}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f8fafc', paddingTop: '1rem', marginTop: 'auto' }}>
                    <span style={{ color: '#0A1F44', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      Full Guide <i className="fas fa-arrow-right" style={{ fontSize: '0.68rem', color: '#16a34a' }} />
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>Govt Portal Aligned</span>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button onClick={() => setVisibleCount(v => v + 8)} className="btn btn-navy btn-lg">
                  <i className="fas fa-plus" /> Load More Services ({filtered.length - visibleCount} more)
                </button>
              </div>
            )}
          </>
        )}

        {/* Detailed Modal */}
        {selectedService && (
          <ServiceDetailModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            onEnquire={handleEnquireFromModal}
          />
        )}

      </div>
    </section>
  )
}
