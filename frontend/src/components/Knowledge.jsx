import React, { useState, useEffect } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const WA_NUMBER = '917827225372'

const DEFAULT_ARTICLES = [
  {
    id: 'art-1',
    cat: 'GST',
    catColor: '#16a34a',
    date: '15 Nov 2026',
    title: 'GSTR-9 & 9C Annual Return FY 2025–26: Complete Filing Checklist',
    excerpt: 'Step-by-step reconciliation guide for turnover reconciliation, ITC mismatch rectification, and avoidance of late fee penalties.',
    content: `The Goods and Services Tax Network (GSTN) has enabled tables for filing Form GSTR-9 (Annual Return) and Form GSTR-9C (Reconciliation Statement) for Financial Year 2025-26.

Key Verification Checkpoints:
1. Turnover Reconciliation: Ensure values declared in GSTR-1 match the audited Financial Statements and Table 5 of GSTR-9.
2. Input Tax Credit (ITC): Review Table 8A auto-populated from GSTR-2B against ITC availed in GSTR-3B Table 4(A). Any unavailed credit from the preceding year must be accounted for appropriately.
3. RCM Liability: Verify reverse charge liability on legal services, director remuneration, and goods transport agency (GTA) payments.
4. Late Fee Structure: Late fees under Section 47 stand at ₹50 per day (₹25 CGST + ₹25 SGST) for taxpayers with turnover up to ₹5 Crores, capped at 0.04% of turnover.

Recommendation:
Conduct an early dry-run reconciliation before the statutory deadline to prevent system bottlenecks and penalty notices under Section 73/74.`,
    author: 'CA Operations Desk',
    accentColor: '#1DB954'
  },
  {
    id: 'art-2',
    cat: 'Income Tax',
    catColor: '#2563eb',
    date: '14 Nov 2026',
    title: 'Section 80G & 12A Re-registration: Vital Compliance for Trusts & NGOs',
    excerpt: 'Updated eligibility, document dossier, and 5-year renewal mandate for Charitable Trusts claiming income tax exemptions.',
    content: `Charitable and religious trusts operating in India must hold active registrations under Section 12A/12AB and Section 80G of the Income Tax Act, 1961 to retain their tax-exempt status and allow donor tax deductions.

Crucial Provisions for 2026:
1. Provisional vs. Regular Registration: Newly established NGOs receive provisional registration valid for 3 years. They must apply for regular registration at least 6 months prior to expiry or within 6 months of commencing activities.
2. Form 10BD Mandate: Trusts must file annual statement of donations in Form 10BD by 31st May following each financial year. Failure to file attracts ₹200 per day penalty under Section 234G.
3. Accumulation of Income: Form 10 must be filed electronically if the trust cannot spend 85% of its income within the financial year.

Cloud Ledger assists non-profits nationwide in drafting audit reports (Form 10B/10BB) and handling scrutiny proceedings.`,
    author: 'Direct Tax Advisory Team',
    accentColor: '#3b82f6'
  },
  {
    id: 'art-3',
    cat: 'Company Law',
    catColor: '#d97706',
    date: '13 Nov 2026',
    title: 'Pvt Ltd vs OPC vs LLP: Structure Evaluation & Compliance Burden in 2026',
    excerpt: 'Strategic breakdown of statutory compliance costs, foreign investment (FDI) eligibility, founder liability, and fundraising scalability.',
    content: `Selecting the right legal vehicle is fundamental when establishing a business in India. Here is how the top three corporate structures compare:

1. Private Limited Company:
• Best For: Tech startups, VC-backed enterprises, companies seeking investor equity.
• Minimum Requirements: 2 Directors, 2 Shareholders.
• Compliance: Statutory audit mandatory regardless of turnover; annual filing via AOC-4 & MGT-7; Board meetings quarterly.
• Advantage: High investor credibility, employee stock options (ESOPs), and limited liability protection.

2. Limited Liability Partnership (LLP):
• Best For: Professional consultancies, boutique agencies, family businesses.
• Minimum Requirements: 2 Designated Partners.
• Compliance: Audit mandatory only if turnover exceeds ₹40 Lakhs or capital contribution exceeds ₹25 Lakhs; annual filing via Form 8 & Form 11.
• Advantage: No dividend distribution tax, lower operational compliance burden.

3. One Person Company (OPC):
• Best For: Solo entrepreneurs desiring a corporate identity without co-founders.
• Limitation: Must name a nominee director; can easily be converted into Private Limited upon growth.`,
    author: 'Corporate Legal Desk',
    accentColor: '#f59e0b'
  },
  {
    id: 'art-4',
    cat: 'Labour Laws',
    catColor: '#7c3aed',
    date: '12 Nov 2026',
    title: 'EPF & ESIC Compliance 2026: Contribution Rates & Monthly Calendar',
    excerpt: 'Comprehensive HR compliance roadmap covering wage ceiling limits, electronic Challan-cum-Return (ECR) deadlines, and inspections.',
    content: `Maintaining clean payroll compliance prevents penal damages under Section 14B of the EPF & MP Act, 1952.

Statutory Deadlines:
• EPF ECR Filing: 15th of every calendar month.
• ESIC Monthly Contribution: 15th of every calendar month.
• Professional Tax (PT): End of the month (state-specific).

Key Calculation Benchmarks:
1. EPF: Employer (12% of basic wage + DA, capped at ₹15,000 unless voluntary) and Employee (12%).
2. ESIC: Applies to establishments with 10+ employees earning up to ₹21,000 per month. Employer rate: 3.25%, Employee rate: 0.75%.

Cloud Ledger provides automated monthly reconciliation to ensure challans are generated and remitted before statutory midnight cutoffs.`,
    author: 'Labour & Payroll Compliance Desk',
    accentColor: '#8b5cf6'
  },
  {
    id: 'art-5',
    cat: 'MSME',
    catColor: '#ea580c',
    date: '11 Nov 2026',
    title: 'Udyam Registration Benefits: 45-Day Payment Rule (Sec 43B(h)) & Subsidies',
    excerpt: 'How micro and small enterprises leverage Section 43B(h) for rapid buyer payment recovery, priority collateral-free bank loans, and ISO subsidies.',
    content: `Section 43B(h) of the Income Tax Act has transformed cash flow dynamics for Micro and Small enterprises registered under Udyam.

Core Advantages of Active Udyam Status:
1. Sec 43B(h) Protection: Buyers must settle supplier invoices within 15 days (or max 45 days under written agreement). Failure to pay disallows the expense deduction for the buyer in the current tax year.
2. Collateral-Free Loans: Priority sector lending under the CGTMSE credit guarantee scheme up to ₹5 Crores without third-party guarantee.
3. Concessional Trademark Fees: 50% government fee concession for MSME applicants filing brand marks.
4. Protection Against Delayed Payments: Access to MSME Samadhaan arbitration council with penal interest calculated at 3x RBI bank rate compounded monthly.`,
    author: 'MSME Growth Desk',
    accentColor: '#f97316'
  },
  {
    id: 'art-6',
    cat: 'Accounting',
    catColor: '#059669',
    date: '10 Nov 2026',
    title: 'Monthly Bookkeeping Protocol: 10 Steps Every Business Must Follow',
    excerpt: 'Internal control measures to maintain real-time audit-ready financial statements, bank reconciliations, and vendor ledger confirmations.',
    content: `Accurate financial books are the foundation of legal tax savings and sound business decision-making.

The 10-Step Protocol:
1. Bank & Payment Gateway Reconciliation: Match monthly statements with accounting entries.
2. Accounts Receivable Aging: Track overdue invoices and trigger follow-up reminders.
3. Vendor Ledger Scrutiny: Confirm supplier balances with statement copies.
4. Expense Categorization: Separate capital expenditures from revenue expenses.
5. Depreciation Calculations: Post monthly asset depreciation.
6. Inventory Valuation: Verify stock registers against actual warehouse physical counts.
7. Payroll Reconciliation: Confirm salary disbursements against ECR challans.
8. Tax Deducted at Source (TDS): Verify Section 194C, 194J, 194I deductions before remittance.
9. GST Output vs. GSTR-1 Match: Reconcile sales invoices with e-Invoicing portals.
10. Trial Balance Sign-off: Verify ledger balances prior to monthly book closure.`,
    author: 'Audit & Accounts Desk',
    accentColor: '#10b981'
  },
]

