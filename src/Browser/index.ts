import playwright from 'playwright';
import { INITIALIZE_BROWSER_FIRST_ERROR } from './constants/errors';

export type PageomBrowserOptions = {
  browserType: playwright.BrowserType;
  launchOptions: playwright.LaunchOptions;
  contextOptions: playwright.BrowserContextOptions;
};

export const DEFAULT_LAUNCH_OPTIONS: PageomBrowserOptions = {
  browserType: playwright.chromium,
  launchOptions: { headless: false },
  contextOptions: {},
};

export const DEFAULT_CONTEXT_OPTIONS: playwright.BrowserContextOptions = {};

export default class PageomBrowser {
  #browser?: playwright.Browser;

  #context?: playwright.BrowserContext;

  #options: PageomBrowserOptions;

  #page?: playwright.Page;

  constructor(options: PageomBrowserOptions = DEFAULT_LAUNCH_OPTIONS) {
    this.#options = options;
  }

  /**
   * Launch a PageomBrowser. This must be called before attempting to interact with the
   * browser.
   */
  public initialize = async () => {
    const { browserType, launchOptions, contextOptions } = this.#options;
    this.#browser = await browserType.launch(launchOptions);
    this.#context = await this.#browser.newContext(contextOptions);
    this.#page = await this.#context.newPage();
  };

  /**
   * Close the PageomBrowser instance.
   */
  public close = async () => {
    if (!this.#browser) throw new Error(INITIALIZE_BROWSER_FIRST_ERROR);
    await this.#browser.close();
  };

  public get Page() {
    if (!this.#page) throw new Error(INITIALIZE_BROWSER_FIRST_ERROR);
    return this.#page;
  }
}
