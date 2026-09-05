const device = document.querySelector("#console");
const apps = [...document.querySelectorAll(".apps a")];
const mapLinks = [...document.querySelectorAll("#sitemap a")];
const home = document.querySelector("#home-view");
const detail = document.querySelector("#detail-view");
const soundButton = document.querySelector("#sound");
const sectionLinks = {
  top: "About me",
  work: "More about ResiDesk",
  story: "Read my story",
  principles: "More on how I work",
  notes: "Read and watch",
  contact: "Contact details",
};
const chapters = {
  top: [
    "Hello, I'm Arjun.",
    "I co-founded ResiDesk, where most of my time goes into product and data. I also work on sales, hiring, and whatever's holding the team up that day.",
  ],
  work: [
    "Building ResiDesk.",
    "Your landlord usually talks to you when they need rent. You talk to them when the sink breaks. ResiDesk brings those conversations together so property teams can answer residents and follow up on repairs, renewals, and other open issues.",
  ],
  story: [
    "How I got here.",
    "I thought I'd get a PhD. At Cornell, I wrote an iPhone app to check our physics lab for magnetic noise and found I liked building software. I later built financial software at BlackRock, then ran product, engineering, and data at Climb, which financed education. After that, I co-founded ResiDesk.",
  ],
  principles: [
    "I ask a lot of questions.",
    "When someone flags a problem, I want to understand what they're dealing with and help them fix it. We look at the messages and check how often it's happening. If the same problem keeps coming back, we need to change how the work gets done.",
  ],
  notes: [
    "Writing and talks.",
    "I write about AI, housing, and building software. In the talks, I get into how I ended up here and what we're learning at ResiDesk.",
  ],
  contact: [
    "Email me.",
    "Tell me what you're building or where you're stuck. A bit of context helps me work out whether I can help.",
  ],
};
let selected = "top",
  powered = true,
  sound = false,
  context,
  lastGroup = apps,
  togglePending = false;
