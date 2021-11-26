/* eslint-disable max-classes-per-file */

import PageomPage from '.';
import PageomBrowser from '../Browser';
import { CANNOT_NAVIGATE_WITHOUT_SLUG } from './constants/errors';

class DummyPageWithSlug extends PageomPage {
  slug = 'test-slug';
}

class DummyPageWithoutSlug extends PageomPage {}

describe('PageomPage', () => {
  describe('visit', () => {
    test('should call Page goto when slug set', async () => {
      const goto = jest.fn();
      const dummyPage = new DummyPageWithSlug({
        initialize: jest.fn(),
        Page: { goto },
      } as unknown as PageomBrowser);
      await dummyPage.visit();
      expect(goto).toHaveBeenCalled();
    });

    test('should throw an error when calling without slug set', async () => {
      const goto = jest.fn();
      const dummyPage = new DummyPageWithoutSlug({
        initialize: jest.fn(),
        Page: { goto },
      } as unknown as PageomBrowser);
      await expect(async () => dummyPage.visit()).rejects.toThrow(
        CANNOT_NAVIGATE_WITHOUT_SLUG
      );
    });
  });
});
