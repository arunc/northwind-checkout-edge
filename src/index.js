export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (request.method === "GET" && pathname === "/health") {
      return Response.json({ status: "ok" });
    }

    if (request.method !== "POST" || pathname !== "/checkout") {
      return new Response("Not found", { status: 404 });
    }

    const order = await request.json();
    const totalCents = order.items.reduce(
      (sum, item) => sum + item.unitPriceCents * item.quantity,
      0,
    );

    return Response.json({ orderId: order.orderId, totalCents });
  },
};
