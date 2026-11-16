<?php
/**
 * Plugin Name: Cloud Ledger Core
 * Plugin URI: https://cloudledger.in
 * Description: Business logic, client portal shortcodes, interactive calculators, and custom roles for Cloud Ledger.
 * Version: 1.0.0
 * Author: Cloud Ledger Platform Team
 * Author URI: https://cloudledger.in
 * License: GPLv2 or later
 * Text Domain: cloud-ledger-core
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom User Roles on Activation
 */
function cl_core_activate() {
    // 1. Client Role
    add_role('cl_client', __('Cloud Ledger Client', 'cloud-ledger-core'), array(
        'read'         => true,
        'upload_files' => true,
    ));

    // 2. Compliance Staff Role
    add_role('cl_staff', __('Compliance Associate', 'cloud-ledger-core'), array(
        'read'         => true,
        'edit_posts'   => true,
        'upload_files' => true,
    ));
}
register_activation_hook(__FILE__, 'cl_core_activate');

/**
 * Cleanup on Deactivation
 */
function cl_core_deactivate() {
    // Leave roles intact on deactivation to prevent access lockouts
}
register_deactivation_hook(__FILE__, 'cl_core_deactivate');

/**
 * Shortcode: [cloud_ledger_enquiries]
 * Embeds consultation form anywhere in WordPress
 */
