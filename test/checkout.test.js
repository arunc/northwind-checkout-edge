import assert from "node:assert/strict";
import test from "node:test";
import worker from "../src/index.js";

function checkout(body) {
  return worker.fetch(new Request("https://example.test/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }));
}

test("health endpoint responds", async () => {
  const response = await worker.fetch(new Request("https://example.test/health"));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("checkout totals line items in cents", async () => {
  const response = await checkout({
    orderId: "order-001",
    items: [{ sku: "mug", unitPriceCents: 1200, quantity: 2 }],
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    orderId: "order-001", totalCents: 2400,
  });
});

test("checkout accepts an empty collection", async () => {
  const response = await checkout({ orderId: "order-002", items: [] });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    orderId: "order-002", totalCents: 0,
  });
});
