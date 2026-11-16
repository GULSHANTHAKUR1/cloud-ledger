<?php
/**
 * Single Service Template
 * Standard statutory service blueprint according to Section 5.2
 *
 * @package Cloud_Ledger
 */

get_header();

$wa_number = get_theme_mod('cl_whatsapp', '917827225372');
$phone     = get_theme_mod('cl_phone', '+91 78272 25372');
$email     = get_theme_mod('cl_email', 'hello@cloudledger.in');

$categories = get_the_terms(get_the_ID(), 'service_category');
$category_name = ($categories && !is_wp_error($categories)) ? $categories[0]->name : 'Statutory Service';
$category_slug = ($categories && !is_wp_error($categories)) ? $categories[0]->slug : 'all';

// Custom meta fields or fallbacks
$timeline    = get_post_meta(get_the_ID(), '_cl_timeline', true) ?: '3 – 7 Working Days (Subject to Ministry processing)';
$authority   = get_post_meta(get_the_ID(), '_cl_authority', true) ?: 'Ministry of Corporate Affairs (MCA) / GSTN';
$statute     = get_post_meta(get_the_ID(), '_cl_statute', true) ?: 'Companies Act 2013 / CGST Act 2017 / IT Act 1961';
$govt_fee    = get_post_meta(get_the_ID(), '_cl_govt_fee', true) ?: 'Statutory Fees as per official portal schedule';
$prof_fee    = get_post_meta(get_the_ID(), '_cl_prof_fee', true) ?: 'Transparent facilitation fees; subject to scope confirmation';
?>

