<?php
/**
 * The template for displaying all pages
 *
 * @package Cloud_Ledger
 * @version 1.0.0
 */

get_header();
?>

<div style="padding:130px 1.5rem 90px;background:#000000;min-height:80vh;">
  <div class="container" style="max-width:960px;margin:0 auto;">
    <?php while (have_posts()) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <header style="margin-bottom:2.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,0.08);">
          <h1 style="color:#ffffff;font-size:clamp(2rem, 4vw, 2.8rem);font-weight:900;line-height:1.2;">
            <?php the_title(); ?>
          </h1>
        </header>

        <div style="color:#cbd5e1;font-size:1rem;line-height:1.8;" class="entry-content">
          <?php the_content(); ?>
        </div>
      </article>
    <?php endwhile; ?>
  </div>
</div>

<?php
get_footer();
