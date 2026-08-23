/* Shared by the list row, the detail panel, and the map popup. */
export const FORMAT_LABELS = {
  "in-person": "In person",
  virtual: "Virtual",
  hybrid: "Hybrid",
};

/* Source data is typed with straight apostrophes. Curling one that sits
   between two letters is purely typographic — it never changes a word, and it
   is the difference between "Children's" set correctly and set like a form
   field. Nothing else in the string is touched. */
export const curl = (value) =>
  typeof value === "string" ? value.replace(/(\w)'(\w)/g, "$1’$2") : value;

export const parseISO = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const fmtDate = (date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export const daysUntil = (date) => {
  const today = new Date();
  const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((date.getTime() - utcToday) / 86400000);
};
