import assert from "node:assert/strict";
import { launchBrowser } from "./playwright-browser.mjs";
const target = process.argv[2] || "http://127.0.0.1:4188";
const browser = await launchBrowser();
try {
  for (const width of [1440, 900, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      const Native = window.AudioContext;
      if (!Native) return;
      window.__audio = [];
      window.AudioContext = class extends Native {
        constructor(...args) {
          super(...args);
          window.__audio.push(this);
        }
        createGain() {
          const gain = super.createGain();
          const connect = gain.connect.bind(gain);
          const analyser = this.createAnalyser();
          analyser.fftSize = 256;
          this.testAnalyser = analyser;
          gain.connect = (destination) => {
            if (destination === this.destination) {
              connect(analyser);
              analyser.connect(destination);
              return destination;
            }
            return connect(destination);
          };
          return gain;
        }
      };
    });
    await page.goto(target + "/fun/");
    await page.locator(".hardware").evaluate((image) => image.decode());
    assert.equal(await page.locator(".apps a").count(), 6);
    assert.equal(await page.locator("#sitemap a").count(), 6);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await page.locator(".apps a").first().focus();
    await page.keyboard.press("ArrowRight");
    assert.equal(
      await page.evaluate(() => document.activeElement.dataset.chapter),
      "work",
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("#detail-title").textContent(),
      "Building ResiDesk.",
    );
    assert.equal(await page.evaluate(() => document.activeElement.id), "back");
    await page.keyboard.press("Escape");
    assert.equal(
      await page.evaluate(() => document.activeElement.dataset.chapter),
      "work",
    );
    await page.keyboard.press("ArrowDown");
    assert.equal(
      await page.evaluate(() => document.activeElement.dataset.chapter),
      "notes",
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.dataset.chapter),
      "contact",
    );
    await page
      .getByRole("button", { name: "X: Focus sitemap", exact: true })
      .click();
    assert.equal(
      await page.evaluate(() => document.activeElement.closest("nav").id),
      "sitemap",
    );
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("#detail-title").textContent(),
      "Writing and talks.",
    );
    assert.equal(
      await page.locator("#full-section").getAttribute("href"),
      "/#notes",
    );
    await page.locator("#sound").click();
    const peak = await page.evaluate(async () => {
      let peak = 0;
      for (let i = 0; i < 24; i++) {
        const analyser = window.__audio[0]?.testAnalyser;
        if (analyser) {
          const data = new Float32Array(analyser.fftSize);
          analyser.getFloatTimeDomainData(data);
          peak = Math.max(peak, ...data.map(Math.abs));
        }
        await new Promise((resolve) => setTimeout(resolve, 8));
      }
      return peak;
    });
    assert.ok(peak > 0.01, `Audio signal missing at ${width}: ${peak}`);
    assert.equal(await page.evaluate(() => window.__audio[0].state), "running");
    await page.locator("#sound").click();
    assert.equal(
      await page.locator("#sound").getAttribute("aria-pressed"),
      "false",
    );
    await page.locator("#power").click();
    assert.equal(
      await page.locator(".upper-screen").evaluate((node) => node.inert),
      true,
    );
    await page.locator("#power").click();
    await page
      .getByRole("button", { name: "Home: Back to menu", exact: true })
      .click();
    await page.screenshot({ path: `/tmp/dual-${width}.png`, fullPage: true });
    await page
      .getByRole("link", { name: "Switch to regular site", exact: true })
      .click();
    assert.equal(
      await page.locator("#hero-title").textContent(),
      "I'm building ResiDesk.",
    );
    assert.deepEqual(errors, []);
    console.log(
      `${width}px passed: focus, two-screen routing, power, audio peak ${peak.toFixed(3)}, regular-site return.`,
    );
    await page.close();
  }
  const page = await browser.newPage();
  await page.addInitScript(() => {
    window.AudioContext = undefined;
    window.webkitAudioContext = undefined;
  });
  await page.goto(target + "/fun/");
  await page.locator("#sound").click();
  assert.match(await page.locator("#audio-status").textContent(), /can't play/);
  assert.equal(
    await page.locator("#sound").getAttribute("aria-pressed"),
    "false",
  );
  console.log(
    "Unsupported audio reports its state without falsely enabling sound.",
  );
} finally {
  await browser.close();
}
