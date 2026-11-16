# Cloud Ledger — Enterprise WordPress Platform & Statutory Compliance Suite

A custom, native WordPress theme and companion core plugin engineered specifically for **Cloud Ledger** according to the Developer Requirement Specification (DRS).

This solution gives your client **100% self-service content management**, enabling them to edit phone numbers, WhatsApp links, copy, services, calculators, and view all inbound leads directly from the WordPress Admin Dashboard (`wp-admin`) without writing any code.

---

## 📦 What's Included

| Package File | Type | Description |
| :--- | :--- | :--- |
| `cloud-ledger-theme.zip` | WordPress Theme | Cyber-emerald theme, customizer panels, responsive mobile navigation strip, calculators engine, and legal popups. |
| `cloud-ledger-core.zip` | WordPress Plugin | Business logic, custom client/staff user roles, shortcodes (`[cloud_ledger_portal]`, `[cloud_ledger_enquiries]`), and dashboard widgets. |
| `wordpress/` | Unpacked Source | Full uncompressed source code for themes and plugins (`wp-content/themes/cloud-ledger` and `wp-content/plugins/cloud-ledger-core`). |

> [!NOTE]
> **React & Firebase Backup**: The previous React/Vite/Firebase code is fully preserved in the git branch `react-backup` (`git checkout react-backup`).

---

## 🚀 How to Deploy on Hostinger (Step-by-Step)

Hostinger includes built-in 1-click WordPress installation and optimized LiteSpeed hosting. No Firebase setup, Node.js builds, or terminal commands are required!

### Step 1: Install WordPress on Hostinger
1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Websites** → Select your domain (e.g., `cloudledger.in`).
3. Under the **WordPress** section, click **Auto Installer**.
4. Select **WordPress**, set your **Website Title** ("Cloud Ledger"), and choose your **Admin Username & Password**.
5. Click **Install**. Hostinger will configure WordPress, MySQL database, and free SSL certificate in under 60 seconds.

### Step 2: Install the Cloud Ledger Theme
1. Open your WordPress Admin Dashboard (navigate to `https://yourdomain.com/wp-admin`).
2. In the left sidebar, navigate to **Appearance** → **Themes**.
3. Click **Add New Theme** at the top, then click **Upload Theme**.
4. Choose `cloud-ledger-theme.zip` from your local computer and click **Install Now**.
5. Once uploaded, click **Activate**.

### Step 3: Install the Cloud Ledger Core Plugin
1. In the left sidebar, navigate to **Plugins** → **Add New Plugin**.
2. Click **Upload Plugin** at the top.
3. Choose `cloud-ledger-core.zip` from your local computer and click **Install Now**.
4. Once installed, click **Activate Plugin**.

### Step 4: Set the Homepage
1. In `wp-admin`, go to **Pages** → **Add New Page**.
2. Title the page `Home` and click **Publish**.
3. In the left sidebar, go to **Settings** → **Reading**.
4. Under **Your homepage displays**, select **A static page**.
5. Set **Homepage** to `Home` and click **Save Changes**.

---

## 🛠️ How Your Client Can Change Anything (Client Guide)

### 1. Edit Contact Info, WhatsApp & Headlines (Theme Customizer)
1. Go to **Appearance** → **Customize** → **Cloud Ledger Settings**.
2. Here your client can change:
   - **Company Contact & WhatsApp**: Direct helpline phone, WhatsApp number, official email, operating hours.
   - **Hero Section**: Badge text, main headline, and subtitle copy.
   - **Stats Bar**: Numbers and labels (e.g., 315 Services, 15 Categories, 100% Accuracy).
   - **About Mission & Vision**: Corporate mission and vision paragraphs.
3. Click **Publish** to make updates live instantly.

### 2. View and Respond to Leads & Enquiries
1. In `wp-admin`, click **Leads & Enquiries** in the sidebar.
2. Every time a visitor fills out the contact form or enquiry popup, it appears here with:
   - Client Name
   - Phone / WhatsApp number
   - Service requested
   - Date and client notes
3. Click the green **WhatsApp** button next to any lead to immediately launch a direct WhatsApp chat with that client.

### 3. Add or Edit Services (315 Services Directory)
1. In `wp-admin`, go to **Services** → **Add New Service**.
2. Fill in:
   - **Title**: e.g., "Private Limited Company Registration"
   - **Content**: Detailed procedure, eligibility, documents.
   - **Service Category**: Select from 15 statutory sectors (Incorporation, GST, Income Tax, etc.).
3. Click **Publish**. It will automatically appear in the services search and modal catalogue!

---

## 📱 Mobile & Tablet Features

- **Horizontal Mobile Header Navigation**: Sticky scrolling navigation bar located directly beneath the mobile header for effortless 1-tap jumping between Services, Calculators, About, and Contact.
- **Direct WhatsApp Desk Floating Bubble**: Animated green WhatsApp chat bubble anchored at bottom-right for instant compliance support.
- **Interactive Financial Calculators**:
  - **GST Calculator**: Dynamic calculation for 5%, 12%, 18%, 28% tax slabs with CGST/SGST/IGST breakdown.
  - **Income Tax Regime Comparison**: Budget 2024–25 / 2025–26 revised slabs with standard deduction of ₹75,000.
  - **Startup Cost Estimator**: Real-time government and statutory fee calculator based on entity type and capital.

---

## 🛡️ Statutory Compliance Note
As mandated by Indian regulatory standards (ICAI / ICSI), Cloud Ledger operates strictly as a corporate management and digital filing facilitator and never claims chartered accountancy designations in promotional copy.

---
© 2026 Cloud Ledger. All rights reserved.
