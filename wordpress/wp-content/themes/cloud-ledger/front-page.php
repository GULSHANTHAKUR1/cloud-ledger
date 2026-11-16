<?php
/**
 * The template for displaying the front page / home page
 *
 * @package Cloud_Ledger
 * @version 1.0.0
 */

get_header();

// Fetch customizer options with fallbacks
$hero_badge = get_theme_mod('cl_hero_badge', "India's Corporate Compliance & Statutory Platform");
$hero_title = get_theme_mod('cl_hero_title', "Statutory Compliance, Taxation & Business Management");
$hero_desc  = get_theme_mod('cl_hero_desc', "Comprehensive multi-state GST filing, Income Tax returns, SPICe+ MCA company registrations, and automated accounting for Indian enterprises.");

$stat_1_num   = get_theme_mod('cl_stat_1_num', '315');
$stat_1_label = get_theme_mod('cl_stat_1_label', 'Statutory Services');
$stat_2_num   = get_theme_mod('cl_stat_2_num', '15');
$stat_2_label = get_theme_mod('cl_stat_2_label', 'Service Categories');
$stat_3_num   = get_theme_mod('cl_stat_3_num', '100');
$stat_3_label = get_theme_mod('cl_stat_3_label', 'Filing Accuracy Rate');
$stat_4_num   = get_theme_mod('cl_stat_4_num', '24');
$stat_4_label = get_theme_mod('cl_stat_4_label', 'Client Vault Access');

$mission_text = get_theme_mod('cl_mission_text', 'To remove compliance friction so entrepreneurs can focus entirely on scaling their core operations.');
$vision_text  = get_theme_mod('cl_vision_text', "To become India's premier integrated digital business compliance and management ecosystem.");

$wa_number = get_theme_mod('cl_whatsapp', '917827225372');
$wa_link   = 'https://wa.me/' . esc_attr($wa_number) . '?text=' . rawurlencode('Hello Cloud Ledger! I want to enquire about your services.');
$phone     = get_theme_mod('cl_phone', '+91 78272 25372');
$email     = get_theme_mod('cl_email', 'hello@cloudledger.in');
?>

<!-- ══════════════════════════════════════════════════════════════════════════
     1. HERO SECTION
══════════════════════════════════════════════════════════════════════════ -->
<section id="hero" style="min-height:92vh;background:radial-gradient(circle at 50% 15%, rgba(30,96,255,0.16) 0%, rgba(16,185,129,0.05) 35%, #050608 70%, #000000 100%);display:flex;align-items:center;padding-top:110px;padding-bottom:60px;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);background-size:60px 60px;"></div>

  <div class="container" style="position:relative;z-index:2;padding:1rem 1.5rem;">
    <div style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:3.5rem;align-items:center;" class="hero-grid-layout">
      
      <!-- Left Column: Copy & Search -->
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#ffffff;padding:6px 16px;border-radius:100px;font-size:0.78rem;font-weight:600;letter-spacing:0.5px;margin-bottom:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.5);">
          <span style="width:7px;height:7px;background:#10b981;border-radius:50%;animation:pulseDot 2s infinite;"></span>
          <?php echo esc_html($hero_badge); ?>
        </div>

        <h1 style="font-family:'Inter',sans-serif;font-size:clamp(2.4rem, 4.6vw, 3.8rem);font-weight:900;color:#ffffff;line-height:1.12;margin-bottom:1.5rem;letter-spacing:-1px;">
          <?php
            $title_parts = explode(',', $hero_title, 2);
            if (count($title_parts) === 2) {
              echo esc_html($title_parts[0]) . ', <br/><span style="background:linear-gradient(135deg, #1e60ff 0%, #10b981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block;">' . esc_html($title_parts[1]) . '</span>';
            } else {
              echo esc_html($hero_title);
            }
          ?>
        </h1>

        <p style="font-size:1.05rem;color:#94a3b8;line-height:1.75;margin-bottom:2rem;max-width:540px;">
          <?php echo esc_html($hero_desc); ?>
        </p>

        <!-- Live Search Bar for 315 Services -->
        <form id="hero-service-search-form" style="display:flex;align-items:center;background:#0d1118;border:1.5px solid rgba(255,255,255,0.15);border-radius:100px;padding:6px 8px 6px 20px;max-width:540px;box-shadow:0 10px 30px rgba(0,0,0,0.7);margin-bottom:1.2rem;">
          <i class="fas fa-search" style="color:#64748b;margin-right:12px;font-size:1rem;"></i>
          <input type="text" id="hero-search-input" placeholder="Search 315+ statutory services (e.g. GST, ITR, SPICe+)..." style="flex:1;background:none;border:none;outline:none;color:white;font-size:0.92rem;font-family:'Inter',sans-serif;" />
          <button type="submit" class="btn btn-white" style="padding:10px 22px;border-radius:100px;font-size:0.86rem;font-weight:700;">
            Search
          </button>
        </form>

        <!-- Quick Tags -->
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:2rem;">
          <span style="color:#64748b;font-size:0.75rem;font-weight:600;">Popular:</span>
          <?php foreach (array('GST Filing', 'ITR Filing', 'Company Registration', 'Bookkeeping', 'Audit', 'MSME') as $tag) : ?>
            <button type="button" class="quick-tag-btn" data-tag="<?php echo esc_attr($tag); ?>" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#94a3b8;padding:3px 10px;border-radius:100px;font-size:0.72rem;cursor:pointer;transition:all 0.15s;">
              <?php echo esc_html($tag); ?>
            </button>
          <?php endforeach; ?>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;" class="hero-cta-buttons">
          <a href="#services" class="btn btn-white" style="padding:13px 28px;font-size:0.92rem;">
            Explore Services Directory <i class="fas fa-arrow-right" style="font-size:0.8rem;"></i>
          </a>
          <a href="<?php echo esc_url($wa_link); ?>" target="_blank" rel="noreferrer" class="btn btn-whatsapp" style="padding:13px 26px;font-size:0.92rem;">
            <i class="fab fa-whatsapp" style="font-size:1.1rem;"></i> Direct Specialist Advisory
          </a>
        </div>
      </div>

      <!-- Right Column: Visual Showcase Card -->
      <div class="hero-visual-card" style="position:relative;">
        <div style="background:#0d1118;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:2rem;box-shadow:0 25px 60px rgba(0,0,0,0.8);position:relative;">
          
          <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:1.2rem;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:1.5rem;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;"></span>
              <span style="width:10px;height:10px;border-radius:50%;background:#f59e0b;"></span>
              <span style="width:10px;height:10px;border-radius:50%;background:#10b981;"></span>
            </div>
            <span style="font-size:0.72rem;color:#10b981;font-weight:700;background:rgba(16,185,129,0.12);padding:3px 10px;border-radius:100px;">
              ● Statutory Engine Active
            </span>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:9px 12px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:18px;">📊</span>
                <div>
                  <div style="color:rgba(255,255,255,0.95);font-size:0.8rem;font-weight:700;">Multi-State GST & ITC Mismatch Check</div>
                  <div style="color:#94a3b8;font-size:0.68rem;">GSTR-1, 3B, 9 & 9C automated reconciliation</div>
                </div>
              </div>
              <span style="background:rgba(16,185,129,0.18);color:#10b981;padding:2px 8px;border-radius:100px;font-size:0.68rem;font-weight:700;">Verified</span>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:9px 12px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:18px;">🏛️</span>
                <div>
                  <div style="color:rgba(255,255,255,0.95);font-size:0.8rem;font-weight:700;">Corporate & Startup Incorporation</div>
                  <div style="color:#94a3b8;font-size:0.68rem;">SPICe+ MCA approval, DSC, DIN & Incorporation Certificate</div>
                </div>
              </div>
              <span style="background:rgba(56,189,248,0.18);color:#38bdf8;padding:2px 8px;border-radius:100px;font-size:0.68rem;font-weight:700;">Fast-Track</span>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:9px 12px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:18px;">🔒</span>
                <div>
                  <div style="color:rgba(255,255,255,0.95);font-size:0.8rem;font-weight:700;">Private Encrypted Client Vault</div>
                  <div style="color:#94a3b8;font-size:0.68rem;">Download filed returns, MCA challans & certificates 24/7</div>
                </div>
              </div>
              <span style="background:rgba(245,158,11,0.18);color:#fbbf24;padding:2px 8px;border-radius:100px;font-size:0.68rem;font-weight:700;">AES-256</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     2. STATS BAR (Aligned to DRS 315 Services / 15 Categories)