function cl_core_enquiries_shortcode($atts) {
    $a = shortcode_atts(array(
        'title' => 'Request Statutory Consultation',
        'subtitle' => 'Our compliance desk will get in touch within 2 business hours.',
    ), $atts);

    ob_start();
    ?>
    <div class="cl-enquiry-widget" style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem; max-width: 520px; margin: 1.5rem auto;">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 0.35rem;"><?php echo esc_html($a['title']); ?></h3>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1.5rem;"><?php echo esc_html($a['subtitle']); ?></p>

        <form class="cl-ajax-enquiry-form" style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
                <input type="text" name="name" required placeholder="Full Name *" style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 12px 14px; font-size: 0.9rem;" />
            </div>
            <div>
                <input type="tel" name="phone" required placeholder="Phone / WhatsApp Number *" style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 12px 14px; font-size: 0.9rem;" />
            </div>
            <div>
                <input type="email" name="email" placeholder="Official Email (Optional)" style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 12px 14px; font-size: 0.9rem;" />
            </div>
            <div>
                <select name="service" style="width: 100%; background: #0c1017; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 12px 14px; font-size: 0.9rem;">
                    <option value="General Consultation">General Compliance Consultation</option>
                    <option value="GST Registration & Filing">GST Registration &amp; Filing</option>
                    <option value="Private Limited Company Registration">Private Limited Company Registration</option>
                    <option value="LLP Incorporation">LLP Incorporation</option>
                    <option value="Income Tax Return">Income Tax Return (ITR)</option>
                    <option value="Trademark Filing">Trademark Filing</option>
                </select>
            </div>
            <div>
                <textarea name="message" rows="3" placeholder="Brief requirement notes..." style="width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; padding: 12px 14px; font-size: 0.9rem; resize: vertical;"></textarea>
            </div>
            <button type="submit" class="btn btn-blue" style="width: 100%; justify-content: center; padding: 12px; font-size: 0.92rem; font-weight: 600; cursor: pointer;">
                Submit Consultation Request
            </button>
            <div class="form-feedback" style="font-size: 0.85rem; margin-top: 6px; display: none;"></div>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('cloud_ledger_enquiries', 'cl_core_enquiries_shortcode');

/**
 * Shortcode: [cloud_ledger_portal]
 * Client dashboard login & document vault entry point
 */
function cl_core_portal_shortcode() {
    $wa_number = get_theme_mod('cl_whatsapp', '917827225372');
    ob_start();
    ?>
    <div class="cl-portal-container" style="background: #080a0e; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 2.5rem; max-width: 900px; margin: 2rem auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
                <span style="background: rgba(30,96,255,0.15); border: 1px solid rgba(30,96,255,0.3); color: #60a5fa; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 9999px;">
                    SECURE CLIENT PORTAL
                </span>
                <h2 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin-top: 0.5rem; margin-bottom: 0;">
                    Corporate Compliance Dashboard
                </h2>
            </div>
            <div>
                <a href="https://wa.me/<?php echo esc_attr($wa_number); ?>?text=Client%20Portal%20Assistance" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="font-size: 0.82rem; padding: 8px 14px;">
                    <i class="fa-brands fa-whatsapp"></i> Desk Liaison
                </a>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 1.5rem;">
                <div style="font-size: 1.8rem; color: #38bdf8; margin-bottom: 0.5rem;"><i class="fa-solid fa-vault"></i></div>
                <h4 style="color: #ffffff; font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">Document Vault</h4>
                <p style="color: #94a3b8; font-size: 0.82rem; line-height: 1.5; margin: 0;">256-bit encrypted repository for statutory filings, GST certificates, and Board charters.</p>
            </div>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 1.5rem;">
                <div style="font-size: 1.8rem; color: #25d466; margin-bottom: 0.5rem;"><i class="fa-solid fa-list-check"></i></div>
                <h4 style="color: #ffffff; font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">Compliance Calendar</h4>
                <p style="color: #94a3b8; font-size: 0.82rem; line-height: 1.5; margin: 0;">Automated statutory timeline alerts for GSTR-1/3B, TDS payments, and MCA annual forms.</p>
            </div>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 1.5rem;">
                <div style="font-size: 1.8rem; color: #f59e0b; margin-bottom: 0.5rem;"><i class="fa-solid fa-file-invoice-dollar"></i></div>
                <h4 style="color: #ffffff; font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">Government Challans</h4>
                <p style="color: #94a3b8; font-size: 0.82rem; line-height: 1.5; margin: 0;">Real-time access to all official Ministry Challans, payment receipts, and ARN updates.</p>
            </div>
        </div>

        <div style="background: rgba(30,96,255,0.05); border: 1px dashed rgba(30,96,255,0.25); border-radius: 12px; padding: 1.5rem; text-align: center;">
            <p style="color: #cbd5e1; font-size: 0.9rem; margin-bottom: 1rem;">
                <i class="fa-solid fa-lock" style="color: #60a5fa;"></i> Authenticated client access is restricted to verified enterprise entities.
            </p>
            <a href="<?php echo esc_url(wp_login_url()); ?>" class="btn btn-blue" style="display: inline-flex; padding: 9px 20px; font-size: 0.85rem;">
                Sign In to Vault
            </a>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('cloud_ledger_portal', 'cl_core_portal_shortcode');

/**
 * Admin Dashboard Widget: Recent Leads Summary
 */
function cl_core_dashboard_widgets() {
    wp_add_dashboard_widget(
        'cl_core_leads_widget',
        __('Cloud Ledger — Inbound Leads & Compliance Desk', 'cloud-ledger-core'),
        'cl_core_dashboard_widget_content'
    );
}
add_action('wp_dashboard_setup', 'cl_core_dashboard_widgets');

function cl_core_dashboard_widget_content() {
    $counts = wp_count_posts('cl_enquiry');
    $published = $counts->publish ?? 0;
    $wa_number = get_theme_mod('cl_whatsapp', '917827225372');
    ?>
    <div style="padding: 10px 0;">
        <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 15px;">
            <div style="font-size: 32px; font-weight: bold; color: #1e60ff;"><?php echo esc_html($published); ?></div>
            <div>
                <strong>Total Client Inquiries Received</strong>
                <p style="margin: 0; color: #64748b; font-size: 12px;">Tracked directly via website contact form and timed popup.</p>
            </div>
        </div>
        <div style="display: flex; gap: 10px;">
            <a href="<?php echo esc_url(admin_url('edit.php?post_type=cl_enquiry')); ?>" class="button button-primary">
                View All Leads
            </a>
            <a href="https://wa.me/<?php echo esc_attr($wa_number); ?>" target="_blank" class="button" style="background:#25d466;color:#fff;border-color:#20bd5a;">
                Open WhatsApp Desk
            </a>
        </div>
    </div>
    <?php
}
