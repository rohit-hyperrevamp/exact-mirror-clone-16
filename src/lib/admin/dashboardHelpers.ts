export { commerce } from "./commerceApi";
export type { DashboardData } from "./commerceApi";

export function inrSafe(n: number | undefined | null) {
  return "₹" + Math.round(Number(n ?? 0) || 0).toLocaleString("en-IN");
}