export default function Knowledge() {
  const [articles, setArticles]             = useState(DEFAULT_ARTICLES)
  const [selectedCat, setSelectedCat]       = useState('all')
  const [activeArticle, setActiveArticle]   = useState(null) // Modal viewing article

  // Real-time synchronization with Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'))
      const unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
          }))
          // Merge custom created articles with defaults
          setArticles(list)
        } else {
          // Check local storage fallback
          const local = JSON.parse(localStorage.getItem('cl_custom_articles') || '[]')
          if (local.length > 0) {
            setArticles([...local, ...DEFAULT_ARTICLES])
          } else {
            setArticles(DEFAULT_ARTICLES)
          }
        }
      }, (err) => {
        console.warn('Firestore articles listener notice, using local cache:', err)
        const local = JSON.parse(localStorage.getItem('cl_custom_articles') || '[]')
        if (local.length > 0) {
          setArticles([...local, ...DEFAULT_ARTICLES])
        }
      })
      return () => unsub()
    } catch (e) {
      const local = JSON.parse(localStorage.getItem('cl_custom_articles') || '[]')
      if (local.length > 0) setArticles([...local, ...DEFAULT_ARTICLES])
    }
  }, [])

  const categories = ['all', 'GST', 'Income Tax', 'Company Law', 'Labour Laws', 'MSME', 'Accounting']

  const filtered = selectedCat === 'all'
    ? articles
    : articles.filter(a => a.cat.toLowerCase().includes(selectedCat.toLowerCase()))

  const handleShareArticle = (art) => {
    const text = encodeURIComponent(
      `📌 *Daily Compliance Alert: ${art.title}*\n\n` +
      `📅 Date: ${art.date} | Category: ${art.cat}\n\n` +
      `${art.excerpt}\n\n` +
      `Read full update on Cloud Ledger: https://cloudledger.in\n` +
      `For advisory or filing help, contact CA Desk: +91 78272 25372`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
  }

  return (
    <section id="knowledge" style={{ background: '#000000', padding: '90px 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="section-badge" style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.25)', color: '#38bdf8' }}>
              <i className="fas fa-newspaper" /> Daily Regulatory Updates & Knowledge Centre
            </div>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Statutory Circulars &<br />
              <span style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Daily Compliance Briefs
              </span>
            </h2>
            <p className="section-desc" style={{ color: '#94a3b8' }}>
              Published directly by our team of Chartered Accountants, Company Secretaries, and Legal Advocates to keep your business ahead of regulatory shifts.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', padding: '6px 14px', borderRadius: 100 }}>
              ● Live Daily Feed Active
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: '8px 16px', borderRadius: 100, cursor: 'pointer',
                fontWeight: 700, fontSize: '0.8rem', transition: 'all 0.2s',
                background: selectedCat === cat ? '#1e60ff' : 'rgba(255,255,255,0.04)',
                color: selectedCat === cat ? '#ffffff' : '#94a3b8',
                boxShadow: selectedCat === cat ? '0 4px 15px rgba(30,96,255,0.4)' : 'none',
                border: selectedCat === cat ? '1px solid #1e60ff' : '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {cat === 'all' ? 'All Updates' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((art) => {
            const badgeColor = art.catColor || '#10b981'
            const barColor = art.accentColor || '#1e60ff'
            return (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                style={{
                  background: '#0d1118', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.25s', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.6)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)'
                }}
              >
                <div>
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${barColor}, #1e60ff)` }} />
                  <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                      <span style={{
                        background: `${badgeColor}20`, color: badgeColor,
                        padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase'
                      }}>
                        {art.cat}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}>
                        <i className="far fa-calendar-alt" style={{ marginRight: 4 }} />
                        {art.date}
                      </span>
                    </div>

                    <h3 style={{ fontWeight: 800, color: '#ffffff', fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                      {art.title}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.6, margin: 0 }}>
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{
                  padding: '1rem 1.5rem', background: '#090a0d', borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
                    <i className="fas fa-feather-alt" style={{ marginRight: 4, color: '#10b981' }} /> {art.author || 'CA Desk'}
                  </span>
                  <span style={{ color: '#38bdf8', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Read Complete Brief <i className="fas fa-arrow-right" style={{ fontSize: '0.7rem' }} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* ── MODAL: FULL ARTICLE READER ── */}
      {activeArticle && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
        }}>
          <div style={{
            background: '#121316', borderRadius: 20, width: '100%', maxWidth: 720, maxHeight: '88vh',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.12)'
          }}>
            {/* Modal Top Header */}
            <div style={{
              padding: '1.25rem 2rem', background: '#0d1118', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  background: 'rgba(16,185,129,0.18)', color: '#10b981',
                  padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase'
                }}>
                  {activeArticle.cat}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Published: {activeArticle.date}
                </span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.3rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, lineHeight: 1.8, color: '#cbd5e1' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, marginBottom: '1rem' }}>
                {activeArticle.title}
              </h2>

              <div style={{
                background: '#090a0d', borderLeft: '4px solid #10b981',
                padding: '12px 16px', borderRadius: '0 8px 8px 0', marginBottom: '1.5rem',
                fontSize: '0.9rem', fontStyle: 'italic', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.06)'
              }}>
                "{activeArticle.excerpt}"
              </div>

              <div style={{ fontSize: '0.92rem', whiteSpace: 'pre-line', marginBottom: '2rem', color: '#cbd5e1' }}>
                {activeArticle.content || activeArticle.excerpt}
              </div>

              <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0A1F44', fontSize: '0.85rem' }}>
                    Need professional advisory on this notification?
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Connect with our practicing Chartered Accountants on WhatsApp.
                  </div>
                </div>
                <button
                  onClick={() => handleShareArticle(activeArticle)}
                  style={{
                    background: '#25d466', color: '#060f22', border: 'none', padding: '8px 16px',
                    borderRadius: 8, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                  }}
                >
                  <i className="fab fa-whatsapp" /> Share & Inquire
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1rem 2rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Desk Author: <strong>{activeArticle.author || 'Senior CA Desk'}</strong>
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                style={{ background: '#0A1F44', color: 'white', border: 'none', padding: '8px 18px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Close Brief
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