══════════════════════════════════════════════════════════════════════════ -->
<div style="background:#050608;border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);padding:2.5rem 1.5rem;">
  <div class="container">
    <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:1.5rem;text-align:center;" class="stats-bar-grid">
      <div>
        <div style="font-size:2.8rem;font-weight:900;color:#10b981;line-height:1;margin-bottom:6px;"><?php echo esc_html($stat_1_num); ?>+</div>
        <div style="color:#94a3b8;font-size:0.85rem;font-weight:600;"><?php echo esc_html($stat_1_label); ?></div>
      </div>
      <div>
        <div style="font-size:2.8rem;font-weight:900;color:#38bdf8;line-height:1;margin-bottom:6px;"><?php echo esc_html($stat_2_num); ?> Sectors</div>
        <div style="color:#94a3b8;font-size:0.85rem;font-weight:600;"><?php echo esc_html($stat_2_label); ?></div>
      </div>
      <div>
        <div style="font-size:2.8rem;font-weight:900;color:#8b5cf6;line-height:1;margin-bottom:6px;"><?php echo esc_html($stat_3_num); ?>%</div>
        <div style="color:#94a3b8;font-size:0.85rem;font-weight:600;"><?php echo esc_html($stat_3_label); ?></div>
      </div>
      <div>
        <div style="font-size:2.8rem;font-weight:900;color:#f59e0b;line-height:1;margin-bottom:6px;"><?php echo esc_html($stat_4_num); ?>/7</div>
        <div style="color:#94a3b8;font-size:0.85rem;font-weight:600;"><?php echo esc_html($stat_4_label); ?></div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     3. FEATURES & THE 5 DRS CORE PILLARS
