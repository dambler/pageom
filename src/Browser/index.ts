import {
  BrowserType,
  LaunchOptions,
  BrowserContextOptions,
  chromium,
  Browser,
  Page,
  BrowserContext,
} from 'playwright';
import { INITIALIZE_BROWSER_FIRST_ERROR } from './constants/errors';

export type PageOMBrowserOptions = {
  browserType: BrowserType;
  launchOptions: LaunchOptions;
  contextOptions: BrowserContextOptions;
};

export const DEFAULT_LAUNCH_OPTIONS: PageOMBrowserOptions = {
  browserType: chromium,
  launchOptions: { headless: true },
  contextOptions: {},
};

export class PageOMBrowser {
  static #browser?: Browser;

  static #page?: Page;

  static #context: BrowserContext;

  static initialize = async (options: PageOMBrowserOptions = DEFAULT_LAUNCH_OPTIONS) => {
    const { browserType, launchOptions, contextOptions } = options;
    PageOMBrowser.#browser = await browserType.launch(launchOptions);
    PageOMBrowser.#context = await PageOMBrowser.#browser.newContext(contextOptions);
    PageOMBrowser.#page = await PageOMBrowser.#context.newPage();
  };

  static close = async () => {
    if (!PageOMBrowser.#browser) throw new Error(INITIALIZE_BROWSER_FIRST_ERROR);
    await PageOMBrowser.#browser.close();
    PageOMBrowser.#browser = undefined;
  };

  static get Page() {
    if (!PageOMBrowser.#page) throw new Error(INITIALIZE_BROWSER_FIRST_ERROR);
    return PageOMBrowser.#page;
  }
}
