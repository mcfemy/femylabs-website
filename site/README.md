# Femylabs Website

Marketing site for **Femylabs LLC**. It turns a business owner's idea into a scoped, submittable project: **Idea → Problem → Solution → Features → Project Intake**.

Built with React, Vite, and Tailwind CSS v4. It's a static single-page app with client-side routing, meant to be deployed to AWS S3 + CloudFront.

## Quick start

```bash
cd site
npm install
cp .env.example .env.local   # optional; see "Configuration"
npm run dev                  # http://localhost:5173
npm run build                # production build → dist/
npm run preview              # serve the production build locally
```

Requires Node 20+.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, "You Don't Need to Be Technical", idea journey |
| `/how-it-works` | 7-step process, "Build in Phases" (with disclaimer) |
| `/what-we-build` | Capabilities, "Have an Idea but Don't Know Where to Start?" |
| `/pricing` | Pricing, 5% revenue participation, third-party expenses, ownership, **What We Need From You** (`#responsibilities`) |
| `/faq` | 13 Q&As in an accessible accordion |
| `/start-your-project` | Multi-step project intake (12 steps + review) |

## Project structure

```
src/
  content/      All site copy (edit words here, not in components)
    site.js       routes, nav, contact email
    home.js  process.js  capabilities.js  pricing.js  faq.js
  components/
    layout/     Header (sticky), Footer, Layout (skip link, focus on route change)
    ui/         Button, Icon, PageHero, SectionHeading, StartProjectCta, Accordion
  sections/     One component per page section (home/, how/, build/, pricing/)
  pages/        Page components that assemble sections
  intake/       The Start Your Project form
    schema.js           step order, titles, and validation rules
    options.js          choice lists
    steps/ fields/      step and field components
    IntakeForm.jsx      step flow, focus management, review, submit
    draftStorage.js     save-on-next draft (localStorage)
    submitIntake.js     sends the intake to Web3Forms (emailed to you)
    mockIntakeHandler.js  dev-only stub used when no Web3Forms key is set
```

> **Legal copy:** pricing, revenue participation, ownership, and responsibility wording lives in `src/content/pricing.js` and `src/content/faq.js`. It is deliberately careful. For example, pricing "starts at approximately $250 per defined module or development phase" and is never a flat price. Change it only alongside the written development agreement.

## Configuration

Set these as build-time environment variables in `.env` (git-ignored) or in your CI environment:

| Variable | Purpose |
| --- | --- |
| `VITE_WEB3FORMS_KEY` | Web3Forms access key. Intake submissions are emailed to you through it. |
| `VITE_CONTACT_EMAIL` | Email shown in the footer, the FAQ, and the submission fallback. |

### Intake submissions arrive by email (Web3Forms)

There is no server. The browser sends each intake directly to [Web3Forms](https://web3forms.com), and Web3Forms emails it to you.

**Get a free access key**

1. Go to [web3forms.com](https://web3forms.com).
2. Enter the email address where you want to receive submissions and create an access key. The key is sent to that inbox.
3. Paste it into `site/.env`:
   ```bash
   VITE_WEB3FORMS_KEY=your-access-key-here
   ```
4. Restart `npm run dev`, or rebuild. Vite reads env vars at build time.

The key is embedded in the site's JavaScript. That's expected: a Web3Forms key can only send mail to the address it was created for.

**What you receive:** one email per submission. The subject is `New Femylabs Project Intake — {Company or Name}`, the sender name is the submitter's, and replying goes straight to the submitter. Every intake answer appears as a labelled field, and multi-select answers are comma-separated.

**No file uploads**

The intake is text-only. The review and confirmation screens tell visitors that wireframes, documents, and examples aren't needed yet, and that a secure way to share files will be set up once scope is agreed. Edit that wording in `src/content/intake.js`.

**Request details** (`src/intake/submitIntake.js`)

- The form sends a `POST` to `https://api.web3forms.com/submit` as `multipart/form-data`.
- Fields sent:
  - `access_key`, `subject`, `from_name`, `replyto`
  - one field per intake answer (text only)
- Spam protection is a hidden `botcheck` checkbox (the Web3Forms honeypot). It is only sent if a bot ticks it, in which case Web3Forms rejects the submission.
- Web3Forms responds with `{ success, message }`. On `success: true`, the visitor sees the confirmation screen. Otherwise they see a friendly error, their answers are kept, and they can **Try again** or **Download a copy**.
- While the request is in flight, the submit button is disabled and reads "Submitting…".

**Graceful degradation**

- **No key, dev server:** submissions go to `mockIntakeHandler.js`. It logs the email fields to the browser console and nothing is sent.
- **No key, production build:** on submit, visitors are told online submission isn't available. They're offered **Download a copy** plus a `mailto:` link, so no lead is lost silently.

## Deploying to AWS S3 + CloudFront

1. **Build**
   ```bash
   npm run build   # with VITE_WEB3FORMS_KEY set in .env or your CI environment
   ```
2. **Create a private S3 bucket.** Keep "Block all public access" on. CloudFront reads from the bucket through Origin Access Control.
3. **Create a CloudFront distribution:**
   - Origin: the S3 bucket, using **Origin Access Control**. Apply the bucket policy CloudFront generates.
   - Default root object: `index.html`.
   - Viewer protocol policy: Redirect HTTP to HTTPS.
   - **SPA routing (required):** add custom error responses so that **403 → `/index.html` (200)** and **404 → `/index.html` (200)**. Without these, deep links such as `/pricing` fail on refresh.
   - Alternate domain names: `femylabs.com` and `www.femylabs.com`, with an ACM certificate issued in **us-east-1**.
4. **Upload with sensible caching.** Hashed assets can be cached forever. `index.html` must not be cached:
   ```bash
   aws s3 sync dist/ s3://YOUR_BUCKET --delete \
     --exclude index.html --cache-control "public,max-age=31536000,immutable"
   aws s3 cp dist/index.html s3://YOUR_BUCKET/index.html \
     --cache-control "no-cache"
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/index.html"
   ```
5. **DNS:** point the domain to the distribution. Use Route 53 alias records, or CNAME/ALIAS records at your DNS provider.

## Accessibility notes

- Semantic landmarks, a skip link, one `h1` per page, and focus moves to `<main>` on navigation.
- Visible focus rings everywhere. Colors are chosen for WCAG AA: verdigris `#5C8374` is used only decoratively on cream, and the darker `#3F5E52` is used for text and buttons.
- The FAQ follows the WAI-ARIA accordion pattern.
- Intake form:
  - Every input has a label.
  - Checkbox and radio groups use `fieldset`/`legend`.
  - Errors use `aria-invalid` and `aria-describedby`.
  - When a step fails validation, focus goes to an error summary with links to each field.
  - Focus moves to the step heading on each step change.
  - Status updates are announced through live regions.
- `prefers-reduced-motion` is respected.
