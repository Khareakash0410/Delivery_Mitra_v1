export const changeOrderStatus = (orderItemsStauses) => {
  const allAccepted = orderItemsStauses.every(s => s === "Accepted");
  const allRejected = orderItemsStauses.every(s => s === "Rejected");
  const allPending  = orderItemsStauses.every(s => s === "Pending");
  const anyDispatched = orderItemsStauses.some(s => s === "Dispatched");
  const anyAccepted = orderItemsStauses.some(s => s === "Accepted");

  if (allAccepted) return "Accepted";       // Ready for delivery
  if (allRejected) return "Cancelled";      // No items left
  if (anyDispatched) return "Out For Delivery";
  if (anyAccepted) return "Partially Accepted"; // Mix of Accepted + Pending/Rejected
  if (allPending) return "Pending";         // Nothing decided yet

  return "Pending"; // fallback
};