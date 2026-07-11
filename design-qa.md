# Design QA

- Source visual truth: `/Users/chendoxiu/html/personal-portfolio/public/design-hd.png` (4× Figma export, 5760 × 17400)
- Implementation screenshot: `/Users/chendoxiu/html/personal-portfolio/qa-article-hd.png`
- Interaction screenshots: `/Users/chendoxiu/html/personal-portfolio/qa-contact-hd.png`, `/Users/chendoxiu/html/personal-portfolio/qa-phone.png`
- Combined comparison: `/Users/chendoxiu/html/personal-portfolio/qa-comparison.png`
- Viewport: 1440 × 900 (browser content width observed as 1425 px)
- State: desktop, Article selected; contact QR and telephone states checked separately

**Full-view comparison evidence**

- The page body uses the exported Figma frame itself at its native 1440:4350 ratio, so typography, copy, imagery, colors, spacing, section boundaries, and original composition remain pixel-identical to the source.
- Retina displays receive a 2× or 4× source through `srcset`; the 1× fallback is retained only for standard-density displays.
- The fixed header intentionally replaces the baked header area and preserves the source positions for the brand, central navigation, and PDF control.
- The fixed navigation remained at viewport top (`headerTop: 0`) after navigation to About, Article, and Connect.

**Focused region comparison evidence**

- Article region: all four titles are rendered as crisp HTML text at one consistent size, with borderless hit areas aligned only to the title lines. Verified hrefs are `/01.html`, `/02.html`, `/09.html`, and `/04.html` on `ai-news-repo.vercel.app`.
- Contact region: all four real HTML buttons align with and cover the orange source buttons. Hover lift, press compression, brightness, and soft orange shadow states were checked without adding borders. The WeChat state displays the supplied QR code; the telephone state displays `TEL：18827083512` in a translucent glass panel.
- Navigation: active glass slider uses a 300 ms transition; section scrolling uses a bounded 300–520 ms quartic easing and scroll spy updates the current item.

**Findings**

- No actionable P0/P1/P2 visual mismatch remains.
- Fonts and typography: source typography is retained in the exported frame; interactive header uses the supplied HarmonyOS Sans SC font and matches the source hierarchy.
- Spacing and layout rhythm: the 1440 × 4350 source ratio and all section boundaries are unchanged.
- Colors and visual tokens: source pixels are retained; new interaction surfaces use black, white, source orange `#e8702a`, and neutral translucent glass.
- Image quality and asset fidelity: original Figma export is used without generated or placeholder imagery; WeChat QR is cropped directly from the supplied reference.
- Copy and content: source copy is unchanged; navigation labels, URLs, and telephone number match the user specification.

**Interaction checks**

- Home/About/Work/Fun/Article/Connect smooth navigation: passed.
- Fixed header during scroll: passed.
- Active glass slider and scroll spy: passed.
- Four article destinations present and aligned: passed.
- WeChat toggle and QR rendering: passed.
- Telephone toggle, glass treatment, and `tel:` link: passed.
- Personal and organization GitHub hrefs: passed.
- Browser console errors: none observed.
- Production build: passed.

**Comparison history**

1. Initial header used a translucent black backing, allowing the baked source navigation to show faintly beneath the new slider (P2). Fixed by changing the header backing to solid black while keeping the navigation itself glassy.
2. Post-fix evidence in `qa-header.png`, `qa-article.png`, and `qa-comparison.png` shows a single header and aligned article layout.
3. User follow-up identified low-density text, delayed motion, oversized article hit boxes, and contact outlines. Replaced the source with 2×/4× responsive exports, converted article titles and contact buttons to crisp HTML, shortened the motion curve, and removed rectangular/white outlines. Post-fix evidence is in `qa-article-hd.png` and `qa-contact-hd.png`.
4. The homepage-only background was replaced with the two-layer interaction from `chendoxiu888-cloud/lithos-spotlight-reveal`. The original homepage title, intro copy, Chatbot button positions, fixed navigation, and every section below the homepage were preserved. Mouse movement updates the soft trailing spotlight mask; evidence is in `qa-hero-spotlight.png`.

**Follow-up polish**

- The PDF button remains visual-only because no PDF destination was supplied.

final result: passed