══════════════════════════════════════════════════════════════════════════ -->
<section id="features" style="padding:100px 1.5rem;background:#000000;border-top:1px solid rgba(255,255,255,0.06);">
  <div class="container">
    <div style="text-align:center;margin-bottom:3rem;">
      <div class="section-badge">
        <span style="width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block;animation:pulseDot 2s infinite;"></span>
        CORE PILLARS
      </div>
      <h2 class="section-title">Everything Your Business Needs</h2>
      <p class="section-desc" style="margin:0 auto;">
        One unified platform for every financial workflow, from instant GST invoicing to continuous statutory compliance.
      </p>

      <!-- 5 DRS Core Pillar Pills -->
      <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:2rem;">
        <?php foreach (array('Tax & GST Filings', 'Company & MCA Governance', 'Accounting & Bookkeeping', 'Audits & Internal Controls', 'Secure Client Vault') as $idx => $pillar) : ?>
          <span style="padding:9px 20px;border-radius:9999px;font-size:0.84rem;font-weight:600;border:1px solid <?php echo $idx === 0 ? '#1e60ff' : 'rgba(255,255,255,0.12)'; ?>;background:<?php echo $idx === 0 ? '#1e60ff' : 'rgba(255,255,255,0.04)'; ?>;color:#ffffff;box-shadow:<?php echo $idx === 0 ? '0 4px 18px rgba(30,96,255,0.4)' : 'none'; ?>;">
            <?php echo esc_html($pillar); ?>
          </span>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- 4-Column Feature Card Grid -->
    <div class="features-grid">
      <div class="feature-card">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:#10b981;"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(16,185,129,0.12);color:#10b981;display:flex;align-items:center;justify-content:center;font-size:1.25rem;">
            <i class="fas fa-file-invoice-dollar"></i>
          </div>
          <span style="font-size:0.72rem;font-weight:700;color:#10b981;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:100px;">GST & Invoicing</span>
        </div>
        <h3 style="font-size:1.25rem;font-weight:700;color:#ffffff;margin-bottom:0.85rem;">Smart Invoicing & e-Way</h3>
        <p style="font-size:0.88rem;color:#94a3b8;line-height:1.7;margin-bottom:1.5rem;">Generate GST-compliant invoices with automatic CGST/SGST/IGST splits, real-time IRP e-invoicing generation, and 1-click WhatsApp delivery.</p>
        <ul style="list-style:none;padding:0;margin:0 0 1.75rem 0;display:flex;flex-direction:column;gap:8px;font-size:0.82rem;color:#cbd5e1;">
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> IRN & QR Code Generation</li>
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Automated GST Calculation</li>
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Fast e-Way Bill Dispatch</li>
        </ul>
        <div style="margin-top:auto;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.08);">
          <a href="#services" style="color:#10b981;font-weight:700;font-size:0.85rem;text-decoration:none;display:flex;align-items:center;gap:6px;">
            <span>Explore Invoicing</span> <i class="fas fa-arrow-right" style="font-size:0.75rem;"></i>
          </a>
        </div>
      </div>

      <div class="feature-card">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:#3b82f6;"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(59,130,246,0.12);color:#3b82f6;display:flex;align-items:center;justify-content:center;font-size:1.25rem;">
            <i class="fas fa-chart-line"></i>
          </div>
          <span style="font-size:0.72rem;font-weight:700;color:#3b82f6;background:rgba(59,130,246,0.1);padding:4px 10px;border-radius:100px;">Accounting & MIS</span>
        </div>
        <h3 style="font-size:1.25rem;font-weight:700;color:#ffffff;margin-bottom:0.85rem;">Automated Cloud Ledger</h3>
        <p style="font-size:0.88rem;color:#94a3b8;line-height:1.7;margin-bottom:1.5rem;">Double-entry bookkeeping with connected banking feeds (ICICI, SBI, HDFC) and instant Profit & Loss and Balance Sheet analytics.</p>
        <ul style="list-style:none;padding:0;margin:0 0 1.75rem 0;display:flex;flex-direction:column;gap:8px;font-size:0.82rem;color:#cbd5e1;">
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Bank Auto-Reconciliation</li>
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Real-Time Financial MIS</li>
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Multi-Currency Support</li>
        </ul>
        <div style="margin-top:auto;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.08);">
          <a href="#calculators" style="color:#3b82f6;font-weight:700;font-size:0.85rem;text-decoration:none;display:flex;align-items:center;gap:6px;">
            <span>View Tax Calculators</span> <i class="fas fa-arrow-right" style="font-size:0.75rem;"></i>
          </a>
        </div>
      </div>

      <div class="feature-card">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:#f59e0b;"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(245,158,11,0.12);color:#f59e0b;display:flex;align-items:center;justify-content:center;font-size:1.25rem;">
            <i class="fas fa-shield-halved"></i>
          </div>
          <span style="font-size:0.72rem;font-weight:700;color:#f59e0b;background:rgba(245,158,11,0.1);padding:4px 10px;border-radius:100px;">Zero Penalties</span>
        </div>
        <h3 style="font-size:1.25rem;font-weight:700;color:#ffffff;margin-bottom:0.85rem;">GST & Tax Compliance</h3>
        <p style="font-size:0.88rem;color:#94a3b8;line-height:1.7;margin-bottom:1.5rem;">Complete statutory filing for GSTR-1, GSTR-3B, TDS, and Corporate ITR with proactive ITC mismatch detection to eliminate penalties.</p>
        <ul style="list-style:none;padding:0;margin:0 0 1.75rem 0;display:flex;flex-direction:column;gap:8px;font-size:0.82rem;color:#cbd5e1;">
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> GSTR-1 & 3B Direct Sync</li>
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> ITC Mismatch Detection</li>
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Multi-Tier Regulatory Oversight</li>
        </ul>
        <div style="margin-top:auto;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.08);">
          <a href="#services" style="color:#f59e0b;font-weight:700;font-size:0.85rem;text-decoration:none;display:flex;align-items:center;gap:6px;">
            <span>Browse Compliance</span> <i class="fas fa-arrow-right" style="font-size:0.75rem;"></i>
          </a>
        </div>
      </div>

      <div class="feature-card">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:#38bdf8;"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
          <div style="width:48px;height:48px;border-radius:14px;background:rgba(56,189,248,0.12);color:#38bdf8;display:flex;align-items:center;justify-content:center;font-size:1.25rem;">
            <i class="fas fa-vault"></i>
          </div>
          <span style="font-size:0.72rem;font-weight:700;color:#38bdf8;background:rgba(56,189,248,0.1);padding:4px 10px;border-radius:100px;">AES-256 Security</span>
        </div>
        <h3 style="font-size:1.25rem;font-weight:700;color:#ffffff;margin-bottom:0.85rem;">Client Vault & Portals</h3>
        <p style="font-size:0.88rem;color:#94a3b8;line-height:1.7;margin-bottom:1.5rem;">Bank-grade encrypted digital vault for instant access to filed returns, challans, and incorporation certificates, plus developer REST APIs.</p>
        <ul style="list-style:none;padding:0;margin:0 0 1.75rem 0;display:flex;flex-direction:column;gap:8px;font-size:0.82rem;color:#cbd5e1;">
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Encrypted Document Vault</li>
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Role-Based Client Access</li>
          <li><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i> Developer APIs & Webhooks</li>
        </ul>
        <div style="margin-top:auto;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.08);">
          <a href="#contact" style="color:#38bdf8;font-weight:700;font-size:0.85rem;text-decoration:none;display:flex;align-items:center;gap:6px;">
            <span>Speak with Experts</span> <i class="fas fa-arrow-right" style="font-size:0.75rem;"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     4. SERVICES DIRECTORY (315 SERVICES ACROSS 15 SECTORS)
