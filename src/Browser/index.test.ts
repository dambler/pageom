import { BrowserType } from "playwright";
import * as playwrightMock from "../../__mocks__/playwright";
import PageomBrowser, { DEFAULT_LAUNCH_OPTIONS, PageomBrowserOptions } from ".";
import { INITIALIZE_BROWSER_FIRST_ERROR } from "./constants/errors";

describe("PageomBrowser", () => {
  let browser: PageomBrowser;
  const newPage = jest.fn().mockReturnValue(() => jest.fn());
  const newContext = jest.fn().mockReturnValue({ newPage });
  const close = jest.fn();
  const options: PageomBrowserOptions = {
    browserType: {
      launch: jest.fn().mockReturnValue({ newContext, close }),
    } as unknown as BrowserType,
    launchOptions: { headless: true },
    contextOptions: {},
  };

  describe("default launch options", () => {
    test("can initialize with default parameters", async () => {
      const browser = new PageomBrowser();
      await browser.initialize();

      expect(playwrightMock.launch).toHaveBeenCalled();
      expect(playwrightMock.newContext).toHaveBeenCalled();
      expect(playwrightMock.newPage).toHaveBeenCalled();
    });
  });

  describe("initialize", () => {
    describe("using default launch options", () => {
      beforeEach(async () => {
        browser = new PageomBrowser();
        await browser.initialize();
      });

      test("should call browser launch with default launch options", () => {
        expect(playwrightMock.launch).toHaveBeenCalled();
        expect(playwrightMock.launch).toHaveBeenCalledWith(
          DEFAULT_LAUNCH_OPTIONS.launchOptions
        );
      });

      test("should call create new context", () => {
        expect(playwrightMock.newContext).toHaveBeenCalled();
      });

      test("should call create new page", () => {
        expect(playwrightMock.newPage).toHaveBeenCalled();
      });

      test("should be able to retrieve Page after initialization", () => {
        expect(browser.Page).not.toThrow();
      });
    });

    describe("using provided launch options", () => {
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

      test("should be able to retrieve Page after initialization", () => {
        expect(browser.Page).not.toThrow();
      });
    });
  });

  describe("close", () => {
    test("should call browser close", async () => {
      await browser.close();
      expect(close).toHaveBeenCalled();
    });
  });

  test("should throw error when calling close before initializing", async () => {
    const browser = new PageomBrowser();
    await expect(async () => browser.close()).rejects.toThrow(
      INITIALIZE_BROWSER_FIRST_ERROR
    );
  });

  test("should throw error when attempting to call Page before initializing", () => {
    const browser = new PageomBrowser();
    expect(() => browser.Page).toThrowError(INITIALIZE_BROWSER_FIRST_ERROR);
  });
});
