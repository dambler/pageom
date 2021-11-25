import playwright from "playwright";

export type PageomBrowserOptions = {
  browserType: playwright.BrowserType;
  launchOptions: playwright.LaunchOptions;
  contextOptions: playwright.BrowserContextOptions;
};

export const DEFAULT_LAUNCH_OPTIONS: PageomBrowserOptions = {
  browserType: playwright.chromium,
  launchOptions: { headless: true },
  contextOptions: {},
};

export const DEFAULT_CONTEXT_OPTIONS: playwright.BrowserContextOptions = {};

export default class PageomBrowser {
  #browser?: playwright.Browser;
  #context?: playwright.BrowserContext;
  #options: PageomBrowserOptions;
  #page?: playwright.Page;

  constructor(options?: PageomBrowserOptions) {
    this.#options = options || DEFAULT_LAUNCH_OPTIONS;
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
    if (!this.#browser)
      throw new Error(
        `Cannot close Browser as Browser does not exist. Have you run initialize?`
      );

    await this.#browser.close();
  };

  public get Page() {
    if (!this.#page)
      throw new Error(
        "Cannot get Page as does not exist. Have you run initialize?"
      );
    return this.#page;
  }
}