══════════════════════════════════════════════════════════════════════════ -->
<section id="services" style="padding:100px 1.5rem;background:#050608;border-top:1px solid rgba(255,255,255,0.08);">
  <div class="container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;margin-bottom:2.5rem;">
      <div>
        <div class="section-badge" style="background:rgba(56,189,248,0.12);color:#38bdf8;border-color:rgba(56,189,248,0.25);">
          <i class="fas fa-list-check"></i> Statutory Services Directory
        </div>
        <h2 class="section-title">
          Comprehensive Compliance Catalogue<br/>
          <span style="background:linear-gradient(135deg, #38bdf8 0%, #10b981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block;">
            315 Statutory Services Across 15 Categories
          </span>
        </h2>
        <p class="section-desc">
          Browse our structured directory aligned directly with the Ministry of Corporate Affairs, GSTN, and CBDT. Click any service for full procedure, required documents, and timelines.
        </p>
      </div>

      <div style="position:relative;width:100%;max-width:320px;">
        <i class="fas fa-search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#64748b;font-size:0.9rem;"></i>
        <input type="text" id="services-filter-search" placeholder="Search services..." style="width:100%;padding:10px 14px 10px 38px;border:1.5px solid rgba(255,255,255,0.12);border-radius:12px;background:#0d1118;color:#ffffff;font-size:0.9rem;outline:none;" />
      </div>
    </div>

    <!-- Category Filter Pills (15 DRS Sectors) -->
    <div id="service-category-pills" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:2.5rem;">
      <button type="button" class="service-pill-btn active" data-cat="all">All Services (315)</button>
      <button type="button" class="service-pill-btn" data-cat="gst">GST & Indirect Tax (35)</button>
      <button type="button" class="service-pill-btn" data-cat="tax">Income Tax (30)</button>
      <button type="button" class="service-pill-btn" data-cat="company">Company & MCA (40)</button>
      <button type="button" class="service-pill-btn" data-cat="ngo">NGO & Trusts (25)</button>
      <button type="button" class="service-pill-btn" data-cat="accounting">Accounting & Books (25)</button>
      <button type="button" class="service-pill-btn" data-cat="audit">Audit & Assurance (20)</button>
      <button type="button" class="service-pill-btn" data-cat="msme">MSME & Licenses (20)</button>
      <button type="button" class="service-pill-btn" data-cat="labour">Labour & PF/ESIC (15)</button>
      <button type="button" class="service-pill-btn" data-cat="fpo">FPO & Agriculture (10)</button>
    </div>

    <!-- Dynamic Services Cards Grid (Rendered by JS engine from data / WP posts) -->
    <div id="services-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:1.5rem;">
      <!-- JavaScript will inject and paginate the services here -->
    </div>

    <div id="services-load-more-container" style="text-align:center;margin-top:3rem;">
      <button id="services-load-more-btn" class="btn btn-white" style="padding:12px 28px;">
        <i class="fas fa-plus"></i> Load More Statutory Services
      </button>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     5. INTERACTIVE CALCULATORS SECTION
