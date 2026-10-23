# Home redesign changes

Code files changed in this folder:

- `home-redesign.css` — styled the Problem section's laboratory image overlay and refined Workflow, Documentation, FAQ, Audience, Logistics, Team, and plasticware layouts.
- `HeroSection.tsx` — reshaped the homepage hero around the supplied full-width laboratory image while retaining its enquiry and Solarbio links.
- `ProblemSection.tsx` — added the laboratory banner as a lazy-loaded image behind the existing copy with a contrast overlay.
- `app/globals.css` — switch tablet widths to the existing hamburger menu before the desktop navigation overflows.
- `LogisticsSection.tsx` — replaced the custom globe SVG with the supplied scientific supply image and kept the Source/Coordinate/Deliver steps beneath it; grouped the supporting copy and enquiry button in a reference-inspired callout.
- `WorkflowSection.tsx` — added a section-specific styling class; existing workflow content and interactions remain intact.
- `DocumentationSection.tsx` — existing tabbed evidence-card layout styled by the stylesheet; no component behavior changed in this pass.

This file consolidates the previous per-change notes.
