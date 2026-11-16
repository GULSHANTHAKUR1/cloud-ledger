<?php
/**
 * Single Standard Post Template
 *
 * @package Cloud_Ledger
 */

get_header();
?>

<main id="primary" class="site-main" style="padding-top: 100px; min-height: 80vh; background: #000000;">

  <section style="padding: 3rem 0 2rem; background: linear-gradient(180deg, rgba(30,96,255,0.06) 0%, rgba(0,0,0,0) 100%); border-bottom: 1px solid rgba(255,255,255,0.08);">
    <div class="container" style="max-width: 860px;">
      <div style="font-size: 0.82rem; color: #64748b; margin-bottom: 1rem;">
        <a href="<?php echo esc_url(home_url('/')); ?>" style="color: #94a3b8; text-decoration: none;"><i class="fa-solid fa-house"></i> Home</a> / Post
      </div>
      <h1 style="font-size: clamp(1.8rem, 3.2vw, 2.5rem); font-weight: 800; color: #ffffff; letter-spacing: -0.02em; line-height: 1.3; margin-bottom: 0.5rem;">
        <?php the_title(); ?>
      </h1>
      <div style="color: #64748b; font-size: 0.82rem;">
        <i class="fa-regular fa-calendar"></i> <?php echo get_the_date('M d, Y'); ?>
      </div>
    </div>
  </section>

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
      </article>
    </div>
  </section>

</main>

<?php get_footer(); ?>