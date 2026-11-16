<?php
/**
 * 404 Page Template
 *
 * @package Cloud_Ledger
 */

get_header();
?>

<main id="primary" class="site-main" style="padding-top: 140px; padding-bottom: 100px; min-height: 80vh; background: #000000; display: flex; align-items: center;">
  <div class="container" style="text-align: center; max-width: 600px;">
    <div style="font-size: 5rem; font-weight: 900; color: #1e60ff; line-height: 1; margin-bottom: 1rem;">404</div>
    <h1 style="font-size: 1.8rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">Page Not Found</h1>
    <p style="color: #94a3b8; font-size: 1rem; line-height: 1.6; margin-bottom: 2rem;">
      The statutory resource or section you are looking for has been moved or does not exist. Explore our complete compliance catalogue or return to the homepage.
    </p>
    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-blue" style="padding: 10px 22px;">
        <i class="fa-solid fa-house"></i> Return Home
      </a>
      <a href="<?php echo esc_url(home_url('/#services')); ?>" class="btn btn-navy" style="padding: 10px 22px;">
        Explore Services
      </a>
    </div>
  </div>
</main>

<?php get_footer(); ?>