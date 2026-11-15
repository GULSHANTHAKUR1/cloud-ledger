import React, { useState } from 'react'
import toast from 'react-hot-toast'

const WA_NUMBER = '917827225372'

export default function Calculators() {
  const [activeCalc, setActiveCalc] = useState('gst') // 'gst' | 'tax' | 'startup'

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. GST CALCULATOR STATE
  // ─────────────────────────────────────────────────────────────────────────────
  const [gstAmount, setGstAmount] = useState(25000)
  const [gstRate, setGstRate]     = useState(18)
  const [gstType, setGstType]     = useState('exclusive') // 'exclusive' (add GST) | 'inclusive' (extract GST)
  const [supplyType, setSupplyType] = useState('intra')  // 'intra' (CGST+SGST) | 'inter' (IGST)

  const numGstAmount = parseFloat(gstAmount) || 0
  let netAmount = 0
  let totalTax  = 0
  let grossAmount = 0

  if (gstType === 'exclusive') {
    netAmount   = numGstAmount
    totalTax    = (numGstAmount * gstRate) / 100
    grossAmount = netAmount + totalTax
  } else {
    grossAmount = numGstAmount
    netAmount   = (numGstAmount * 100) / (100 + gstRate)
    totalTax    = grossAmount - netAmount
  }

  const cgst = supplyType === 'intra' ? totalTax / 2 : 0
  const sgst = supplyType === 'intra' ? totalTax / 2 : 0
  const igst = supplyType === 'inter' ? totalTax : 0

  const handleShareGst = () => {
    const text = encodeURIComponent(
      `Hello Cloud Ledger! I calculated my GST on your website:\n\n` +
      `💰 Base / Entered Amount: ₹${numGstAmount.toLocaleString('en-IN')}\n` +
      `📊 GST Rate: ${gstRate}%\n` +
      `📋 Mode: ${gstType === 'exclusive' ? 'GST Exclusive (Added)' : 'GST Inclusive (Extracted)'}\n` +
      `🏢 Supply: ${supplyType === 'intra' ? 'Intra-State (CGST + SGST)' : 'Inter-State (IGST)'}\n` +
      `--------------------------------\n` +
      `💵 Net Amount: ₹${Math.round(netAmount).toLocaleString('en-IN')}\n` +
      `🧾 Total GST: ₹${Math.round(totalTax).toLocaleString('en-IN')}\n` +
      (supplyType === 'intra' ? `• CGST (50%): ₹${Math.round(cgst).toLocaleString('en-IN')}\n• SGST (50%): ₹${Math.round(sgst).toLocaleString('en-IN')}\n` : `• IGST (100%): ₹${Math.round(igst).toLocaleString('en-IN')}\n`) +
      `⭐ Total Invoice Value: ₹${Math.round(grossAmount).toLocaleString('en-IN')}\n\n` +
      `Please help me file my GST returns.`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    toast.success('Opening WhatsApp with your GST calculation!')
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. INCOME TAX CALCULATOR STATE (FY 2024-25 / 2025-26)
  // ─────────────────────────────────────────────────────────────────────────────
  const [annualIncome, setAnnualIncome] = useState(1200000)
  const [ded80C, setDed80C]             = useState(150000)
  const [ded80D, setDed80D]             = useState(25000)
  const [otherDed, setOtherDed]         = useState(50000)

  const numIncome = parseFloat(annualIncome) || 0
  const num80C    = Math.min(parseFloat(ded80C) || 0, 150000)
  const num80D    = Math.min(parseFloat(ded80D) || 0, 50000)
  const numOther  = parseFloat(otherDed) || 0

  // ── NEW REGIME CALCULATION ──
  // Standard Deduction: ₹75,000
  // Slabs:
  // 0 - 3L: Nil
  // 3L - 7L: 5%
  // 7L - 10L: 10%
  // 10L - 12L: 15%
  // 12L - 15L: 20%
  // Above 15L: 30%
  // 87A rebate: zero tax if taxable income <= 7.75L
  const newStdDed = 75000
  const newTaxable = Math.max(0, numIncome - newStdDed)
  let newTax = 0

  if (newTaxable <= 700000) {
    newTax = 0 // Full 87A rebate (effective zero tax up to 7.75L with std deduction)
  } else {
    let rem = newTaxable
    if (rem > 300000) {
      const slab1 = Math.min(rem - 300000, 400000)
      newTax += slab1 * 0.05
    }
    if (rem > 700000) {
      const slab2 = Math.min(rem - 700000, 300000)
      newTax += slab2 * 0.10
    }
    if (rem > 1000000) {
      const slab3 = Math.min(rem - 1000000, 200000)
      newTax += slab3 * 0.15
    }
    if (rem > 1200000) {
      const slab4 = Math.min(rem - 1200000, 300000)
      newTax += slab4 * 0.20
    }
    if (rem > 1500000) {
      const slab5 = rem - 1500000
      newTax += slab5 * 0.30
    }
    // Add 4% Health & Education Cess
    newTax = newTax * 1.04
  }

  // ── OLD REGIME CALCULATION ──
  // Standard Deduction: ₹50,000
  // Deductions: 80C + 80D + Other
  // Slabs:
  // 0 - 2.5L: Nil
  // 2.5L - 5L: 5%
  // 5L - 10L: 20%
  // Above 10L: 30%
  // 87A rebate: zero tax if taxable income <= 5L
  const oldStdDed = 50000
  const oldTotalDeductions = oldStdDed + num80C + num80D + numOther
  const oldTaxable = Math.max(0, numIncome - oldTotalDeductions)
  let oldTax = 0

  if (oldTaxable <= 500000) {
    oldTax = 0 // Full 87A rebate
  } else {
    let rem = oldTaxable
    if (rem > 250000) {
      const slab1 = Math.min(rem - 250000, 250000)
      oldTax += slab1 * 0.05
    }
    if (rem > 500000) {
      const slab2 = Math.min(rem - 500000, 500000)
      oldTax += slab2 * 0.20
    }
    if (rem > 1000000) {
      const slab3 = rem - 1000000
      oldTax += slab3 * 0.30
    }
    oldTax = oldTax * 1.04
  }

  const taxDifference = Math.abs(oldTax - newTax)
  const betterRegime  = newTax <= oldTax ? 'New Tax Regime' : 'Old Tax Regime'

  const handleShareTax = () => {
    const text = encodeURIComponent(
      `Hello Cloud Ledger! I compared my Income Tax options on your website:\n\n` +
      `💼 Gross Annual Income: ₹${numIncome.toLocaleString('en-IN')}\n` +
      `📊 Tax under New Regime: ₹${Math.round(newTax).toLocaleString('en-IN')}\n` +
      `📊 Tax under Old Regime: ₹${Math.round(oldTax).toLocaleString('en-IN')}\n` +
      `🏆 Recommended: ${betterRegime} (Saves ₹${Math.round(taxDifference).toLocaleString('en-IN')})\n\n` +
      `Please help me optimize my deductions and file my ITR.`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    toast.success('Opening WhatsApp with your Income Tax estimate!')
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. STARTUP INCORPORATION ESTIMATOR STATE
  // ─────────────────────────────────────────────────────────────────────────────
  const [entityType, setEntityType] = useState('pvt_ltd')
  const [directors, setDirectors]   = useState(2)
  const [addOns, setAddOns]         = useState({
    gst: true,
    msme: true,
    startupIndia: false,
    trademark: false
  })

  const basePricing = {
    pvt_ltd: { name: 'Private Limited Company', base: 6999, govt: 2000, desc: 'Ideal for tech startups seeking VC/Angel funding' },
    llp:     { name: 'Limited Liability Partnership', base: 4999, govt: 1500, desc: 'Best for professional consultancies & partners' },
    opc:     { name: 'One Person Company (OPC)', base: 5499, govt: 2000, desc: 'Corporate identity with 100% single ownership' },
    sole:    { name: 'Sole Proprietorship', base: 2499, govt: 500, desc: 'Fastest setup for individual traders and freelancers' },
  }

  const currentEntity = basePricing[entityType]
  let estimatedTotal = currentEntity.base + currentEntity.govt
  if (addOns.gst)          estimatedTotal += 1499
  if (addOns.msme)         estimatedTotal += 999
  if (addOns.startupIndia) estimatedTotal += 2999
  if (addOns.trademark)    estimatedTotal += 4999

  const toggleAddOn = (key) => setAddOns(p => ({ ...p, [key]: !p[key] }))

  const handleShareStartup = () => {
    const activeAddonsList = []
    if (addOns.gst) activeAddonsList.push('GST Registration')
    if (addOns.msme) activeAddonsList.push('MSME Udyam')
    if (addOns.startupIndia) activeAddonsList.push('Startup India Recognition')
    if (addOns.trademark) activeAddonsList.push('Trademark Application')

    const text = encodeURIComponent(
      `Hello Cloud Ledger! I estimated my business incorporation cost:\n\n` +
      `🏢 Entity Type: ${currentEntity.name}\n` +
      `👥 Directors/Partners: ${directors}\n` +
      `📦 Add-on Bundles: ${activeAddonsList.join(', ') || 'None'}\n` +
      `💵 Estimated Package: ₹${estimatedTotal.toLocaleString('en-IN')}\n\n` +
      `Please provide the documentation checklist and initiate my registration.`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    toast.success('Opening WhatsApp with your startup quotation!')
  }

  return (
    <section id="calculators" style={{ background: '#f8fafc', padding: '90px 1.5rem', borderTop: '1px solid #e2e8f0' }}>
      <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-badge" style={{ background: 'rgba(29,185,84,0.1)', color: '#17a248', borderColor: 'rgba(29,185,84,0.25)' }}>
            <i className="fas fa-calculator" /> Interactive Financial Suite
          </span>
          <h2 className="section-title">
            Smart Compliance & <span className="accent">Tax Calculators</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Instant, mathematically verified calculations tailored to the latest statutory rules, tax slabs, and government notifications.
          </p>

          {/* Calculator Switcher Pills */}
          <div style={{
            display: 'inline-flex', background: '#e2e8f0', borderRadius: 100,
            padding: 4, marginTop: '2rem', gap: 4, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <button
              onClick={() => setActiveCalc('gst')}
              style={{
                padding: '9px 22px', border: 'none', borderRadius: 100, cursor: 'pointer',
                fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s',
                background: activeCalc === 'gst' ? '#0A1F44' : 'transparent',
                color: activeCalc === 'gst' ? 'white' : '#475569',
                boxShadow: activeCalc === 'gst' ? '0 4px 12px rgba(10,31,68,0.25)' : 'none'
              }}
            >
              <i className="fas fa-percent" style={{ marginRight: 6, color: '#1DB954' }} /> GST Calculator
            </button>
            <button
              onClick={() => setActiveCalc('tax')}
              style={{
                padding: '9px 22px', border: 'none', borderRadius: 100, cursor: 'pointer',
                fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s',
                background: activeCalc === 'tax' ? '#0A1F44' : 'transparent',
                color: activeCalc === 'tax' ? 'white' : '#475569',
                boxShadow: activeCalc === 'tax' ? '0 4px 12px rgba(10,31,68,0.25)' : 'none'
              }}
            >
              <i className="fas fa-balance-scale" style={{ marginRight: 6, color: '#1DB954' }} /> Income Tax (New vs Old)
            </button>
            <button
              onClick={() => setActiveCalc('startup')}
              style={{
                padding: '9px 22px', border: 'none', borderRadius: 100, cursor: 'pointer',
                fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s',
                background: activeCalc === 'startup' ? '#0A1F44' : 'transparent',
                color: activeCalc === 'startup' ? 'white' : '#475569',
                boxShadow: activeCalc === 'startup' ? '0 4px 12px rgba(10,31,68,0.25)' : 'none'
              }}
            >
              <i className="fas fa-rocket" style={{ marginRight: 6, color: '#1DB954' }} /> Startup Cost Estimator
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            CALCULATOR 1: GST CALCULATOR
        ══════════════════════════════════════════════════════════════════════════ */}
        {activeCalc === 'gst' && (
          <div style={{
            background: 'white', borderRadius: 20, border: '1.5px solid #e2e8f0',
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)', overflow: 'hidden',
            display: 'grid', gridTemplateColumns: '1.2fr 1fr'
          }}>
            {/* Input Controls */}
            <div style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1F44', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 20, background: '#1DB954', borderRadius: 4, display: 'inline-block' }} />
                GST Parameters & Slabs
              </h3>

              {/* Amount Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                  Transaction Amount (₹)
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748b', fontSize: '1.1rem' }}>₹</span>
                  <input
                    type="number"
                    value={gstAmount}
                    onChange={e => setGstAmount(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 16px 12px 38px',
                      fontSize: '1.1rem', fontWeight: 700, color: '#0A1F44',
                      border: '2px solid #cbd5e1', borderRadius: 10, outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* GST Slab Rates */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                  GST Slab Rate
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                  {[0, 5, 12, 18, 28].map(rate => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setGstRate(rate)}
                      style={{
                        padding: '10px 0', border: gstRate === rate ? '2px solid #1DB954' : '1.5px solid #cbd5e1',
                        borderRadius: 10, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                        background: gstRate === rate ? 'rgba(29,185,84,0.1)' : 'white',
                        color: gstRate === rate ? '#17a248' : '#475569',
                        transition: 'all 0.15s'
                      }}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Exclusive vs Inclusive */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Calculation Type
                  </label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => setGstType('exclusive')}
                      style={{
                        flex: 1, padding: '8px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                        border: gstType === 'exclusive' ? '1.5px solid #0A1F44' : '1px solid #cbd5e1',
                        background: gstType === 'exclusive' ? '#0A1F44' : 'white',
                        color: gstType === 'exclusive' ? 'white' : '#64748b'
                      }}
                    >
                      Exclusive (Add)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGstType('inclusive')}
                      style={{
                        flex: 1, padding: '8px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                        border: gstType === 'inclusive' ? '1.5px solid #0A1F44' : '1px solid #cbd5e1',
                        background: gstType === 'inclusive' ? '#0A1F44' : 'white',
                        color: gstType === 'inclusive' ? 'white' : '#64748b'
                      }}
                    >
                      Inclusive (Extract)
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Supply Jurisdiction
                  </label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => setSupplyType('intra')}
                      style={{
                        flex: 1, padding: '8px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                        border: supplyType === 'intra' ? '1.5px solid #1DB954' : '1px solid #cbd5e1',
                        background: supplyType === 'intra' ? '#1DB954' : 'white',
                        color: supplyType === 'intra' ? 'white' : '#64748b'
                      }}
                    >
                      Intra (CGST+SGST)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSupplyType('inter')}
                      style={{
                        flex: 1, padding: '8px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                        border: supplyType === 'inter' ? '1.5px solid #1DB954' : '1px solid #cbd5e1',
                        background: supplyType === 'inter' ? '#1DB954' : 'white',
                        color: supplyType === 'inter' ? 'white' : '#64748b'
                      }}
                    >
                      Inter (IGST)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Output Card */}
            <div style={{ background: '#0A1F44', padding: '2.5rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>
                    Tax Summary
                  </span>
                  <span style={{ background: 'rgba(29,185,84,0.15)', color: '#25d466', padding: '3px 10px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 700 }}>
                    GST {gstRate}% Slabs
                  </span>
                </div>

                <div style={{ marginBottom: '1.8rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: 4 }}>Total Invoice Gross Value</div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
                    ₹{Math.round(grossAmount).toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.88rem' }}>
                    <span style={{ color: '#94a3b8' }}>Net Taxable Amount</span>
                    <strong style={{ color: 'white' }}>₹{Math.round(netAmount).toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.88rem' }}>
                    <span style={{ color: '#94a3b8' }}>Total Tax Component</span>
                    <strong style={{ color: '#25d466' }}>₹{Math.round(totalTax).toLocaleString('en-IN')}</strong>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '8px 0' }} />

                  {supplyType === 'intra' ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: 4 }}>
                        <span>CGST ({gstRate / 2}%)</span>
                        <span>₹{Math.round(cgst).toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1' }}>
                        <span>SGST ({gstRate / 2}%)</span>
                        <span>₹{Math.round(sgst).toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1' }}>
                      <span>Integrated GST (IGST {gstRate}%)</span>
                      <span>₹{Math.round(igst).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleShareGst}
                style={{
                  width: '100%', padding: '12px', background: '#25d466', color: '#060f22',
                  border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.9rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 15px rgba(37,212,102,0.3)', transition: 'all 0.2s'
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Share & Consult CA on WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            CALCULATOR 2: INCOME TAX COMPARISON (NEW VS OLD)
        ══════════════════════════════════════════════════════════════════════════ */}
        {activeCalc === 'tax' && (
          <div style={{
            background: 'white', borderRadius: 20, border: '1.5px solid #e2e8f0',
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)', overflow: 'hidden',
            display: 'grid', gridTemplateColumns: '1.1fr 1fr'
          }}>
            {/* Income Inputs */}
            <div style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1F44', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 20, background: '#1DB954', borderRadius: 4, display: 'inline-block' }} />
                Annual Income & Deductions (FY 24-25)
              </h3>

              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Total Annual Income (Salary / Business Profit)
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748b' }}>₹</span>
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={e => setAnnualIncome(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px 10px 34px', fontSize: '1rem', fontWeight: 700, border: '1.5px solid #cbd5e1', borderRadius: 9 }}
                  />
                </div>
              </div>

              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: '1.2rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: 8 }}>
                  Old Regime Deductions (Optional)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: 8 }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Sec 80C (PPF/ELSS - max 1.5L)</label>
                    <input
                      type="number"
                      value={ded80C}
                      onChange={e => setDed80C(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: 6, marginTop: 4 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Sec 80D (Health Insurance)</label>
                    <input
                      type="number"
                      value={ded80D}
                      onChange={e => setDed80D(e.target.value)}
                      style={{ width: '100%', padding: '7px 10px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: 6, marginTop: 4 }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Other Deductions / HRA Exemption</label>
                  <input
                    type="number"
                    value={otherDed}
                    onChange={e => setOtherDed(e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', fontSize: '0.85rem', border: '1px solid #cbd5e1', borderRadius: 6, marginTop: 4 }}
                  />
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
                <i className="fas fa-info-circle" style={{ color: '#0284c7', marginRight: 4 }} />
                New Tax Regime automatically provides <strong>₹75,000 standard deduction</strong> and <strong>zero tax up to ₹7.75 Lakhs</strong> via Section 87A rebate.
              </div>
            </div>

            {/* Side-by-Side Regime Comparison */}
            <div style={{ background: '#0A1F44', padding: '2.5rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  background: 'rgba(29,185,84,0.15)', border: '1px solid rgba(29,185,84,0.3)',
                  padding: '10px 14px', borderRadius: 10, color: '#25d466', fontSize: '0.85rem', fontWeight: 700,
                  marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8
                }}>
                  <i className="fas fa-trophy" />
                  <span>{betterRegime} saves you ₹{Math.round(taxDifference).toLocaleString('en-IN')}!</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  {/* New Regime Card */}
                  <div style={{
                    background: betterRegime === 'New Tax Regime' ? 'rgba(29,185,84,0.12)' : 'rgba(255,255,255,0.05)',
                    border: betterRegime === 'New Tax Regime' ? '1.5px solid #1DB954' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, padding: '1.2rem', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>New Regime</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', margin: '8px 0' }}>
                      ₹{Math.round(newTax).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Std Ded: ₹75,000</div>
                  </div>

                  {/* Old Regime Card */}
                  <div style={{
                    background: betterRegime === 'Old Tax Regime' ? 'rgba(29,185,84,0.12)' : 'rgba(255,255,255,0.05)',
                    border: betterRegime === 'Old Tax Regime' ? '1.5px solid #1DB954' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, padding: '1.2rem', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Old Regime</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', margin: '8px 0' }}>
                      ₹{Math.round(oldTax).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Total Ded: ₹{oldTotalDeductions.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  *Calculations include standard 4% Health & Education cess. High net worth surcharge applies above ₹50 Lakhs.
                </div>
              </div>

              <button
                onClick={handleShareTax}
                style={{
                  width: '100%', padding: '12px', background: '#25d466', color: '#060f22',
                  border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.9rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 15px rgba(37,212,102,0.3)'
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Book Free CA Tax Consultation
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════════
            CALCULATOR 3: STARTUP INCORPORATION ESTIMATOR
        ══════════════════════════════════════════════════════════════════════════ */}
        {activeCalc === 'startup' && (
          <div style={{
            background: 'white', borderRadius: 20, border: '1.5px solid #e2e8f0',
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)', overflow: 'hidden',
            display: 'grid', gridTemplateColumns: '1.2fr 1fr'
          }}>
            <div style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1F44', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 20, background: '#1DB954', borderRadius: 4, display: 'inline-block' }} />
                Select Business Entity Type
              </h3>

              {/* Entity Type Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {Object.entries(basePricing).map(([key, val]) => (
                  <div
                    key={key}
                    onClick={() => setEntityType(key)}
                    style={{
                      padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                      border: entityType === key ? '2px solid #1DB954' : '1.5px solid #e2e8f0',
                      background: entityType === key ? 'rgba(29,185,84,0.08)' : 'white',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0A1F44' }}>{val.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 4 }}>{val.desc}</div>
                  </div>
                ))}
              </div>

              {/* Directors Counter */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                  Number of Directors / Partners: <strong>{directors}</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={directors}
                  onChange={e => setDirectors(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#1DB954' }}
                />
              </div>

              {/* Add-on compliance packages */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                  Recommended Statutory Bundles
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#334155', cursor: 'pointer' }}>
                    <input type="checkbox" checked={addOns.gst} onChange={() => toggleAddOn('gst')} />
                    GST Registration (+₹1,499)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#334155', cursor: 'pointer' }}>
                    <input type="checkbox" checked={addOns.msme} onChange={() => toggleAddOn('msme')} />
                    MSME / Udyam (+₹999)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#334155', cursor: 'pointer' }}>
                    <input type="checkbox" checked={addOns.startupIndia} onChange={() => toggleAddOn('startupIndia')} />
                    Startup India (+₹2,999)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#334155', cursor: 'pointer' }}>
                    <input type="checkbox" checked={addOns.trademark} onChange={() => toggleAddOn('trademark')} />
                    Trademark Filing (+₹4,999)
                  </label>
                </div>
              </div>
            </div>

            {/* Quotation Preview Card */}
            <div style={{ background: '#0A1F44', padding: '2.5rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>
                  Estimated Package Quotation
                </span>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#25d466', margin: '12px 0' }}>
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Complete turnaround: <strong>5 to 7 Working Days</strong>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: '#94a3b8' }}>Professional Fees:</span>
                    <span>₹{currentEntity.base.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: '#94a3b8' }}>MCA Govt Challan:</span>
                    <span>₹{currentEntity.govt.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>DSC & DIN (2 Persons):</span>
                    <span style={{ color: '#25d466' }}>Included FREE</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleShareStartup}
                style={{
                  width: '100%', padding: '12px', background: '#25d466', color: '#060f22',
                  border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.9rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 15px rgba(37,212,102,0.3)'
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Get Official Quote on WhatsApp
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

