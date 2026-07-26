# 🍊 The Ocean Juice World — Peel the Fruit Menu

An interactive, single-page digital menu for **The Ocean Juice World** (Jamnagar, Gujarat). Instead of a static PDF menu, customers tap a fruit, watch it "peel" open, and browse the menu pages inside — built as a fun, on-brand replacement for a physical/printed menu, ideal for a QR-code-on-table experience.

**Live demo:** _add your GitHub Pages / hosting link here_

---

## ✨ Features

- **Fruit bowl menu picker** — Fresh Juice, Thick Shakes, and Natural Juices & Shots each represented as a fruit button with their own color theme.
- **Peel-open animation** — clicking a fruit triggers a custom CSS/JS "peel" transition revealing the menu pages, themed with that category's colors.
- **Paginated menu viewer** — multi-page menus (JPG scans) navigable with Prev/Next controls and a page counter.
- **Tap-to-zoom lightbox** — tap any menu page to view it full-screen for easy reading.
- **Quick action bar** — one-tap call button, Google review link, and Instagram link.
- **Decorative animated background** — citrus slices, bubbles, waves, and fruit-pattern overlays for a juicy, on-brand look.
- **Fully responsive**, mobile-first design (built for in-store QR scanning on phones).
- No backend, no build step — pure HTML/CSS/JS.

---

## 🗂️ Project Structure

```
.
├── index.html          # Page structure & markup
├── style.css            # All styling, animations, and theming
├── script.js             # Menu data, peel logic, page navigation, lightbox
└── images/
    ├── Logo_The_Ocean_Juice_World.png
    ├── 1_JuiceMenu/                     # Fresh Juice menu pages (JPG)
    ├── 2_Thick_Shake_Menu/               # Thick Shake menu pages (JPG)
    └── 3_100_Juice_and_Shots_Menu/       # Natural Juices & Shots pages (JPG)
```

---

## 🚀 Getting Started

No build tools or dependencies required — it's a static site.

1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```
2. **Add your menu images** into the matching folders under `images/` (see [Adding / Updating Menu Pages](#-adding--updating-menu-pages) below).
3. **Open `index.html`** directly in a browser, or serve it locally:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
4. Visit `http://localhost:8000` (or wherever your server points).

---

## 🌐 Deploying to GitHub Pages

1. Push the project to a GitHub repository.
2. In **Settings → Pages**, set the source to your default branch (e.g. `main`) and root folder.
3. **Important:** since filenames use underscores/numbers and the site has no Jekyll-specific needs, add an empty `.nojekyll` file to the repo root to prevent GitHub's Jekyll build step from ignoring folders/files that start with underscores:
   ```bash
   touch .nojekyll
   ```
4. Make sure the entire `images/` folder (including all subfolders) is committed — it's easy to accidentally leave large image folders untracked.
5. Push and wait for the Pages deployment to finish; your menu will be live at `https://<your-username>.github.io/<your-repo>/`.

---

## 🍓 Adding / Updating Menu Pages

Menu pages are just images, listed in order inside `script.js`.

1. Drop new page images into the relevant `images/` subfolder.
2. Add their paths to the `pages` array in `script.js`, in the order they should appear.
3. Update the matching category's `pageIdx` array (in the `categories` array) with the indices of the pages that belong to it.

```js
const categories = [
  { key: "juice", emoji: "🍊︎", label: "Fresh <BR> Juice", c1: "#ffb84d", c2: "#e6600a", pageIdx: [0, 1, 2, 3, 4, 5, 6, 7] },
  // ...
];
```

To add a **new category**, add a new entry to `categories` with its own `key`, `emoji`, `label`, two brand colors (`c1`, `c2` used for the fruit gradient and peel skin), and its `pageIdx` list.

---

## 🎨 Customization

- **Brand colors** — global theme colors are defined as CSS variables at the top of `style.css` (`--teal-deep`, `--teal`, `--yellow`, `--cream`, `--ink`).
- **Fonts** — uses Google Fonts `Pacifico` (decorative) and `Poppins` (body), loaded via `<link>` in `index.html`.
- **Contact & social links** — update the phone number, Google review link, and Instagram link directly in `index.html`.
- **Logo** — replace `images/Logo_The_Ocean_Juice_World.png` with your own (same filename, or update all references).

---

## 🛠️ Built With

- HTML5
- CSS3 (custom animations, gradients, responsive layout — no framework)
- Vanilla JavaScript (no dependencies)

---

## 👤 Credits

Designed & developed by **[AIM Enterprise](https://www.instagram.com/aim__enterprise)**.

## 📄 License

Add a license of your choice (e.g. MIT) if this project is meant to be reused or open-sourced. Otherwise, note that this is proprietary/client work and not licensed for reuse.
