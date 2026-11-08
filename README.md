# Northwind checkout edge

Demo checkout API. All orders and products are fictional; no payments are made.

## API

- `GET /health` returns `{ "status": "ok" }`.
- `POST /checkout` accepts a JSON object with `orderId` (string) and optional
  `items` (array). Each item has `sku`, `unitPriceCents` and `quantity`.
- Missing `items` and an empty array both represent an empty order.
- A successful response is HTTP 200 with `{ "orderId": "…", "totalCents": 0 }`
  for an empty order, or the sum of unit price times quantity otherwise.
- Prices and totals are integer cents. Malformed input is outside this demo.

## Development

Use Node.js 22 or later. Run `npm ci`, `npm run check`, `npm test`, and
`npm run dev`. Cloudflare Workers Builds deploys the connected main branch.
