<?php
/**
 * Cloud Ledger Theme Functions and definitions
 *
 * @package Cloud_Ledger
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Theme Setup
 */
function cloud_ledger_setup() {
    load_theme_textdomain('cloud-ledger', get_template_directory() . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('customize-selective-refresh-widgets');

    register_nav_menus(array(
        'primary' => __('Primary Navigation Menu', 'cloud-ledger'),
        'footer'  => __('Footer Navigation Menu', 'cloud-ledger'),
    ));
}
add_action('after_setup_theme', 'cloud_ledger_setup');

/**
 * Enqueue Styles and Scripts
 */
function cloud_ledger_scripts() {
    // Google Fonts: Inter
    wp_enqueue_style('cloud-ledger-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', array(), null);

    // FontAwesome 6
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', array(), '6.5.1');

    // Main Theme Stylesheet
    wp_enqueue_style('cloud-ledger-style', get_stylesheet_uri(), array('cloud-ledger-fonts', 'font-awesome'), '1.0.0');

    // Main Theme JavaScript (Calculators, Modals, Scroll Spy, Popup)
    wp_enqueue_script('cloud-ledger-main', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true);

    // Localize Script for AJAX
    wp_localize_script('cloud-ledger-main', 'cloudLedgerData', array(
        'ajaxUrl'   => admin_url('admin-ajax.php'),
        'nonce'     => wp_create_nonce('cloud_ledger_nonce'),
        'waNumber'  => get_theme_mod('cl_whatsapp', '917827225372'),
        'phone'     => get_theme_mod('cl_phone', '+91 78272 25372'),
        'email'     => get_theme_mod('cl_email', 'hello@cloudledger.in'),
    ));
}
add_action('wp_enqueue_scripts', 'cloud_ledger_scripts');

/**
 * WordPress Customizer - Allows Client to Customize Everything
 */
function cloud_ledger_customize_register($wp_customize) {
    // Main Panel: Cloud Ledger Settings
    $wp_customize->add_panel('cloud_ledger_panel', array(
        'title'       => __('Cloud Ledger Settings', 'cloud-ledger'),
        'description' => __('Manage corporate contact details, hero content, stats, and about information.', 'cloud-ledger'),
        'priority'    => 20,
    ));

    // Section 1: Contact & WhatsApp Info
    $wp_customize->add_section('cl_contact_section', array(
        'title'    => __('Company Contact & WhatsApp', 'cloud-ledger'),
        'panel'    => 'cloud_ledger_panel',
        'priority' => 10,
    ));

    $contacts = array(
        'cl_phone'    => array('label' => __('Direct Helpline Phone', 'cloud-ledger'), 'default' => '+91 78272 25372'),
        'cl_whatsapp' => array('label' => __('WhatsApp Number (without +)', 'cloud-ledger'), 'default' => '917827225372'),
        'cl_email'    => array('label' => __('Official Email Address', 'cloud-ledger'), 'default' => 'hello@cloudledger.in'),
        'cl_hours'    => array('label' => __('Operating Hours', 'cloud-ledger'), 'default' => 'Mon–Sat 9AM–6PM IST'),
        'cl_website'  => array('label' => __('Primary Website Domain', 'cloud-ledger'), 'default' => 'cloudledger.in'),
    );

    foreach ($contacts as $id => $data) {
        $wp_customize->add_setting($id, array('default' => $data['default'], 'sanitize_callback' => 'sanitize_text_field'));
        $wp_customize->add_control($id, array('label' => $data['label'], 'section' => 'cl_contact_section', 'type' => 'text'));
    }

    // Section 2: Hero Section
    $wp_customize->add_section('cl_hero_section', array(
        'title'    => __('Hero Section Headline & Subtitle', 'cloud-ledger'),
        'panel'    => 'cloud_ledger_panel',
        'priority' => 20,
    ));

    $wp_customize->add_setting('cl_hero_badge', array(
        'default'           => __("India's Corporate Compliance & Statutory Platform", 'cloud-ledger'),
        'sanitize_callback' => 'sanitize_text_field'
    ));
    $wp_customize->add_control('cl_hero_badge', array(
        'label'   => __('Hero Badge Text', 'cloud-ledger'),
        'section' => 'cl_hero_section',
        'type'    => 'text'
    ));

    $wp_customize->add_setting('cl_hero_title', array(
        'default'           => __('Statutory Compliance, Taxation & Business Management', 'cloud-ledger'),
        'sanitize_callback' => 'sanitize_text_field'
    ));
    $wp_customize->add_control('cl_hero_title', array(
        'label'   => __('Hero Main Title', 'cloud-ledger'),
        'section' => 'cl_hero_section',
        'type'    => 'text'
    ));

    $wp_customize->add_setting('cl_hero_desc', array(
        'default'           => __('Comprehensive multi-state GST filing, Income Tax returns, SPICe+ MCA company registrations, and automated accounting for Indian enterprises.', 'cloud-ledger'),
        'sanitize_callback' => 'sanitize_textarea_field'
    ));
    $wp_customize->add_control('cl_hero_desc', array(
        'label'   => __('Hero Subtitle Description', 'cloud-ledger'),
        'section' => 'cl_hero_section',
        'type'    => 'textarea'
    ));

    // Section 3: Stats Bar Numbers
    $wp_customize->add_section('cl_stats_section', array(
        'title'    => __('Stats Bar Numbers & Labels', 'cloud-ledger'),
        'panel'    => 'cloud_ledger_panel',
        'priority' => 30,
    ));

    $stats = array(
        'cl_stat_1_num'   => array('label' => __('Stat 1 Number', 'cloud-ledger'), 'default' => '315'),
        'cl_stat_1_label' => array('label' => __('Stat 1 Label', 'cloud-ledger'), 'default' => 'Statutory Services'),
        'cl_stat_2_num'   => array('label' => __('Stat 2 Number', 'cloud-ledger'), 'default' => '15'),
        'cl_stat_2_label' => array('label' => __('Stat 2 Label', 'cloud-ledger'), 'default' => 'Service Categories'),
        'cl_stat_3_num'   => array('label' => __('Stat 3 Number', 'cloud-ledger'), 'default' => '100'),
        'cl_stat_3_label' => array('label' => __('Stat 3 Label', 'cloud-ledger'), 'default' => 'Filing Accuracy Rate'),
        'cl_stat_4_num'   => array('label' => __('Stat 4 Number', 'cloud-ledger'), 'default' => '24'),
        'cl_stat_4_label' => array('label' => __('Stat 4 Label', 'cloud-ledger'), 'default' => 'Client Vault Access'),
    );

    foreach ($stats as $id => $data) {
        $wp_customize->add_setting($id, array('default' => $data['default'], 'sanitize_callback' => 'sanitize_text_field'));
        $wp_customize->add_control($id, array('label' => $data['label'], 'section' => 'cl_stats_section', 'type' => 'text'));
    }

    // Section 4: About Mission & Vision
    $wp_customize->add_section('cl_about_section', array(
        'title'    => __('About Mission & Vision', 'cloud-ledger'),
        'panel'    => 'cloud_ledger_panel',
        'priority' => 40,
    ));

    $wp_customize->add_setting('cl_mission_text', array(
        'default'           => __('To remove compliance friction so entrepreneurs can focus entirely on scaling their core operations.', 'cloud-ledger'),
        'sanitize_callback' => 'sanitize_textarea_field'
    ));
    $wp_customize->add_control('cl_mission_text', array('label' => __('Our Mission Text', 'cloud-ledger'), 'section' => 'cl_about_section', 'type' => 'textarea'));

    $wp_customize->add_setting('cl_vision_text', array(
        'default'           => __("To become India's premier integrated digital business compliance and management ecosystem.", 'cloud-ledger'),
        'sanitize_callback' => 'sanitize_textarea_field'
    ));
    $wp_customize->add_control('cl_vision_text', array('label' => __('Our Vision Text', 'cloud-ledger'), 'section' => 'cl_about_section', 'type' => 'textarea'));
}
add_action('customize_register', 'cloud_ledger_customize_register');

/**
 * Register Custom Post Types: Services, Knowledge Updates, Enquiries
 */
function cloud_ledger_register_post_types() {
    // 1. Services Catalogue (315 planned services)
    register_post_type('service', array(
        'labels' => array(
            'name'               => __('Services', 'cloud-ledger'),
            'singular_name'      => __('Service', 'cloud-ledger'),
            'add_new_item'       => __('Add New Statutory Service', 'cloud-ledger'),
            'edit_item'          => __('Edit Service', 'cloud-ledger'),
            'all_items'          => __('All Services (315 Catalogue)', 'cloud-ledger'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => array('slug' => 'services'),
        'menu_icon'    => 'dashicons-clipboard',
        'supports'     => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'show_in_rest' => true,
    ));

    // Service Categories (15 DRS Sectors)
    register_taxonomy('service_category', 'service', array(
        'labels' => array(
            'name'          => __('Service Categories (15 Sectors)', 'cloud-ledger'),
            'singular_name' => __('Service Category', 'cloud-ledger'),
        ),
        'hierarchical' => true,
        'rewrite'      => array('slug' => 'service-category'),
        'show_in_rest' => true,
    ));

    // 2. Knowledge Centre / Daily Regulatory Updates
    register_post_type('knowledge_post', array(
        'labels' => array(
            'name'          => __('Knowledge Centre', 'cloud-ledger'),
            'singular_name' => __('Regulatory Brief', 'cloud-ledger'),
            'add_new_item'  => __('Publish Daily Compliance Circular', 'cloud-ledger'),
            'all_items'     => __('All Knowledge Briefs', 'cloud-ledger'),
        ),
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => array('slug' => 'knowledge'),
        'menu_icon'    => 'dashicons-welcome-write-blog',
        'supports'     => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'show_in_rest' => true,
    ));

    register_taxonomy('knowledge_category', 'knowledge_post', array(
        'labels' => array(
            'name'          => __('Update Categories', 'cloud-ledger'),
            'singular_name' => __('Category', 'cloud-ledger'),
        ),
        'hierarchical' => true,
        'rewrite'      => array('slug' => 'knowledge-category'),
        'show_in_rest' => true,
    ));

    // 3. Leads & Enquiries Inbox (Visible in wp-admin)
    register_post_type('cl_enquiry', array(
        'labels' => array(
            'name'          => __('Leads & Enquiries', 'cloud-ledger'),
            'singular_name' => __('Enquiry', 'cloud-ledger'),
            'all_items'     => __('All Website Enquiries', 'cloud-ledger'),
        ),
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-email-alt',
        'supports'           => array('title'),
        'capability_type'    => 'post',
        'capabilities'       => array('create_posts' => false),
        'map_meta_cap'       => true,
    ));
}
add_action('init', 'cloud_ledger_register_post_types');

/**
 * Custom Admin Columns for Enquiries in WordPress Dashboard
 */
function cloud_ledger_enquiry_columns($columns) {
    return array(
        'cb'       => $columns['cb'],
        'title'    => __('Client Name', 'cloud-ledger'),
        'phone'    => __('Phone / WhatsApp', 'cloud-ledger'),
        'email'    => __('Email', 'cloud-ledger'),
        'service'  => __('Requested Service', 'cloud-ledger'),
        'message'  => __('Client Notes', 'cloud-ledger'),
        'date'     => __('Received Date', 'cloud-ledger'),
        'action'   => __('Direct WhatsApp', 'cloud-ledger'),
    );
}
add_filter('manage_cl_enquiry_posts_columns', 'cloud_ledger_enquiry_columns');

function cloud_ledger_enquiry_custom_column($column, $post_id) {
    switch ($column) {
        case 'phone':
            $phone = get_post_meta($post_id, '_cl_phone', true);
            echo esc_html($phone ? $phone : '—');
            break;
        case 'email':
            $email = get_post_meta($post_id, '_cl_email', true);
            echo esc_html($email ? $email : '—');
            break;
        case 'service':
            $service = get_post_meta($post_id, '_cl_service', true);
            echo '<span style="background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;font-weight:600;font-size:11px;">' . esc_html($service ? $service : 'General Enquiry') . '</span>';
            break;
        case 'message':
            $msg = get_post_meta($post_id, '_cl_message', true);
            echo esc_html(wp_trim_words($msg, 8, '...'));
            break;
        case 'action':
            $phone = preg_replace('/[^0-9]/', '', get_post_meta($post_id, '_cl_phone', true));
            if ($phone) {
                if (strlen($phone) === 10) $phone = '91' . $phone;
                echo '<a href="https://wa.me/' . esc_attr($phone) . '" target="_blank" class="button button-small" style="background:#25d466;color:white;border-color:#20bd5a;font-weight:600;"><i class="dashicons dashicons-whatsapp" style="font-size:14px;line-height:22px;"></i> WhatsApp</a>';
            }
            break;
    }
}
add_action('manage_cl_enquiry_posts_custom_column', 'cloud_ledger_enquiry_custom_column', 10, 2);

/**
 * Handle AJAX Enquiry Submission (from Contact Form & Popup)
 */
function cloud_ledger_submit_enquiry_ajax() {
    check_ajax_referer('cloud_ledger_nonce', 'nonce');

    $name    = sanitize_text_field($_POST['name'] ?? '');
    $phone   = sanitize_text_field($_POST['phone'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? 'Via Website');
    $service = sanitize_text_field($_POST['service'] ?? 'General Enquiry');
    $message = sanitize_textarea_field($_POST['message'] ?? '');

    if (empty($name) || empty($phone)) {
        wp_send_json_error(array('message' => 'Please provide Name and Phone number.'));
    }

    $post_id = wp_insert_post(array(
        'post_type'   => 'cl_enquiry',
        'post_title'  => $name,
        'post_status' => 'publish',
    ));

    if (!is_wp_error($post_id)) {
        update_post_meta($post_id, '_cl_phone', $phone);
        update_post_meta($post_id, '_cl_email', $email);
        update_post_meta($post_id, '_cl_service', $service);
        update_post_meta($post_id, '_cl_message', $message);
        update_post_meta($post_id, '_cl_source', 'Website Form');

        wp_send_json_success(array('message' => 'Enquiry received! Our compliance desk will reach out shortly.'));
    } else {
        wp_send_json_error(array('message' => 'Could not save enquiry. Please connect on WhatsApp.'));
    }
}
add_action('wp_ajax_cloud_ledger_submit_enquiry', 'cloud_ledger_submit_enquiry_ajax');
add_action('wp_ajax_nopriv_cloud_ledger_submit_enquiry', 'cloud_ledger_submit_enquiry_ajax');