async function enableAudio() {
  const Audio = window.AudioContext || window.webkitAudioContext;
  if (!Audio)
    throw new Error(
      "This browser can't play the button sounds. You can still use both screens.",
    );
  context ||= new Audio();
  if (context.state !== "running") await context.resume();
  if (context.state !== "running")
    throw new Error("Sound didn't start. Press Turn sound on to try again.");
}
async function tone(confirm = false) {
  if (!sound) return;
  try {
    await enableAudio();
    const start = context.currentTime + 0.015;
    const oscillator = context.createOscillator(),
      gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(confirm ? 660 : 440, start);
    oscillator.frequency.setValueAtTime(confirm ? 880 : 550, start + 0.07);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.22, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.17);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.18);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  } catch (error) {
    setSound(false);
    document.querySelector("#audio-status").textContent = error.message;
  }
}
function setSound(enabled) {
  sound = enabled;
  soundButton.setAttribute("aria-pressed", String(sound));
  soundButton.querySelector("span").textContent = sound
    ? "Turn sound off"
    : "Turn sound on";
  document
    .querySelector("#sound-waves")
    .setAttribute(
      "d",
      sound ? "M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" : "m16 9 5 6m0-6-5 6",
    );
}
async function toggleSound() {
  if (togglePending) return;
  if (sound) {
    setSound(false);
    return;
  }
  togglePending = true;
  document.querySelector("#audio-status").textContent = "";
  try {
    await enableAudio();
    setSound(true);
    await tone(true);
  } catch (error) {
    setSound(false);
    document.querySelector("#audio-status").textContent = error.message;
  } finally {
    togglePending = false;
  }
}
function select(id) {
  selected = id;
  [...apps, ...mapLinks].forEach((link) => {
    const active = link.dataset.chapter === selected;
    link.dataset.selected = String(active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  document.querySelector("#selection").textContent = apps
    .find((link) => link.dataset.chapter === id)
    .lastElementChild.textContent.toUpperCase();
  document.querySelector("#full-section").href = "/#" + selected;
  document.querySelector("#full-section").textContent =
    sectionLinks[selected] + " ↗";
}
function showChapter(id, updateHistory = true, moveFocus = false) {
  if (!powered || !chapters[id]) return;
  select(id);
  const [title, copy] = chapters[id];
  document.querySelector("#detail-title").textContent = title;
  document.querySelector("#chapter-announcement").textContent = title;
  document.querySelector("#detail-copy").textContent = copy;
  const link = document.querySelector("#detail-link");
  link.href = id === "contact" ? "mailto:arj.shiv@gmail.com" : "/#" + id;
  link.textContent = id === "contact" ? "Email me ↗" : sectionLinks[id] + " ↗";
  home.hidden = true;
  detail.hidden = false;
  detail.scrollTop = 0;
  if (updateHistory) history.pushState(null, "", "#" + id);
  if (moveFocus) document.querySelector("#back").focus({ preventScroll: true });
  tone(true);
}
function goHome(moveFocus = true) {
  home.hidden = false;
  detail.hidden = true;
  history.replaceState(null, "", location.pathname);
  if (moveFocus)
    apps
      .find((link) => link.dataset.chapter === selected)
      .focus({ preventScroll: true });
}
function move(action) {
  if (!powered) return;
  if (!detail.hidden && lastGroup === apps) goHome(false);
  const group = lastGroup,
    columns = group === apps ? 3 : 2;
  const current = Math.max(
    0,
    group.findIndex((link) => link.dataset.chapter === selected),
  );
  const step =
    action === "up"
      ? -columns
      : action === "down"
        ? columns
        : action === "left"
          ? -1
          : 1;
  const next = group[(current + step + group.length) % group.length];
  select(next.dataset.chapter);
  next.focus({ preventScroll: true });
  next.scrollIntoView({
    block: "nearest",
    inline: "nearest",
    behavior: "instant",
  });
  tone();
}
function act(action) {
  if (!powered) return;
  if (action === "sound") return toggleSound();
  if (action === "home" || action === "back") {
    goHome();
    tone();
  } else if (action === "map") {
    lastGroup = mapLinks;
    mapLinks
      .find((link) => link.dataset.chapter === selected)
      .focus({ preventScroll: true });
  } else if (action === "open") {
    if (!detail.hidden && lastGroup === apps)
      document.querySelector("#detail-link").click();
    else showChapter(selected, true, lastGroup === apps);
  } else move(action);
}
[...apps, ...mapLinks].forEach((link) => {
  link.addEventListener("focus", () => {
    select(link.dataset.chapter);
    lastGroup = apps.includes(link) ? apps : mapLinks;
  });
  link.addEventListener("click", (event) => {
    event.preventDefault();
    lastGroup = apps.includes(link) ? apps : mapLinks;
    showChapter(link.dataset.chapter, true, lastGroup === apps);
  });
});
document
  .querySelectorAll("[data-action]")
  .forEach((button) =>
    button.addEventListener("click", () => act(button.dataset.action)),
  );
document.querySelector("#back").addEventListener("click", () => goHome());
soundButton.addEventListener("click", toggleSound);
document.querySelector("#keyboard-help").addEventListener("click", (event) => {
  const help = document.querySelector("#key-help");
  help.hidden = !help.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!help.hidden));
});
document.querySelector("#power").addEventListener("click", (event) => {
  powered = !powered;
  device.dataset.off = String(!powered);
  event.currentTarget.setAttribute("aria-pressed", String(powered));
  document
    .querySelectorAll(".upper-screen,.lower-screen,.hardware-controls")
    .forEach((region) => {
      region.inert = !powered;
      region.setAttribute("aria-hidden", String(!powered));
    });
  if (powered) {
    goHome(false);
    tone(true);
  }
});
document.addEventListener("keydown", (event) => {
  if (
    !powered ||
    event.altKey ||
    event.metaKey ||
    event.ctrlKey ||
    event.target.closest("input,textarea,select,[contenteditable=true]")
  )
    return;
  if (!device.contains(event.target) && event.target !== document.body) return;
  const arrow = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  }[event.key];
  if (arrow) {
    event.preventDefault();
    move(arrow);
    return;
  }
  if (event.key === "Enter" || event.key === " ") {
    if (event.target.closest("a,button")) return;
    event.preventDefault();
    if (!event.repeat) act("open");
    return;
  }
  const action = {
    z: "open",
    Z: "open",
    x: "back",
    X: "back",
    Escape: "back",
    Home: "home",
  }[event.key];
  if (action) {
    event.preventDefault();
    if (!event.repeat) act(action);
  }
});
window.addEventListener("popstate", () => {
  const id = location.hash.slice(1);
  if (chapters[id]) showChapter(id, false);
  else goHome(false);
});
select("top");
if (chapters[location.hash.slice(1)])
  showChapter(location.hash.slice(1), false);
