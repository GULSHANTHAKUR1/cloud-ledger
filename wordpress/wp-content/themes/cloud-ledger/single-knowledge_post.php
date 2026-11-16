<?php
/**
 * Single Knowledge Post Template (Statutory Updates & Circulars)
 *
 * @package Cloud_Ledger
 */

get_header();

$wa_number = get_theme_mod('cl_whatsapp', '917827225372');
$phone     = get_theme_mod('cl_phone', '+91 78272 25372');

$categories = get_the_terms(get_the_ID(), 'knowledge_category');
$cat_name = ($categories && !is_wp_error($categories)) ? $categories[0]->name : 'Regulatory Update';
?>

<main id="primary" class="site-main" style="padding-top: 100px; min-height: 80vh; background: #000000;">

  <!-- Knowledge Header -->
  <section style="padding: 3rem 0 2rem; background: linear-gradient(180deg, rgba(30,96,255,0.06) 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid rgba(255,255,255,0.08);">
    <div class="container" style="max-width: 860px;">
      <div style="font-size: 0.82rem; color: #64748b; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <a href="<?php echo esc_url(home_url('/')); ?>" style="color: #94a3b8; text-decoration: none;"><i class="fa-solid fa-house"></i> Home</a>
        <span>/</span>
        <span style="color: #38bdf8;"><?php echo esc_html($cat_name); ?></span>
      </div>

      <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1rem;">
        <span style="background: rgba(30,96,255,0.18); border: 1px solid rgba(30,96,255,0.35); color: #60a5fa; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 9999px;">
          <?php echo esc_html($cat_name); ?>
        </span>
        <span style="color: #64748b; font-size: 0.82rem;">
          <i class="fa-regular fa-calendar"></i> <?php echo get_the_date('M d, Y'); ?>
        </span>
      </div>

      <h1 style="font-size: clamp(1.8rem, 3.2vw, 2.5rem); font-weight: 800; color: #ffffff; letter-spacing: -0.02em; line-height: 1.3; margin-bottom: 1rem;">
        <?php the_title(); ?>
      </h1>

      <p style="font-size: 1.05rem; color: #94a3b8; line-height: 1.6; margin: 0;">
        <?php echo esc_html(get_the_excerpt()); ?>
      </p>
    </div>
  </section>

  <!-- Knowledge Content -->
  <section style="padding: 3rem 0 5rem;">
    <div class="container" style="max-width: 860px;">
      <article style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2.5rem; color: #cbd5e1; font-size: 1rem; line-height: 1.8;">
        <?php
        if (have_posts()) :
          while (have_posts()) : the_post();
            the_content();
          endwhile;
        endif;
        ?>

        <!-- Clarification / Action Banner -->
        <div style="margin-top: 3rem; padding: 1.75rem; background: rgba(30,96,255,0.06); border: 1px solid rgba(30,96,255,0.25); border-radius: 12px; display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="font-size: 1.1rem; color: #ffffff; font-weight: 700; margin: 0;">Need clarification regarding this statutory update?</h3>
          <p style="font-size: 0.88rem; color: #94a3b8; margin: 0;">Our compliance desk provides real-time advisory on how regulatory amendments affect your business filings and corporate books.</p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="https://wa.me/<?php echo esc_attr($wa_number); ?>?text=<?php echo rawurlencode('Hello Cloud Ledger, I have a query about: ' . get_the_title()); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="font-size: 0.85rem; padding: 9px 18px;">
              <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="btn btn-navy" style="font-size: 0.85rem; padding: 9px 18px;">
              Submit Formal Query
            </a>
          </div>
        </div>

        <!-- Statutory Content Disclaimer -->
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.78rem; color: #64748b; line-height: 1.6;">
          <p style="margin: 0;"><strong>Statutory Disclaimer:</strong> Articles, analysis, and circular summaries published by Cloud Ledger are for educational and informational purposes only and do not constitute formal legal, taxation, or certified audit opinions under ICAI / ICSI regulations. Refer to official government gazettes and notifications before initiating compliance actions.</p>
        </div>
      </article>
    </div>
  </section>

</main>

<?php get_footer(); ?>