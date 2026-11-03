// Only the start month is known, so report calendar years and months.
export function getProfessionalExperience(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
  }).formatToParts(now);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const months = Math.max(0, (year - 2023) * 12 + month - 12);
  return { years: Math.floor(months / 12), months: months % 12 };
}