══════════════════════════════════════════════════════════════════════════ -->
<section id="calculators" style="background:#000000;padding:100px 1.5rem;border-top:1px solid rgba(255,255,255,0.08);">
  <div class="container">
    
    <div style="text-align:center;margin-bottom:3rem;">
      <div class="section-badge" style="background:rgba(29,185,84,0.12);color:#25d466;border-color:rgba(29,185,84,0.3);">
        <i class="fas fa-calculator"></i> Interactive Compliance Tools
      </div>
      <h2 class="section-title">Free Business Calculators & Estimators</h2>
      <p class="section-desc" style="margin:0 auto;">
        Real-time calculation engines for Indian tax slabs, new vs old regime comparison, and complete corporate incorporation costing.
      </p>

      <!-- Calculator Switcher Buttons -->
      <div style="display:inline-flex;background:rgba(255,255,255,0.06);padding:5px;border-radius:100px;margin-top:2rem;border:1px solid rgba(255,255,255,0.1);gap:4px;">
        <button type="button" id="calc-tab-gst" class="calc-tab-btn active" data-target="gst-calc-pane">
          <i class="fas fa-receipt" style="margin-right:6px;color:#10b981;"></i> GST Slabs Calculator
        </button>
        <button type="button" id="calc-tab-tax" class="calc-tab-btn" data-target="tax-calc-pane">
          <i class="fas fa-chart-pie" style="margin-right:6px;color:#38bdf8;"></i> Income Tax (New vs Old)
        </button>
        <button type="button" id="calc-tab-startup" class="calc-tab-btn" data-target="startup-calc-pane">
          <i class="fas fa-rocket" style="margin-right:6px;color:#f59e0b;"></i> Startup Cost Estimator
        </button>
      </div>
    </div>

    <!-- CALC 1: GST CALCULATOR -->
    <div id="gst-calc-pane" class="calculator-card-grid" style="background:#0d1118;border-radius:20px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 50px rgba(0,0,0,0.6);overflow:hidden;">
      <div class="calc-panel">
        <h3 style="font-size:1.25rem;font-weight:800;color:#ffffff;margin-bottom:1.5rem;display:flex;align-items:center;gap:8px;">
          <span style="width:8px;height:20px;background:#10b981;border-radius:4px;display:inline-block;"></span>
          GST Parameters & Slabs
        </h3>

        <div style="margin-bottom:1.5rem;">
          <label style="display:block;font-size:0.85rem;font-weight:700;color:#94a3b8;margin-bottom:8px;">Transaction Amount (₹)</label>
          <div style="position:relative;">
            <span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);font-weight:700;color:#64748b;font-size:1.1rem;">₹</span>
            <input type="number" id="gst-input-amount" value="25000" style="width:100%;padding:12px 16px 12px 38px;font-size:1.1rem;font-weight:700;color:#ffffff;background:#090a0d;border:1.5px solid rgba(255,255,255,0.12);border-radius:10px;outline:none;" />
          </div>
        </div>

        <div style="margin-bottom:1.5rem;">
          <label style="display:block;font-size:0.85rem;font-weight:700;color:#94a3b8;margin-bottom:8px;">GST Slab Rate</label>
          <div style="display:grid;grid-template-columns:repeat(5, 1fr);gap:8px;" id="gst-rate-buttons">
            <button type="button" class="gst-rate-btn" data-rate="0">0%</button>
            <button type="button" class="gst-rate-btn" data-rate="5">5%</button>
            <button type="button" class="gst-rate-btn" data-rate="12">12%</button>
            <button type="button" class="gst-rate-btn active" data-rate="18">18%</button>
            <button type="button" class="gst-rate-btn" data-rate="28">28%</button>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
          <div>
            <label style="display:block;font-size:0.82rem;font-weight:700;color:#94a3b8;margin-bottom:6px;">Calculation Type</label>
            <div style="display:flex;gap:6px;">
              <button type="button" id="gst-type-exclusive" class="gst-toggle-btn active" style="flex:1;">Exclusive (Add)</button>
              <button type="button" id="gst-type-inclusive" class="gst-toggle-btn" style="flex:1;">Inclusive (Extract)</button>
            </div>
          </div>
          <div>
            <label style="display:block;font-size:0.82rem;font-weight:700;color:#94a3b8;margin-bottom:6px;">Supply Location</label>
            <div style="display:flex;gap:6px;">
              <button type="button" id="gst-supply-intra" class="gst-toggle-btn active" style="flex:1;">Intra (CGST+SGST)</button>
              <button type="button" id="gst-supply-inter" class="gst-toggle-btn" style="flex:1;">Inter (IGST)</button>
            </div>
          </div>
        </div>
      </div>

      <div class="calc-panel calc-results-panel" style="background:#11141c;color:white;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
            <span style="font-size:0.85rem;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:700;">Tax Summary</span>
            <span id="gst-slab-badge" style="background:rgba(29,185,84,0.15);color:#25d466;padding:3px 10px;border-radius:100px;font-size:0.75rem;font-weight:700;">GST 18% Slabs</span>
          </div>

          <div style="margin-bottom:1.8rem;">
            <div style="color:#94a3b8;font-size:0.82rem;margin-bottom:4px;">Total Invoice Gross Value</div>
            <div id="gst-out-gross" style="font-size:2.4rem;font-weight:800;color:white;letter-spacing:-0.5px;">₹29,500</div>
          </div>

          <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:1.2rem;margin-bottom:1.5rem;border:1px solid rgba(255,255,255,0.1);">
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:0.88rem;">
              <span style="color:#94a3b8;">Net Taxable Amount</span>
              <strong id="gst-out-net" style="color:white;">₹25,000</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:0.88rem;">
              <span style="color:#94a3b8;">Total Tax Component</span>
              <strong id="gst-out-tax" style="color:#25d466;">₹4,500</strong>
            </div>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:8px 0;" />
            <div id="gst-breakup-rows"></div>
          </div>
        </div>

        <button type="button" id="gst-share-wa-btn" style="width:100%;padding:12px;background:#25d466;color:#060f22;border:none;border-radius:10px;font-weight:700;font-size:0.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i class="fab fa-whatsapp" style="font-size:1.1rem;"></i> Share & Consult Advisory Desk on WhatsApp
        </button>
      </div>
    </div>

    <!-- CALC 2: INCOME TAX CALCULATOR (Hidden by default, shown on tab switch) -->
    <div id="tax-calc-pane" class="calculator-card-grid" style="display:none;background:#0d1118;border-radius:20px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 50px rgba(0,0,0,0.6);overflow:hidden;">
      <div class="calc-panel">
        <h3 style="font-size:1.25rem;font-weight:800;color:#ffffff;margin-bottom:1.5rem;display:flex;align-items:center;gap:8px;">
          <span style="width:8px;height:20px;background:#38bdf8;border-radius:4px;display:inline-block;"></span>
          Annual Income & Deductions (FY 2024-25 / 2025-26)
        </h3>
        <div style="margin-bottom:1.2rem;">
          <label style="display:block;font-size:0.85rem;font-weight:700;color:#94a3b8;margin-bottom:6px;">Gross Annual Income (₹)</label>
          <input type="number" id="tax-input-income" value="1200000" style="width:100%;padding:11px 14px;background:#090a0d;border:1.5px solid rgba(255,255,255,0.12);border-radius:10px;color:white;font-weight:700;" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.2rem;">
          <div>
            <label style="display:block;font-size:0.82rem;font-weight:700;color:#94a3b8;margin-bottom:6px;">80C Deductions (Max 1.5L)</label>
            <input type="number" id="tax-input-80c" value="150000" style="width:100%;padding:10px 12px;background:#090a0d;border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:white;" />
          </div>
          <div>
            <label style="display:block;font-size:0.82rem;font-weight:700;color:#94a3b8;margin-bottom:6px;">80D Health Insurance</label>
            <input type="number" id="tax-input-80d" value="25000" style="width:100%;padding:10px 12px;background:#090a0d;border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:white;" />
          </div>
        </div>
      </div>
      <div class="calc-panel calc-results-panel" style="background:#11141c;color:white;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div id="tax-recommendation-box" style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);padding:10px 14px;border-radius:10px;color:#10b981;font-size:0.85rem;font-weight:700;margin-bottom:1.5rem;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-trophy"></i>
            <span id="tax-rec-text">New Tax Regime saves you more!</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
            <div style="background:rgba(16,185,129,0.12);border:1.5px solid #10b981;border-radius:12px;padding:1.2rem;text-align:center;">
              <div style="font-size:0.78rem;color:#94a3b8;font-weight:700;">NEW REGIME</div>
              <div id="tax-out-new" style="font-size:1.6rem;font-weight:800;color:white;margin:8px 0;">₹85,800</div>
              <div style="font-size:0.72rem;color:#10b981;">₹75,000 Std Ded Included</div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1.2rem;text-align:center;">
              <div style="font-size:0.78rem;color:#94a3b8;font-weight:700;">OLD REGIME</div>
              <div id="tax-out-old" style="font-size:1.6rem;font-weight:800;color:white;margin:8px 0;">₹1,06,600</div>
              <div style="font-size:0.72rem;color:#94a3b8;">80C + 80D Applied</div>
            </div>
          </div>
        </div>
        <button type="button" id="tax-share-wa-btn" style="width:100%;padding:12px;background:#25d466;color:#000000;border:none;border-radius:10px;font-weight:700;font-size:0.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i class="fab fa-whatsapp" style="font-size:1.1rem;"></i> Book Free Tax Consultation
        </button>
      </div>
    </div>

    <!-- CALC 3: STARTUP ESTIMATOR (Hidden by default, shown on tab switch) -->
    <div id="startup-calc-pane" class="calculator-card-grid" style="display:none;background:#0d1118;border-radius:20px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 50px rgba(0,0,0,0.6);overflow:hidden;">
      <div class="calc-panel">
        <h3 style="font-size:1.25rem;font-weight:800;color:#ffffff;margin-bottom:1.5rem;display:flex;align-items:center;gap:8px;">
          <span style="width:8px;height:20px;background:#f59e0b;border-radius:4px;display:inline-block;"></span>
          Select Business Entity Type
        </h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem;" id="startup-entity-buttons">
          <button type="button" class="startup-entity-btn active" data-entity="pvt">Pvt Ltd Company</button>
          <button type="button" class="startup-entity-btn" data-entity="llp">Limited Liability (LLP)</button>
          <button type="button" class="startup-entity-btn" data-entity="opc">One Person Company</button>
          <button type="button" class="startup-entity-btn" data-entity="sec8">Section 8 (NGO)</button>
        </div>
      </div>
      <div class="calc-panel calc-results-panel" style="background:#11141c;color:white;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <span style="font-size:0.85rem;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;font-weight:700;">Estimated Package Quotation</span>
          <div id="startup-out-price" style="font-size:2.4rem;font-weight:800;color:#25d466;margin:12px 0;">₹7,499</div>
          <div style="color:#cbd5e1;font-size:0.85rem;margin-bottom:1.5rem;">Complete turnaround: <strong>5 to 7 Working Days</strong></div>
        </div>
        <button type="button" id="startup-share-wa-btn" style="width:100%;padding:12px;background:#25d466;color:#060f22;border:none;border-radius:10px;font-weight:700;font-size:0.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i class="fab fa-whatsapp" style="font-size:1.1rem;"></i> Get Official Quote on WhatsApp
        </button>
      </div>
    </div>

  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     6. ABOUT US SECTION
