<?php
/**
 * The template for displaying the footer
 *
 * @package Cloud_Ledger
 * @version 1.0.0
 */

$wa_number  = get_theme_mod('cl_whatsapp', '917827225372');
$wa_link    = 'https://wa.me/' . esc_attr($wa_number) . '?text=' . rawurlencode('Hello Cloud Ledger! I need assistance.');
?>
</main><!-- #primary -->

<footer style="background:#000000;color:#ffffff;padding:70px 1.5rem 35px;border-top:1px solid rgba(255,255,255,0.08);">
  <div class="container">
    <div style="display:grid;grid-template-columns:2fr 1.1fr 1.1fr 1.2fr;gap:3rem;margin-bottom:3rem;">
      
      <!-- Brand Column -->
      <div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.2rem;">
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:3px;width:22px;height:22px;transform:rotate(45deg);">
            <div style="width:9px;height:9px;border-radius:2px;background:#ef4444;"></div>
            <div style="width:9px;height:9px;border-radius:2px;background:#f59e0b;"></div>
            <div style="width:9px;height:9px;border-radius:2px;background:#10b981;"></div>
            <div style="width:9px;height:9px;border-radius:2px;background:#1e60ff;"></div>
          </div>
          <span style="font-size:1.3rem;font-weight:800;color:#ffffff;letter-spacing:-0.3px;font-family:'Inter',sans-serif;">
            CLOUD<span style="color:#ffffff;font-weight:500;">LEDGER</span>
          </span>
        </div>
        <p style="color:#94a3b8;font-size:0.85rem;line-height:1.8;margin-bottom:1.5rem;max-width:360px;">
          Completely integrated suite of cloud-based tools to help you with invoicing, payments, accounting, inventory management, payroll, and GST compliance.
        </p>
        <div style="color:#64748b;font-size:0.78rem;display:flex;align-items:center;gap:6px;">
          <i class="fas fa-shield-halved" style="color:#10b981;"></i>
          <span>Government Portal Aligned · ISO 27001 ISMS</span>
        </div>
      </div>

      <!-- Company Column -->
      <div>
        <div style="color:#ffffff;font-weight:700;font-size:0.88rem;margin-bottom:1.2rem;text-transform:uppercase;letter-spacing:0.5px;">
          Company
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:10px;padding:0;margin:0;">
          <li><a href="#about" class="footer-scroll-link" style="color:#94a3b8;text-decoration:none;font-size:0.84rem;">About Us</a></li>
          <li><a href="#contact" class="footer-scroll-link" style="color:#94a3b8;text-decoration:none;font-size:0.84rem;">Contact Us</a></li>
          <li><button type="button" class="footer-modal-btn" data-modal="careers" style="background:none;border:none;padding:0;color:#94a3b8;font-size:0.84rem;cursor:pointer;text-align:left;">Careers</button></li>
          <li><button type="button" class="footer-modal-btn" data-modal="press" style="background:none;border:none;padding:0;color:#94a3b8;font-size:0.84rem;cursor:pointer;text-align:left;">Press</button></li>
          <li><button type="button" class="footer-modal-btn" data-modal="mediaKit" style="background:none;border:none;padding:0;color:#94a3b8;font-size:0.84rem;cursor:pointer;text-align:left;">Media Kit</button></li>
        </ul>
      </div>

      <!-- Usage Column -->
      <div>
        <div style="color:#ffffff;font-weight:700;font-size:0.88rem;margin-bottom:1.2rem;text-transform:uppercase;letter-spacing:0.5px;">
          Usage
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:10px;padding:0;margin:0;">
          <li><button type="button" class="footer-modal-btn" data-modal="terms" style="background:none;border:none;padding:0;color:#94a3b8;font-size:0.84rem;cursor:pointer;text-align:left;">Terms & Conditions</button></li>
          <li><button type="button" class="footer-modal-btn" data-modal="privacy" style="background:none;border:none;padding:0;color:#94a3b8;font-size:0.84rem;cursor:pointer;text-align:left;">Privacy Policy</button></li>
          <li><button type="button" class="footer-modal-btn" data-modal="assured" style="background:none;border:none;padding:0;color:#94a3b8;font-size:0.84rem;cursor:pointer;text-align:left;">Assured Terms</button></li>
          <li><button type="button" class="footer-modal-btn" data-modal="security" style="background:none;border:none;padding:0;color:#94a3b8;font-size:0.84rem;cursor:pointer;text-align:left;">Security Policy</button></li>
        </ul>
      </div>

      <!-- Trusted & Certified Column -->
      <div>
        <div style="color:#ffffff;font-weight:700;font-size:0.88rem;margin-bottom:1.2rem;text-transform:uppercase;letter-spacing:0.5px;">
          Trusted & Certified
        </div>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:1.5rem;">
          <div style="background:rgba(30,96,255,0.1);border:1.5px solid rgba(30,96,255,0.4);border-radius:10px;padding:8px 14px;text-align:center;">
            <div style="color:#38bdf8;font-size:0.78rem;font-weight:800;">ISMS</div>
            <div style="color:#94a3b8;font-size:0.65rem;">ISO 27001:2013</div>
          </div>
          <div style="background:rgba(16,185,129,0.1);border:1.5px solid rgba(16,185,129,0.4);border-radius:10px;padding:8px 14px;text-align:center;">
            <div style="color:#10b981;font-size:0.78rem;font-weight:800;">CERTIFIED</div>
            <div style="color:#94a3b8;font-size:0.65rem;">Bank-Grade 256</div>
          </div>
        </div>
        <p style="color:#64748b;font-size:0.78rem;line-height:1.6;margin:0;">
          All records, GST/ITR filings, and corporate documents are housed with 256-bit encryption and role-based access.
        </p>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div style="padding-top:2rem;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.78rem;color:#64748b;">
      <div>© <?php echo esc_html(date('Y')); ?> Cloud Ledger. All rights reserved. | <?php echo esc_html(get_theme_mod('cl_website', 'cloudledger.in')); ?></div>
      <div style="display:flex;gap:1.5rem;">
        <button type="button" class="footer-modal-btn" data-modal="privacy" style="background:none;border:none;padding:0;color:#64748b;font-size:0.78rem;cursor:pointer;">Privacy Policy</button>
        <button type="button" class="footer-modal-btn" data-modal="terms" style="background:none;border:none;padding:0;color:#64748b;font-size:0.78rem;cursor:pointer;">Terms of Use</button>
        <button type="button" class="footer-modal-btn" data-modal="security" style="background:none;border:none;padding:0;color:#64748b;font-size:0.78rem;cursor:pointer;">Security</button>
      </div>
    </div>
  </div>
