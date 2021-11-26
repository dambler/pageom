import playwright from 'playwright';
import { INITIALIZE_BROWSER_FIRST_ERROR } from './constants/errors';

export type PageOMBrowserOptions = {
  browserType: playwright.BrowserType;
  launchOptions: playwright.LaunchOptions;
  contextOptions: playwright.BrowserContextOptions;
};

export const DEFAULT_LAUNCH_OPTIONS: PageOMBrowserOptions = {
  browserType: playwright.chromium,
  launchOptions: { headless: false },
  contextOptions: {},
};

export const DEFAULT_CONTEXT_OPTIONS: playwright.BrowserContextOptions = {};

export default class PageOMBrowser {
  static #browser?: playwright.Browser;

  static #context?: playwright.BrowserContext;

  static #page?: playwright.Page;

  /**
   * Launch a PageOMBrowser. This must be called before attempting to interact with the
   * browser.
   */
  public static initialize = async (
    options: PageOMBrowserOptions = DEFAULT_LAUNCH_OPTIONS
  ) => {
    if (PageOMBrowser.#browser) return;
    const { browserType, launchOptions, contextOptions } = options;
    PageOMBrowser.#browser = await browserType.launch(launchOptions);
    PageOMBrowser.#context = await PageOMBrowser.#browser.newContext(contextOptions);
    PageOMBrowser.#page = await PageOMBrowser.#context.newPage();
  };

  /**
   * Close the PageOMBrowser instance.
   */
  public static close = async () => {
    if (!PageOMBrowser.#browser) throw new Error(INITIALIZE_BROWSER_FIRST_ERROR);
    await PageOMBrowser.#browser.close();
  };

  public static get Page() {
    if (!PageOMBrowser.#page) throw new Error(INITIALIZE_BROWSER_FIRST_ERROR);
    return PageOMBrowser.#page;
  }
}
