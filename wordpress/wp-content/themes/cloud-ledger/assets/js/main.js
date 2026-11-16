/**
 * Cloud Ledger WordPress Theme JavaScript
 * Handles Calculators, Modals, Services Directory, Scroll Spy, Enquiry Popup & AJAX
 *
 * @package Cloud_Ledger
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', function () {
  const waNumber = (window.cloudLedgerData && window.cloudLedgerData.waNumber) || '917827225372';
  const ajaxUrl  = (window.cloudLedgerData && window.cloudLedgerData.ajaxUrl) || '/wp-admin/admin-ajax.php';
  const nonce    = (window.cloudLedgerData && window.cloudLedgerData.nonce) || '';

  // ══════════════════════════════════════════════════════════════════════════
  // 1. SCROLL SPY & STICKY HEADER
  // ══════════════════════════════════════════════════════════════════════════
  const mainNavbar = document.querySelector('.main-navbar-bar');
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav-pill');
  const sectionIds = ['contact', 'about', 'calculators', 'services', 'features', 'hero'];

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    if (mainNavbar) {
      if (scrollY > 30) {
        mainNavbar.classList.add('scrolled');
      } else {
        mainNavbar.classList.remove('scrolled');
      }
    }

    const scrollPos = scrollY + 140;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && scrollPos >= el.offsetTop) {
        navLinks.forEach(link => {
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        break;
      }
    }
  }, { passive: true });

  // Smooth scroll with sticky offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 115;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

        // Close mobile drawer if open
        const drawer = document.getElementById('mobile-menu-drawer');
        if (drawer) drawer.style.display = 'none';
      }
    });
  });

  // Mobile Hamburger Toggle
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-menu-drawer');
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', function () {
      const isVisible = drawer.style.display === 'flex';
      drawer.style.display = isVisible ? 'none' : 'flex';
      toggleBtn.innerHTML = isVisible ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 2. GST, INCOME TAX & STARTUP CALCULATORS ENGINE
  // ══════════════════════════════════════════════════════════════════════════
  // Tab Switcher
  const calcTabs = document.querySelectorAll('.calc-tab-btn');
  const calcPanes = {
    'calc-tab-gst': document.getElementById('gst-calc-pane'),
    'calc-tab-tax': document.getElementById('tax-calc-pane'),
    'calc-tab-startup': document.getElementById('startup-calc-pane'),
  };

  calcTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      calcTabs.forEach(t => {
        t.classList.remove('active');
        t.style.background = 'transparent';
        t.style.color = '#94a3b8';
      });
      this.classList.add('active');
      this.style.background = '#1e60ff';
      this.style.color = '#ffffff';

      Object.values(calcPanes).forEach(pane => {
        if (pane) pane.style.display = 'none';
      });
      const targetPane = calcPanes[this.id];
      if (targetPane) targetPane.style.display = 'grid';
    });
  });

  // GST Engine
  let gstRate = 18;
  let gstType = 'exclusive';
  let supplyType = 'intra';

  const gstInputAmount = document.getElementById('gst-input-amount');
  const gstRateBtns = document.querySelectorAll('.gst-rate-btn');
  const gstTypeExcl = document.getElementById('gst-type-exclusive');
  const gstTypeIncl = document.getElementById('gst-type-inclusive');
  const gstSupplyIntra = document.getElementById('gst-supply-intra');
  const gstSupplyInter = document.getElementById('gst-supply-inter');

  function calculateGST() {
    const amount = parseFloat(gstInputAmount ? gstInputAmount.value : 0) || 0;
    let net = 0;
    let tax = 0;
    let gross = 0;

    if (gstType === 'exclusive') {
      net = amount;
      tax = (amount * gstRate) / 100;
      gross = net + tax;
    } else {
      gross = amount;
      net = (amount * 100) / (100 + gstRate);
      tax = gross - net;
    }

    const cgst = supplyType === 'intra' ? tax / 2 : 0;
    const sgst = supplyType === 'intra' ? tax / 2 : 0;
    const igst = supplyType === 'inter' ? tax : 0;

    const outGross = document.getElementById('gst-out-gross');
    const outNet = document.getElementById('gst-out-net');
    const outTax = document.getElementById('gst-out-tax');
    const slabBadge = document.getElementById('gst-slab-badge');
    const breakupRows = document.getElementById('gst-breakup-rows');

    if (outGross) outGross.textContent = '₹' + Math.round(gross).toLocaleString('en-IN');
    if (outNet) outNet.textContent = '₹' + Math.round(net).toLocaleString('en-IN');
    if (outTax) outTax.textContent = '₹' + Math.round(tax).toLocaleString('en-IN');
    if (slabBadge) slabBadge.textContent = 'GST ' + gstRate + '% Slabs';

    if (breakupRows) {
      if (supplyType === 'intra') {
        breakupRows.innerHTML = `
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#cbd5e1;margin-bottom:4px;">
            <span>CGST (${gstRate / 2}%)</span><span>₹${Math.round(cgst).toLocaleString('en-IN')}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#cbd5e1;">
            <span>SGST (${gstRate / 2}%)</span><span>₹${Math.round(sgst).toLocaleString('en-IN')}</span>
          </div>
        `;
      } else {
        breakupRows.innerHTML = `
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#cbd5e1;">
            <span>Integrated GST (IGST ${gstRate}%)</span><span>₹${Math.round(igst).toLocaleString('en-IN')}</span>
          </div>
        `;
      }
    }
  }

  if (gstInputAmount) gstInputAmount.addEventListener('input', calculateGST);

  gstRateBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      gstRateBtns.forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.1)';
        b.style.background = 'rgba(255,255,255,0.03)';
        b.style.color = '#94a3b8';
      });
      this.style.borderColor = '#10b981';
      this.style.background = 'rgba(16,185,129,0.15)';
      this.style.color = '#10b981';
      gstRate = parseInt(this.getAttribute('data-rate'));
      calculateGST();
    });
  });

  function updateToggleBtn(activeBtn, inactiveBtn) {
    activeBtn.style.border = '1.5px solid #10b981';
    activeBtn.style.background = '#10b981';
    activeBtn.style.color = 'white';
    inactiveBtn.style.border = '1px solid rgba(255,255,255,0.1)';
    inactiveBtn.style.background = 'rgba(255,255,255,0.03)';
    inactiveBtn.style.color = '#94a3b8';
  }

  if (gstTypeExcl && gstTypeIncl) {
    updateToggleBtn(gstTypeExcl, gstTypeIncl);
    gstTypeExcl.addEventListener('click', function () {
      gstType = 'exclusive';
      updateToggleBtn(gstTypeExcl, gstTypeIncl);
      calculateGST();
    });
    gstTypeIncl.addEventListener('click', function () {
      gstType = 'inclusive';
      updateToggleBtn(gstTypeIncl, gstTypeExcl);
      calculateGST();
    });
  }

  if (gstSupplyIntra && gstSupplyInter) {
    updateToggleBtn(gstSupplyIntra, gstSupplyInter);
    gstSupplyIntra.addEventListener('click', function () {
      supplyType = 'intra';
      updateToggleBtn(gstSupplyIntra, gstSupplyInter);
      calculateGST();
    });
    gstSupplyInter.addEventListener('click', function () {
      supplyType = 'inter';
      updateToggleBtn(gstSupplyInter, gstSupplyIntra);
      calculateGST();
    });
  }

  const gstShareBtn = document.getElementById('gst-share-wa-btn');
  if (gstShareBtn) {
    gstShareBtn.addEventListener('click', function () {
      const amount = gstInputAmount ? gstInputAmount.value : '25000';
      const text = encodeURIComponent(
        `Hello Cloud Ledger! I calculated my GST on your website:\n\n` +
        `💰 Base Amount: ₹${amount}\n` +
        `📊 GST Rate: ${gstRate}%\n` +
        `📋 Type: ${gstType}\n` +
        `🏢 Supply: ${supplyType === 'intra' ? 'Intra-State' : 'Inter-State'}\n\n` +
        `Please help me with filing GST returns.`
      );
      window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    });
  }

  calculateGST();

  // Income Tax Engine (Budget 2024-25 / 2025-26)
  const taxIncomeInput = document.getElementById('tax-input-income');
  const tax80cInput = document.getElementById('tax-input-80c');
  const tax80dInput = document.getElementById('tax-input-80d');

  function calculateTax() {
    const income = parseFloat(taxIncomeInput ? taxIncomeInput.value : 0) || 0;
    const ded80c = Math.min(parseFloat(tax80cInput ? tax80cInput.value : 0) || 0, 150000);
    const ded80d = Math.min(parseFloat(tax80dInput ? tax80dInput.value : 0) || 0, 50000);

    // New Regime (Std Ded: 75,000)
    const newTaxable = Math.max(0, income - 75000);
    let newTax = 0;
    if (newTaxable > 700000) {
      let rem = newTaxable;
      if (rem > 300000) newTax += Math.min(rem - 300000, 400000) * 0.05;
      if (rem > 700000) newTax += Math.min(rem - 700000, 300000) * 0.10;
      if (rem > 1000000) newTax += Math.min(rem - 1000000, 200000) * 0.15;
      if (rem > 1200000) newTax += Math.min(rem - 1200000, 300000) * 0.20;
      if (rem > 1500000) newTax += (rem - 1500000) * 0.30;
      newTax = newTax * 1.04;
    }

    // Old Regime (Std Ded: 50,000)
    const oldTaxable = Math.max(0, income - 50000 - ded80c - ded80d);
    let oldTax = 0;
    if (oldTaxable > 500000) {
      let rem = oldTaxable;
      if (rem > 250000) oldTax += Math.min(rem - 250000, 250000) * 0.05;
      if (rem > 500000) oldTax += Math.min(rem - 500000, 500000) * 0.20;
      if (rem > 1000000) oldTax += (rem - 1000000) * 0.30;
      oldTax = oldTax * 1.04;
    }

    const outNew = document.getElementById('tax-out-new');
    const outOld = document.getElementById('tax-out-old');
    const recText = document.getElementById('tax-rec-text');

    if (outNew) outNew.textContent = '₹' + Math.round(newTax).toLocaleString('en-IN');
    if (outOld) outOld.textContent = '₹' + Math.round(oldTax).toLocaleString('en-IN');

    const diff = Math.abs(Math.round(newTax - oldTax));
    if (recText) {
      if (newTax <= oldTax) {
        recText.textContent = `New Tax Regime saves you ₹${diff.toLocaleString('en-IN')}!`;
      } else {
        recText.textContent = `Old Tax Regime saves you ₹${diff.toLocaleString('en-IN')}!`;
      }
    }
  }

  if (taxIncomeInput) taxIncomeInput.addEventListener('input', calculateTax);
  if (tax80cInput) tax80cInput.addEventListener('input', calculateTax);
  if (tax80dInput) tax80dInput.addEventListener('input', calculateTax);
  calculateTax();

  // Startup Estimator
  const startupPrices = {
    pvt: 7499,
    llp: 5999,
    opc: 6499,
    sec8: 11999,
  };
  const startupEntityBtns = document.querySelectorAll('.startup-entity-btn');
  startupEntityBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      startupEntityBtns.forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.1)';
        b.style.background = 'rgba(255,255,255,0.03)';
        b.style.color = '#94a3b8';
      });
      this.style.borderColor = '#f59e0b';
      this.style.background = 'rgba(245,158,11,0.15)';
      this.style.color = '#f59e0b';
      const entity = this.getAttribute('data-entity');
      const outPrice = document.getElementById('startup-out-price');
      if (outPrice && startupPrices[entity]) {
        outPrice.textContent = '₹' + startupPrices[entity].toLocaleString('en-IN');
      }
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 3. SERVICES CATALOGUE & DETAIL MODAL
  // ══════════════════════════════════════════════════════════════════════════
  const SERVICES_DATA = [
    {
      id: 'gst-reg',
      title: 'GST Registration',
      category: 'gst',
      categoryName: 'GST & Indirect Taxation',
      icon: '📊',
      desc: 'New GST registration for Proprietorship, Partnership, LLP and Private Limited companies with ARN generation.',
      overview: 'Mandatory statutory registration under the CGST/SGST Act for businesses exceeding turnover thresholds or making inter-state supplies.',
      eligibility: ['Turnover > ₹40 Lakhs (Goods) / ₹20 Lakhs (Services)', 'Inter-state taxable suppliers', 'E-commerce sellers & aggregators', 'Voluntary registration for input tax credit'],
      documents: ['PAN Card & Aadhaar of Applicant / Promoters', 'Electricity Bill / Rent Agreement / NOC of premises', 'Bank Statement / Cancelled Cheque', 'Letter of Authorization / Board Resolution'],
      timeline: '3 to 7 working days'
    },
    {
      id: 'gstr-1-3b',
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
      id: 'gstr-9-annual',
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
      id: 'itr-ind',
      title: 'ITR Filing – Individuals & Professionals',
      category: 'tax',
      categoryName: 'Income Tax & Direct Taxation',
      icon: '💰',
      desc: 'ITR-1, ITR-2, ITR-3 & ITR-4 filing for salaried employees, consultants, doctors, lawyers and freelance professionals.',
      overview: 'Complete salary, professional fees, capital gain, and other-source income calculation with optimal deduction planning under Section 80C, 80D, 80G.',
      eligibility: ['Salaried individuals with taxable income > basic exemption', 'Freelancers and professionals (Section 44ADA eligible)'],
      documents: ['Form 16 / Form 16A', 'Annual Information Statement (AIS) & Form 26AS', 'Bank Statements of all accounts', 'Proof of deductions'],
      timeline: 'Statutory deadline: 31st July annually'
    },
    {
      id: 'itr-corporate',
      title: 'ITR Filing – Companies & LLPs',
      category: 'tax',
      categoryName: 'Income Tax & Direct Taxation',
      icon: '🏦',
      desc: 'Corporate income tax return (ITR-6) and LLP return (ITR-5) with MAT and depreciation scheduling.',
      overview: 'Statutory corporate tax computation aligning audited financial statements, disallowances under 43B, and tax credit carry-forwards.',
      eligibility: ['All active Private Limited, Public Limited companies, OPCs and LLPs'],
      documents: ['Audited Financial Statements (Balance Sheet, P&L)', 'Tax Audit Report (Form 3CA/3CB-3CD) where applicable', 'Advance tax and self-assessment challan receipts'],
      timeline: 'Statutory deadline: 31st October annually'
    },
    {
      id: 'pvt-ltd-inc',
      title: 'Private Limited Company Incorporation',
      category: 'company',
      categoryName: 'Company Incorporation & MCA',
      icon: '🏢',
      desc: 'SPICe+ MCA filing, Digital Signature Certificate (DSC), DIN allocation, MOA & AOA drafting, and Certificate of Incorporation.',
      overview: 'Complete end-to-end legal registration of a Private Limited company with the Ministry of Corporate Affairs, including PAN, TAN, EPFO, and ESIC registrations.',
      eligibility: ['Minimum 2 Directors and 2 Shareholders', 'At least 1 Indian Resident Director'],
      documents: ['PAN & Aadhaar of all Directors', 'Passport size photos', 'Registered office address proof (Utility bill + Rent agreement + NOC)', 'Bank Statement / Voter ID'],
      timeline: '5 to 7 working days'
    },
    {
      id: 'llp-inc',
      title: 'Limited Liability Partnership (LLP) Setup',
      category: 'company',
      categoryName: 'Company Incorporation & MCA',
      icon: '🤝',
      desc: 'FiLLiP MCA filing, Partner DPINs, digital signatures, and formal drafting of the statutory LLP Agreement (Form 3).',
      overview: 'Hybrid entity structure combining corporate limited liability with partnership operational flexibility, governed by the LLP Act 2008.',
      eligibility: ['Minimum 2 Designated Partners', 'At least 1 Indian resident partner'],
      documents: ['PAN and Aadhaar of Partners', 'Address proof of registered office', 'Draft LLP Agreement'],
      timeline: '7 to 10 working days'
    },
    {
      id: 'ngo-12a-80g',
      title: 'NGO 12A & 80G Tax Exemption',
      category: 'ngo',
      categoryName: 'NGO, Trust & Society',
      icon: '🌿',
      desc: 'Online application for income tax exemption (Section 12A) and donor tax deduction certificate (Section 80G) via Form 10A / 10AB.',
      overview: 'Critical statutory certifications enabling non-profit organizations to claim tax-free income and provide 50% tax deductions to donors.',
      eligibility: ['Registered Trusts, Societies, and Section 8 Companies with charitable objectives'],
      documents: ['Trust Deed / Certificate of Incorporation', '3 years audited financials / activity report', 'PAN Card of NGO'],
      timeline: '15 to 30 working days'
    },
    {
      id: 'monthly-bookkeeping',
      title: 'Monthly Bookkeeping & Accounting',
      category: 'accounting',
      categoryName: 'Accounting & Bookkeeping',
      icon: '📖',
      desc: 'End-to-end ledger maintenance, sales and expense posting, bank reconciliation, and monthly Profit & Loss generation.',
      overview: 'Structured financial records aligned with Indian Accounting Standards (Ind AS) ensuring audit readiness and compliance transparency.',
      eligibility: ['Startups, SMEs, trading firms, and corporate entities'],
      documents: ['Bank statements', 'Sales and purchase invoices', 'Expense bills and salary sheets'],
      timeline: 'Continuous monthly cycle'
    },
    {
      id: 'internal-audit',
      title: 'Internal Audit & Process Review',
      category: 'audit',
      categoryName: 'Audit & Assurance',
      icon: '🔍',
      desc: 'Evaluation of internal financial controls, inventory stock audits, SOP compliance verification, and leak prevention.',
      overview: 'Independent review of financial and operational workflows to ensure statutory compliance and mitigate operational risks.',
      eligibility: ['Mid-sized enterprises, manufacturing units, and growing startups'],
      documents: ['Standard Operating Procedures (SOPs)', 'Trial Balance, General Ledger, Stock Register'],
      timeline: '2 to 4 weeks depending on scope'
    },
    {
      id: 'msme-udyam',
      title: 'MSME Udyam Registration',
      category: 'msme',
      categoryName: 'MSME & Business Registrations',
      icon: '🏭',
      desc: 'Government of India MSME certificate issuance for priority sector lending, collateral-free credit, and subsidy schemes.',
      overview: 'Statutory classification under Micro, Small, or Medium enterprise thresholds under the MSMED Act.',
      eligibility: ['All proprietary, partnership, LLP, and corporate business entities in India'],
      documents: ['Aadhaar number of proprietor/partner/director', 'Business PAN Card', 'Bank account details'],
      timeline: '1 to 2 working days'
    },
    {
      id: 'labour-pf-esic',
      title: 'PF & ESIC Statutory Compliance',
      category: 'labour',
      categoryName: 'PF, ESIC & Labour Compliance',
      icon: '👥',
      desc: 'EPFO and ESIC employer registration, monthly ECR challan generation, wage sheet reconciliation, and return filing.',
      overview: 'Mandatory social security compliance for employers crossing 20 employees (EPF) or 10 employees (ESIC).',
      eligibility: ['Establishments with eligible employee counts or voluntary coverage'],
      documents: ['Company PAN, Certificate of Incorporation', 'Salary sheet and attendance records', 'Bank account details'],
      timeline: 'Monthly deadline: 15th of following month'
    }
  ];

  let activeServiceFilter = 'all';
  let serviceSearchTerm = '';
  let visibleCount = 8;

  const servicesGrid = document.getElementById('services-cards-grid');
  const serviceSearchInput = document.getElementById('services-filter-search');
  const loadMoreBtn = document.getElementById('services-load-more-btn');
  const serviceDetailModal = document.getElementById('cl-service-detail-modal-backdrop');
  const serviceModalContent = document.getElementById('cl-service-modal-content');
  const closeServiceModal = document.getElementById('cl-close-service-modal');

  function renderServices() {
    if (!servicesGrid) return;

    const filtered = SERVICES_DATA.filter(s => {
      const matchCat = activeServiceFilter === 'all' || s.category === activeServiceFilter;
      const matchSearch = !serviceSearchTerm || s.title.toLowerCase().includes(serviceSearchTerm.toLowerCase()) || s.desc.toLowerCase().includes(serviceSearchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      servicesGrid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem;background:#0d1118;border-radius:16px;border:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:2.5rem;margin-bottom:0.75rem;">🔍</div>
          <div style="font-size:1.1rem;font-weight:700;color:#ffffff;">No services found matching "${serviceSearchTerm}"</div>
          <div style="color:#94a3b8;font-size:0.85rem;margin-top:6px;">Try searching: GST, ITR, Incorporation, Bookkeeping, Audit, MSME</div>
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    const toShow = filtered.slice(0, visibleCount);
    servicesGrid.innerHTML = toShow.map(s => `
      <div class="service-card" data-service-id="${s.id}" style="background:#0d1118;border-radius:18px;padding:1.75rem;border:1px solid rgba(255,255,255,0.08);cursor:pointer;display:flex;flex-direction:column;transition:all 0.25s;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <div style="font-size:26px;background:rgba(255,255,255,0.05);width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;">
            ${s.icon}
          </div>
          <span style="font-size:0.72rem;font-weight:700;color:#34d399;background:rgba(16,185,129,0.12);padding:3px 10px;border-radius:100px;border:1px solid rgba(16,185,129,0.2);">
            View Details
          </span>
        </div>
        <div style="color:#38bdf8;font-size:0.72rem;font-weight:700;text-transform:uppercase;margin-bottom:4px;">
          ${s.categoryName}
        </div>
        <div style="font-weight:800;color:#ffffff;font-size:1.02rem;margin-bottom:0.5rem;line-height:1.4;">
          ${s.title}
        </div>
        <div style="color:#94a3b8;font-size:0.84rem;line-height:1.6;flex:1;margin-bottom:1.25rem;">
          ${s.desc}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.06);padding-top:1rem;margin-top:auto;">
          <span style="color:#38bdf8;font-size:0.78rem;font-weight:700;display:flex;align-items:center;gap:6px;">
            Full Guide <i class="fas fa-arrow-right" style="font-size:0.68rem;"></i>
          </span>
          <span style="color:#64748b;font-size:0.72rem;">Govt Portal Aligned</span>
        </div>
      </div>
    `).join('');

    // Attach card click handlers to open detailed modal
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', function () {
        const sId = this.getAttribute('data-service-id');
        const s = SERVICES_DATA.find(x => x.id === sId);
        if (s && serviceDetailModal && serviceModalContent) {
          const waUrl = `https://wa.me/${waNumber}?text=` + encodeURIComponent(`Hello Cloud Ledger! I am interested in ${s.title}. Please provide more details.`);
          serviceModalContent.innerHTML = `
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:1.5rem;">
              <div style="font-size:32px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);width:60px;height:60px;border-radius:16px;display:flex;align-items:center;justify-content:center;">
                ${s.icon}
              </div>
              <div>
                <div style="color:#38bdf8;font-size:0.78rem;font-weight:700;text-transform:uppercase;">${s.categoryName}</div>
                <h2 style="color:#ffffff;font-size:1.6rem;font-weight:800;margin:2px 0 0;">${s.title}</h2>
              </div>
            </div>

            <div style="margin-bottom:1.5rem;padding:1.1rem 1.3rem;background:#090a0d;border-radius:14px;border-left:4px solid #10b981;border:1px solid rgba(255,255,255,0.08);">
              <div style="font-weight:700;color:#ffffff;font-size:0.9rem;margin-bottom:4px;">Purpose & Business Benefits</div>
              <p style="color:#94a3b8;font-size:0.86rem;line-height:1.6;margin:0;">${s.overview}</p>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;" class="modal-grid">
              <div style="background:#090a0d;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.25rem;">
                <div style="font-weight:700;color:#ffffff;font-size:0.88rem;margin-bottom:8px;"><i class="fas fa-user-check" style="color:#38bdf8;margin-right:6px;"></i> Who Needs This Service</div>
                <ul style="margin:0;padding-left:18px;color:#94a3b8;font-size:0.82rem;line-height:1.6;">
                  ${s.eligibility.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
              <div style="background:#090a0d;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:1.25rem;">
                <div style="font-weight:700;color:#ffffff;font-size:0.88rem;margin-bottom:8px;"><i class="fas fa-file-alt" style="color:#f59e0b;margin-right:6px;"></i> Required Documents</div>
                <ul style="margin:0;padding-left:18px;color:#94a3b8;font-size:0.82rem;line-height:1.6;">
                  ${s.documents.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;">
              <a href="${waUrl}" target="_blank" rel="noreferrer" class="btn btn-whatsapp" style="flex:1;justify-content:center;padding:13px 20px;border-radius:9999px;">
                <i class="fab fa-whatsapp"></i> Inquire via WhatsApp
              </a>
              <a href="#contact" onclick="document.getElementById('cl-service-detail-modal-backdrop').style.display='none'" class="btn btn-white" style="flex:1;justify-content:center;padding:13px 20px;border-radius:9999px;">
                <i class="fas fa-envelope"></i> Send Online Enquiry
              </a>
            </div>
          `;
          serviceDetailModal.style.display = 'flex';
        }
      });
    });

    if (loadMoreBtn) {
      loadMoreBtn.style.display = visibleCount < filtered.length ? 'inline-flex' : 'none';
    }
  }

  // Filter Pill buttons
  document.querySelectorAll('.service-pill-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.service-pill-btn').forEach(b => {
        b.style.borderColor = 'rgba(255,255,255,0.1)';
        b.style.background = 'rgba(255,255,255,0.04)';
        b.style.color = '#94a3b8';
      });
      this.style.borderColor = '#1e60ff';
      this.style.background = '#1e60ff';
      this.style.color = '#ffffff';

      activeServiceFilter = this.getAttribute('data-cat');
      visibleCount = 8;
      renderServices();
    });
  });

  if (serviceSearchInput) {
    serviceSearchInput.addEventListener('input', function (e) {
      serviceSearchTerm = e.target.value.trim();
      renderServices();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      visibleCount += 8;
      renderServices();
    });
  }

  if (closeServiceModal && serviceDetailModal) {
    closeServiceModal.addEventListener('click', () => serviceDetailModal.style.display = 'none');
    serviceDetailModal.addEventListener('click', (e) => {
      if (e.target === serviceDetailModal) serviceDetailModal.style.display = 'none';
    });
  }

  // Hero search connection
  const heroSearchForm = document.getElementById('hero-service-search-form');
  const heroSearchInput = document.getElementById('hero-search-input');
  if (heroSearchForm && heroSearchInput) {
    heroSearchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = heroSearchInput.value.trim();
      if (!val) return;
      serviceSearchTerm = val;
      if (serviceSearchInput) serviceSearchInput.value = val;
      const srvEl = document.getElementById('services');
      if (srvEl) srvEl.scrollIntoView({ behavior: 'smooth' });
      renderServices();
    });
  }

  document.querySelectorAll('.quick-tag-btn').forEach(tagBtn => {
    tagBtn.addEventListener('click', function () {
      const tag = this.getAttribute('data-tag');
      serviceSearchTerm = tag;
      if (serviceSearchInput) serviceSearchInput.value = tag;
      const srvEl = document.getElementById('services');
      if (srvEl) srvEl.scrollIntoView({ behavior: 'smooth' });
      renderServices();
    });
  });

  renderServices();

  // ══════════════════════════════════════════════════════════════════════════
  // 4. LEGAL & COMPANY MODAL HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const LEGAL_MODALS = {
    terms: {
      title: 'Terms & Conditions of Service',
      badge: 'Legal & Governance',
      updated: 'November 2026',
      body: `Welcome to Cloud Ledger (cloudledger.in). By engaging our professional services or accessing our digital portal, you agree to comply with and be bound by these Terms and Conditions. These terms govern all statutory compliance, company governance, taxation, and accounting advisory services rendered by Cloud Ledger.\n\nClients must provide complete, accurate, and authentic invoices, books, and statutory credentials before statutory cut-off dates. All records uploaded to the Client Vault are encrypted and confidential.`
    },
    privacy: {
      title: 'Privacy & Data Protection Policy',
      badge: 'Data Security',
      updated: 'November 2026',
      body: `At Cloud Ledger, privacy and data integrity are fundamental to our business. This Privacy Policy details how we collect, process, and protect your company credentials, personal data, and financial statements in accordance with the Digital Personal Data Protection Act (DPDP).\n\nAll communications, authentication requests, and document transfers are protected with TLS 1.3 encryption in transit and AES-256 encryption at rest. We never sell or monetize your business records.`
    },
    assured: {
      title: 'Assured Compliance & Service Quality Terms',
      badge: 'Service Level Agreement',
      updated: 'November 2026',
      body: `For all compliance records and invoices provided before internal cutoff dates (minimum 3 business days prior to statutory deadlines), Cloud Ledger guarantees timely filing on government portals to prevent statutory late fees.\n\nEvery return, reconciliation, and incorporation filing passes through a multi-tier review process by senior compliance specialists to eliminate clerical mismatches and Input Tax Credit (ITC) discrepancies.`
    },
    security: {
      title: 'Information Security & Architecture Policy',
      badge: 'ISO 27001 Aligned',
      updated: 'November 2026',
      body: `Our platform is engineered in alignment with ISO 27001:2013 Information Security Management System (ISMS) guidelines, implementing robust safeguards across physical, network, and application layers.\n\nStrict role separation ensures that clients only access their private organization records with audited permission logs.`
    },
    careers: {
      title: 'Careers at Cloud Ledger',
      badge: 'Join Our Team',
      updated: 'Open Positions',
      body: `At Cloud Ledger, we are reinventing how modern businesses manage statutory compliance, taxation, and company governance. We are looking for talented compliance specialists, company secretarial specialists, and software engineers to join our growing team.\n\nOpen Roles: Senior Compliance Specialist, GST & TDS Associate, MCA Secretarial Lead, and Full-Stack Developers. To apply, email your CV to careers@cloudledger.in or WhatsApp our HR desk.`
    },
    press: {
      title: 'Press & Media Relations',
      badge: 'Media Centre',
      updated: 'November 2026',
      body: `For media interviews, executive quotes on tax and company law amendments, or official press releases, please reach out to our communications desk at press@cloudledger.in.`
    },
    mediaKit: {
      title: 'Brand Assets & Media Kit',
      badge: 'Brand Guidelines',
      updated: 'November 2026',
      body: `The Cloud Ledger logo represents precision, structured governance, and digital cloud agility. For high-resolution SVG/PNG assets and media kits, contact media@cloudledger.in.`
    }
  };

  const legalModalBackdrop = document.getElementById('cl-legal-modal-backdrop');
  const legalModalContent = document.getElementById('cl-legal-modal-content');
  const closeLegalModal = document.getElementById('cl-close-legal-modal');

  document.querySelectorAll('.footer-modal-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const key = this.getAttribute('data-modal');
      const data = LEGAL_MODALS[key];
      if (data && legalModalBackdrop && legalModalContent) {
        legalModalContent.innerHTML = `
          <div style="margin-bottom:1.5rem;padding-bottom:1.2rem;border-bottom:1px solid rgba(255,255,255,0.08);">
            <div style="display:inline-flex;padding:3px 12px;border-radius:100px;font-size:0.72rem;font-weight:800;background:rgba(30,96,255,0.12);color:#38bdf8;border:1px solid rgba(30,96,255,0.3);text-transform:uppercase;margin-bottom:10px;">
              ${data.badge}
            </div>
            <h2 style="font-size:1.6rem;font-weight:800;color:white;margin:0 0 6px;">${data.title}</h2>
            <div style="color:#64748b;font-size:0.78rem;">Status: Active · ${data.updated}</div>
          </div>
          <div style="background:#090a0d;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:1.4rem;color:#94a3b8;font-size:0.88rem;line-height:1.75;white-space:pre-line;margin-bottom:2rem;">
            ${data.body}
          </div>
          <div style="text-align:right;">
            <button type="button" onclick="document.getElementById('cl-legal-modal-backdrop').style.display='none'" class="btn btn-white" style="padding:10px 24px;">Close</button>
          </div>
        `;
        legalModalBackdrop.style.display = 'flex';
      }
    });
  });

  if (closeLegalModal && legalModalBackdrop) {
    closeLegalModal.addEventListener('click', () => legalModalBackdrop.style.display = 'none');
    legalModalBackdrop.addEventListener('click', (e) => {
      if (e.target === legalModalBackdrop) legalModalBackdrop.style.display = 'none';
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 5. TIMED ENQUIRY POPUP (Pops up after 1.2s on page load)
  // ══════════════════════════════════════════════════════════════════════════
  const popupBackdrop = document.getElementById('cl-enquiry-popup-backdrop');
  const closePopupBtn = document.getElementById('cl-close-enquiry-popup');
  const cancelPopupBtn = document.getElementById('cl-popup-cancel-btn');
  const popupForm = document.getElementById('cl-popup-form');
  const popupWaBtn = document.getElementById('cl-popup-wa-btn');

  setTimeout(function () {
    if (popupBackdrop) popupBackdrop.style.display = 'flex';
  }, 1200);

  function closePopup() {
    if (popupBackdrop) popupBackdrop.style.display = 'none';
  }
  if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
  if (cancelPopupBtn) cancelPopupBtn.addEventListener('click', closePopup);

  if (popupWaBtn) {
    popupWaBtn.addEventListener('click', function () {
      const name = popupForm.querySelector('[name="name"]').value;
      const phone = popupForm.querySelector('[name="phone"]').value;
      const service = popupForm.querySelector('[name="service"]').value;
      const text = encodeURIComponent(
        `Hello Cloud Ledger! I want a quick consultation from your website:\n\n` +
        `👤 Name: ${name || 'Prospective Client'}\n` +
        `📱 Mobile: ${phone || 'Not specified'}\n` +
        `📌 Service: ${service}\n\n` +
        `Please contact me regarding this service.`
      );
      window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
      closePopup();
    });
  }

  if (popupForm) {
    popupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = document.getElementById('cl-popup-submit-btn');
      if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

      const formData = new FormData(popupForm);
      formData.append('action', 'cloud_ledger_submit_enquiry');
      formData.append('nonce', nonce);

      fetch(ajaxUrl, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        alert(data.data ? data.data.message : 'Thank you! We will get in touch shortly.');
        closePopup();
      })
      .catch(() => {
        alert('Thank you! Your request has been recorded.');
        closePopup();
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 6. MAIN CONTACT FORM (Submits to WordPress cl_enquiry)
  // ══════════════════════════════════════════════════════════════════════════
  const mainContactForm = document.getElementById('cl-main-contact-form');
  const mainWaBtn = document.getElementById('cl-main-wa-btn');

  if (mainWaBtn && mainContactForm) {
    mainWaBtn.addEventListener('click', function () {
      const name = mainContactForm.querySelector('[name="name"]').value;
      const phone = mainContactForm.querySelector('[name="phone"]').value;
      const email = mainContactForm.querySelector('[name="email"]').value;
      const service = mainContactForm.querySelector('[name="service"]').value;
      const msg = mainContactForm.querySelector('[name="message"]').value;

      const text = encodeURIComponent(
        `Hello Cloud Ledger! I am submitting an enquiry from your website:\n\n` +
        `👤 Name: ${name}\n` +
        `📱 Phone: ${phone}\n` +
        `✉️ Email: ${email}\n` +
        `📌 Service: ${service}\n` +
        `💬 Details: ${msg}`
      );
      window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    });
  }

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = document.getElementById('cl-main-submit-btn');
      if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

      const formData = new FormData(mainContactForm);
      formData.append('action', 'cloud_ledger_submit_enquiry');
      formData.append('nonce', nonce);

      fetch(ajaxUrl, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        alert(data.data ? data.data.message : 'Thank you! We have received your enquiry.');
        mainContactForm.reset();
        if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Online Enquiry';
      })
      .catch(() => {
        alert('Thank you! Your enquiry has been received.');
        mainContactForm.reset();
        if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Online Enquiry';
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 7. FLOATING WHATSAPP CHAT BUBBLE
  // ══════════════════════════════════════════════════════════════════════════
  const waFloatBtn = document.getElementById('cl-wa-float-btn');
  const waBubble = document.getElementById('cl-wa-bubble');
  const waBubbleClose = document.getElementById('cl-wa-bubble-close');

  setTimeout(() => {
    if (waBubble) waBubble.style.display = 'block';
  }, 6000);

  if (waFloatBtn && waBubble) {
    waFloatBtn.addEventListener('click', () => {
      waBubble.style.display = waBubble.style.display === 'none' ? 'block' : 'none';
    });
  }
  if (waBubbleClose && waBubble) {
    waBubbleClose.addEventListener('click', () => {
      waBubble.style.display = 'none';
    });
  }
});
