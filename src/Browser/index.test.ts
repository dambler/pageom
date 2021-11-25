import { BrowserType } from "playwright";
import PageomBrowser, { PageomBrowserOptions } from ".";

describe("PageomBrowser", () => {
  let browser: PageomBrowser;
  const newPage = jest.fn();
  const newContext = jest.fn().mockReturnValue({ newPage });
  const close = jest.fn();
  const options: PageomBrowserOptions = {
    browserType: {
      launch: jest.fn().mockReturnValue({ newContext, close }),
    } as unknown as BrowserType,
    launchOptions: { headless: true },
    contextOptions: {},
  };

  describe("initialize", () => {
    beforeEach(async () => {
      browser = new PageomBrowser(options);
      await browser.initialize();
    });

    test("should call browser launch with provided launch options", () => {
      expect(options.browserType.launch).toHaveBeenCalled();
      expect(options.browserType.launch).toHaveBeenCalledWith(
        options.launchOptions
      );
    });

    test("should call create new context", () => {
      expect(newContext).toHaveBeenCalled();
    });

    test("should call create new page", () => {
      expect(newPage).toHaveBeenCalled();
    });
  });

  describe("close", () => {
    test("should call browser close", async () => {
      await browser.close();
      expect(close).toHaveBeenCalled();
    });
  });
});
