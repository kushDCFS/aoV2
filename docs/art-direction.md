# MAPS — Photography art direction

## The rule that matters most

Every stock-photo instinct is wrong for this brand. The product exists because
college admissions is gatekept by money. Imagery that shows glossy, smiling,
well-resourced students *argues against the thesis*. What we want is
**documentary, not promotional** — real rooms, real light, real fatigue, real
focus. Closer to a New York Times education feature than a university viewbook.

**Never generate:**

- Anyone looking at or smiling toward the camera
- A deliberately assembled multi-ethnic group arranged in a semicircle
- Graduation caps, diplomas, confetti, a hand holding a lightbulb
- Pristine dorm rooms, marble campuses, drone shots of quads with lens flare
- Laptops covered in stickers, floating UI, glowing holograms
- Anything shot on a white cyclorama

**Always specify:** a real lens, a real light source, a real time of day, and
one specific object that grounds the scene in a household rather than a set.

---

## 1 — `public/images/hero-desk.jpg`

**Slot:** hero, right column. **Ratio: 4:5 portrait.** Render at 2000×2500 or
larger. The subject should sit in the lower two-thirds; the top third can carry
light and air, since it aligns with the headline across the gutter.

> Editorial documentary photograph, 4:5 vertical. A teenage student working
> alone at a worn kitchen table, photographed from three-quarters behind and
> slightly above, so we see the tabletop and the back of their shoulder but not
> their face. Spread across the table: a spiral notebook dense with handwriting,
> a secondhand SAT prep book with a cracked spine and sticky-note tabs, a
> cheap ballpoint pen, a mug of tea gone cold. A basic school-issue laptop, lid
> half-closed, pushed to the side. Late afternoon sun through a kitchen window
> at frame left, throwing long warm rectangles across the table and one soft
> shadow of the window frame. Ordinary domestic background, softly out of focus
> — a fridge edge, a wall calendar, a dish rack. Shot on a 35mm lens at f/2,
> Kodak Portra 400, natural light only, no fill flash. Muted, slightly cool
> shadows against warm highlights. Quiet, focused, unglamorous, hopeful. No
> face visible, no eye contact, no branding or legible text on any object.

## 2 — `public/images/mission-hall.jpg`

**Slot:** right half of the dark mission panel. Must be **dark enough to sit
inside an ink panel** — target a low-key exposure with the light source inside
the frame. Ratio roughly 1:1 to 4:5; it is cropped with `object-fit: cover`.
Render 2400×2400 or larger.

> Editorial documentary photograph, low-key. A single student walking alone
> down a long institutional corridor at dusk, seen from far behind, small in
> the frame. The corridor is ordinary and public — a school or a public library,
> terrazzo or scuffed linoleum floor, rows of closed doors, a bank of lockers or
> noticeboards along one wall. Overhead fluorescents are off; the only light is
> cold blue daylight from a window at the far end of the hall, which the figure
> is walking toward, plus one warm sodium light spilling from a doorway
> mid-frame. Deep shadows, high contrast, most of the frame falling to near
> black. Shot on a 50mm lens at f/1.8, Cinestill 800T, handheld. The mood is
> solitary determination, not sadness. No face, no other people, no signage
> with legible words, no graduation imagery.

---

## Optional — one per playbook page

Use only if you want imagery beyond the homepage. Same rules apply. All 3:2
landscape, 2400×1600 minimum.

**Academic Paths** — Overhead flat-lay, shot straight down on a scratched
wooden desk: an open spiral notebook with a hand-drawn 8-week study grid,
column headings ruled in ballpoint, several rows already ticked off. A used
eraser, a phone face-down showing nothing, a library-stamped textbook. Hard
morning window light from the top-left throwing crisp shadows. 50mm, f/4,
Portra 160. Nothing staged-neat — pen slightly off-angle, one coffee ring.

**Extracurricular Tracks** — Two teenagers mid-work in a cluttered garage or
school makerspace, neither aware of the camera, one crouched over a partly
built project, the other holding a phone as a flashlight. Bare bulb overhead
plus phone glow. Motion blur in one hand. 35mm, f/2, pushed Tri-X, grainy
black and white. Documentary, unposed, slightly messy.

**The Outreach Lab** — Tight crop of a hand at a laptop keyboard in a dim room,
the screen's cool light the only source on the fingers, the rest falling off
into shadow. A printed list beside the keyboard with a few lines struck
through in pen. 85mm, f/1.4, very shallow focus. No legible screen content.

---

## Delivery

Drop the files in `public/images/` with exactly the names above. The layout
already reserves each aspect ratio, so nothing shifts when they land — until
then, `EditorialImage` renders a composed duotone placeholder rather than a
gray box.

Export **JPEG, quality 82, sRGB**, and resize so the longest edge is ≤ 2400px.
A 4K original will look identical on screen and cost several seconds of load.
Always fill the `alt` prop with what the picture actually shows.