══════════════════════════════════════════════════════════════════════════ -->
<section id="about" style="background:#050608;border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);padding:5rem 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:center;margin-bottom:4rem;">
      <div>
        <div class="section-badge" style="background:rgba(56,189,248,0.12);border-color:rgba(56,189,248,0.25);color:#38bdf8;">
          <i class="fas fa-building"></i> About Cloud Ledger
        </div>
        <h2 class="section-title">
          Empowering Indian Businesses With <br/>
          <span style="background:linear-gradient(135deg, #38bdf8 0%, #10b981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block;">
            Structured Compliance
          </span>
        </h2>
        <p class="section-desc" style="margin-bottom:1.5rem;">
          Cloud Ledger is a modern business management and professional advisory platform. We unite technical compliance expertise with modern cloud infrastructure to deliver seamless taxation, company registration, and accounting operations.
        </p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;" class="about-mission-grid">
          <div style="border-left:3px solid #10b981;padding-left:1rem;">
            <div style="font-weight:800;color:#ffffff;font-size:1.1rem;">Our Mission</div>
            <div style="color:#94a3b8;font-size:0.85rem;margin-top:4px;"><?php echo esc_html($mission_text); ?></div>
          </div>
          <div style="border-left:3px solid #1e60ff;padding-left:1rem;">
            <div style="font-weight:800;color:#ffffff;font-size:1.1rem;">Our Vision</div>
            <div style="color:#94a3b8;font-size:0.85rem;margin-top:4px;"><?php echo esc_html($vision_text); ?></div>
          </div>
        </div>
      </div>

      <div style="background:#0d1118;border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:2.5rem;color:white;">
        <div style="font-size:2.5rem;margin-bottom:1rem;">🇮🇳</div>
        <h3 style="font-size:1.4rem;font-weight:800;margin-bottom:1rem;color:white;">
          Engineered for the Indian Regulatory Ecosystem
        </h3>
        <p style="color:#94a3b8;font-size:0.88rem;line-height:1.7;margin-bottom:1.5rem;">
          From the Ministry of Corporate Affairs (MCA) to the GSTN Common Portal, Income Tax e-Filing, and EPFO/ESIC portals, our systems align directly with India's statutory authorities.
        </p>
        <div style="display:flex;flex-direction:column;gap:10px;font-size:0.82rem;color:rgba(255,255,255,0.85);">
          <div><i class="fas fa-check" style="color:#10b981;margin-right:8px;"></i> Multi-state GST filing & reconciliation</div>
          <div><i class="fas fa-check" style="color:#10b981;margin-right:8px;"></i> Complete MCA & ROC secretarial governance</div>
          <div><i class="fas fa-check" style="color:#10b981;margin-right:8px;"></i> Section 8, Trust, 12A/80G NGO compliance</div>
          <div><i class="fas fa-check" style="color:#10b981;margin-right:8px;"></i> MSME Udyam & priority sector support</div>
        </div>
      </div>
    </div>

    <!-- 4 Operational Pillars -->
    <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:1.5rem;">
      <div style="background:#0d1118;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:1.5rem;">
        <div style="font-size:2rem;margin-bottom:0.75rem;">🛡️</div>
        <div style="font-weight:800;color:#ffffff;font-size:1rem;margin-bottom:0.5rem;">Regulatory Accuracy</div>
        <div style="color:#94a3b8;font-size:0.82rem;line-height:1.6;">Strict compliance with MCA, GST, Income Tax, and labour laws with every filing validated before submission.</div>
      </div>
      <div style="background:#0d1118;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:1.5rem;">
        <div style="font-size:2rem;margin-bottom:0.75rem;">🔒</div>
        <div style="font-weight:800;color:#ffffff;font-size:1rem;margin-bottom:0.5rem;">Private & Secure Vault</div>
        <div style="color:#94a3b8;font-size:0.82rem;line-height:1.6;">Documents and sensitive records stored securely with role-based access. Zero public link leakage.</div>
      </div>
      <div style="background:#0d1118;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:1.5rem;">
        <div style="font-size:2rem;margin-bottom:0.75rem;">⚡</div>
        <div style="font-weight:800;color:#ffffff;font-size:1rem;margin-bottom:0.5rem;">Direct Accountability</div>
        <div style="color:#94a3b8;font-size:0.82rem;line-height:1.6;">Assigned managers oversee every task, from registration to annual audit reconciliation.</div>
      </div>
      <div style="background:#0d1118;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:1.5rem;">
        <div style="font-size:2rem;margin-bottom:0.75rem;">🤝</div>
        <div style="font-weight:800;color:#ffffff;font-size:1rem;margin-bottom:0.5rem;">Dedicated Client Support</div>
        <div style="color:#94a3b8;font-size:0.82rem;line-height:1.6;">Direct communication via digital portal and WhatsApp for fast query resolution and live status updates.</div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     7. CONTACT & CONSULTATIONS
