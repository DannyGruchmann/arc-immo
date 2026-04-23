# ARC Residences – Design System

## Brand Identity
**Project Name:** ARC Residences  
**Tagline DE:** Architektur, die bleibt.  
**Tagline EN:** Architecture that endures.  
**Sub-tagline:** Munich Highlands · Exclusive Private Residences

## Visual Identity
- Ultra-minimal, editorial luxury
- Raw material beauty: concrete, steel, glass, oak
- No gradients on white, no card grids
- Strong typographic hierarchy, editorial layouts
- Photography-first design — images ARE the story

## Color System
```
--color-obsidian: #0A0A0A       /* primary dark background */
--color-charcoal: #141414       /* secondary dark */
--color-graphite: #1E1E1E       /* surface */
--color-steel: #2A2A2A          /* border/divider */
--color-stone: #8A8070          /* warm neutral mid */
--color-sand: #C4B89A           /* warm accent light */
--color-bone: #F0EBE3           /* light text/surface */
--color-white: #FAFAF8          /* near white */
--color-gold: #B8965A           /* accent: CTA, highlights */
--color-gold-light: #D4AF74     /* hover state */
```

## Typography
- **Display:** "Canela" via @font-face or similar editorial serif — use Google Fonts "Cormorant Garamond" 300/400/600
- **Body:** "Neue Haas Grotesk" feel — use Google Fonts "DM Sans" 300/400/500
- **Label/Caption:** "DM Sans" 400 uppercase tracked

### Scale
- Hero: 6–8vw, weight 300 (light), tracking -0.02em
- H2: 3.5–5rem, weight 300, serif
- H3: 1.8–2.5rem, weight 400, serif
- Body: 1rem–1.125rem, weight 300, line-height 1.7
- Caption: 0.75rem, uppercase, letter-spacing 0.15em

## Layout
- Max width container: 1440px
- Generous horizontal padding: 5vw (mobile 24px)
- Full-bleed image sections
- Asymmetric layouts, text/image offset compositions
- Strong vertical rhythm with section spacing: 10–15vh

## Animations
- Page load: smooth reveal with fade + translate
- Scroll reveals: IntersectionObserver, translateY(40px) → 0, opacity 0→1, 0.8s ease
- Parallax: GSAP ScrollTrigger on hero + image sections
- Number counters: on scroll enter
- Horizontal scroll for gallery section
- Navigation: transparent → dark on scroll
- Mouse follower: subtle, only in hero + key image sections
- Lenis smooth scroll throughout

## Sections Order
1. Nav
2. Hero
3. Projekt Intro
4. Architektur Storytelling
5. Visual Journey (full-bleed scroll sections)
6. Key Highlights
7. Projekt Fakten (animated numbers)
8. Lage
9. Interior/Lifestyle
10. Grundriss
11. Trust/Credibility  
12. FAQ
13. CTA / Kontakt
14. Footer
