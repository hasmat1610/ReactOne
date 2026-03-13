---
trigger: always_on
---

# ReactOne Blog Global Rules

**Version:** 1.0  
**Inspired by:** Vercel (Geist Design System)  
**Purpose:** Define the premium design, layout, and content standards for all ReactOne blog posts to ensure a world-class developer experience.

---

## 1. Layout System (The "Centered Reader")
ReactOne blog posts follow a strict geometric layout optimized for code-heavy technical reading.

| Element | Specification |
| :--- | :--- |
| **Page Container** | `max-width: 1280px` |
| **Article Column** | `max-width: 720px` (Centered) |
| **Reading Width** | `max-width: 65ch` |
| **Side Padding** | `24px` |
| **Grid Base** | 4px scale |

---

## 2. Typography (Geist-Inspired)
Typography must prioritize legibility and a "premium tech" feel.

- **Primary Font:** `Inter` (Sans)
- **Code Font:** `JetBrains Mono` (Mono)

| Element | Size | Weight | Line Height |
| :--- | :--- | :--- | :--- |
| **Article Title (H1)** | 48px | 800 | 1.1 |
| **Section Header (H2)** | 32px | 700 | 1.25 |
| **Subsection (H3)** | 24px | 600 | 1.3 |
| **Body Paragraph** | 18px | 400 | 1.6 |
| **Metatdata/Small** | 14px | 400 | 1.5 |

---

## 3. Blog Listing Page (Bento Grid)
The blog directory must feel alive and dynamic.

- **Grid System:** 12-column bento grid.
- **Card Design:**
    - `padding: 24px`
    - `border: 1px solid rgba(255, 255, 255, 0.1)`
    - `border-radius: 12px`
    - **Hover State:** Subtle scale (1.02x) + border color shift (e.g., amber-500/50).
- **Featured Card:** Occupies 2 columns on desktop; features a larger, more vibrant image.
- **Metadata Layout:** Category (Top-Left Badge) → Image → Title → Author/Date (Bottom-Row).

---

## 4. Article Hero Section
Every article begins with a high-impact hero.

1. **Category Badge:** Amber-500/10 background, Amber-400 text.
2. **Title:** High-contrast white, 48px.
3. **Metadata Row:** 
   - Format: `By ReactOne Team • Published: [Date] • [X] min read`
   - Spacing: 32px margin-bottom.
4. **Hero Image:** 
   - Aspect Ratio: 16:9
   - Border Radius: 16px
   - Border: 1px solid rgba(255, 255, 255, 0.1)

---

## 5. Code Block System (Geist-Standard)
Code is the most important content. It must be beautiful and functional.

- **Container:**
    - `background: #0f0f0f`
    - `border: 1px solid rgba(255, 255, 255, 0.05)`
    - `border-radius: 8px`
    - `padding: 20px`
- **Features:**
    - **Filename Label:** Top-left, uppercase, 12px mono, 0.1em tracking.
    - **Copy Button:** Top-right, visible on hover.
    - **Line Wrapping:** `whitespace-pre-wrap` + `break-words` required.
    - **Font Size:** 16px (Mono).

---

## 6. Developer Callouts
Standardized UI for supplemental information.

- **Styles:**
    - `padding: 16px`
    - `border-left: 4px solid`
    - `border-radius: 6px`
    - `margin: 32px 0`
- **Types:**
    - **💡 Tip:** Amber-500 border, 5% Amber-500 BG.
    - **⚠️ Warning:** Red-500 border, 5% Red-500 BG.
    - **📝 Note:** Blue-500 border, 5% Blue-500 BG.

---

## 7. Interactive Elements & UX
- **Progress Bar:** 3px height, fixed to the top of the viewport, Amber-500.
- **Sticky Header:** 64px height, blurred background (`backdrop-blur-md`), 80% opacity.
- **Comparison Tables:** 1px collapse border, 12px cell padding, high-contrast headers.
- **Breadcrumbs:** Small, dim text (slate-500) at the very top of the article.

---

## 8. Implementation Integrity
- **No Placeholders:** All articles must have a valid `generate_image` visual or structural diagram.
- **Senior Tone:** Use authoritative, concise language. Avoid fluff.
- **Performance:** Lazy-load all images. Embed videos with `<video>` tags or optimized players.
