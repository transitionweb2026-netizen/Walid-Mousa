/**
 * Central image registry.
 *
 * Every photo on the site is currently royalty-free stock from Unsplash
 * (Unsplash License — free for commercial use, no attribution required),
 * hotlinked through the Unsplash CDN. `images.unsplash.com` is allow-listed
 * in `next.config.ts`.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  TO GO LIVE: replace each URL below with a real photograph of Dr. Walid
 *  Moussa, his clinic and his equipment. Drop the files in `public/images/…`
 *  and change the string here — no component or layout edits needed. Re-check
 *  the matching `position` (focal point) in the data files after swapping.
 * ─────────────────────────────────────────────────────────────────────────
 */

const P = "https://images.unsplash.com/";
const Q = "?auto=format&fit=crop&q=80";
const u = (id: string, w = 1600) => `${P}${id}${Q}&w=${w}`;

export const IMG = {
  // — Doctor / portraits —
  doctorHero: u("photo-1612349317150-e413f6a5b16d", 2000), // male doctor, white coat, arms crossed
  doctorPortrait: u("photo-1622253692010-333f2da6031d", 1200), // male doctor, scrubs, warm
  doctorConsult: u("photo-1666214280557-f1b5022eb634", 1600), // doctor reviewing a scan with someone
  doctorScrubs: u("photo-1666887360742-974c8fce8e6b", 1200), // doctor portrait, blue scrubs
  doctorCorridor: u("photo-1516841273335-e39b37888115", 1800), // clinicians walking a corridor
  doctorMasked: u("photo-1591604021695-0c69b7c05981", 1200), // masked surgeon, teal cap
  scrubsTeal: u("photo-1594824476967-48c8b964273f", 1400), // clinician in teal scrubs (on-brand)

  // — Clinic / procedure —
  operatingRoom: u("photo-1516549655169-df83a0774514", 1600), // empty operating theatre
  operatingRoom2: u("photo-1550831107-1553da8c8464", 1600), // surgical team operating
  surgeryTeam: u("photo-1551190822-a9333d879b1f", 1600), // surgeons at the table
  consultRoom: u("photo-1600880292203-757bb62b4baf", 1600), // consultation across a desk
  patientCare: u("photo-1581056771107-24ca5f033842", 1400), // doctor with a seated patient
  corridor: u("photo-1519494026892-80bbd2d6fd0d", 1600), // hospital corridor
  bpCheck: u("photo-1631815588090-d4bfec5b1ccb", 1400), // taking a patient's blood pressure

  // — Technology / lab —
  microscope: u("photo-1582719471384-894fbb16e074", 1400), // researcher at a microscope
  labResearch: u("photo-1631217868264-e5b90bb7e133", 1400), // two clinicians reviewing results
  labCorridor: u("photo-1579154204601-01588f351e67", 1400), // laboratory aisle
  labSamples: u("photo-1576671081837-49000212a370", 1400), // sample vials
  ivDark: u("photo-1579165466741-7f35e4755660", 1400), // IV / infusion, low key
  monitors: u("photo-1666214280391-8ff5bd3c0bf0", 1400), // clinicians reading monitors
  stethoscopeFlat: u("photo-1584982751601-97dcc096659c", 1200), // stethoscope, clean flat lay
  handStethoscope: u("photo-1638202993928-7267aad84c31", 1200), // hand holding a stethoscope

  // — Lifestyle / patients (discreet, hopeful) —
  handsRings: u("photo-1584515933487-779824d29309", 1400), // hands clasped, wedding rings
  familyBaby: u("photo-1476703993599-0035a21b17a9", 1400), // parents with a baby at home
  coupleSunset: u("photo-1511895426328-dc8714191300", 1400), // silhouettes at sunset
  manActive: u("photo-1571019614242-c5c5dee9f50b", 1200), // man training, personal trainer
  manPortrait: u("photo-1612531386530-97286d97c2d2", 1200), // thoughtful man, dark portrait
  manReading: u("photo-1554774853-aae0a22c8aa4", 1200), // person reading quietly
  supportGroup: u("photo-1631815589968-fdb09a223b1e", 1400), // small support-group setting

  // — Education / conference —
  lecture: u("photo-1543269865-cbf427effbad", 1400), // teaching a small group
  meeting: u("photo-1521737711867-e3b97375f902", 1400), // team around laptops

  // — Page heroes (secondary pages) —
  videoStudio: u("photo-1543269865-cbf427effbad", 1800), // teaching a small group
  readingDesk: u("photo-1638202993928-7267aad84c31", 1800), // hand + stethoscope, editorial
} as const;

export type ImageKey = keyof typeof IMG;
