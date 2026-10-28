# RADONIK independent storefront and support

The redesigned site has its own catalog and navigation. No customer-facing links to radonik.com should remain. Product data is the historical editorial snapshot and must be reviewed before charging customers. The site currently uses a *request for quote* workflow, not a payment gateway or checkout.

## Live/offline customer support

The visitor chat widget saves the visitor's name, optional contact, and messages to the project's existing Neon database. Staff replies are read within the same chat window. `GET /api/support` reports online **only when an authenticated staff member is active in the operator dashboard** (last heartbeat within 90 seconds) AND within configured business hours. Otherwise the widget states messages will be collected, never inventing a live operator. No third-party chat SaaS is required.

Staff inbox: `/support/dashboard`.

Required Vercel environment variables for the operator dashboard:
- `DATABASE_URL` (already used by the catalog)
- `SUPPORT_ADMIN_USERNAME` (set yourself)
- `SUPPORT_ADMIN_PASSWORD` (strong unique password; set yourself)
- `SUPPORT_AUTH_SECRET` (random secret >= 32 bytes; set yourself)

Optional Iran (Asia/Tehran) office-hours configuration, format JS weekday: Sunday=0, Monday=1, ..., Saturday=6:
- `SUPPORT_WORK_DAYS=6,0,1,2,3` EXAMPLE ONLY, confirm with the company
- `SUPPORT_START_TIME=09:00` EXAMPLE ONLY
- `SUPPORT_END_TIME=17:00` EXAMPLE ONLY
- `NEXT_PUBLIC_RADONIK_TELEGRAM_URL=https://t.me/your_verified_company_profile` (only after verifying the real profile)

Until scheduling values are supplied, the online indicator reflects operator presence only. Without admin credentials, all visitors see an offline form; their messages are still stored. Without `DATABASE_URL`, they are explicitly told the form is not available.

The separate SQL migration `db-support.sql` has been applied to the existing RADONIK Neon project (additive tables only). Backend uses no external paid service.

## Notes

- No claims of 24/7 replies or permanent online availability.
- Avoid placing a customer/visitor email or phone in URLs; staff messages are protected through signed HttpOnly cookies.
- Before public launch add spam protection, data retention policy, abuse monitoring and legal/privacy notice, and connect a suitable payment provider when needed.
- Product and pricing snapshots must be approved by RADONIK for use as a live commerce catalog.

## Lead capture

`POST /api/inquiries` stores new customer requests in `sales_inquiries` on Neon. Authorized staff can read these in `/support/dashboard` under "درخواست‌های خرید". This is a *request / quotation* flow; NO payment is taken or claimed.