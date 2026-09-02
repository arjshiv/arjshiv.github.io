import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

const installedChrome = process.env.PLAYWRIGHT_CHROME_PATH
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export const launchBrowser = () => {
  const bundledBrowser = chromium.executablePath();
  const executablePath = existsSync(bundledBrowser) || !existsSync(installedChrome)
    ? undefined
    : installedChrome;

  return chromium.launch({ headless: true, executablePath });
};
