---
title: "Case Study: Building Traceability Software for a Railway Component Manufacturer"
seoTitle: "Building Software for a Railway Parts Manufacturer"
description: "A composite case study: how we replaced paper registers with traceability software for a railway component manufacturer, from heat numbers to dispatch."
slug: "software-for-railway-component-manufacturer"
date: "2026-11-10T09:00:00+04:00"
updated: "2026-11-10T09:00:00+04:00"
category: "manufacturing-software"
tags: ["case study", "railway components", "traceability", "manufacturing software"]
primaryKeyword: "software for railway component manufacturers"
secondaryKeywords: ["heat number traceability software", "production traceability software", "inspection records software", "replace Excel in manufacturing"]
coverImage: "/blog/software-for-railway-component-manufacturer/cover.webp"
coverAlt: "Stacked machined metal components with QR code labels in a factory store"
draft: true
---

> **Note:** This is a composite case study. It combines experiences from Devloom projects with manufacturing clients, with details changed so no client can be identified. No real company is named. [VERIFY: keep this note unless you replace the story with a single real, approved client project.]

The client was a mid-sized Indian manufacturer of machined and formed components supplied to railway customers. [VERIFY: adjust product type.] Its problem wasn't a lack of skill on the floor. It was paper. Raw-material heat numbers lived in a register, inspection results in another, dispatch documents in Excel. Proving which batch of steel went into which finished part meant hours of flipping pages. We replaced that chain with simple traceability software built around how the plant already worked.

## Why traceability matters so much in railway supply

Railway components are safety-critical, and the paperwork expectations reflect that. For suppliers working with Indian Railways, RDSO (Research Designs & Standards Organisation) sets quality requirements for many products.  As one example, RDSO's requirements for hot coiled helical springs ask for "the traceability of the product from raw material stage to finished product stage," with a system that identifies "the raw material details – Heat No., Supplier, Inspection details from the finished product stage."  Other RDSO technical requirements contain similar traceability language, and approved vendors work to a Quality Assurance Plan (QAP).  [VERIFY: confirm which RDSO documents and requirements apply to your client's actual products.]

On paper, meeting that is possible. Doing it quickly, every time, under audit, is where registers fall apart.

## What we found on the floor

We spent [VERIFY: e.g., the first two weeks] mostly watching:

- **Material inward:** the stores clerk wrote the heat number and supplier into a register and filed the mill test certificate in a box file.
- **Production:** job cards were handwritten. The link between a job and a heat number depended on someone remembering to write it.
- **Inspection:** QC filled printed formats, which were later typed into Excel, sometimes days later.
- **Dispatch:** the dispatch team rebuilt half this information again for each consignment.

Every handoff was a chance for a typo, and nobody had a single view of an order.

## What we built (version one)

We deliberately kept the first version small:

1. **Inward entry with QR labels.** Each incoming material lot gets a record (heat number, supplier, certificate photo) and a printed QR label.
2. **Digital job cards.** Supervisors create a job, scan the material label, and the link is made automatically.
3. **Inspection screens.** QC enters measurements on a tablet against the drawing's limits. Out-of-tolerance values are flagged immediately, and rejections need a reason.
4. **Dispatch pack.** Selecting finished lots generates the dispatch documents and a traceability report going back to the heat numbers.
5. **Owner dashboard.** Orders in progress, pending inspections, rejection trends.

Stack: [VERIFY: e.g., Next.js web app, PostgreSQL, works on tablets and the office PC, local backup]. We used AI coding tools to speed up the forms, reports and tests, but every rule about how a lot moves through the plant came from people on the floor, not from a prompt. I explain why that matters in [why custom factory software still needs a real team](/blog/custom-software-for-factories).

## What went wrong (and what we changed)

- **Wi-Fi didn't reach the inspection bay.** We added offline entry that syncs when the connection returns.
- **Operators ignored the first screens.** Too many fields. We cut the inspection form to what the QAP actually required and made buttons bigger for gloved hands.
- **Old habits.** For [VERIFY: a month] the plant ran paper and software in parallel. That was frustrating but necessary, and it built trust.

## Results

[VERIFY: replace with real, approved outcomes only. Do not publish invented numbers.] Qualitatively, the biggest change was that a traceability question that used to take a person hours of searching could be answered from one screen, and audits stopped being a scramble. Re-typing between registers and Excel largely disappeared.

## Lessons for other manufacturers

1. **Start with the audit trail.** If customers or inspectors ask for traceability, build that spine first. Everything else hangs off it.
2. **Design for the floor, not the boardroom.** Big buttons, scanning, offline mode, minimal typing.
3. **Run in parallel briefly.** Don't flip a switch on a running plant.
4. **Keep accounting where it is.** Integrate instead of replacing what already works.
5. **Pick a team that will visit.** If your developer has never seen your shop floor, they're guessing.

## FAQ

### Can this work for non-railway manufacturers?
Yes. The same pattern (inward → job → inspection → dispatch, linked by labels) fits auto components, fasteners, castings, forgings and most batch manufacturing.

### Do we need to replace our ERP or Tally?
Usually not. In this composite project, accounting stayed as it was, and the new system handled the shop floor and quality records.

### How long does a first version take?
For one focused process, typically weeks rather than months [VERIFY]. A full plant rollout is staged over several phases.

---

Make railway, automotive or industrial components and still chase heat numbers through registers? [Talk to Devloom](https://devloom.in) or [message me](/contact).