<main id="primary" class="site-main" style="padding-top: 100px; min-height: 80vh; background: #000000;">

  <!-- Service Header / Breadcrumbs -->
  <section style="padding: 2.5rem 0 2rem; background: linear-gradient(180deg, rgba(30,96,255,0.08) 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid rgba(255,255,255,0.08);">
    <div class="container">
      <div style="font-size: 0.82rem; color: #64748b; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
        <a href="<?php echo esc_url(home_url('/')); ?>" style="color: #94a3b8; text-decoration: none;"><i class="fa-solid fa-house"></i> Home</a>
        <span>/</span>
        <a href="<?php echo esc_url(home_url('/#services')); ?>" style="color: #94a3b8; text-decoration: none;">Services</a>
        <span>/</span>
        <span style="color: #38bdf8;"><?php echo esc_html($category_name); ?></span>
      </div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
        <span style="background: rgba(30,96,255,0.18); border: 1px solid rgba(30,96,255,0.35); color: #60a5fa; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 9999px;">
          <?php echo esc_html($category_name); ?>
        </span>
        <span style="background: rgba(37,212,102,0.12); border: 1px solid rgba(37,212,102,0.3); color: #4ade80; font-size: 0.75rem; font-weight: 600; padding: 4px 12px; border-radius: 9999px;">
          <i class="fa-regular fa-clock"></i> <?php echo esc_html($timeline); ?>
        </span>
        <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; font-size: 0.75rem; font-weight: 500; padding: 4px 12px; border-radius: 9999px;">
          <i class="fa-solid fa-landmark"></i> <?php echo esc_html($authority); ?>
        </span>
      </div>

      <h1 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 1rem; line-height: 1.25;">
        <?php the_title(); ?>
      </h1>

      <p style="font-size: 1.05rem; color: #94a3b8; max-width: 840px; line-height: 1.6; margin: 0;">
        <?php echo esc_html(get_the_excerpt() ?: 'Complete statutory documentation, preparation, procedural filing and compliance management under official regulatory standards.'); ?>
      </p>
    </div>
  </section>

  <!-- Service Details & Inquiry Grid -->
  <section style="padding: 3rem 0 5rem;">
    <div class="container" style="display: grid; grid-template-columns: 1.8fr 1fr; gap: 2.5rem; align-items: start;">

      <!-- Left Column: Detailed Specification -->
      <div style="display: flex; flex-direction: column; gap: 2rem;">

        <!-- 1. Meaning & Business Benefits -->
        <div style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem;">
            <i class="fa-solid fa-circle-check" style="color: #25d466;"></i> Overview & Business Purpose
          </h2>
          <div class="service-content-body" style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.7;">
            <?php
            if (have_posts()) :
              while (have_posts()) : the_post();
                the_content();
              endwhile;
            else :
            ?>
              <p>This statutory service provides full lifecycle compliance processing, ensuring all registration documentation, verification steps, and filing returns comply strictly with prevailing regulations.</p>
              <p>Business benefits include statutory legitimacy, zero-penalty governance, seamless commercial banking enablement, and verified credentials for institutional contracts.</p>
            <?php endif; ?>
          </div>
        </div>

        <!-- 2. Applicability & Eligibility -->
        <div style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem;">
            <i class="fa-solid fa-user-check" style="color: #1e60ff;"></i> Applicability & Who Needs This
          </h2>
          <ul style="color: #94a3b8; font-size: 0.92rem; line-height: 1.7; padding-left: 1.25rem; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
            <li>Early-stage startups and founding teams establishing formal commercial entities in India.</li>
            <li>Operating businesses exceeding mandatory annual turnover thresholds or expanding inter-state.</li>
            <li>Enterprises seeking vendor onboarding, government tenders, or intellectual property asset security.</li>
            <li>Directors and designated partners maintaining statutory annual returns under MCA & CBDT guidelines.</li>
          </ul>
        </div>

        <!-- 3. Required Documents Checklist -->
        <div style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.6rem;">
            <i class="fa-solid fa-folder-open" style="color: #eab308;"></i> Required Documents Checklist
          </h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 1.25rem;">
              <h3 style="font-size: 0.9rem; font-weight: 700; color: #38bdf8; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Directors / Promoters</h3>
              <ul style="color: #cbd5e1; font-size: 0.85rem; line-height: 1.6; padding-left: 1.1rem; margin: 0;">
                <li>PAN Card copy (Self-attested)</li>
                <li>Identity Proof (Aadhaar / Passport / Voter ID)</li>
                <li>Address Proof (Bank Statement &lt; 2 months old)</li>
                <li>Passport size photograph & Digital Signature (DSC)</li>
              </ul>
            </div>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 1.25rem;">
              <h3 style="font-size: 0.9rem; font-weight: 700; color: #4ade80; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Registered Office</h3>
              <ul style="color: #cbd5e1; font-size: 0.85rem; line-height: 1.6; padding-left: 1.1rem; margin: 0;">
                <li>Electricity Bill / Gas Utility Bill (&lt; 2 months)</li>
                <li>No-Objection Certificate (NOC) from Property Owner</li>
                <li>Rent Agreement / Ownership Deed</li>
                <li>Board Resolution / Authorization Letter</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 4. Step-by-Step Procedure & Governance -->
        <div style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.6rem;">
            <i class="fa-solid fa-list-ol" style="color: #a855f7;"></i> Procedural Workflow
          </h2>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #1e60ff; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">1</div>
              <div>
                <h4 style="color: #ffffff; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem;">Document Verification & Eligibility Review</h4>
                <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Our compliance desk audits all uploaded certificates and validates name availability and statutory prerequisites.</p>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #1e60ff; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">2</div>
              <div>
                <h4 style="color: #ffffff; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem;">Drafting, DSC Affixation & Form Assembly</h4>
                <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Preparation of statutory e-forms, charter documents (MOA/AOA, Deeds, Declarations), and digital certification.</p>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #1e60ff; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">3</div>
              <div>
                <h4 style="color: #ffffff; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem;">Ministry Portal Submission & Fee Settlement</h4>
                <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Lodging on official portal (MCA V3, GSTN, TRACES, IP India) and generation of government Challan acknowledgement.</p>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #25d466; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0;">4</div>
              <div>
                <h4 style="color: #ffffff; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem;">Approval, Certificate Delivery & Vault Storage</h4>
                <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Issuance of official Certificate of Incorporation / Registration Number, archived directly into your secure client vault.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Transparent Fee & Timeline Disclosures -->
        <div style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem;">
            <i class="fa-solid fa-receipt" style="color: #38bdf8;"></i> Fee Structure & Statutory Disclosures
          </h2>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px;">
              <div style="font-size: 0.78rem; color: #94a3b8; text-transform: uppercase;">Government Charges</div>
              <div style="font-size: 0.95rem; font-weight: 600; color: #ffffff; margin-top: 4px;"><?php echo esc_html($govt_fee); ?></div>
            </div>
            <div style="padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px;">
              <div style="font-size: 0.78rem; color: #94a3b8; text-transform: uppercase;">Professional Facilitation</div>
              <div style="font-size: 0.95rem; font-weight: 600; color: #25d466; margin-top: 4px;"><?php echo esc_html($prof_fee); ?></div>
            </div>
          </div>

          <div style="font-size: 0.78rem; color: #64748b; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.75rem;">
            <i class="fa-solid fa-shield-halved"></i> <strong>Statutory Notice:</strong> Government portal fees and stamp duties are determined by official state rates and authorized capital. Cloud Ledger provides clear receipts for all ministry challans.
          </div>
        </div>

      </div>

      <!-- Right Column: Consultation Card & Quick Enquiry Form -->
      <aside style="position: sticky; top: 90px; display: flex; flex-direction: column; gap: 1.5rem;">

        <!-- Quick Action Box -->
        <div style="background: linear-gradient(135deg, rgba(30,96,255,0.12) 0%, rgba(37,212,102,0.06) 100%), #080a0e; border: 1px solid rgba(30,96,255,0.25); border-radius: 16px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: #38bdf8; font-weight: 700; letter-spacing: 0.08em; margin-bottom: 0.5rem;">Instant Compliance Support</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #ffffff; margin-bottom: 0.75rem;">Speak with our Compliance Desk</h3>
          <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1.5rem;">Get exact document eligibility, statutory timeline, and professional fee assessment for your business entity.</p>

          <a href="https://wa.me/<?php echo esc_attr($wa_number); ?>?text=<?php echo rawurlencode('Hello Cloud Ledger, I need consultation regarding ' . get_the_title()); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; justify-content: center; font-size: 0.92rem; padding: 12px; margin-bottom: 0.75rem;">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> Consult on WhatsApp
          </a>

          <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $phone)); ?>" class="btn btn-navy" style="width: 100%; justify-content: center; font-size: 0.88rem; padding: 10px;">
            <i class="fa-solid fa-phone"></i> Call <?php echo esc_html($phone); ?>
          </a>
        </div>

        <!-- Consultation Form Box -->
        <div style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem;">Request Filing Assessment</h3>
          <p style="font-size: 0.82rem; color: #94a3b8; margin-bottom: 1.25rem;">Submit your details and our team will get in touch within 2 business hours.</p>

          <form class="cl-ajax-enquiry-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
            <input type="hidden" name="service" value="<?php echo esc_attr(get_the_title()); ?>" />

            <div>
              <input type="text" name="name" required placeholder="Full Name *" class="cl-input" style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 10px 12px; font-size: 0.85rem;" />
            </div>

            <div>
              <input type="tel" name="phone" required placeholder="WhatsApp / Phone Number *" class="cl-input" style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 10px 12px; font-size: 0.85rem;" />
            </div>

            <div>
              <input type="email" name="email" placeholder="Official Email (Optional)" class="cl-input" style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 10px 12px; font-size: 0.85rem;" />
            </div>

            <div>
              <textarea name="message" rows="3" placeholder="Brief requirements or entity state..." class="cl-input" style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 10px 12px; font-size: 0.85rem; resize: vertical;"></textarea>
            </div>

            <button type="submit" class="btn btn-blue" style="width: 100%; justify-content: center; padding: 11px; font-size: 0.88rem; font-weight: 600;">
              Submit Request
            </button>
            <div class="form-feedback" style="font-size: 0.8rem; margin-top: 4px; display: none;"></div>
          </form>
        </div>

      </aside>

    </div>
  </section>

</main>

<?php get_footer(); ?>