<?php
/**
 * The header for Cloud Ledger theme
 *
 * @package Cloud_Ledger
 * @version 1.0.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php
  $wa_number  = get_theme_mod('cl_whatsapp', '917827225372');
  $wa_link    = 'https://wa.me/' . esc_attr($wa_number) . '?text=' . rawurlencode('Hello Cloud Ledger! I want to enquire about your services.');
  $login_url  = wp_login_url();
?>

<header class="cl-header" id="masthead">
  <!-- ── MAIN TOP NAVIGATION BAR ── -->
  <nav class="main-navbar-bar" id="site-navigation" aria-label="<?php esc_attr_e('Primary Navigation', 'cloud-ledger'); ?>">
    
    <!-- Brand Logo -->
    <a href="<?php echo esc_url(home_url('/')); ?>" style="display:flex;align-items:center;gap:10px;text-decoration:none;" rel="home">
      <?php if (has_custom_logo()) : ?>
        <?php the_custom_logo(); ?>
      <?php else : ?>
        <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:3px;width:22px;height:22px;transform:rotate(45deg);">
          <div style="width:9px;height:9px;border-radius:2px;background:#ef4444;"></div>
          <div style="width:9px;height:9px;border-radius:2px;background:#f59e0b;"></div>
          <div style="width:9px;height:9px;border-radius:2px;background:#10b981;"></div>
          <div style="width:9px;height:9px;border-radius:2px;background:#1e60ff;"></div>
        </div>
        <span style="color:#ffffff;font-size:1.25rem;font-weight:800;letter-spacing:-0.3px;font-family:'Inter',sans-serif;">
          CLOUD<span style="color:#ffffff;font-weight:500;">LEDGER</span>
        </span>
      <?php endif; ?>
    </a>

    <!-- Desktop Navigation Links -->
    <ul class="desktop-nav">
      <li><a href="#features" class="nav-link" data-section="features"><?php esc_html_e('Features', 'cloud-ledger'); ?></a></li>
      <li><a href="#services" class="nav-link" data-section="services"><?php esc_html_e('Services', 'cloud-ledger'); ?></a></li>
      <li><a href="#calculators" class="nav-link" data-section="calculators"><?php esc_html_e('Calculators', 'cloud-ledger'); ?></a></li>
      <li><a href="#about" class="nav-link" data-section="about"><?php esc_html_e('About Us', 'cloud-ledger'); ?></a></li>
      <li><a href="#resources" class="nav-link" data-section="resources"><?php esc_html_e('Resources', 'cloud-ledger'); ?></a></li>
      <li><a href="#industries" class="nav-link" data-section="industries"><?php esc_html_e('Industries', 'cloud-ledger'); ?></a></li>
      <li><a href="#knowledge" class="nav-link" data-section="knowledge"><?php esc_html_e('Knowledge', 'cloud-ledger'); ?></a></li>
      <li><a href="#contact" class="nav-link" data-section="contact"><?php esc_html_e('Contact', 'cloud-ledger'); ?></a></li>
    </ul>

    <!-- Top Right CTA Buttons -->
    <div style="display:flex;align-items:center;gap:10px;">
      <a href="<?php echo esc_url($wa_link); ?>" target="_blank" rel="noreferrer" class="btn btn-whatsapp header-wa-btn" style="padding:8px 16px;border-radius:9999px;font-size:0.82rem;">
        <i class="fab fa-whatsapp"></i> <span class="header-wa-label"><?php esc_html_e('WhatsApp', 'cloud-ledger'); ?></span>
      </a>

      <a href="<?php echo esc_url($login_url); ?>" class="btn btn-navy" style="padding:8px 18px;border-radius:9999px;font-size:0.84rem;">
        <?php esc_html_e('Login', 'cloud-ledger'); ?>
      </a>

      <!-- Mobile Hamburger Toggle -->
      <button id="mobile-toggle-btn" class="mobile-menu-btn" aria-label="<?php esc_attr_e('Toggle Menu', 'cloud-ledger'); ?>" style="display:none;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:white;border-radius:10px;width:38px;height:38px;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </nav>

  <!-- ── MOBILE HORIZONTAL HEADER NAVIGATION STRIP ── -->
  <div class="mobile-header-nav-strip">
    <div class="mobile-nav-scroll-container">
      <a href="#features" class="mobile-nav-pill active" data-section="features"><span>⚡</span> <?php esc_html_e('Features', 'cloud-ledger'); ?></a>
      <a href="#services" class="mobile-nav-pill" data-section="services"><span>📋</span> <?php esc_html_e('Services', 'cloud-ledger'); ?></a>
      <a href="#calculators" class="mobile-nav-pill" data-section="calculators"><span>🧮</span> <?php esc_html_e('Calculators', 'cloud-ledger'); ?></a>
      <a href="#about" class="mobile-nav-pill" data-section="about"><span>🏛️</span> <?php esc_html_e('About Us', 'cloud-ledger'); ?></a>
      <a href="#resources" class="mobile-nav-pill" data-section="resources"><span>📥</span> <?php esc_html_e('Resources', 'cloud-ledger'); ?></a>
      <a href="#industries" class="mobile-nav-pill" data-section="industries"><span>🏭</span> <?php esc_html_e('Industries', 'cloud-ledger'); ?></a>
      <a href="#knowledge" class="mobile-nav-pill" data-section="knowledge"><span>📰</span> <?php esc_html_e('Knowledge', 'cloud-ledger'); ?></a>
      <a href="#contact" class="mobile-nav-pill" data-section="contact"><span>✉️</span> <?php esc_html_e('Contact', 'cloud-ledger'); ?></a>
    </div>
  </div>

  <!-- ── EXPANDABLE MOBILE MENU DRAWER ── -->
  <div id="mobile-menu-drawer" style="display:none;background:rgba(5,6,8,0.98);backdrop-filter:blur(20px);padding:1.5rem 1.5rem 2rem;flex-direction:column;gap:6px;border-bottom:1px solid rgba(255,255,255,0.12);max-height:calc(100vh - 120px);overflow-y:auto;">
    <div style="color:#64748b;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">
      <?php esc_html_e('Navigation Sections', 'cloud-ledger'); ?>
    </div>
    <a href="#features" class="mobile-drawer-link" style="color:rgba(255,255,255,0.85);text-decoration:none;padding:11px 14px;min-height:44px;display:flex;align-items:center;justify-content:space-between;font-size:0.92rem;font-weight:600;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:10px;">
      <span>⚡ <?php esc_html_e('Features & Pillars', 'cloud-ledger'); ?></span>
      <i class="fas fa-chevron-right" style="font-size:0.72rem;color:#475569;"></i>
    </a>
    <a href="#services" class="mobile-drawer-link" style="color:rgba(255,255,255,0.85);text-decoration:none;padding:11px 14px;min-height:44px;display:flex;align-items:center;justify-content:space-between;font-size:0.92rem;font-weight:600;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:10px;">
      <span>📋 <?php esc_html_e('Services Directory (315 Services)', 'cloud-ledger'); ?></span>
      <i class="fas fa-chevron-right" style="font-size:0.72rem;color:#475569;"></i>
    </a>
    <a href="#calculators" class="mobile-drawer-link" style="color:rgba(255,255,255,0.85);text-decoration:none;padding:11px 14px;min-height:44px;display:flex;align-items:center;justify-content:space-between;font-size:0.92rem;font-weight:600;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:10px;">
      <span>🧮 <?php esc_html_e('GST & Tax Calculators', 'cloud-ledger'); ?></span>
      <i class="fas fa-chevron-right" style="font-size:0.72rem;color:#475569;"></i>
    </a>
    <a href="#about" class="mobile-drawer-link" style="color:rgba(255,255,255,0.85);text-decoration:none;padding:11px 14px;min-height:44px;display:flex;align-items:center;justify-content:space-between;font-size:0.92rem;font-weight:600;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:10px;">
      <span>🏛️ <?php esc_html_e('About Cloud Ledger', 'cloud-ledger'); ?></span>
      <i class="fas fa-chevron-right" style="font-size:0.72rem;color:#475569;"></i>
    </a>
    <a href="#resources" class="mobile-drawer-link" style="color:rgba(255,255,255,0.85);text-decoration:none;padding:11px 14px;min-height:44px;display:flex;align-items:center;justify-content:space-between;font-size:0.92rem;font-weight:600;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:10px;">
      <span>📥 <?php esc_html_e('Statutory Checklists & Guides', 'cloud-ledger'); ?></span>
      <i class="fas fa-chevron-right" style="font-size:0.72rem;color:#475569;"></i>
    </a>
    <a href="#industries" class="mobile-drawer-link" style="color:rgba(255,255,255,0.85);text-decoration:none;padding:11px 14px;min-height:44px;display:flex;align-items:center;justify-content:space-between;font-size:0.92rem;font-weight:600;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:10px;">
      <span>🏭 <?php esc_html_e('Industries & Sectors', 'cloud-ledger'); ?></span>
      <i class="fas fa-chevron-right" style="font-size:0.72rem;color:#475569;"></i>
    </a>
    <a href="#knowledge" class="mobile-drawer-link" style="color:rgba(255,255,255,0.85);text-decoration:none;padding:11px 14px;min-height:44px;display:flex;align-items:center;justify-content:space-between;font-size:0.92rem;font-weight:600;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:10px;">
      <span>📰 <?php esc_html_e('Daily Compliance Circulars', 'cloud-ledger'); ?></span>
      <i class="fas fa-chevron-right" style="font-size:0.72rem;color:#475569;"></i>
    </a>
    <a href="#contact" class="mobile-drawer-link" style="color:rgba(255,255,255,0.85);text-decoration:none;padding:11px 14px;min-height:44px;display:flex;align-items:center;justify-content:space-between;font-size:0.92rem;font-weight:600;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);border-radius:10px;">
      <span>✉️ <?php esc_html_e('Contact & Consultations', 'cloud-ledger'); ?></span>
      <i class="fas fa-chevron-right" style="font-size:0.72rem;color:#475569;"></i>
    </a>

    <div style="display:flex;gap:10px;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.08);">
      <a href="<?php echo esc_url($wa_link); ?>" target="_blank" rel="noreferrer" class="btn btn-whatsapp" style="flex:1;justify-content:center;padding:12px;">
        <i class="fab fa-whatsapp"></i> <?php esc_html_e('WhatsApp', 'cloud-ledger'); ?>
      </a>
      <a href="<?php echo esc_url($login_url); ?>" class="btn btn-navy" style="flex:1;justify-content:center;padding:12px;">
        <?php esc_html_e('Login', 'cloud-ledger'); ?>
      </a>
    </div>
  </div>
</header>
<main id="primary" class="site-main">
