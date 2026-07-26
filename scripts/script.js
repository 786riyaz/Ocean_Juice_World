const pages = [
  // Juice Menu (0-7)
  "images/1_JuiceMenu/1_JuiceMenu_pages-0001.jpg",
  "images/1_JuiceMenu/1_JuiceMenu_pages-0002.jpg",
  "images/1_JuiceMenu/1_JuiceMenu_pages-0003.jpg",
  "images/1_JuiceMenu/1_JuiceMenu_pages-0004.jpg",
  "images/1_JuiceMenu/1_JuiceMenu_pages-0005.jpg",
  "images/1_JuiceMenu/1_JuiceMenu_pages-0006.jpg",
  "images/1_JuiceMenu/1_JuiceMenu_pages-0007.jpg",
  "images/1_JuiceMenu/1_JuiceMenu_pages-0008.jpg",
  // Thick Shake Menu (8-17)
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0001.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0002.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0003.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0004.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0005.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0006.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0007.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0008.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0009.jpg",
  "images/2_Thick_Shake_Menu/2_ShakeMenu_page-0010.jpg",
  // Natural Juices & Shots Menu (18-21)
  "images/3_100_Juice_and_Shots_Menu/3_100JuiceShotsMenu-0001.jpg",
  "images/3_100_Juice_and_Shots_Menu/3_100JuiceShotsMenu-0002.jpg",
  "images/3_100_Juice_and_Shots_Menu/3_100JuiceShotsMenu-0003.jpg",
  "images/3_100_Juice_and_Shots_Menu/3_100JuiceShotsMenu-0004.jpg",
];

const categories = [
  { key: "juice", emoji: "🍊︎", label: "Fresh <BR> Juice", c1: "#ffb84d", c2: "#e6600a", pageIdx: [0, 1, 2, 3, 4, 5, 6, 7] },
  { key: "shake", emoji: "🥤", label: "Thick <BR> Shakes", c1: "#ff8fa3", c2: "#c81e3a", pageIdx: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
  { key: "natural", emoji: "🍓", label: "Natural Juices <BR> & Shots", c1: "#a9d66b", c2: "#33691e", pageIdx: [18, 19, 20, 21] },
];

const bowl = document.getElementById("bowl");
categories.forEach((cat) => {
  const btn = document.createElement("button");
  btn.className = "fruit-btn";
  btn.innerHTML = `<div class="fruit-circle" style="background:radial-gradient(circle at 35% 30%, ${cat.c1}, ${cat.c2})">${cat.emoji}</div><div class="fruit-label">${cat.label}</div>`;
  btn.addEventListener("click", () => openCategory(cat));
  bowl.appendChild(btn);
});

let activeCat = null;
let pIndex = 0;

const peelOverlay = document.getElementById("peelOverlay");
const peelStage = document.getElementById("peelStage");
const peelTitle = document.getElementById("peelTitle");
const skinLeft = document.getElementById("skinLeft");
const skinRight = document.getElementById("skinRight");
const pageImg = document.getElementById("pageImg");
const pLabel = document.getElementById("pLabel");
const pTotal = document.getElementById("pTotal");
const pageNav = document.getElementById("pageNav");
const stageEmoji = document.getElementById("stageEmoji");

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function openCategory(cat) {
  activeCat = cat;
  pIndex = 0;
  document.getElementById("peelTitleText").textContent = cat.label.replace("<BR>", " ");
  skinLeft.style.background = `linear-gradient(100deg, ${cat.c2}, ${cat.c1})`;
  skinRight.style.background = `linear-gradient(280deg, ${cat.c2}, ${cat.c1})`;
  peelOverlay.style.setProperty("--cat-c1", cat.c1);
  peelOverlay.style.setProperty("--cat-c2", cat.c2);
  peelOverlay.style.setProperty("--cat-c1-glow", hexToRgba(cat.c1, 0.45));
  stageEmoji.textContent = cat.emoji;
  pTotal.textContent = cat.pageIdx.length;
  pageNav.style.display = cat.pageIdx.length > 1 ? "flex" : "none";
  updatePageImg();
  peelOverlay.classList.add("open");
  peelStage.classList.remove("open");
  // force reflow then open peel for animation
  requestAnimationFrame(() => requestAnimationFrame(() => peelStage.classList.add("open")));
}

function updatePageImg() {
  const idx = activeCat.pageIdx[pIndex];
  pageImg.src = pages[idx];
  pLabel.textContent = pIndex + 1;
}

document.getElementById("pPrev").addEventListener("click", () => {
  if (pIndex > 0) {
    pIndex--;
    updatePageImg();
  }
});
document.getElementById("pNext").addEventListener("click", () => {
  if (activeCat && pIndex < activeCat.pageIdx.length - 1) {
    pIndex++;
    updatePageImg();
  }
});

const pageWindowEl = document.getElementById("pageWindow");

pageWindowEl.addEventListener("click", () => {
  document.getElementById("lbImg").src = pageImg.src;
  document.getElementById("lightbox").classList.add("open");
});

// Swipe gesture support for mobile (does not affect desktop click-to-zoom)
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;
const SWIPE_THRESHOLD = 40; // min px horizontal movement to count as a swipe

pageWindowEl.addEventListener("touchstart", (e) => {
  const t = e.changedTouches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
  touchMoved = false;
}, { passive: true });

pageWindowEl.addEventListener("touchmove", () => {
  touchMoved = true;
}, { passive: true });

pageWindowEl.addEventListener("touchend", (e) => {
  if (!activeCat) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;

  // Only treat as a swipe if horizontal movement dominates and passes the threshold
  if (touchMoved && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0 && pIndex < activeCat.pageIdx.length - 1) {
      pIndex++;
      updatePageImg();
    } else if (dx > 0 && pIndex > 0) {
      pIndex--;
      updatePageImg();
    }
    // Prevent the click-to-zoom handler from firing right after a swipe
    e.preventDefault();
  }
}, { passive: false });
document.getElementById("lbClose").addEventListener("click", () => {
  document.getElementById("lightbox").classList.remove("open");
});
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") e.currentTarget.classList.remove("open");
});

document.getElementById("peelClose").addEventListener("click", closePeel);
function closePeel() {
  peelStage.classList.remove("open");
  setTimeout(() => peelOverlay.classList.remove("open"), 750);
}
peelOverlay.addEventListener("click", (e) => {
  if (e.target.id === "peelOverlay") closePeel();
});