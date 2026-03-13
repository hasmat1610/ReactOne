---
trigger: always_on
---

# ReactOne Global Content & Layout Rules

**Version:** 2.0\
**Inspired by:** Vercel, Stripe, and Supabase engineering blogs

**Purpose:**\
Define the global design, content, and layout standards for all ReactOne
articles to ensure consistency, readability, and developer‑focused
communication.

These rules ensure that every article:

• is visually consistent\
• communicates technical ideas clearly\
• prioritizes developer experience\
• scales across hundreds of articles

------------------------------------------------------------------------

# 1. Layout System

ReactOne uses a centered developer reading layout optimized for long
technical content.

### Layout Grid

Viewport\
│\
├── Page Container (1280px)\
│\
└── Article Container (720px)

### Container Sizes

  Element             Width
  ------------------- ---------------------
  Page container      `max-width: 1280px`
  Article container   `max-width: 720px`
  Reading column      `max-width: 65ch`
  Side padding        `24px`

Design rule: the article container must remain centered.

------------------------------------------------------------------------

# 2. Typography System

Typography is the primary UI component of a developer blog.

### Fonts

Primary font

    Inter

Code font

    JetBrains Mono

### Typography Scale

  Element              Size   Weight
  -------------------- ------ --------
  Article Title        48px   700
  H2 Section Heading   32px   600
  H3 Subsection        24px   600
  Paragraph            18px   400
  Code                 16px   400
  Metadata             14px   400

Line height

    1.6

Paragraph rule

    max-width: 65 characters

------------------------------------------------------------------------

# 3. Visual Hierarchy

Hierarchy priority

Title\
↓\
Section Heading\
↓\
Subheading\
↓\
Paragraph\
↓\
Code\
↓\
Supporting elements

Spacing must reinforce hierarchy.

------------------------------------------------------------------------

# 4. Blog Hero Section

Hero layout order

    Category Badge
    Title
    Author + Metadata
    Hero Image

Metadata format

    By ReactOne Team
    March 12, 2026 • 8 min read

Spacing rules

  Element               Spacing
  --------------------- ---------
  Title margin top      16px
  Title margin bottom   16px
  Metadata margin       32px
  Hero image margin     40px

------------------------------------------------------------------------

# 5. Content Spacing System

Spacing scale

  Element              Margin
  -------------------- --------
  Section spacing      56px
  Heading spacing      24px
  Paragraph spacing    16px
  Code block spacing   32px
  Image spacing        40px

Spacing should follow a 4px base scale.

------------------------------------------------------------------------

# 6. Code Block System

Code is the core element of developer articles.

### Code Container

    background: #0f0f0f
    border-radius: 8px
    padding: 20px
    overflow-x: auto

### Font

    JetBrains Mono
    16px

Required features

• syntax highlighting\
• copy button\
• file path labels\
• line wrapping

Example

``` ts
// src/services/api.ts

export async function fetchUsers() {
  const response = await fetch("/api/users")

  if (!response.ok) {
    throw new Error("Request failed")
  }

  return response.json()
}
```

------------------------------------------------------------------------

# 7. Developer Callouts

### Tip

💡 Tip\
Use caching to reduce API calls.

### Warning

⚠️ Warning\
Never expose API keys in client-side code.

### Note

📝 Note\
This feature requires React 18.

Callout style

    padding: 16px
    border-left: 4px solid
    border-radius: 6px
    margin: 32px 0

------------------------------------------------------------------------

# 8. Diagrams & Architecture

Example architecture

    Client (React)
          ↓
    API Layer
          ↓
    Backend Service
          ↓
    Database

Diagrams must prioritize clarity over detail.

------------------------------------------------------------------------

# 9. Table Standards

Example

  Feature        React Query   Redux
  -------------- ------------- --------
  Server State   Built-in      Manual
  Caching        Automatic     Custom

Table style

    border: 1px solid #eaeaea
    padding: 12px

------------------------------------------------------------------------

# 10. Blog List Page

Grid

  Device    Columns
  --------- ---------
  Desktop   3
  Tablet    2
  Mobile    1

Card structure

    Image
    Title
    Description
    Author + Date

Card style

    padding: 24px
    border-radius: 12px

------------------------------------------------------------------------

# 11. Metadata System

Example

    Author: ReactOne Team
    Published: March 12, 2026
    Reading Time: 8 min
    Category: React

------------------------------------------------------------------------

# 12. Navigation UX

Sticky header

    position: sticky
    top: 0
    height: 64px

Reading progress bar

    height: 3px
    position: fixed
    top: 0

------------------------------------------------------------------------

# 13. Performance Standards

Required optimizations

• image optimization\
• lazy loading\
• static rendering\
• CDN delivery

Recommended stack

• Next.js\
• MDX\
• Tailwind CSS\
• Vercel

------------------------------------------------------------------------

# 14. Accessibility Standards

Requirements

• semantic HTML\
• proper heading hierarchy\
• alt text for images\
• keyboard navigation\
• sufficient color contrast

------------------------------------------------------------------------

# 15. Article Structure

Required article structure

    Title
    Introduction
    Concept Explanation
    Code Examples
    Architecture Overview
    Best Practices
    Common Mistakes
    FAQ
    Related Articles

Content flow

Concept → Implementation → Optimization

------------------------------------------------------------------------

# 16. Developer Experience Principles

Articles must include

• production-level examples\
• real code snippets\
• architecture diagrams\
• best practices

Avoid

• overly simplified examples\
• vague explanations\
• unnecessary storytelling

------------------------------------------------------------------------

# 17. ReactOne Design Philosophy

  Principle         Meaning
  ----------------- -----------------------
  Minimal           Remove unnecessary UI
  Readable          Typography first
  Developer-first   Code is central
  Fast              Performance optimized

------------------------------------------------------------------------

# 18. Global Consistency Rule

Never modify

• typography scale\
• container width\
• spacing scale\
• code block design

Consistency builds developer trust and brand identity.