══════════════════════════════════════════════════════════════════════════ -->
<section id="contact" style="background:#000000;border-top:1px solid rgba(255,255,255,0.08);padding:5rem 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;">
      
      <div>
        <div class="section-badge" style="background:rgba(56,189,248,0.12);color:#38bdf8;border-color:rgba(56,189,248,0.25);">
          <i class="fas fa-envelope"></i> Contact & Consultations
        </div>
        <h2 style="font-family:'Inter',sans-serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:800;color:white;margin-bottom:1rem;line-height:1.2;">
          Let's Discuss Your Compliance & Growth
        </h2>
        <p style="color:#94a3b8;line-height:1.8;margin-bottom:2.5rem;">
          Whether you need regular monthly accounting, filing a new company incorporation, or assistance with a statutory tax notice — our dedicated advisory team is here for you.
        </p>

        <div style="display:flex;flex-direction:column;gap:1.2rem;margin-bottom:2.5rem;">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:44px;height:44px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-globe" style="color:#38bdf8;"></i>
            </div>
            <div>
              <a href="https://cloudledger.in" style="color:#ffffff;text-decoration:none;font-weight:600;">cloudledger.in</a>
              <div style="color:#64748b;font-size:0.75rem;">Official Website</div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:44px;height:44px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-phone" style="color:#38bdf8;"></i>
            </div>
            <div>
              <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $phone)); ?>" style="color:#ffffff;text-decoration:none;font-weight:600;"><?php echo esc_html($phone); ?></a>
              <div style="color:#64748b;font-size:0.75rem;">Direct Helpline · Mon–Sat 9AM–6PM IST</div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:44px;height:44px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-envelope" style="color:#38bdf8;"></i>
            </div>
            <div>
              <a href="mailto:<?php echo esc_attr($email); ?>" style="color:#ffffff;text-decoration:none;font-weight:600;"><?php echo esc_html($email); ?></a>
              <div style="color:#64748b;font-size:0.75rem;">Official Email · Response within 24 hrs</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Form (Submits to WordPress Admin cl_enquiry) -->
      <div style="background:#0d1118;border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:2.5rem;box-shadow:0 20px 50px rgba(0,0,0,0.6);">
        <div style="color:white;font-weight:800;font-size:1.35rem;margin-bottom:0.5rem;">Send an Enquiry</div>
        <div style="color:#94a3b8;font-size:0.82rem;margin-bottom:1.75rem;">
          Fill in your requirement below and our team will get in touch with you.
        </div>

        <form id="cl-main-contact-form">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;" class="contact-input-row">
            <div>
              <label style="display:block;color:#94a3b8;font-size:0.78rem;font-weight:600;margin-bottom:5px;">Your Full Name *</label>
              <input name="name" required placeholder="e.g. Rahul Sharma" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.12);background:#090a0d;color:white;font-size:0.9rem;outline:none;" />
            </div>
            <div>
              <label style="display:block;color:#94a3b8;font-size:0.78rem;font-weight:600;margin-bottom:5px;">Phone / WhatsApp *</label>
              <input name="phone" required type="tel" placeholder="e.g. 7827225372" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.12);background:#090a0d;color:white;font-size:0.9rem;outline:none;" />
            </div>
          </div>

          <div style="margin-bottom:1rem;">
            <label style="display:block;color:#94a3b8;font-size:0.78rem;font-weight:600;margin-bottom:5px;">Email Address *</label>
            <input name="email" required type="email" placeholder="e.g. rahul@company.com" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.12);background:#090a0d;color:white;font-size:0.9rem;outline:none;" />
          </div>

          <div style="margin-bottom:1rem;">
            <label style="display:block;color:#94a3b8;font-size:0.78rem;font-weight:600;margin-bottom:5px;">Select Service Category</label>
            <select name="service" style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.12);background:#090a0d;color:white;font-size:0.9rem;outline:none;">
              <option value="GST & Indirect Taxation">GST & Indirect Taxation</option>
              <option value="Income Tax & Direct Taxation">Income Tax & Direct Taxation</option>
              <option value="Company Incorporation & MCA">Company Incorporation & MCA</option>
              <option value="NGO, Trust & Society">NGO, Trust & Society</option>
              <option value="Accounting & Bookkeeping">Accounting & Bookkeeping</option>
              <option value="Audit & Assurance">Audit & Assurance</option>
              <option value="MIS & Management Consultancy">MIS & Management Consultancy</option>
              <option value="MSME & Business Registrations">MSME & Business Registrations</option>
              <option value="PF, ESIC & Labour Compliance">PF, ESIC & Labour Compliance</option>
              <option value="Other Business Support Services">Other Business Support Services</option>
            </select>
          </div>

          <div style="margin-bottom:1.5rem;">
            <label style="display:block;color:#94a3b8;font-size:0.78rem;font-weight:600;margin-bottom:5px;">Requirement Details</label>
            <textarea name="message" rows="3" placeholder="Tell us briefly about your business and requirement..." style="width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.12);background:#090a0d;color:white;font-size:0.9rem;outline:none;resize:vertical;"></textarea>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;">
            <button type="submit" id="cl-main-submit-btn" class="btn btn-white" style="width:100%;height:48px;border-radius:9999px;justify-content:center;">
              <i class="fas fa-paper-plane"></i> Submit Online Enquiry
            </button>
            <button type="button" id="cl-main-wa-btn" class="btn btn-whatsapp" style="width:100%;height:48px;border-radius:9999px;justify-content:center;">
              <i class="fab fa-whatsapp" style="font-size:1.1rem;"></i> Or Submit Directly to WhatsApp
            </button>
          </div>

          <div style="text-align:center;margin-top:1.25rem;color:#64748b;font-size:0.72rem;line-height:1.5;">
            <i class="fas fa-shield-alt" style="margin-right:4px;"></i>
            Your data is kept strictly confidential with 256-bit encryption. We never share your phone or email.
          </div>
        </form>
      </div>

    </div>
  </div>
</section>

<?php
get_footer();
