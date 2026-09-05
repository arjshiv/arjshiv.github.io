const screen = document.querySelector("#screen");
const shell = document.querySelector(".console");
const label = document.querySelector("#screen-label");
const counter = document.querySelector("#screen-counter");
const hint = document.querySelector("#screen-hint");
const chapters = [
  {
    title: "Hello, I'm Arjun",
    body: '<div class="mini-profile"><img class="pixel-portrait" src="../assets/landscape-1.webp" alt="Arjun Kannan"><p>ARJUN KANNAN<br>NEW YORK</p></div><p>I co-founded ResiDesk. I spend most of my time on product and data, plus the rest of running a startup.</p>',
  },
  {
    title: "Building ResiDesk",
    body: "<p>Residents text about rent, repairs, renewals, and everything else happening in their building.</p><p>We help the team answer and keep track of what still needs to happen.</p>",
    link: ["https://hello.theresidesk.com/", "Visit ResiDesk"],
  },
  {
    title: "How I got here",
    body: "<p>BlackRock. Climb. ResiDesk.</p><p>I've worked on financial software, education lending, and now the places people live.</p>",
    link: ["/#story", "Read the longer story"],
  },
  {
    title: "Writing & talks",
    body: "<p>I write about AI, product, and what happens when you put software in front of real customers.</p>",
    link: ["/#notes", "Read and watch"],
  },
  {
    title: "Say hello",
    body: "<p>Building something? Working through a product problem? I'd like to hear about it.</p>",
    link: ["mailto:arj.shiv@gmail.com", "Send me a note"],
  },
];
let selected = 0;
let view = "menu";
let powered = true;
let sound = false;
let audio;

function tone() {
  if (!sound) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    audio ||= new Audio();
    audio.resume().catch(() => {});
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(440 + selected * 55, audio.currentTime);
    gain.gain.setValueAtTime(0.018, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.06);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.07);
  } catch {
    /* Sound is optional when a browser blocks audio. */
  }
}

function render() {
  label.textContent =
    view === "menu" ? "ARJUN'S POCKET" : chapters[selected].title.toUpperCase();
  counter.textContent = `0${selected + 1} / 05`;
  hint.textContent = view === "menu" ? "A: OPEN" : "B: BACK";
  if (view === "menu") {
    screen.innerHTML =
      '<h2>A little about me.</h2><div class="menu">' +
      chapters
        .map(
          (chapter, index) =>
            `<button data-chapter="${index}" aria-current="${selected === index}"><span aria-hidden="true">${selected === index ? "▶" : "·"}</span>${chapter.title}</button>`,
        )
        .join("") +
      "</div>";
  } else {
    const chapter = chapters[selected];
    screen.innerHTML = `<h2>${chapter.title}</h2>${chapter.body}${chapter.link ? `<a href="${chapter.link[0]}">${chapter.link[1]} ↗</a>` : ""}`;
  }
  screen.scrollTop = 0;
}

function act(action) {
  if (!powered) return;
  if (action === "home" || action === "back") view = "menu";
  else if (action === "open") {
    if (view === "detail") {
      screen.querySelector("a")?.click();
      return;
    }
    view = "detail";
  } else if (view === "detail" && (action === "up" || action === "down")) {
    screen.scrollBy(0, action === "down" ? 60 : -60);
    tone();
    return;
  } else
    selected =
      (selected +
        (action === "up" || action === "left" ? -1 : 1) +
        chapters.length) %
      chapters.length;
  tone();
  render();
}

document
  .querySelectorAll("[data-action]")
  .forEach((button) =>
    button.addEventListener("click", () => act(button.dataset.action)),
  );
screen.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chapter]");
  if (!button || !powered) return;
  selected = Number(button.dataset.chapter);
  act("open");
  screen.focus({ preventScroll: true });
});
document.querySelector("#power").addEventListener("click", (event) => {
  powered = !powered;
  shell.dataset.off = String(!powered);
  event.currentTarget.setAttribute("aria-pressed", String(powered));
  screen.inert = !powered;
  screen.tabIndex = powered ? 0 : -1;
  screen.setAttribute("aria-hidden", String(!powered));
  if (powered) {
    view = "menu";
    render();
    tone();
  }
});
document.querySelector("#sound").addEventListener("click", (event) => {
  sound = !sound;
  event.currentTarget.setAttribute("aria-pressed", String(sound));
  event.currentTarget.querySelector("span").textContent = sound
    ? "Sound on"
    : "Sound off";
  tone();
});
const keys = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  z: "open",
  Z: "open",
  x: "back",
  X: "back",
  Escape: "back",
  Enter: "home",
};
document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || !powered) return;
  if (event.key === "Enter" && event.target.closest("a,button")) return;
  const action = keys[event.key];
  if (!action) return;
  event.preventDefault();
  if (event.repeat && ["open", "home", "back"].includes(action)) return;
  act(action);
});
render();
