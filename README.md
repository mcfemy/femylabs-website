# Femylabs LLC — Corporate Website Handoff & Maintenance Guide

Official single-page institutional corporate website for **Femylabs LLC** ([femylabs.com](https://femylabs.com)).

---

## 📁 Key File Structure

- **`index.html`** / **`femylabs-index.html`**: The complete single-file static production site. Includes all CSS styling, JavaScript interactivity (mobile nav toggle & scroll animations), Open Graph SEO tags, and JSON-LD structured data inline.
- **`Femylabs_Website_Build_Brief.pdf`**: Original website build specification document.
- **`README.md`**: Handoff maintenance guide and deployment instructions.

---

## 🚀 Deployment Instructions for `femylabs.com`

### Host Option 1: Netlify / Vercel / Cloudflare Pages (Recommended)
1. Upload/Connect the folder containing `index.html` to Netlify, Vercel, or Cloudflare Pages.
2. In the hosting provider's dashboard, set the Custom Domain to `femylabs.com` and `www.femylabs.com`.
3. In your **Dynadot** control panel (Domain Management -> DNS Records):
   - **Root Domain (`@`)**: Add an **A Record** pointing `@` to the static host's IP (e.g., `75.2.60.5` for Netlify, `76.76.21.21` for Vercel).
   - **Subdomain (`www`)**: Add a **CNAME Record** pointing `www` to your host subdomain (e.g., `femylabs.netlify.app` or `cname.vercel-dns.com`).
4. SSL (HTTPS) will automatically issue via Let's Encrypt within 5-10 minutes.

### Host Option 2: Dynadot Web Hosting
1. Log into Dynadot, navigate to Web Hosting / File Manager.
2. Upload `index.html` directly to the `public_html` root directory.
3. Enable free SSL certificate in Dynadot settings.

---

## 🛠️ Maintenance & Content Updates Guide

### 1. How to Update Product Status Badges
To change a product status (e.g. from *In development* to *Live*):
Locate the `.product-card` block in `index.html`:
```html
<!-- Live Status Badge -->
<span class="status-badge status-live">Live</span>

<!-- In Development Status Badge -->
<span class="status-badge status-dev">In development</span>
```
- Use `status-live` class for live products (green background).
- Use `status-dev` class for products in development (amber background).

### 2. How to Update SAM.gov UEI / Registration Info
When the SAM.gov Unique Entity ID (UEI) is validated and issued:
1. Locate the `#about` section -> `.entity-panel`:
   ```html
   <div class="entity-row">
     <span class="entity-key">SAM.gov Status</span>
     <span class="entity-val">Active — UEI: [YOUR-UEI-HERE]<br>
     <span style="font-size:0.75rem;color:rgba(255,255,255,0.4)">Ref: INC-GSAFSD21573639</span></span>
   </div>
   ```
2. Locate the `#federal` section -> `.fed-grid` to update the SAM.gov status cell text.
3. Update the JSON-LD schema in the `<head>` under `identifier`.

### 3. How to Update Patent Information
When the non-provisional patent application is filed (or patent grants):
1. In `#about`, update the `Patent` row in `.entity-panel`.
2. In `#research`, update the `Patent — Filed` block text and `.research-meta`:
   ```html
   <div class="research-meta">
     USPTO Application No. [NUMBER] &nbsp;·&nbsp;
     Filed [DATE]
   </div>
   ```
3. In `footer`, update the patent number in `.footer-right`.

### 4. How to Update Business Email
If the primary business email ever changes:
Search for `hello@femylabs.com` across `index.html`. All 6 inquiry links use direct mailto format with pre-filled subject lines:
- General inquiries: `mailto:hello@femylabs.com`
- ZKRP Licensing: `mailto:hello@femylabs.com?subject=ZKRP Licensing`
- Federal / Grant Opportunities: `mailto:hello@femylabs.com?subject=Federal Opportunity`
- Pre-publication paper requests: `mailto:hello@femylabs.com?subject=ZKRP Paper Request`

---

## 🔒 Corporate Entity Integrity Rules
- **No Founder Name**: Do not add founder names, photos, or personal biographies. All copy must represent **Femylabs LLC** as an institutional corporate entity.
- **State of Formation**: Femylabs LLC is registered in **Wyoming**.
- **Tone**: Maintain formal, factual, grant-application-level tone. Avoid unsubstantiated hype words ("revolutionary", "world-class").
