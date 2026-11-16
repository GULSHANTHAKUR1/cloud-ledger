<?php
/**
 * The main template file
 *
 * @package Cloud_Ledger
 * @version 1.0.0
 */

get_header();
?>

<div style="padding:120px 1.5rem 80px;background:#000000;min-height:80vh;">
  <div class="container" style="max-width:900px;margin:0 auto;">
    <h1 style="color:#ffffff;font-size:2.5rem;font-weight:900;margin-bottom:2rem;">
      <?php single_post_title(); ?>
    </h1>

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <article style="background:#0d1118;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:2rem;margin-bottom:2rem;">
        <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:0.75rem;">
          <a href="<?php the_permalink(); ?>" style="color:#ffffff;text-decoration:none;"><?php the_title(); ?></a>
        </h2>
        <div style="color:#64748b;font-size:0.8rem;margin-bottom:1rem;">
          Published: <?php echo get_the_date(); ?>
        </div>
        <div style="color:#94a3b8;font-size:0.92rem;line-height:1.7;">
          <?php the_excerpt(); ?>
        </div>
      </article>
    <?php endwhile; the_posts_navigation(); else : ?>
      <p style="color:#94a3b8;">No posts found.</p>
    <?php endif; ?>
  </div>
</div>

<?php
get_footer();
