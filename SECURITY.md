# Security Policy

This site is a personal photography portfolio built with Next.js and deployed on Vercel. While it does not process user accounts or sensitive data, basic security hardening is enabled.

## HTTP Security Headers

The following headers are configured via `vercel.json` or `next.config.ts`:

- `X-Frame-Options: SAMEORIGIN` – Prevents embedding pages in other origins to reduce clickjacking risk.
- `X-Content-Type-Options: nosniff` – Instructs browsers not to MIME-sniff responses.
- `Referrer-Policy: strict-origin-when-cross-origin` – Limits referrer information sent to other origins.
- `X-Powered-By` header is disabled via `poweredByHeader: false` in `next.config.ts`.

## Reporting a Vulnerability

If you believe you’ve found a security issue in this site or its deployment configuration, please open a private issue or contact the site owner directly via the email address listed on the Contact page.

Please include:

- A description of the issue
- Steps to reproduce
- Any potential impact you foresee

Responsible disclosure is appreciated; this project will aim to address valid reports in a timely manner.
