/* One pastel per field, each paired with an ink of the same hue for type.
   Shared by the list row, the detail panel, and the map pins, so a program's
   colour never changes as it moves between those three views. Keyed so a
   category added to CATEGORIES that is missing here still renders — it falls
   back to neutral rather than throwing. */
export const CATEGORY_TONE = {
  national: { tone: "var(--c-academic)", ink: "var(--c-academic-ink)" },
  medicine: { tone: "var(--c-outreach)", ink: "var(--c-outreach-ink)" },
  stem: { tone: "var(--c-extra)", ink: "var(--c-extra-ink)" },
  cs: { tone: "var(--c-sky)", ink: "var(--c-sky-ink)" },
  business: { tone: "var(--c-money)", ink: "var(--c-money-ink)" },
  humanities: { tone: "var(--c-teal)", ink: "var(--c-teal-ink)" },
  arts: { tone: "var(--c-plum)", ink: "var(--c-plum-ink)" },
};
