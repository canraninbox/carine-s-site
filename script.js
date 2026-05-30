const root = document.documentElement;
const cursor = document.querySelector(".cursor");
const portrait = document.querySelector("[data-tilt]");
const panels = [...document.querySelectorAll(".world-panel")];
const tabs = [...document.querySelectorAll(".studio-tab")];
const studioView = document.querySelector(".studio-view");

const studioContent = {
  campaigns: {
    label: "Campaigns",
    title: "Multilingual market narratives for technical brands.",
    body:
      "Positioning, content calendars, launch essays, founder POVs, ecosystem explainers, and bilingual campaign assets for high-context technology audiences.",
  },
  talks: {
    label: "Talks",
    title: "Public thinking for rooms that need clarity.",
    body:
      "Keynotes, panels, salons, and expert briefings on Web3, AI, fintech, digital communication, and how emerging technologies earn cultural trust.",
  },
  podcast: {
    label: "Podcast",
    title: "Audio IP for intelligent, long-horizon trust.",
    body:
      "Interview formats, topic curation, guest research, narrative arcs, and hosting systems that turn expert conversations into reusable media assets.",
  },
  hosting: {
    label: "Hosting",
    title: "A calm voice for complex public conversations.",
    body:
      "Panel moderation, fireside chats, livestream scripts, and bilingual hosting for AI, Web3, fintech, marketing, and future-of-work audiences.",
  },
  media: {
    label: "Media",
    title: "A distribution-aware editorial engine.",
    body:
      "Columns, newsletters, media partnerships, and platform-native story packaging designed for credibility, clarity, and shareability.",
  },
};

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;
let scrollProgress = 0;
let renderedProgress = 0;

window.addEventListener("pointermove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  const px = (mouseX / window.innerWidth - 0.5) * 2;
  const py = (mouseY / window.innerHeight - 0.5) * 2;
  root.style.setProperty("--parallax-x", `${px * 26}px`);
  root.style.setProperty("--parallax-y", `${py * 22}px`);

  if (portrait) {
    portrait.style.setProperty("--ry", `${px * 5}deg`);
    portrait.style.setProperty("--rx", `${py * -4}deg`);
  }
});

document.querySelectorAll("a, button, .world-panel").forEach((item) => {
  item.addEventListener("mouseenter", () => cursor?.classList.add("is-active"));
  item.addEventListener("mouseleave", () => cursor?.classList.remove("is-active"));
});

function animate() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;
  if (cursor) {
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
  }

  scrollProgress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
  renderedProgress += (scrollProgress - renderedProgress) * 0.08;
  root.style.setProperty("--scroll-progress", renderedProgress.toFixed(4));
  root.style.setProperty("--float", Math.sin(performance.now() / 780) * 8);

  requestAnimationFrame(animate);
}

panels.forEach((panel) => {
  panel.addEventListener("mouseenter", () => {
    panels.forEach((item) => item.classList.toggle("active", item === panel));
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    const content = studioContent[tab.dataset.tab];
    studioView.animate(
      [
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    studioView.innerHTML = `
      <p class="studio-label">${content.label}</p>
      <h3>${content.title}</h3>
      <p>${content.body}</p>
    `;
  });
});

animate();
