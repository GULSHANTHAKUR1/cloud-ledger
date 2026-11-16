<?php
/**
 * Services Archive Template
 *
 * @package Cloud_Ledger
 */

get_header();

$wa_number = get_theme_mod('cl_whatsapp', '917827225372');
?>

<main id="primary" class="site-main" style="padding-top: 100px; min-height: 80vh; background: #000000;">

  <!-- Archive Header -->
  <section style="padding: 3.5rem 0 2.5rem; background: linear-gradient(180deg, rgba(30,96,255,0.08) 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid rgba(255,255,255,0.08); text-align: center;">
    <div class="container" style="max-width: 800px;">
      <span style="background: rgba(30,96,255,0.15); border: 1px solid rgba(30,96,255,0.3); color: #60a5fa; font-size: 0.78rem; font-weight: 700; padding: 4px 14px; border-radius: 9999px; display: inline-block; margin-bottom: 1rem;">
        STATUTORY SERVICES DIRECTORY
      </span>
      <h1 style="font-size: clamp(2rem, 3.8vw, 3rem); font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 1rem;">
        All Services Catalogue
      </h1>
      <p style="font-size: 1.05rem; color: #94a3b8; line-height: 1.6; margin: 0;">
        Browse our comprehensive portfolio of business registration, multi-state GST filing, corporate secretarial compliance, and enterprise advisory services.
      </p>
    </div>
  </section>

  <!-- Service Directory Grid -->
  <section style="padding: 3.5rem 0 5rem;">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
        <?php
        if (have_posts()) :
          while (have_posts()) : the_post();
            $cats = get_the_terms(get_the_ID(), 'service_category');
            $cname = ($cats && !is_wp_error($cats)) ? $cats[0]->name : 'Statutory';
            ?>
            <div class="feature-card" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 0.72rem; font-weight: 600; padding: 3px 10px; border-radius: 9999px; display: inline-block; margin-bottom: 1rem;">
                  <?php echo esc_html($cname); ?>
                </span>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 0.6rem;">
                  <a href="<?php the_permalink(); ?>" style="color: inherit; text-decoration: none;">
                    <?php the_title(); ?>
                  </a>
                </h3>
                <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1.25rem;">
                  <?php echo esc_html(wp_trim_words(get_the_excerpt(), 18, '...')); ?>
                </p>
              </div>

              <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <a href="<?php the_permalink(); ?>" class="btn btn-navy" style="flex: 1; justify-content: center; font-size: 0.8rem; padding: 8px;">
                  View Scope
                </a>
                <a href="https://wa.me/<?php echo esc_attr($wa_number); ?>?text=<?php echo rawurlencode('Enquiry for ' . get_the_title()); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding: 8px 12px; font-size: 0.8rem;">
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
            <?php
          endwhile;
        else :
        ?>
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8;">
            <p>No services found in this category yet. Explore all services on the <a href="<?php echo esc_url(home_url('/#services')); ?>" style="color: #1e60ff;">homepage catalogue</a>.</p>
          </div>
        <?php endif; ?>
      </div>

      <div style="margin-top: 3rem; text-align: center;">
        <?php the_posts_pagination(array('mid_size' => 2)); ?>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>