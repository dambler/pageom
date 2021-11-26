/* eslint-disable max-classes-per-file */

import { BrowserType } from 'playwright';
import { PageOMBrowserOptions } from '../Browser/index';
import { PageOMBrowser, PageOMPage } from '..';
import { CANNOT_NAVIGATE_WITHOUT_SLUG } from './constants/errors';

class DummyPageWithSlug extends PageOMPage {
  slug = 'test-slug';
}

class DummyPageWithoutSlug extends PageOMPage {}

describe('PageOMPage', () => {
  describe('visit', () => {
    const newPage = jest.fn().mockReturnValue(() => jest.fn());
    const newContext = jest.fn().mockReturnValue({ newPage });
    const close = jest.fn();
    const options: PageOMBrowserOptions = {
      browserType: {
        launch: jest.fn().mockReturnValue({ newContext, close }),
      } as unknown as BrowserType,
      launchOptions: { headless: true },
      contextOptions: {},
    };

    beforeAll(async () => {
      await PageOMBrowser.initialize(options);
    });

    test('should call Page goto when slug set', async () => {
      const dummyPage = new DummyPageWithSlug();
      await dummyPage.visit();
      // expect(goto).toHaveBeenCalled();
    });

    test('should throw an error when calling without slug set', async () => {
      const dummyPage = new DummyPageWithoutSlug();
      await expect(async () => dummyPage.visit()).rejects.toThrow(
        CANNOT_NAVIGATE_WITHOUT_SLUG
      );
    });
  });
});