</footer>

<!-- ── INTERACTIVE LEGAL & COMPANY MODAL ── -->
<div id="cl-legal-modal-backdrop" style="display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);align-items:center;justify-content:center;padding:1.5rem;">
  <div style="background:#121316;border-radius:24px;width:100%;maxWidth:680px;maxHeight:90vh;overflow-y:auto;padding:clamp(1.5rem,4vw,2.5rem);box-shadow:0 30px 80px rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.12);position:relative;">
    <button id="cl-close-legal-modal" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:50%;width:34px;height:34px;color:#ffffff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.9rem;">✕</button>
    <div id="cl-legal-modal-content"></div>
  </div>
</div>

<!-- ── TIMED ENQUIRY POPUP (Pops up after 1.2s on page load) ── -->
<div id="cl-enquiry-popup-backdrop" style="display:none;position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,0.82);align-items:center;justify-content:center;padding:1.25rem;">
  <div style="background:#121316;border-radius:24px;max-width:480px;width:100%;max-height:92vh;overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.12);position:relative;">
    
    <div style="background:radial-gradient(circle at 50% 0%, rgba(30,96,255,0.18) 0%, #0d0f14 70%);padding:clamp(1.4rem,4vw,2rem) clamp(1.2rem,4vw,2rem) 1.2rem;color:white;position:relative;border-bottom:1px solid rgba(255,255,255,0.08);">
      <button id="cl-close-enquiry-popup" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:50%;width:32px;height:32px;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.85rem;">✕</button>

      <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);color:#10b981;padding:3px 12px;border-radius:100px;font-size:0.72rem;font-weight:800;text-transform:uppercase;margin-bottom:10px;">
        <span style="width:6px;height:6px;background:#10b981;border-radius:50%;"></span>
        Free Consultation
      </div>

      <h3 style="font-size:clamp(1.2rem,4vw,1.45rem);font-weight:800;margin:0 0 6px;color:white;line-height:1.25;font-family:'Inter',sans-serif;">
        Speak with an Advisory Specialist
      </h3>
      <p style="margin:0;color:#94a3b8;font-size:0.84rem;line-height:1.5;">
        Get expert clarity on GST, ITR, Company Incorporation, or Accounting for your business.
      </p>
    </div>

    <div style="padding:clamp(1.2rem,4vw,1.8rem) clamp(1.2rem,4vw,2rem) 2rem;">
      <form id="cl-popup-form">
        <div style="margin-bottom:1rem;">
          <label style="display:block;font-size:0.78rem;font-weight:600;color:#94a3b8;margin-bottom:5px;">Your Name *</label>
          <input name="name" required placeholder="e.g. Vikram Verma" style="width:100%;padding:11px 14px;border-radius:10px;background:#090a0d;border:1.5px solid rgba(255,255,255,0.12);color:white;font-size:0.88rem;outline:none;" />
        </div>

        <div style="margin-bottom:1rem;">
          <label style="display:block;font-size:0.78rem;font-weight:600;color:#94a3b8;margin-bottom:5px;">Mobile / WhatsApp Number *</label>
          <input name="phone" type="tel" required placeholder="e.g. 7827225372" style="width:100%;padding:11px 14px;border-radius:10px;background:#090a0d;border:1.5px solid rgba(255,255,255,0.12);color:white;font-size:0.88rem;outline:none;" />
        </div>

        <div style="margin-bottom:1.4rem;">
          <label style="display:block;font-size:0.78rem;font-weight:600;color:#94a3b8;margin-bottom:5px;">Service You Need Assistance With</label>
          <select name="service" style="width:100%;padding:11px 14px;border-radius:10px;background:#090a0d;border:1.5px solid rgba(255,255,255,0.12);color:white;font-size:0.88rem;outline:none;">
            <option value="GST Registration & Monthly Returns">GST Registration & Monthly Returns</option>
            <option value="Income Tax Return (ITR) Filing">Income Tax Return (ITR) Filing</option>
            <option value="Private Limited / LLP Incorporation">Private Limited / LLP Incorporation</option>
            <option value="Monthly Bookkeeping & Accounting">Monthly Bookkeeping & Accounting</option>
            <option value="Internal Audit & Process Review">Internal Audit & Process Review</option>
            <option value="NGO 12A / 80G Registration">NGO 12A / 80G Registration</option>
            <option value="MSME Udyam Registration">MSME Udyam Registration</option>
            <option value="Other Business Support">Other Business Support</option>
          </select>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          <button type="submit" id="cl-popup-submit-btn" style="width:100%;height:46px;border-radius:9999px;background:#ffffff;color:#000000;font-weight:700;font-size:0.92rem;cursor:pointer;border:none;display:flex;align-items:center;justify-content:center;gap:8px;">
            <i class="fas fa-paper-plane"></i> Request Free Callback
          </button>

          <button type="button" id="cl-popup-wa-btn" style="width:100%;height:46px;border-radius:9999px;background:#25d466;color:#ffffff;font-weight:700;font-size:0.92rem;cursor:pointer;border:none;display:flex;align-items:center;justify-content:center;gap:8px;">
            <i class="fab fa-whatsapp" style="font-size:1.1rem;"></i> Connect on WhatsApp
          </button>
        </div>

        <div style="text-align:center;margin-top:1.2rem;">
          <button type="button" id="cl-popup-cancel-btn" style="background:none;border:none;color:#64748b;font-size:0.78rem;cursor:pointer;">
            No thanks, I will browse first
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- ── FLOATING WHATSAPP CHAT BUTTON ── -->
<div style="position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;align-items:flex-end;gap:10px;">
  <div id="cl-wa-bubble" style="display:none;background:white;border-radius:14px;padding:14px 18px;box-shadow:0 20px 40px rgba(0,0,0,0.15);max-width:240px;animation:slideUp 0.3s ease;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
      <div style="font-weight:700;color:#0A1F44;font-size:0.88rem;">💬 Cloud Ledger Support</div>
      <button id="cl-wa-bubble-close" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:0.9rem;line-height:1;">✕</button>
    </div>
    <div style="color:#64748b;font-size:0.78rem;margin-bottom:12px;line-height:1.5;">
      We're online! Chat with our specialist desk for fast advisory.
    </div>
    <a href="<?php echo esc_url($wa_link); ?>" target="_blank" rel="noreferrer" style="display:flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(135deg, #25D466, #128C7E);color:white;padding:9px 14px;border-radius:8px;text-decoration:none;font-size:0.82rem;font-weight:700;">
      <i class="fab fa-whatsapp"></i> Start Chat
    </a>
  </div>

  <button id="cl-wa-float-btn" style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg, #25D466, #128C7E);color:white;border:none;font-size:26px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(37,212,102,0.5);animation:waPulse 3s ease-in-out infinite;" title="Chat on WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </button>
</div>

<!-- ── SERVICE DETAIL MODAL CONTAINER (Populated dynamically on card click) ── -->
<div id="cl-service-detail-modal-backdrop" style="display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);align-items:center;justify-content:center;padding:1.5rem;">
  <div style="background:#121316;border-radius:24px;width:100%;max-width:760px;max-height:90vh;overflow-y:auto;padding:clamp(1.5rem,4vw,2.5rem);box-shadow:0 25px 60px rgba(0,0,0,0.8);position:relative;border:1px solid rgba(255,255,255,0.12);">
    <button id="cl-close-service-modal" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#ffffff;font-size:1rem;">✕</button>
    <div id="cl-service-modal-content"></div>
  </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
