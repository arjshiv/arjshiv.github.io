import assert from "node:assert/strict";
import { launchBrowser } from "./playwright-browser.mjs";

const target = process.argv[2] || "http://127.0.0.1:4173";
const browser = await launchBrowser();
try {
  for (const width of [1440, 900, 390, 320]) {
    console.log(`Checking console at ${width}px`);
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.setDefaultTimeout(10000);
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(target);
    await page.getByRole("link", { name: "Switch to fun mode" }).click();
    await page.waitForURL("**/fun/");
    assert.equal(await page.locator(".menu button").count(), 5);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `Overflow at ${width}`,
    );
    await page.keyboard.press("ArrowDown");
    assert.match(
      await page.locator(".menu [aria-current=true]").innerText(),
      /Building ResiDesk/,
    );
    await page
      .getByRole("button", { name: "A: Open selection", exact: true })
      .click();
    assert.equal(
      await page.locator("#screen h2").textContent(),
      "Building ResiDesk",
    );
    assert.equal(
      await page.locator("#screen a").getAttribute("href"),
      "https://hello.theresidesk.com/",
    );
    await page.keyboard.press("x");
    assert.equal(await page.locator(".menu button").count(), 5);
    await page
      .getByRole("button", { name: "Previous page", exact: true })
      .click();
    await page.keyboard.press("z");
    assert.equal(
      await page.locator("#screen h2").textContent(),
      "Hello, I'm Arjun",
    );
    await page.locator('.pixel-portrait').evaluate(image => image.decode());
    await page
      .getByRole("button", { name: "Console power", exact: true })
      .click();
    assert.equal(
      await page.locator(".console").getAttribute("data-off"),
      "true",
    );
    await page.keyboard.press("ArrowDown");
    await page
      .getByRole("button", { name: "Console power", exact: true })
      .click();
    assert.equal(await page.locator(".menu button").count(), 5);
    await page.getByRole("button", { name: "Sound off", exact: true }).click();
    console.log(`Controls passed at ${width}px`);
    assert.equal(
      await page.locator("#sound").getAttribute("aria-pressed"),
      "true",
    );
    await page
      .getByRole("button", { name: "Start: Home screen", exact: true })
      .click();
    await page.locator(".menu button").last().click();
    assert.equal(
      await page.locator("#screen a").getAttribute("href"),
      "mailto:arj.shiv@gmail.com",
    );
    await page.screenshot({
      path: `/tmp/pocket-verified-${width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("link", { name: "Switch to regular site", exact: true })
      .click();
    assert.equal(
      await page.locator("#hero-title").textContent(),
      "I'm building ResiDesk.",
    );
    assert.equal(
      await page.evaluate(() =>
        [...document.styleSheets].some((sheet) =>
          sheet.href?.includes("console.css"),
        ),
      ),
      false,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `Regular site overflow at ${width}`,
    );
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log(
    "Fun mode passed: four viewports, controls, keyboard, power, sound, links, images, and round-trip isolation.",
  );
} finally {
  await browser.close();
}
